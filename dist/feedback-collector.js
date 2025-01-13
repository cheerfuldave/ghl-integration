"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const feedbackStore = [];
router.post('/feedback', (req, res) => {
    const feedback = Object.assign(Object.assign({}, req.body), { timestamp: new Date() });
    feedbackStore.push(feedback);
    console.log(`Received feedback for ${feedback.component}`);
    res.status(201).json({
        message: 'Feedback received',
        id: feedbackStore.length
    });
});
router.get('/feedback/summary', (req, res) => {
    const summary = {
        totalFeedback: feedbackStore.length,
        averagePerformance: feedbackStore.reduce((acc, curr) => acc + curr.performance, 0) / feedbackStore.length,
        commonIssues: Array.from(new Set(feedbackStore.flatMap(f => f.issues))),
        recentFeedback: feedbackStore.slice(-5)
    };
    res.json(summary);
});
exports.default = router;
