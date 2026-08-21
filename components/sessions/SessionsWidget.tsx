'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Timer,
  Globe,
  TrendingUp,
  Activity,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  RefreshCw,
  Smartphone,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Session {
  name: string;
  city: string;
  timezone: string;
  openUTC: string;
  closeUTC: string;
  openLocal: string;
  closeLocal: string;
  status: 'OPEN' | 'CLOSED' | 'UPCOMING';
  color: string;
  flag: string;
  volume: 'High' | 'Medium' | 'Low';
}

const SESSION_CONFIG: Omit<Session, 'status' | 'openLocal' | 'closeLocal'>[] = [
  { 
    name: 'Sydney', 
    city: 'Sydney', 
    timezone: 'Australia/Sydney', 
    openUTC: '22:00', 
    closeUTC: '07:00',
    color: '#39FF88',
    flag: '🇦🇺',
    volume: 'Low'
  },
  { 
    name: 'Tokyo', 
    city: 'Tokyo', 
    timezone: 'Asia/Tokyo', 
    openUTC: '00:00', 
    closeUTC: '09:00',
    color: '#F5A623',
    flag: '🇯🇵',
    volume: 'Medium'
  },
  { 
    name: 'London', 
    city: 'London', 
    timezone: 'Europe/London', 
    openUTC: '08:00', 
    closeUTC: '17:00',
    color: '#4A90D9',
    flag: '🇬🇧',
    volume: 'High'
  },
  { 
    name: 'New York', 
    city: 'New York', 
    timezone: 'America/New_York', 
    openUTC: '13:00', 
    closeUTC: '22:00',
    color: '#FF4D5F',
    flag: '🇺🇸',
    volume: 'High'
  },
];

function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function addOffsetToTime(utcTime: string, offsetHours: number): string {
  const minutes = parseTimeToMinutes(utcTime);
  const newMinutes = (minutes + offsetHours * 60 + 1440) % 1440;
  return minutesToTime(newMinutes);
}

function getSessionStatus(session: any, currentUTCMinutes: number): 'OPEN' | 'CLOSED' | 'UPCOMING' {
  const openMinutes = parseTimeToMinutes(session.openUTC);
  const closeMinutes = parseTimeToMinutes(session.closeUTC);
  
  if (openMinutes > closeMinutes) {
    if (currentUTCMinutes >= openMinutes || currentUTCMinutes < closeMinutes) {
      return 'OPEN';
    }
    if (currentUTCMinutes >= closeMinutes && currentUTCMinutes < openMinutes) {
      return 'UPCOMING';
    }
  } else {
    if (currentUTCMinutes >= openMinutes && currentUTCMinutes < closeMinutes) {
      return 'OPEN';
    }
    if (currentUTCMinutes < openMinutes) {
      return 'UPCOMING';
    }
  }
  
  return 'CLOSED';
}

