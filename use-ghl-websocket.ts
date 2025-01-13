
import { useRef, useEffect } from 'react';
import { WebSocketMessage } from './types';

export const useWebSocket = (url: string) => {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onmessage = (event: MessageEvent) => {
            const message: WebSocketMessage = JSON.parse(event.data);
            console.log('Received message:', message);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url]);

    return ws.current;
};
