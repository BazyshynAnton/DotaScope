import Links from './Links';

import { useState } from '@/shared/react-imports';

import styles from '@/styles/header/header.module.scss';

export default function HeaderSmallScreen() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={!isOpen ? styles.burgerMenu_closed : styles.burgerMenu_open}
        onClick={handleOpenMenuClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isOpen && (
        <nav className={styles.menu}>
          <Links setIsOpen={setIsOpen} />
        </nav>
      )}
    </>
  );
}
