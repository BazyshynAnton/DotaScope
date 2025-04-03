'use client';

import { Image } from '@/shared/nextjs-imports';

import styles from '@/styles/loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Image src="/pictures/dota-scope-icons/tango.gif" alt="Loader" width={55} height={55} />
    </div>
  );
}
