
    export interface GHLIntegrationConfig {
        apiKey: string;
        locationId: string;
        apiUrl: string;
    }

    export interface GHLResponse {
        success: boolean;
        data?: any;
        error?: string;
    }

    export interface WebhookPayload {
        event: string;
        data: any;
    }

    export interface GHLApi {
        processMessage(message: string): Promise<ProcessMessageResponse>;
        getContacts(): Promise<any[]>;
        createContact(contact: any): Promise<{ status: string }>;
        getTasks(): Promise<any[]>;
    }

    export interface ProcessMessageResponse {
        success: boolean;
        message?: string;
        error?: string;
        status?: string;
        aiResponse?: string;
    }
    