import Links from './Links';

import { useState } from '@/shared/react-imports';

import styles from '@/styles/header/header.module.scss';

export default function HeaderBigScreen() {
  const [isBackground, setIsBackground] = useState(false);
  const [componentStyles, setComponentStyles] = useState<ComponentStyles>(initComponentStyles);

  return (
    <nav className={styles.headerContent}>
      {isBackground && (
        <span
          style={{
            position: 'absolute',
            top: componentStyles.offsetTop || 0,
            left: componentStyles.offsetLeft || 0,
            width: componentStyles.width || 0,
            height: componentStyles.height || 0,
            transition: 'all 0.15s ease-in-out',
            padding: '5px 20px',
            background: '#ffffff14',
            zIndex: 1,
          }}
        />
      )}
      <Links setComponentStyles={setComponentStyles} setIsBackground={setIsBackground} />
    </nav>
  );
}

const initComponentStyles: ComponentStyles = {
  width: null,
  height: null,
  offsetTop: null,
  offsetLeft: null,
};

export interface ComponentStyles {
  width: number | null;
  height: number | null;
  offsetTop: number | null;
  offsetLeft: number | null;
}
