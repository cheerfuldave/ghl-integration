"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.post('/webhook', async (req, res) => {
    try {
        const { message } = req.body;
        const response = {
            success: true,
            message: 'Webhook received',
            status: 'processed',
            aiResponse: `Processed: ${message}`
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
exports.default = app;
