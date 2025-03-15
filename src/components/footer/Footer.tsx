import DScope from './DScope';
import BazyshynDev from './BazyshynDev';

import styles from '@/styles/footer/footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <DScope />
      <BazyshynDev />
    </footer>
  );
}
