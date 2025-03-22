import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const BRANCH = process.env.BRANCH;
const FOLDER_PATH = "programs";
const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER_PATH}`;

// READ all programs
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}?ref=${BRANCH}&nocache=${Date.now()}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'Cache-Control': 'no-cache'
            }
        });

        const folders = response.data.filter((file) => file.type === 'dir');

        const promises = folders.map(async (folder) => {
            const response = await axios.get(`${GITHUB_API_URL}/${folder.name}?ref=${BRANCH}&nocache=${Date.now()}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    'Cache-Control': 'no-cache'
                }
            });

            const file = response.data.filter((file) => file.name === 'info.json');

            const promises = file.map(async (file) => {
                const content = await axios.get(`${file.download_url}?nocache=${Date.now()}`);
                return content.data;
            });

            const data = await Promise.all(promises);

            return data[0];
        });

        const data = await Promise.all(promises);

        res.json({
            nbPrograms: data.at(-1).id + 1,
            programs: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE program
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const myId = Number(id);
        const content = JSON.stringify({
            id: myId,
            name
        });
        const contentBase64 = Buffer.from(content).toString('base64');

        const response = await axios.put(
            `${GITHUB_API_URL}/${myId}/info.json`,
            {
                message: `Create program ${myId}`,
                content: contentBase64,
                branch: BRANCH
            }, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        res.json({
            message: `Program ${myId} created`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE program
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const myId = Number(id);
        let fileResponse;
        try {
            fileResponse = await axios.get(`${GITHUB_API_URL}/${myId}/info.json?ref=${BRANCH}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    'Cache-Control': 'no-cache'
                }
            });
        } catch (error) {
            return res.status(404).json({ error: 'Program not found' });
        }

        const response = await axios.delete(`${GITHUB_API_URL}/${myId}/info.json`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            },
            data: {
                message: `Delete program ${myId}`,
                sha: fileResponse.data.sha,
                branch: BRANCH
            }
        });

        res.json({
            message: `Program ${myId} deleted`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;