
import express from 'express';
import { Router } from 'express';

const router = Router();

interface FeedbackData {
    component: string;
    performance: number;
    issues: string[];
    suggestions: string;
    timestamp: Date;
}

const feedbackStore: FeedbackData[] = [];

router.post('/feedback', (req, res) => {
    const feedback: FeedbackData = {
        ...req.body,
        timestamp: new Date()
    };
    
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

export default router;
