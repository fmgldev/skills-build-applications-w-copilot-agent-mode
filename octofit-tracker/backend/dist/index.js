import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', database: 'octofit_db' });
});
app.use('/api', apiRouter);
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: 'Unable to process request' });
});
connectDatabase().finally(() => {
    app.listen(port, () => {
        console.log(`OctoFit API listening on port ${port}`);
    });
});
export default app;
