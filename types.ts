
export interface GHLApi {
    getContacts(): Promise<any[]>;
    createContact(contact: any): Promise<any>;
    getTasks(): Promise<any[]>;
}

export interface Message {
    user: string;
    text: string;
}

export interface GHLResponse {
    status: string;
    data?: any;
}

export interface ProcessMessageResponse {
    aiResponse: string;
    status: string;
}

export enum VisibilityType {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PROTECTED = 'protected'
}

export interface WebSocketMessage {
    type: string;
    payload: any;
}
