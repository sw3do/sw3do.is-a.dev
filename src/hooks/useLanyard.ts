import { useState, useEffect, useRef, useCallback } from 'react';
import { LanyardData, LanyardWebsocketMessage, LanyardHeartbeat, LanyardSubscribe } from '../types/lanyard';

export const useLanyard = (userId: string) => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connectWebSocket = useCallback(() => {
    if (!userId || reconnectAttemptsRef.current >= maxReconnectAttempts) return;

    try {
      const ws = new WebSocket('wss://api.lanyard.rest/socket');
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
        
        const subscribeMessage: LanyardSubscribe = {
          op: 2,
          d: {
            subscribe_to_id: userId
          }
        };
        ws.send(JSON.stringify(subscribeMessage));
      };

        ws.onmessage = (event) => {
          try {
            const message: LanyardWebsocketMessage = JSON.parse(event.data);
            
            switch (message.op) {
              case 1:
                const heartbeatInterval = message.d as unknown as { heartbeat_interval: number };
                if (heartbeatRef.current) {
                  clearInterval(heartbeatRef.current);
                }
                heartbeatRef.current = setInterval(() => {
                  const heartbeat: LanyardHeartbeat = { op: 3 };
                  ws.send(JSON.stringify(heartbeat));
                }, heartbeatInterval.heartbeat_interval);
                break;
                
              case 0:
                if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
                  setData(message.d);
                }
                break;
                
              default:
                break;
            }
          } catch (err) {
            console.error('Error parsing websocket message:', err);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          if (heartbeatRef.current) {
            clearInterval(heartbeatRef.current);
            heartbeatRef.current = null;
          }
          
          reconnectAttemptsRef.current += 1;
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
            reconnectTimeoutRef.current = setTimeout(connectWebSocket, delay);
          }
        };

        ws.onerror = () => {
          setError('WebSocket connection error');
          setIsConnected(false);
        };

      } catch {
        setError('Failed to connect to Lanyard API');
        setIsConnected(false);
      }
    }, [userId, maxReconnectAttempts]);

  useEffect(() => {
    if (!userId) return;

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [userId, connectWebSocket]);

  return { data, isConnected, error };
};