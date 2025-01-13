
import { GHLIntegration } from './ghl-integration-class';
import { GHLApi } from './types';

describe('GHLIntegration', () => {
    let mockGhlApi: jest.Mocked<GHLApi>;

    beforeEach(() => {
        mockGhlApi = {
            getContacts: jest.fn(),
            createContact: jest.fn(),
            getTasks: jest.fn()
        };
    });

    it('should process messages correctly', async () => {
        const integration = new GHLIntegration(mockGhlApi);
        const response = await integration.processMessage('test message');
        expect(response).toBeDefined();
    });
});
