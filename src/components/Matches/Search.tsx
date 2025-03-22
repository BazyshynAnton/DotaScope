import { Link } from '@/shared/nextjs-imports';
import { useState } from '@/shared/react-imports';

import type { ChangeEvent } from 'react';

import styles from '@/styles/matches.module.scss';

export default function Search() {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // sets only digits
    setUserInput(e.target.value.replace(/\D/g, ''));
  };

  return (
    <form className={styles.matches__search}>
      <input
        value={userInput}
        type="text"
        name="matchId"
        placeholder="Enter your match ID"
        required
        autoComplete="off"
        onChange={handleInputChange}
        className={styles.matches__input}
      />
      <label className={styles.matches__label}>Enter your match ID</label>
      <Link
        href={`/matches/match?id=${userInput}`}
        className={`${styles.matches__submitLink} ${userInput.length >= 10 ? styles.submitLink_active : styles.submitLink_disabled}`}
      >
        submit
      </Link>
    </form>
  );
}
