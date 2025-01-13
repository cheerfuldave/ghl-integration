
import React, { useState } from 'react';
import { GHLIntegration } from './ghl-integration-class';
import { GHLApi, Message } from './types';

export const ChatWithGHL: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([] as Message[]);
    const [input, setInput] = useState<string>('');

    const mockGhlApi: GHLApi = {
        getContacts: async () => [],
        createContact: async () => ({ status: 'success' }),
        getTasks: async () => []
    };

    const ghlIntegration = new GHLIntegration(mockGhlApi);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages((prev: Message[]) => [...prev, { user: 'User', text: input }]);

        try {
            const response = await ghlIntegration.processMessage(input);
            setMessages((prev: Message[]) => [...prev, { user: 'AI', text: response.aiResponse }]);
        } catch (error) {
            setMessages((prev: Message[]) => [...prev, { user: 'System', text: 'Error processing message' }]);
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
