import { Image } from '@/shared/nextjs-imports';
import { useEffect, useState } from '@/shared/react-imports';

import styles from '@/styles/error/app-crash.module.scss';

export default function AppCrash({ error, reset }: { error: Error; reset: () => void }) {
  const [isHintOpen, setIsHintOpen] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleHintClick = () => setIsHintOpen(!isHintOpen);

  return (
    <div className={styles.error}>
      <section style={{ display: 'flex', alignItems: 'flex-end', gap: '0.3rem' }}>
        <h1>Application Error</h1>
        <Image
          src={'/pictures/dota-scope-icons/enigma-error.gif'}
          alt={'error icon'}
          width={22}
          height={22}
        />
      </section>
      <span onClick={handleHintClick}>why you see this error </span>
      {isHintOpen && <ErrorExplanation />}
      <button onClick={reset}>
        <span>Try again</span>
      </button>
    </div>
  );
}

function ErrorExplanation() {
  return (
    <div className={styles.errorExplanation}>
      <p>
        &bull; Opendota API is not available at that moment -{' '}
        <a href="https://www.opendota.com/" target="blank">
          check
        </a>
        <br />
        &bull; API calls limit(2000 calls per day).
        <br />
        &bull; Match ID does not exist(if you manually search for a match).
      </p>
    </div>
  );
}
