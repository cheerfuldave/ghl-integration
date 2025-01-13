
import { GHLIntegration } from './ghl-integration-class';
import { GHLApi, ProcessMessageResponse } from './types';

jest.mock('openai', () => ({
    OpenAI: jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ message: { content: 'AI response' } }]
                })
            }
        }
    }))
}));

describe('GHLIntegration', () => {
    let mockGhlApi: jest.Mocked<GHLApi>;
    let integration: GHLIntegration;

    beforeEach(() => {
        mockGhlApi = {
            getContacts: jest.fn().mockResolvedValue([]),
            createContact: jest.fn().mockResolvedValue({ status: 'success' }),
            getTasks: jest.fn().mockResolvedValue([])
        };
        integration = new GHLIntegration(mockGhlApi);
    });

    describe('processMessage', () => {
        it('should process a message successfully', async () => {
            const response = await integration.processMessage('test message');
            expect(response.status).toBe('success');
            expect(response.aiResponse).toBeDefined();
        });

        it('should handle empty messages', async () => {
            await expect(integration.processMessage('')).rejects.toThrow('Message cannot be empty');
        });

        it('should handle API errors gracefully', async () => {
            mockGhlApi.getContacts.mockRejectedValueOnce(new Error('API Error'));
            const response = await integration.processMessage('get contacts');
            expect(response.status).toBe('error');
            expect(response.aiResponse).toContain('Error processing message: API Error');
        });
    });

    describe('GHL API Integration', () => {
        it('should get contacts successfully', async () => {
            await integration.processMessage('get contacts');
            expect(mockGhlApi.getContacts).toHaveBeenCalled();
        });

        it('should create contact successfully', async () => {
            await integration.processMessage('create contact John Doe');
            expect(mockGhlApi.createContact).toHaveBeenCalled();
        });

        it('should get tasks successfully', async () => {
            await integration.processMessage('get tasks');
            expect(mockGhlApi.getTasks).toHaveBeenCalled();
        });
    });
});
