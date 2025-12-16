import { Image } from '@/shared/nextjs-imports';

export default function AppError() {
  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffffb0',
        gap: '0.5rem',
      }}
    >
      <h1 style={{ fontSize: '1.188rem' }}>OpenDota API is down</h1>
      <Image src="/pictures/dota-scope-icons/cheeky.gif" alt="puck" width={22} height={22} />
    </section>
  );
}
