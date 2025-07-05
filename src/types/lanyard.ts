export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify?: SpotifyData;
  kv: Record<string, string>;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  emoji?: {
    id?: string;
    name: string;
    animated?: boolean;
  };
  party?: {
    id?: string;
    size?: [number, number];
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  secrets?: {
    join?: string;
    spectate?: string;
    match?: string;
  };
  instance?: boolean;
  flags?: number;
  buttons?: string[];
  created_at: number;
  application_id?: string;
  url?: string;
}

export interface SpotifyData {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardWebsocketMessage {
  op: number;
  d: LanyardData | null;
  t: string | null;
}

export interface LanyardHeartbeat {
  op: 3;
}

export interface LanyardSubscribe {
  op: 2;
  d: {
    subscribe_to_id: string;
  };
} 