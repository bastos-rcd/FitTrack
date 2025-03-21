import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

dotenv.config();

const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.OWNER;
const REPO = process.env.REPO;
const BRANCH = process.env.BRANCH;
const FOLDER_PATH = "foods";
const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER_PATH}`;

// READ all foods
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}?ref=${BRANCH}&nocache=${Date.now()}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'Cache-Control': 'no-cache'
            }
        });

        const files = response.data.filter((file) => file.name.endsWith('.json'));

        const promises = files.map(async (file) => {
            const content = await axios.get(`${file.download_url}?nocache=${Date.now()}`);
            return { filename: file.name, content: content.data };
        });

        const data = await Promise.all(promises);

        res.json({
            nbFoods: data.at(-1).content.id + 1,
            foods: data.map((food) => food.content)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ food
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const myId = Number(id);

        const response = await axios.get(`${GITHUB_API_URL}?ref=${BRANCH}&nocache=${Date.now()}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'Cache-Control': 'no-cache'
            }
        });

        const file = response.data.find((file) => file.name === `${myId}.json`);

        if (!file) {
            return res.status(404).json({ error: 'Food not found' });
        }

        const data = await axios.get(`${file.download_url}?nocache=${Date.now()}`);

        res.json(data.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE food
router.post('/', async (req, res) => {
    try {
        const { id, name, calories, proteins, carbs, fats } = req.body;


        if (!id || !name || !calories || !proteins || !carbs || !fats) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const myId = Number(id);
        const content = JSON.stringify({
            id: myId,
            name,
            calories,
            proteins,
            carbs,
            fats
        }, null, 2);
        const contentBase64 = Buffer.from(content).toString('base64');

        const response = await axios.put(
            `${GITHUB_API_URL}/${id}.json`,
            {
                message: `Create ${id}.json`,
                content: contentBase64,
                branch: BRANCH
            }, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        res.json({
            message: `Food ${id} created`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE food
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const myId = Number(id);
        let fileResponse;
        try {
            fileResponse = await axios.get(`${GITHUB_API_URL}/${myId}.json?ref=${BRANCH}&nocache=${Date.now()}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    'Cache-Control': 'no-cache'
                }
            });
        } catch (error) {
            return res.status(404).json({ error: 'Food not found' });
        }

        const response = await axios.delete(`${GITHUB_API_URL}/${myId}.json`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json'
            },
            data: {
                message: `Delete ${myId}.json`,
                sha: fileResponse.data.sha,
                branch: BRANCH
            }
        });

        res.json({
            message: `Food ${myId} deleted`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;