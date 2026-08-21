'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <Section background="primary" padding="xl" className="min-h-[80vh] flex items-center">
      <Container>
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-6">
            <AlertTriangle size={64} className="mx-auto text-[#F5A623]" />
          </div>
          <Heading as="h1" className="mb-4 text-3xl md:text-5xl">
            Something Went Wrong
          </Heading>
          <Text className="text-text-secondary mb-8 text-base md:text-lg">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={reset} className="gap-2">
              <RefreshCw size={18} />
              Try Again
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/'} className="gap-2">
              <Home size={18} />
              Go Home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
