import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './app/backend/routes/userRoutes.js';
import authRoutes from './app/backend/routes/authRoutes.js';
import diagramRoutes from './app/backend/routes/diagramRoutes.js';

import { authMiddleware } from './firebase/index.js';
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/diagrams', diagramRoutes);

app.get('/test', (req, res) => {
    console.log("Test route accessed");
    res.send('Hello World!');
});

app.get('/api/current-user', authMiddleware, (req, res) => {
    res.status(200).send({
        'message': 'User information retrieved successfully',
        'user': req.user
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
