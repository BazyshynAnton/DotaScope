import styles from '@/styles/footer/footer.module.scss';

export default function BazyshynDev() {
  return (
    <nav className={styles.footer__bazyshyndev}>
      <a href="https://bazyshyn-dev.vercel.app/" target="blank">
        Bazyshyn.dev
      </a>
      <a href="https://github.com/BazyshynAnton" target="blank">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/anton-bazyshyn-dev/" target="blank">
        LinkedIn
      </a>
    </nav>
  );
}
