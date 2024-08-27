import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './app/backend/routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
