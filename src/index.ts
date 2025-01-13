
import express, { Request, Response } from 'express';
import { ProcessMessageResponse } from './types';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/webhook', async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const response: ProcessMessageResponse = {
            success: true,
            message: 'Webhook received',
            status: 'processed',
            aiResponse: `Processed: ${message}`
        };
        res.json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'healthy' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
