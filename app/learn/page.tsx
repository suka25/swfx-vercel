'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Shield, 
  Brain, 
  Activity, 
  LineChart,
  Play,
  FileText,
  Clock,
  Star,
  ArrowRight,
  Users
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  icon: any;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  duration: string;
  rating?: number;
  students?: number;
}

export default function LearnPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Forex Basics',
      description: 'Learn the fundamentals of forex trading, currency pairs, and market structure.',
      icon: BookOpen,
      level: 'Beginner',
      lessons: 12,
      duration: '4h 30m',
      rating: 4.8,
      students: 1247
    },
    {
      id: '2',
      title: 'Technical Analysis',
      description: 'Master chart patterns, indicators, and price action strategies.',
      icon: TrendingUp,
      level: 'Intermediate',
      lessons: 18,
      duration: '6h 15m',
      rating: 4.9,
      students: 856
    },
    {
      id: '3',
      title: 'Risk Management',
      description: 'Learn position sizing, stop-loss strategies, and portfolio protection.',
      icon: Shield,
      level: 'Intermediate',
      lessons: 10,
      duration: '3h 45m',
      rating: 4.7,
      students: 623
    },
    {
      id: '4',
      title: 'Trading Psychology',
      description: 'Master your emotions, develop discipline, and build a winning mindset.',
      icon: Brain,
      level: 'Advanced',
      lessons: 8,
      duration: '2h 30m',
      rating: 4.9,
      students: 423
    },
    {
      id: '5',
      title: 'Market Structure',
      description: 'Understand market phases, trends, and key levels.',
      icon: Activity,
      level: 'Beginner',
      lessons: 10,
      duration: '3h 20m',
      rating: 4.6,
      students: 789
    },
    {
      id: '6',
      title: 'Fibonacci Trading',
      description: 'Use Fibonacci retracement and extensions for precise entries.',
      icon: LineChart,
      level: 'Advanced',
      lessons: 9,
      duration: '3h 00m',
      rating: 4.8,
      students: 345
    },
  ];

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.level === activeFilter);

  const handleLearnMore = (courseId: string) => {
    router.push(`/learn/${courseId}`);
  };

  const levelColors = {
    Beginner: 'bg-[#39FF88]/20 text-[#39FF88] border-[#39FF88]/20',
    Intermediate: 'bg-[#F5A623]/20 text-[#F5A623] border-[#F5A623]/20',
    Advanced: 'bg-[#FF4D5F]/20 text-[#FF4D5F] border-[#FF4D5F]/20'
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        <Section background="primary" padding="md" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[500px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#39FF88]/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <ScrollReveal direction="up">
              <div className="text-center max-w-3xl mx-auto py-8 md:py-12">
                <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase">
                  Education
                </span>
                <Heading as="h1" className="mt-2 text-3xl md:text-5xl">
                  Learn the Why
                </Heading>
                <Text className="mt-3 text-text-secondary text-sm md:text-base">
                  Don&apos;t just follow the trade. Understand the reason behind it.
                </Text>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
              <Card variant="elevated" className="p-3 md:p-4 text-center">
                <BookOpen className="mx-auto text-accent-bullish" size={18} />
                <p className="text-lg md:text-2xl font-bold text-text-primary mt-1">{courses.length}</p>
                <p className="text-[10px] md:text-sm text-text-muted">Courses</p>
              </Card>
              <Card variant="elevated" className="p-3 md:p-4 text-center">
                <Play className="mx-auto text-accent-bullish" size={18} />
                <p className="text-lg md:text-2xl font-bold text-text-primary mt-1">
                  {courses.reduce((sum, c) => sum + c.lessons, 0)}
                </p>
                <p className="text-[10px] md:text-sm text-text-muted">Lessons</p>
              </Card>
              <Card variant="elevated" className="p-3 md:p-4 text-center">
                <Users className="mx-auto text-accent-bullish" size={18} />
                <p className="text-lg md:text-2xl font-bold text-text-primary mt-1">
                  {courses.reduce((sum, c) => sum + (c.students || 0), 0).toLocaleString()}
                </p>
                <p className="text-[10px] md:text-sm text-text-muted">Students</p>
              </Card>
            </div>

            {/* Filters */}
            <div className="mt-4 md:mt-8 overflow-x-auto no-scrollbar">
              <div className="flex gap-1.5 md:gap-2 min-w-max pb-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap touch-target ${
                      activeFilter === filter
                        ? 'bg-accent-bullish text-background-primary'
                        : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCourses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <ScrollReveal key={course.id} direction="up" delay={0.05 * index}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full"
                    >
                      <Card variant="elevated" className="p-4 md:p-6 h-full flex flex-col border border-ui-border hover:border-accent-bullish/20 transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="p-2 md:p-3 rounded-lg bg-accent-bullish/10">
                            <Icon className="text-accent-bullish" size={20} />
                          </div>
                          <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full border ${levelColors[course.level]}`}>
                            {course.level}
                          </span>
                        </div>
                        
                        <h3 className="mt-3 font-semibold text-text-primary text-sm md:text-base line-clamp-1">{course.title}</h3>
                        <p className="mt-1 text-xs md:text-sm text-text-muted flex-1 line-clamp-2">{course.description}</p>
                        
                        {/* Rating & Students */}
                        <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
                          {course.rating && (
                            <span className="flex items-center gap-1">
                              <Star size={12} className="text-[#F5A623] fill-[#F5A623]" />
                              {course.rating}
                            </span>
                          )}
                          {course.students && (
                            <span className="flex items-center gap-1">
                              <Users size={12} />
                              {course.students.toLocaleString()}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={12} />
                            {course.lessons} lessons
                          </span>
                        </div>
                        
                        <div className="mt-3 md:mt-4">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-full text-xs md:text-sm gap-2 group"
                            onClick={() => handleLearnMore(course.id)}
                          >
                            Learn More
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
