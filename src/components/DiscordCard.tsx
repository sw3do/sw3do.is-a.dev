import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LanyardData } from '../types/lanyard';
import { useTranslation } from 'react-i18next';
import { 
  SiDiscord, 
  SiSpotify 
} from 'react-icons/si';
import { 
  FaDesktop, 
  FaMobile, 
  FaGlobe,
  FaGamepad,
  FaMusic,
  FaCode,
  FaVideo,
  FaHeadphones,
  FaCircle
} from 'react-icons/fa';

interface DiscordCardProps {
  data: LanyardData;
  isDarkMode: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return '#3ba55c';
    case 'idle': return '#faa61a';
    case 'dnd': return '#f04747';
    case 'offline': return '#747f8d';
    default: return '#747f8d';
  }
};

const getStatusText = (status: string, t: (key: string) => string) => {
  switch (status) {
    case 'online': return t('discord.status.online');
    case 'idle': return t('discord.status.idle');
    case 'dnd': return t('discord.status.dnd');
    case 'offline': return t('discord.status.offline');
    default: return t('discord.status.unknown');
  }
};

const getActivityIcon = (type: number, name: string) => {
  if (name.toLowerCase().includes('spotify')) return <SiSpotify className="w-4 h-4" />;
  if (name.toLowerCase().includes('visual studio') || name.toLowerCase().includes('code')) return <FaCode className="w-4 h-4" />;
  if (name.toLowerCase().includes('game')) return <FaGamepad className="w-4 h-4" />;
  if (name.toLowerCase().includes('music')) return <FaMusic className="w-4 h-4" />;
  if (name.toLowerCase().includes('video')) return <FaVideo className="w-4 h-4" />;
  
  switch (type) {
    case 0: return <FaGamepad className="w-4 h-4" />; // Playing
    case 1: return <FaVideo className="w-4 h-4" />; // Streaming
    case 2: return <FaHeadphones className="w-4 h-4" />; // Listening
    case 3: return <FaVideo className="w-4 h-4" />; // Watching
    case 5: return <FaGamepad className="w-4 h-4" />; // Competing
    default: return <FaGamepad className="w-4 h-4" />;
  }
};

const formatElapsedTime = (timestamp: number, t: (key: string) => string) => {
  const now = Date.now();
  const elapsed = now - timestamp;
  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}:${(minutes % 60).toString().padStart(2, '0')} ${t('discord.elapsed')}`;
  }
  return `${minutes}:${Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0')} ${t('discord.elapsed')}`;
};



export const DiscordCard: React.FC<DiscordCardProps> = ({ data, isDarkMode }) => {
  const { t } = useTranslation();
  
  const avatarUrl = useMemo(() => {
    if (data.discord_user.avatar) {
      return `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.webp?size=256`;
    }
    return `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discord_user.discriminator) % 5}.png`;
  }, [data.discord_user]);

  const nonSpotifyActivities = useMemo(() => {
    return data.activities.filter(activity => 
      activity.type !== 2 &&
      !activity.name.toLowerCase().includes('spotify')
    );
  }, [data.activities]);

  const mainActivity = useMemo(() => {
    return nonSpotifyActivities[0];
  }, [nonSpotifyActivities]);

  const getActivityImageUrl = (activity: { assets?: { large_image?: string }; application_id?: string }) => {
    if (!activity.assets?.large_image) return null;
    
    if (activity.assets.large_image.startsWith('spotify:')) {
      return activity.assets.large_image.replace('spotify:', 'https://i.scdn.co/image/');
    }
    
    if (activity.application_id) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
    }
    
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto"
    >

      <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#36393f] border border-[#202225]' 
          : 'bg-white border border-gray-200'
      } shadow-xl`}>
        
        <div className="relative h-20 bg-gradient-to-br from-[#5865f2] via-[#7289da] to-[#99aab5] overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>


        <div className="relative px-6 pb-6">

          <div className="relative -mt-12 mb-4">
            <motion.div 
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 rounded-full bg-[#36393f] p-1.5 border-4 border-[#36393f]">
                <Image
                  src={avatarUrl}
                  alt={data.discord_user.username}
                  width={64}
                  height={64}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <div 
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[#36393f] flex items-center justify-center"
                style={{ backgroundColor: getStatusColor(data.discord_status) }}
              >
                <FaCircle className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          </div>


          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {data.discord_user.global_name || data.discord_user.username}
              </h1>
              <SiDiscord className="w-5 h-5 text-[#5865f2]" />
            </div>
            
            <p className={`text-sm ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'} mb-2`}>
              {data.discord_user.username}
            </p>
            
            <div className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getStatusColor(data.discord_status) }}
              />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                {getStatusText(data.discord_status, t)}
              </span>
            </div>
          </div>


          <div className="space-y-4">
            

            {data.listening_to_spotify && data.spotify && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#2f3136] border-[#40444b]' : 'bg-gray-50 border-gray-200'}`}
              >
                <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                  {t('discord.listeningToSpotify')}
                </h3>
                
                <div className="flex gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-lg shadow-lg overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={data.spotify.album_art_url}
                      alt={data.spotify.album}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm mb-1 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {data.spotify.song}
                    </h4>
                    <p className={`text-sm mb-2 truncate ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                      {data.spotify.artist}
                    </p>
                    <div className="flex items-center gap-2">
                      <SiSpotify className="w-4 h-4 text-[#1db954]" />
                      <span className="text-xs text-[#1db954] font-medium">Spotify</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}


            {mainActivity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#2f3136] border-[#40444b]' : 'bg-gray-50 border-gray-200'}`}
              >
                <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                  {t('discord.currentActivity')}
                </h3>
                
                <div className="flex gap-3">
                  {getActivityImageUrl(mainActivity) && (
                    <motion.div
                      className="w-12 h-12 rounded-lg shadow-lg overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={getActivityImageUrl(mainActivity)!}
                        alt="Activity"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </motion.div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getActivityIcon(mainActivity.type, mainActivity.name)}
                      <h4 className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {mainActivity.name}
                      </h4>
                    </div>
                    
                    {mainActivity.details && (
                      <p className={`text-sm mb-1 truncate ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                        {mainActivity.details}
                      </p>
                    )}
                    
                    {mainActivity.state && (
                      <p className={`text-sm mb-1 truncate ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                        {mainActivity.state}
                      </p>
                    )}
                    
                    {mainActivity.timestamps?.start && (
                      <p className={`text-xs ${isDarkMode ? 'text-[#72767d]' : 'text-gray-500'}`}>
                        {formatElapsedTime(mainActivity.timestamps.start, t)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}


            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#2f3136] border-[#40444b]' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${isDarkMode ? 'text-[#b9bbbe]' : 'text-gray-600'}`}>
                {t('discord.connections')}
              </h3>
              <div className="flex gap-2">
                {data.active_on_discord_desktop && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-[#5865f2] rounded-md">
                    <FaDesktop className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-medium">{t('discord.devices.desktop')}</span>
                  </div>
                )}
                {data.active_on_discord_mobile && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-[#5865f2] rounded-md">
                    <FaMobile className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-medium">{t('discord.devices.mobile')}</span>
                  </div>
                )}
                {data.active_on_discord_web && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-[#5865f2] rounded-md">
                    <FaGlobe className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-medium">{t('discord.devices.web')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 