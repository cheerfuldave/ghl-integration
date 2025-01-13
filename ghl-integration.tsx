'use client';

import { useCallback, useEffect, useState } from 'react';
import { getGHLContacts, getGHLTasks, generateMessageWithGHLContext } from '@/app/(chat)/actions';

interface GHLData {
  contacts?: any[];
  tasks?: any[];
  error?: string;
}

export function GHLIntegration({ onContextUpdate }: { onContextUpdate: (context: any) => void }) {
  const [ghlData, setGHLData] = useState<GHLData>({});

  const fetchGHLData = useCallback(async () => {
    try {
      const [contacts, tasks] = await Promise.all([
        getGHLContacts(),
        getGHLTasks()
      ]);

      setGHLData({ contacts, tasks });
      onContextUpdate({ contacts, tasks });
    } catch (error) {
      setGHLData({ error: 'Failed to fetch GHL data' });
    }
  }, [onContextUpdate]);

  useEffect(() => {
    fetchGHLData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchGHLData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchGHLData]);

  return null; // This is a headless component
}
