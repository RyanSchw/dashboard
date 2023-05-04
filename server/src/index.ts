import express from 'express';

const app = express();
const port = 8080;

app.use('/api/v1', () => {});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
