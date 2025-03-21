import styles from '@/styles/footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <section className={styles.footer__rights}>
        <h1 className={styles.footer__heading}>
          © {year} DotaScope. All rights reserved.
          <br />
          Dota 2 is a registered trademark of Valve Corporation.
        </h1>
      </section>
    </footer>
  );
}
