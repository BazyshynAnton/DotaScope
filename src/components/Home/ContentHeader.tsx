import styles from '@/styles/home/home.module.scss';

export default function ContentHeader({ headerTitle }: { headerTitle: string }) {
  return (
    <div className={styles.contentHeader}>
      <h1>{headerTitle}</h1>
    </div>
  );
}
