'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navigation/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { useSettings } from '@/hooks/useSettings';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const { settings, loading } = useSettings();
  const siteName = loading ? 'SWFX' : settings?.site_name || 'SWFX';

  return (
    <>
      <Navbar />
      <main>
        <Section background="primary" padding="xl" className="min-h-[80vh] flex items-center">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="text-8xl font-bold text-accent-bullish mb-6">404</div>
              <Heading as="h1" className="mb-4">
                Page Not Found
              </Heading>
              <Text size="large" className="text-text-secondary mb-8">
                The page you are looking for doesn't exist or has been moved.
              </Text>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button variant="primary" size="lg">
                    Back to Home
                  </Button>
                </Link>
                <Link href="/signals">
                  <Button variant="secondary" size="lg">
                    View Signals
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-sm text-text-muted/60">
                {siteName} — Suka Wedana Forex
              </p>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
