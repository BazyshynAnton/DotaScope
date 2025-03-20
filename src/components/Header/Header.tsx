import { Link } from '@/shared/nextjs-imports';

import styles from '@/styles/header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href="/" className={styles.header__heading}>
          DOTASCOPE
        </Link>
        <nav className={styles.header__navigation}>
          <ul className={styles.header__linksList}>
            {['/', '/matches', 'meta'].map((href) => {
              return (
                <li key={href}>
                  <Link href={href} className={styles.header__link}>
                    {href.replace('/', '') || 'home'}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
