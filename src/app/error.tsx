'use client';

import AppCrash from '@/components/Error_1/AppCrash';

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return <AppCrash error={error} reset={reset} />;
}
