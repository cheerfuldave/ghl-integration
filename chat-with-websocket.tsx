
import React, { useState } from 'react';
import { useWebSocket } from './use-ghl-websocket';
import { Message } from './types';

export const ChatWithWebSocket: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const ws = useWebSocket('ws://localhost:8080');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { user: 'User', text: input }]);

        if (ws) {
            ws.send(JSON.stringify({ type: 'message', payload: input }));
        }

        setInput('');
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.user.toLowerCase()}`}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};