export function SessionsWidget() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userTimezone, setUserTimezone] = useState<string>('');
  const [userOffset, setUserOffset] = useState<number>(0);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const offset = -new Date().getTimezoneOffset() / 60;
    setUserOffset(offset);
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    const utc = new Date();
    const currentUTCMinutes = utc.getUTCHours() * 60 + utc.getUTCMinutes();
    
    const updatedSessions = SESSION_CONFIG.map(session => {
      const status = getSessionStatus(session, currentUTCMinutes);
      const openLocal = addOffsetToTime(session.openUTC, userOffset);
      const closeLocal = addOffsetToTime(session.closeUTC, userOffset);
      return { ...session, status, openLocal, closeLocal };
    });
    
    setSessions(updatedSessions);
  }, [currentTime, userOffset, isClient]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setCurrentTime(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const openSessions = sessions.filter(s => s.status === 'OPEN').length;
  const nextSession = sessions.find(s => s.status === 'UPCOMING');
  const activeSessions = sessions.filter(s => s.status === 'OPEN');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN': return { label: '● Open', color: 'text-[#39FF88] bg-[#39FF88]/10 border-[#39FF88]/20' };
      case 'CLOSED': return { label: '● Closed', color: 'text-[#FF4D5F] bg-[#FF4D5F]/10 border-[#FF4D5F]/20' };
      default: return { label: '● Upcoming', color: 'text-[#F5A623] bg-[#F5A623]/10 border-[#F5A623]/20' };
    }
  };

  const getVolumeBadge = (volume: string) => {
    switch (volume) {
      case 'High': return { label: 'High', color: 'bg-[#39FF88]/20 text-[#39FF88]' };
      case 'Medium': return { label: 'Medium', color: 'bg-[#F5A623]/20 text-[#F5A623]' };
      default: return { label: 'Low', color: 'bg-[#4B5563]/20 text-[#4B5563]' };
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatLocalTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  };

  const getTimeIcon = (hour: number) => {
    if (hour >= 5 && hour < 12) return <Sunrise size={14} className="text-[#F5A623]" />;
    if (hour >= 12 && hour < 18) return <Sun size={14} className="text-[#F5A623]" />;
    if (hour >= 18 && hour < 21) return <Sunset size={14} className="text-[#FF4D5F]" />;
    return <Moon size={14} className="text-[#4A90D9]" />;
  };

  const getTradingRecommendation = () => {
    const activeNames = activeSessions.map(s => s.name);
    const isLondonOpen = activeNames.includes('London');
    const isNYOpen = activeNames.includes('New York');
    const isTokyoOpen = activeNames.includes('Tokyo');
    const isSydneyOpen = activeNames.includes('Sydney');

    if (isLondonOpen && isNYOpen) {
      return { level: '🔥 High', text: 'London & New York overlap - Best volatility for EUR/USD, GBP/USD', color: 'text-[#39FF88]' };
    }
    if (isLondonOpen) {
      return { level: '⚡ Medium', text: 'London session - Good for EUR/USD, GBP/USD, USD/JPY', color: 'text-[#F5A623]' };
    }
    if (isNYOpen) {
      return { level: '⚡ Medium', text: 'New York session - Good for USD pairs and XAUUSD', color: 'text-[#F5A623]' };
    }
    if (isTokyoOpen) {
      return { level: '💤 Low', text: 'Tokyo session - Range-bound, good for USD/JPY, AUD/USD', color: 'text-[#4B5563]' };
    }
    if (isSydneyOpen) {
      return { level: '💤 Low', text: 'Sydney session - Quiet, range-bound movements', color: 'text-[#4B5563]' };
    }
    return { level: '⏳ Waiting', text: 'Market is closed. Next session: ' + (nextSession?.name || '—'), color: 'text-[#4B5563]' };
  };

  const recommendation = getTradingRecommendation();

  if (!isClient) {
    return (
      <div className="flex items-center justify-center py-12 bg-[#0D1117] rounded-2xl border border-[rgba(255,255,255,0.08)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-[#39FF88]/30 border-t-[#39FF88] rounded-full animate-spin" />
          <span className="text-sm text-[#8B949E]">Detecting your timezone...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="mb-4 md:mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-3 md:p-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-text-muted">
          <Smartphone size={16} className="text-accent-bullish" />
          <span>Your Timezone: <span className="text-text-primary font-medium">{userTimezone}</span></span>
          <span className="text-text-muted">(UTC{userOffset >= 0 ? '+' : ''}{userOffset})</span>
          <span className="hidden md:inline-flex items-center gap-1 text-text-muted">
            <Clock size={14} />
            {formatLocalTime(currentTime)}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
        >
          <RefreshCw size={14} className={`text-text-muted ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-3 md:p-4 text-center">
          <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider">Open Sessions</p>
          <p className="text-2xl md:text-3xl font-bold text-[#39FF88]">{openSessions}</p>
        </div>
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-3 md:p-4 text-center">
          <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider">Next Session</p>
          <p className="text-lg md:text-xl font-bold text-[#F5A623] truncate">{nextSession?.name || '—'}</p>
        </div>
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-3 md:p-4 text-center">
          <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider">UTC Time</p>
          <p className="text-sm md:text-xl font-mono font-bold text-text-primary">{formatTime(currentTime)}</p>
        </div>
        <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-3 md:p-4 text-center">
          <p className="text-[10px] md:text-xs text-text-muted uppercase tracking-wider">Liquidity</p>
          <p className={`text-sm md:text-xl font-bold ${recommendation.color}`}>{recommendation.level}</p>
        </div>
      </div>

      {/* Session Table - Clean & Modern */}
      <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-[#121820] border-b border-[rgba(255,255,255,0.05)] text-xs text-text-muted uppercase tracking-wider">
          <div className="col-span-2">Session</div>
          <div className="col-span-2">UTC Open</div>
          <div className="col-span-2">UTC Close</div>
          <div className="col-span-2">Local Open</div>
          <div className="col-span-2">Local Close</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Volume</div>
        </div>

        {/* Table Rows */}
        {sessions.map((session) => {
          const statusBadge = getStatusBadge(session.status);
          const volumeBadge = getVolumeBadge(session.volume);
          const isExpanded = expandedSession === session.name;

          return (
            <div
              key={session.name}
              className={`border-b border-[rgba(255,255,255,0.05)] last:border-0 transition-all duration-300 ${
                session.status === 'OPEN' ? 'bg-[#39FF88]/5' : ''
              }`}
            >
              {/* Main Row - Click to expand */}
              <div 
                className="grid grid-cols-2 md:grid-cols-12 gap-2 px-3 md:px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedSession(isExpanded ? null : session.name)}
              >
                {/* Session Name */}
                <div className="col-span-2 flex items-center gap-2 min-w-0">
                  <span className="text-lg flex-shrink-0">{session.flag}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-text-primary text-sm md:text-base truncate">{session.name}</p>
                    <p className="text-[10px] md:text-xs text-text-muted truncate">{session.city}</p>
                  </div>
                </div>

                {/* Desktop Columns */}
                <div className="hidden md:flex col-span-2 items-center font-mono text-sm text-text-primary">{session.openUTC}</div>
                <div className="hidden md:flex col-span-2 items-center font-mono text-sm text-text-primary">{session.closeUTC}</div>
                <div className="hidden md:flex col-span-2 items-center font-mono text-sm text-accent-bullish">{session.openLocal}</div>
                <div className="hidden md:flex col-span-2 items-center font-mono text-sm text-accent-bullish">{session.closeLocal}</div>
                
                {/* Status Badge */}
                <div className="col-span-2 md:col-span-1 flex items-center justify-start md:justify-center">
                  <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full border ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>
                </div>

                {/* Volume Badge */}
                <div className="hidden md:flex col-span-1 items-center justify-center">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${volumeBadge.color}`}>
                    {volumeBadge.label}
                  </span>
                </div>

                {/* Mobile Expand Icon */}
                <div className="md:hidden flex items-center justify-end col-span-1">
                  {isExpanded ? (
                    <ChevronUp size={18} className="text-text-muted" />
                  ) : (
                    <ChevronDown size={18} className="text-text-muted" />
                  )}
                </div>
              </div>

              {/* Mobile Expanded Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden px-3 pb-3 pt-1 border-t border-[rgba(255,255,255,0.05)]"
                  >
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#121820] rounded-lg p-2 text-center">
                        <p className="text-text-muted">UTC Open</p>
                        <p className="font-mono font-bold text-text-primary">{session.openUTC}</p>
                      </div>
                      <div className="bg-[#121820] rounded-lg p-2 text-center">
                        <p className="text-text-muted">UTC Close</p>
                        <p className="font-mono font-bold text-text-primary">{session.closeUTC}</p>
                      </div>
                      <div className="bg-[#121820] rounded-lg p-2 text-center">
                        <p className="text-text-muted">Local Open</p>
                        <p className="font-mono font-bold text-accent-bullish">{session.openLocal}</p>
                      </div>
                      <div className="bg-[#121820] rounded-lg p-2 text-center">
                        <p className="text-text-muted">Local Close</p>
                        <p className="font-mono font-bold text-accent-bullish">{session.closeLocal}</p>
                      </div>
                      <div className="col-span-2 bg-[#121820] rounded-lg p-2 text-center">
                        <p className="text-text-muted">Volume</p>
                        <p className={`font-bold ${volumeBadge.color}`}>{volumeBadge.label}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Indicator */}
              <div className="h-0.5 bg-[rgba(255,255,255,0.03)] overflow-hidden">
                <motion.div
                  className={`h-full ${
                    session.status === 'OPEN' ? 'bg-[#39FF88]' :
                    session.status === 'UPCOMING' ? 'bg-[#F5A623]' :
                    'bg-[#4B5563]'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: session.status === 'OPEN' ? '100%' : 
                           session.status === 'UPCOMING' ? '40%' : '0%'
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div className="mt-4 md:mt-6 bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-3 md:p-4">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-accent-bullish" />
          <h4 className="text-sm font-semibold text-text-primary">Trading Recommendation</h4>
          <span className="text-[10px] text-text-muted ml-auto">Based on your local time</span>
        </div>
        <div className={`text-xs md:text-sm ${recommendation.color}`}>
          {recommendation.text}
        </div>
        {activeSessions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {activeSessions.map(s => (
              <span key={s.name} className="text-[10px] bg-[#121820] px-2 py-0.5 rounded-full text-text-muted border border-[rgba(255,255,255,0.05)]">
                {s.flag} {s.name} ({s.openLocal}-{s.closeLocal})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
