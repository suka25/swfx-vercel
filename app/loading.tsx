'use client';

import { Loader } from '@/components/animations/Loader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary">
      <Loader size="lg" />
    </div>
  );
}
