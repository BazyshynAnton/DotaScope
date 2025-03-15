import { Image } from '@/shared/nextjs-imports';
import { useState } from '@/shared/react-imports';
import { useAppDispatch, useAppSelector } from '@/shared/redux-imports';
import { setMatchData, setSearch } from '@/store/statistic-slice';
import { fetchMatchData } from '@/utils/statistic/match-data-utility';

import type { ChangeEvent, FormEvent } from 'react';

import styles from '@/styles/statistic/search.module.scss';

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useAppSelector((store) => store.statisticSlice);
  const dispatch = useAppDispatch();

  const handleInputChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearch({ type, value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const mID = Number(search.matchID);
    const matchData = await fetchMatchData(mID);

    dispatch(setMatchData(matchData));

    setIsLoading(false);
  };

  const isDisabled = search.matchID.length < 10;

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <label htmlFor="search">Search for match:</label>
      <div className={styles.search}>
        <input
          id="search"
          className={styles.search__input}
          type="number"
          value={search.matchID}
          placeholder="Match ID"
          onChange={handleInputChange('matchID')}
        />
        {!isLoading ? (
          <button
            type="submit"
            disabled={isDisabled}
            className={isDisabled ? styles.search__button_disabled : styles.search__button_enabled}
          >
            <Image
              src={'/pictures/dotaScopeIcons/gem_search.gif'}
              alt="gem"
              width={32}
              height={32}
              style={{ filter: isDisabled ? 'grayscale(100%) brightness(100%)' : '' }}
            />
          </button>
        ) : (
          <div className={styles.search__button_disabled}>
            <Image
              src={'/pictures/dotaScopeIcons/gem_search.gif'}
              alt="gem"
              width={32}
              height={32}
              style={{ filter: 'grayscale(100%) brightness(100%)' }}
            />
          </div>
        )}
      </div>
    </form>
  );
}
