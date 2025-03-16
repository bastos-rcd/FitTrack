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
const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FOLDER_PATH}?ref=${BRANCH}`;

// GET all foods
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(GITHUB_API_URL, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        const files = response.data.filter((file) => file.name.endsWith('.json'));

        const promises = files.map(async (file) => {
            const content = await axios.get(file.download_url);
            return { filename: file.name, content: content.data };
        });

        const data = await Promise.all(promises);

        res.json({
            foods: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

export default router;