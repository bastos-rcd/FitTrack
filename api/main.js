import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import food from './routes/food.js';
import program from './routes/program.js';
import workout from './routes/workout.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8080;

app.use('/api/foods', food);
app.use('/api/programs', program);
app.use('/api/workouts', workout);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});