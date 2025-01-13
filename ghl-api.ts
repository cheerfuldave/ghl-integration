
import axios from 'axios';
import { GHLApi } from './types';

export class GHLAPI implements GHLApi {
    private baseUrl: string;
    private token: string;

    constructor(baseUrl: string, token: string) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    async getContacts() {
        try {
            const response = await axios.get(`${this.baseUrl}/contacts`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            return response.data;
        } catch (error) {
            console.error('GHL API Error:', error);
            throw new Error('Failed to fetch contacts');
        }
    }

    async createContact(contact: any) {
        try {
            const response = await axios.post(`${this.baseUrl}/contacts`, contact, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            return response.data;
        } catch (error) {
            console.error('GHL API Error:', error);
            throw new Error('Failed to create contact');
        }
    }

    async getTasks() {
        try {
            const response = await axios.get(`${this.baseUrl}/tasks`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            return response.data;
        } catch (error) {
            console.error('GHL API Error:', error);
            throw new Error('Failed to fetch tasks');
        }
    }
}
