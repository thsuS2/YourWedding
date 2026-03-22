import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabase';

/**
 * Supabase 연동 Hook
 * 
 * 기능:
 * - 축하 메시지 목록 가져오기 (실시간 구독)
 * - 새 메시지 작성
 * - 관계별 필터링
 */

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 메시지 목록 가져오기
  const fetchMessages = useCallback(async () => {
    if (!isSupabaseAvailable()) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
      setError(null);
    } catch (err) {
      console.error('메시지 가져오기 실패:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 새 메시지 추가
  const addMessage = useCallback(async (messageData) => {
    if (!isSupabaseAvailable()) {
      throw new Error('Supabase가 설정되지 않았습니다.');
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;
      
      // 로컬 상태 업데이트
      setMessages(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('메시지 추가 실패:', err);
      throw err;
    }
  }, []);

  // 실시간 구독 설정
  useEffect(() => {
    fetchMessages();

    if (!isSupabaseAvailable()) return;

    // 실시간 변경사항 구독
    const subscription = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          console.log('새 메시지:', payload.new);
          setMessages(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // 클린업
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    addMessage,
    fetchMessages,
  };
};

