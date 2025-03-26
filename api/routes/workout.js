import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const BRANCH = process.env.BRANCH;
const FOLDER_PATH = "workouts";
const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/programs`;

// READ all workouts
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await axios.get(`${GITHUB_API_URL}/${id}/${FOLDER_PATH}?ref=${BRANCH}&nocache=${Date.now()}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'Cache-Control': 'no-cache'
            }
        });

        const folders = response.data.filter((file) => file.type === 'dir');

        const promises = folders.map(async (folder) => {
            const response = await axios.get(`${GITHUB_API_URL}/${id}/${FOLDER_PATH}/${folder.name}?ref=${BRANCH}&nocache=${Date.now()}`, {
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
            nbWorkouts: data.at(-1).id + 1,
            workouts: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE workout
router.post('/:idProg', async (req, res) => {
    try {
        const { idProg } = req.params;
        const { id, name } = req.body;

        if (!idProg || !id || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const myId = Number(id);
        const content = JSON.stringify({
            id: myId,
            name
        });
        const contentBase64 = Buffer.from(content).toString('base64');

        const response = await axios.put(
            `${GITHUB_API_URL}/${idProg}/${FOLDER_PATH}/${id}/info.json`, {
            message: `Create workout ${id}`,
            content: contentBase64,
            branch: BRANCH
        }, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        res.json({
            message: `Workout ${id} created`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;