import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { GHLIntegration } from './ghl-api';

// Initialize OpenAI configuration
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Initialize GHL API
const ghl = new GHLIntegration();

export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Enhanced GHL command detection
  const ghlCommands = {
    contacts: ['search contact', 'find contact', 'list contacts', 'create contact', 'update contact'],
    tasks: ['show tasks', 'list tasks', 'create task', 'pending tasks'],
    opportunities: ['show opportunities', 'list opportunities', 'create opportunity'],
    calendar: ['show calendar', 'list events', 'schedule'],
    tags: ['show tags', 'list tags'],
    users: ['show users', 'list users']
  };

  // Check if message contains any GHL commands
  const isGHLCommand = Object.values(ghlCommands).flat().some(cmd => lastMessage.includes(cmd));

  if (isGHLCommand) {
    try {
      let ghlResponse;
      
      // Handle different GHL commands
      if (lastMessage.includes('search contact') || lastMessage.includes('find contact')) {
        const searchTerm = lastMessage.split(/search contact|find contact/)[1].trim();
        ghlResponse = await ghl.getContacts(searchTerm);
      } else if (lastMessage.includes('list contacts')) {
        ghlResponse = await ghl.getContacts();
      } else if (lastMessage.includes('show tasks') || lastMessage.includes('list tasks')) {
        ghlResponse = await ghl.getTasks();
      } else if (lastMessage.includes('show opportunities')) {
        ghlResponse = await ghl.getOpportunities();
      }
      
      // Add GHL response to messages
      messages.push({
        role: 'assistant',
        content: JSON.stringify(ghlResponse, null, 2)
      });
    } catch (error) {
      messages.push({
        role: 'assistant',
        content: `Error executing GHL command: ${error.message}`
      });
    }
  }

  // Process with OpenAI
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant for GoHighLevel users. You can help with:
        - Managing contacts and leads
        - Creating and tracking tasks
        - Managing opportunities
        - Scheduling calendar events
        - Working with tags and custom fields
        - Managing users and permissions`
      },
      ...messages
    ],
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
