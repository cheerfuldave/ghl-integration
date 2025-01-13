
import { GHLAPI } from './ghl-api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GHLAPI', () => {
    let api: GHLAPI;
    const baseUrl = 'https://api.gohighlevel.com/v1';
    const token = 'test-token';

    beforeEach(() => {
        api = new GHLAPI(baseUrl, token);
        jest.clearAllMocks();
    });

    describe('getContacts', () => {
        it('should fetch contacts successfully', async () => {
            const mockContacts = [{ id: 1, name: 'Test Contact' }];
            mockedAxios.get.mockResolvedValueOnce({ data: mockContacts });

            const result = await api.getContacts();
            expect(result).toEqual(mockContacts);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${baseUrl}/contacts`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        });

        it('should handle errors when fetching contacts', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
            await expect(api.getContacts()).rejects.toThrow('Failed to fetch contacts');
        });
    });

    describe('createContact', () => {
        it('should create contact successfully', async () => {
            const mockContact = { name: 'New Contact' };
            const mockResponse = { id: 1, ...mockContact };
            mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

            const result = await api.createContact(mockContact);
            expect(result).toEqual(mockResponse);
            expect(mockedAxios.post).toHaveBeenCalledWith(
                `${baseUrl}/contacts`,
                mockContact,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        });

        it('should handle errors when creating contact', async () => {
            mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));
            await expect(api.createContact({})).rejects.toThrow('Failed to create contact');
        });
    });

    describe('getTasks', () => {
        it('should fetch tasks successfully', async () => {
            const mockTasks = [{ id: 1, title: 'Test Task' }];
            mockedAxios.get.mockResolvedValueOnce({ data: mockTasks });

            const result = await api.getTasks();
            expect(result).toEqual(mockTasks);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${baseUrl}/tasks`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        });

        it('should handle errors when fetching tasks', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
            await expect(api.getTasks()).rejects.toThrow('Failed to fetch tasks');
        });
    });
});
