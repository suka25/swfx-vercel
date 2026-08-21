'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { 
  Users, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Sparkles,
  Shield,
  Heart,
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  Building,
  Eye,
  Lightbulb,
  ThumbsUp,
  Crown,
  Compass,
  Activity,
  Brain,
  MessageSquare,
  UsersRound,
  GitBranch,
  Loader2,
  Quote
} from 'lucide-react';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  created_at: string;
  active: boolean;
}

export default function AboutPage() {
  const { settings, loading } = useSettings();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const title = loading ? 'About SWFX' : (settings?.site_name || 'About SWFX');
  const subtitle = loading ? 'READ. PLAN. EXECUTE.' : (settings?.site_description || 'READ. PLAN. EXECUTE. — A premium forex community focused on analysis, education, and disciplined trading.');

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of community. Every member matters and contributes to our collective success.',
      color: '#39FF88'
    },
    {
      icon: Target,
      title: 'Structured Approach',
      description: 'Discipline and structure are the foundations of successful trading. We provide a clear framework for every trade.',
      color: '#4A90D9'
    },
    {
      icon: BookOpen,
      title: 'Continuous Education',
      description: 'The markets never stop evolving, and neither should you. We emphasize understanding the why behind every signal.',
      color: '#F5A623'
    },
    {
      icon: Shield,
      title: 'Risk First',
      description: 'Protecting your capital is our priority. Every signal includes clear risk management parameters.',
      color: '#FF4D5F'
    },
  ];

  const journey: JourneyItem[] = [
    {
      year: '2018',
      title: 'Awal Mengenal Trading',
      description: 'Mulai mengenal dunia trading dengan rasa penasaran seperti kebanyakan orang. Mencoba berbagai strategi, indikator, dan mengikuti banyak cara yang beredar di internet.',
      icon: Compass,
      color: '#4A90D9'
    },
    {
      year: '2020',
      title: 'Banyak Belajar dari Kesalahan',
      description: 'Mulai memahami bahwa trading bukan sekadar mencari entry. Mengalami berbagai fase seperti loss, overtrade, FOMO, dan mulai menyadari pentingnya manajemen risiko.',
      icon: Activity,
      color: '#F5A623'
    },
    {
      year: '2022',
      title: 'Fokus pada Cara Berpikir',
      description: 'Berhenti mengejar strategi yang katanya "paling ampuh". Mulai lebih fokus memahami struktur pasar, price action, konteks pergerakan harga, dan membangun disiplin dalam mengambil keputusan.',
      icon: Brain,
      color: '#39FF88'
    },
    {
      year: '2024',
      title: 'Mulai Berbagi',
      description: 'Mulai lebih sering berdiskusi dengan teman-teman trader dan menyadari bahwa berbagi pengalaman jauh lebih bermanfaat daripada sekadar membagikan entry.',
      icon: MessageSquare,
      color: '#4A90D9'
    },
    {
      year: '2026',
      title: 'Membangun Komunitas SWFX',
      description: 'Website dan komunitas ini dibuat sebagai tempat berkumpul bagi siapa saja yang ingin belajar, berdiskusi, dan berkembang bersama tanpa tekanan, tanpa flexing, dan tanpa budaya toxic yang sering ditemui di dunia trading.',
      icon: UsersRound,
      color: '#39FF88'
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={14} className={`${i < rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-[#4B5563]'}`} />
    ));
  };

  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        {/* Hero Section */}
        <Section background="primary" padding="md" className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#080A0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[600px] bg-[#39FF88]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#39FF88]/3 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0D]/50" />
          </div>

          <Container className="relative z-10 px-4">
            <div className="text-center max-w-3xl mx-auto py-8 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-bullish/10 border border-accent-bullish/20 mb-4"
              >
                <Sparkles size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">About Us</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-text-secondary text-base md:text-lg max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            </div>
          </Container>
        </Section>

        {/* Story Section */}
        <Section background="surface" padding="md" className="py-10 md:py-16 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 items-center">
              <ScrollReveal direction="up">
                <div>
                  <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase flex items-center gap-2">
                    <Building size={14} />
                    Our Story
                  </span>
                  <Heading as="h2" className="mt-2 text-2xl md:text-4xl">
                    Built by Traders,
                    <br />
                    <span className="text-gradient-premium">For Traders</span>
                  </Heading>
                  <div className="mt-4 space-y-3 text-text-secondary text-sm md:text-base">
                    <p>
                      SWFX (Suka Wedana Forex) was founded with a simple but powerful mission: 
                      to provide retail traders with the same level of analysis and education that institutional traders have.
                    </p>
                    <p>
                      We believe that successful trading comes from a combination of <span className="text-accent-bullish">quality analysis</span>, 
                      <span className="text-accent-bullish"> solid education</span>, and <span className="text-accent-bullish"> disciplined execution</span>. 
                      Our community is built on these three pillars.
                    </p>
                    <p>
                      Today, we have grown into a global community of traders who share our vision 
                      of disciplined, educated, and profitable trading.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.1}>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { icon: Eye, label: 'Transparency', desc: 'Clear analysis, honest signals' },
                    { icon: Lightbulb, label: 'Education', desc: 'Learn the why behind every trade' },
                    { icon: ThumbsUp, label: 'Quality', desc: 'Premium analysis you can trust' },
                    { icon: Users, label: 'Community', desc: 'Supportive trading community' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="bg-[#0D1117] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 md:p-4 text-center">
                        <Icon className="mx-auto text-accent-bullish" size={20} />
                        <p className="text-sm font-semibold text-text-primary mt-1">{item.label}</p>
                        <p className="text-[10px] text-text-muted">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </Section>

        {/* Core Values */}
        <Section background="primary" padding="md" className="py-10 md:py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase flex items-center justify-center gap-2">
                <Heart size={14} />
                Core Values
              </span>
              <Heading as="h2" className="mt-2 text-2xl md:text-4xl">
                What Drives Us
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                The principles that guide everything we do at SWFX
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <ScrollReveal key={value.title} direction="up" delay={0.1 * index}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full"
                    >
                      <Card variant="elevated" className="p-4 md:p-6 border border-white/5 hover:border-accent-bullish/20 transition-all duration-500 h-full text-center">
                        <div className="inline-flex p-3 rounded-full bg-accent-bullish/10 mb-3">
                          <Icon className="text-accent-bullish" size={24} />
                        </div>
                        <h3 className="font-semibold text-text-primary text-sm md:text-base">{value.title}</h3>
                        <p className="mt-1 text-xs md:text-sm text-text-muted">{value.description}</p>
                      </Card>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Journey Section */}
        <Section background="surface" padding="md" className="py-10 md:py-16 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase flex items-center justify-center gap-2">
                <GitBranch size={14} />
                Perjalanan Saya
              </span>
              <Heading as="h2" className="mt-2 text-2xl md:text-4xl">
                Dari Rasa Penasaran
                <br />
                <span className="text-gradient-premium">Menjadi Komunitas</span>
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                Perjalanan panjang yang dimulai dari nol, penuh lika-liku, dan akhirnya membawa ke sini.
              </Text>
            </div>

            <div className="max-w-3xl mx-auto px-4">
              {journey.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-4 pb-8 last:pb-0"
                  >
                    {index !== journey.length - 1 && (
                      <div className="absolute left-[11px] top-8 w-0.5 h-[calc(100%-1rem)] bg-[rgba(255,255,255,0.08)]" />
                    )}
                    
                    <div 
                      className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5"
                      style={{ 
                        borderColor: item.color,
                        backgroundColor: `${item.color}20`
                      }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    </div>

                    <div className="flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: item.color }}>{item.year}</span>
                        <div className="flex items-center gap-1.5">
                          <Icon size={14} style={{ color: item.color }} />
                          <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-text-muted mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Testimonials */}
        <Section background="primary" padding="md" className="py-10 md:py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              <span className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-accent-bullish uppercase flex items-center justify-center gap-2">
                <MessageCircle size={14} />
                Testimoni
              </span>
              <Heading as="h2" className="mt-2 text-2xl md:text-4xl">
                Apa Kata Trader Kami
              </Heading>
              <Text className="mt-2 text-text-secondary text-sm md:text-base">
                Cerita nyata dari komunitas trader kami
              </Text>
            </div>

            {loadingTestimonials ? (
              <div className="flex justify-center py-8">
                <Loader2 size={32} className="text-accent-bullish animate-spin" />
              </div>
            ) : displayTestimonials.length === 0 ? (
              <div className="text-center py-8 text-text-muted">
                <Quote className="mx-auto mb-2" size={32} />
                <p>Belum ada testimoni. Jadilah yang pertama berbagi pengalaman!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4">
                {displayTestimonials.map((testimonial, index) => (
                  <ScrollReveal key={testimonial.id} direction="up" delay={0.1 * index}>
                    <Card variant="elevated" className="p-4 md:p-6 border border-white/5 hover:border-accent-bullish/20 transition-all duration-500 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=39FF88&color=080A0D&size=40`;
                          }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{testimonial.name}</p>
                          <p className="text-xs text-text-muted">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-2">{renderStars(testimonial.rating)}</div>
                      <p className="text-sm text-text-secondary italic">"{testimonial.quote}"</p>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </Container>
        </Section>

        {/* Final CTA */}
        <Section background="surface" padding="md" className="py-10 md:py-16 border-t border-[rgba(255,255,255,0.05)]">
          <Container>
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/20 mb-4">
                <Crown size={14} className="text-accent-bullish" />
                <span className="text-xs font-medium text-accent-bullish">Join the Community</span>
              </div>
              <Heading as="h2" className="text-2xl md:text-4xl">
                Siap Bergabung?
              </Heading>
              <p className="text-sm text-text-muted mt-3">
                Bergabunglah dengan komunitas yang berkomitmen pada trading yang disiplin, terdidik, dan menguntungkan.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="https://t.me/swfxglobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF88] text-[#080A0D] font-semibold rounded-xl hover:bg-[#39FF88]/90 transition-all shadow-lg shadow-[#39FF88]/20"
                >
                  Gabung Telegram
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-accent-bullish" />
                  Gratis Bergabung
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-accent-bullish" />
                  Analisis Harian
                </span>
                <span className="flex items-center gap-1">
                  <Target size={12} className="text-accent-bullish" />
                  Sinyal Terstruktur
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} className="text-accent-bullish" />
                  Edukasi
                </span>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
