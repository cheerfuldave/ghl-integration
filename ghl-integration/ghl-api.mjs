
export class GHLIntegration {
    constructor() {
        this.apiKey = process.env.PRIVATE_INTEGRATION_API_KEY;
        this.locationId = process.env.GHL_LOCATION_ID;
        this.baseUrl = 'https://services.leadconnectorhq.com';
    }

    async fetchGHLData(endpoint, method = 'GET', data = null) {
        try {
            const separator = endpoint.includes('?') ? '&' : '?';
            const url = `${this.baseUrl}${endpoint}${separator}locationId=${this.locationId}`;
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Version': '2021-07-28',
                    'Content-Type': 'application/json'
                },
                body: data ? JSON.stringify(data) : undefined
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GHL API Error:', error);
            throw error;
        }
    }

    // Contacts
    async getContacts(query = '') {
        const endpoint = query ? `/contacts/search?query=${encodeURIComponent(query)}` : '/contacts';
        return this.fetchGHLData(endpoint);
    }

    async getContactById(contactId) {
        return this.fetchGHLData(`/contacts/${contactId}`);
    }

    async createContact(contactData) {
        return this.fetchGHLData('/contacts', 'POST', contactData);
    }

    async updateContact(contactId, data) {
        return this.fetchGHLData(`/contacts/${contactId}`, 'PUT', data);
    }

    // Tasks
    async getTasks() {
        return this.fetchGHLData('/tasks');
    }

    async createTask(taskData) {
        return this.fetchGHLData('/tasks', 'POST', taskData);
    }

    // Opportunities
    async getOpportunities() {
        return this.fetchGHLData('/opportunities');
    }

    async createOpportunity(opportunityData) {
        return this.fetchGHLData('/opportunities', 'POST', opportunityData);
    }

    // Calendar
    async getCalendarEvents(startDate, endDate) {
        return this.fetchGHLData(`/calendar/events?startDate=${startDate}&endDate=${endDate}`);
    }

    // Custom Values
    async getCustomFields() {
        return this.fetchGHLData('/custom-fields');
    }

    // Tags
    async getTags() {
        return this.fetchGHLData('/tags');
    }

    // Users
    async getUsers() {
        return this.fetchGHLData('/users');
    }
}
