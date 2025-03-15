import ProMatchCard from './ProMatchCard';
import DotaNewsCard from './DotaNewsCard';
import ContentHeader from './ContentHeader';
import DataLoader from '../Loaders/DataLoader';
import AppError from '../Error/AppError';

import { useAppSelector } from '@/hooks/use-app-selector';

import styles from '@/styles/home/home.module.scss';

export default function InteractiveList({
  type,
  listHeader,
}: {
  type: string;
  listHeader: string;
}) {
  const { proMatches, dotaNews } = useAppSelector((store) => store.homeSlice);
  const news = dotaNews?.appnews.newsitems;

  return (
    <section className={type === 'matchesList' ? styles.proMatches : styles.dotaNews}>
      <ContentHeader headerTitle={listHeader} />

      <div
        className={type === 'matchesList' ? styles.proMatches__content : styles.dotaNews__content}
      >
        {type === 'matchesList' ? (
          proMatches ? (
            proMatches.map((match, idx) => {
              if (idx <= 15) return <ProMatchCard key={match.match_id} proMatch={match} />;
            })
          ) : (
            <Loader />
          )
        ) : news ? (
          news.map((el) => <DotaNewsCard key={el.gid} newsItem={el} />)
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}

function Loader() {
  const { error } = useAppSelector((store) => store.homeSlice);

  if (error !== null) console.error(error);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!error ? <DataLoader /> : <AppError />}
    </div>
  );
}
