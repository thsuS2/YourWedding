import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabase';

/**
 * 메시지 테이블명 — 동일 Supabase 프로젝트에서 테이블만 분리
 * Vercel/.env: VITE_SUPABASE_MESSAGES_TABLE=messages_your_wedding
 */
const getMessagesTable = () =>
  import.meta.env.VITE_SUPABASE_MESSAGES_TABLE?.trim() || 'message';

export const useMessages = () => {
  const table = useMemo(() => getMessagesTable(), []);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!isSupabaseAvailable()) {
      setLoading(false);
      return;
    }

    try {
      const { data, error: qError } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (qError) throw qError;
      setMessages(data || []);
      setError(null);
    } catch (err) {
      console.error('메시지 가져오기 실패:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table]);

  const addMessage = useCallback(
    async (messageData) => {
      if (!isSupabaseAvailable()) {
        throw new Error('Supabase가 설정되지 않았습니다.');
      }

      try {
        const { data, error: insError } = await supabase
          .from(table)
          .insert([messageData])
          .select()
          .single();

        if (insError) throw insError;

        setMessages((prev) => {
          if (data?.id != null && prev.some((m) => m.id === data.id)) return prev;
          return [data, ...prev];
        });
        return data;
      } catch (err) {
        console.error('메시지 추가 실패:', err);
        throw err;
      }
    },
    [table]
  );

  useEffect(() => {
    fetchMessages();

    if (!isSupabaseAvailable()) return;

    const channelName = `messages_rt_${table.replace(/[^a-zA-Z0-9_]/g, '_')}`;
    const subscription = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table,
        },
        (payload) => {
          const row = payload.new;
          console.log('새 메시지:', row);
          setMessages((prev) => {
            if (row?.id != null && prev.some((m) => m.id === row.id)) return prev;
            return [row, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchMessages, table]);

  return {
    messages,
    loading,
    error,
    addMessage,
    fetchMessages,
  };
};
