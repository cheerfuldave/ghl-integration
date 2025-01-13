import { Server } from 'ws';
import { NextApiRequest } from 'next';
import { Server as HTTPServer } from 'http';
import { getGHLContacts, getGHLTasks } from '@/app/(chat)/actions';

export function initWebSocket(server: HTTPServer) {
  const wss = new Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send initial GHL data
    const sendGHLData = async () => {
      try {
        const [contacts, tasks] = await Promise.all([
          getGHLContacts(),
          getGHLTasks()
        ]);

        ws.send(JSON.stringify({ type: 'GHL_UPDATE', data: { contacts, tasks } }));
      } catch (error) {
        console.error('Error fetching GHL data:', error);
      }
    };

    // Send initial data
    sendGHLData();

    // Set up periodic updates
    const interval = setInterval(sendGHLData, 5 * 60 * 1000); // Every 5 minutes

    ws.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });

    ws.on('error', console.error);
  });

  return wss;
}
