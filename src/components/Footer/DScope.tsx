import styles from '@/styles/footer/footer.module.scss';

export default function DScope() {
  const data = new Date();
  const year = data.getFullYear();

  return (
    <section className={styles.footer__dscope}>
      <h1>dotascope</h1>
      <p>
        © {year} DotaScope. All rights reserved.
        <br /> Dota2 is registered trademark of Valve Corporation.
      </p>
    </section>
  );
}
