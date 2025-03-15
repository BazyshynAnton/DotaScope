'use client';

import { Image } from '@/shared/nextjs-imports';

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        color: '#ffffffb0',
      }}
    >
      <h2>404 |</h2>
      <p>Page Not Found.</p>
      <Image src="/pictures/dotaScopeIcons/huh.gif" alt="invoker" width={22} height={22} priority />
    </div>
  );
}
