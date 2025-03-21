import styles from '@/styles/matches.module.scss';

export default function Search() {
  return (
    <form className={styles.matches__search}>
      <input className={styles.matches__input} placeholder="Enter a match ID" />
      <button className={styles.matches__submitBtn}>submit</button>
    </form>
  );
}
