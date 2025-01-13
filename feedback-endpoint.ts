
import express from 'express';
import { Router } from 'express';

const router = Router();

interface FeedbackData {
    component: string;
    performance: number;
    issues: string[];
    suggestions: string;
}

const feedbackStore: FeedbackData[] = [];

router.post('/feedback', (req, res) => {
    const feedback: FeedbackData = req.body;
    feedbackStore.push(feedback);
    res.status(201).json({ message: 'Feedback received', id: feedbackStore.length });
});

router.get('/feedback/summary', (req, res) => {
    const summary = {
        totalFeedback: feedbackStore.length,
        averagePerformance: feedbackStore.reduce((acc, curr) => acc + curr.performance, 0) / feedbackStore.length,
        commonIssues: Array.from(new Set(feedbackStore.flatMap(f => f.issues)))
    };
    res.json(summary);
});

export default router;
