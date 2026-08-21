'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Circle, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Lesson {
  title: string;
  duration: string;
  content?: string;
  videoUrl?: string;
}

interface CoursePlayerProps {
  courseId: string;
  courseTitle: string;
  lessons: Lesson[];
  onClose: () => void;
}

export function CoursePlayer({ courseId, courseTitle, lessons, onClose }: CoursePlayerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`course-${courseId}-progress`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedLessons(data.completed || []);
        setCurrentLessonIndex(data.current || 0);
      } catch (e) {}
    }
    setIsLoading(false);
  }, [courseId]);

  // Simpan progress ke localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(`course-${courseId}-progress`, JSON.stringify({
        completed: completedLessons,
        current: currentLessonIndex,
        lastUpdated: new Date().toISOString()
      }));
    }
  }, [completedLessons, currentLessonIndex, courseId, isLoading]);

  const currentLesson = lessons[currentLessonIndex];
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const handleNext = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setIsPlaying(false);
    }
  };

  const toggleComplete = () => {
    if (completedLessons.includes(currentLessonIndex)) {
      setCompletedLessons(completedLessons.filter(i => i !== currentLessonIndex));
    } else {
      setCompletedLessons([...completedLessons, currentLessonIndex]);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="text-[#39FF88] animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#080A0D] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#0D1117]">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <X size={20} className="text-text-muted" />
          </button>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-text-primary truncate">{courseTitle}</h2>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{currentLessonIndex + 1} of {totalLessons} lessons</span>
              <span>•</span>
              <span>{progressPercent}% complete</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-text-muted">
            <Award size={14} className="inline mr-1 text-[#F5A623]" />
            {completedCount}/{totalLessons}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-[rgba(255,255,255,0.05)]">
        <div 
          className="h-full bg-[#39FF88] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLessonIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Lesson Content */}
              <div className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-text-muted">Lesson {currentLessonIndex + 1}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-text-primary mt-1">
                      {currentLesson.title}
                    </h3>
                  </div>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock size={14} />
                    {currentLesson.duration}
                  </span>
                </div>

                {/* Video Player Placeholder */}
                <div className="relative aspect-video bg-[#121820] rounded-xl overflow-hidden mb-4">
                  {currentLesson.videoUrl ? (
                    <video 
                      src={currentLesson.videoUrl} 
                      className="w-full h-full object-cover"
                      controls
                      autoPlay={isPlaying}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen size={48} className="mx-auto text-text-muted/30" />
                        <p className="mt-2 text-sm text-text-muted">Lesson content coming soon</p>
                        <p className="text-xs text-text-muted/60">This is a preview of the lesson content</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lesson Description */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-text-secondary text-sm">
                    {currentLesson.content || `This lesson covers "${currentLesson.title}". Click "Mark as Complete" when you've finished.`}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={toggleComplete}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      completedLessons.includes(currentLessonIndex)
                        ? 'bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/20'
                        : 'bg-white/5 text-text-secondary hover:bg-white/10'
                    }`}
                  >
                    {completedLessons.includes(currentLessonIndex) ? (
                      <>
                        <CheckCircle size={16} />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle size={16} />
                        Mark as Complete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-[rgba(255,255,255,0.08)] p-4 bg-[#0D1117]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="secondary"
            size="md"
            onClick={handlePrev}
            disabled={currentLessonIndex === 0}
            className="gap-2"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <div className="text-xs text-text-muted">
            {currentLessonIndex + 1} / {totalLessons}
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            disabled={currentLessonIndex === totalLessons - 1}
            className="gap-2"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
