import type { NewsItem } from '@/types/home/home-data';

import styles from '@/styles/home/home.module.scss';

export default function DotaNewsCard({ newsItem }: { newsItem: NewsItem }) {
  const date = new Date(newsItem.date * 1000);
  let formattedTitle =
    newsItem.title.length > 25 ? newsItem.title.substring(0, 24) + '...' : newsItem.title;

  return (
    <section className={styles.dotaNewsCard}>
      <h1>
        <a href={newsItem.url} target="_blank">
          {formattedTitle}
        </a>
      </h1>
      <div className={styles.newsDetails}>
        <p>{newsItem.feedlabel}</p>
        <p>Author: {newsItem.author}</p>
        <p>Date: {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</p>
      </div>
    </section>
  );
}
