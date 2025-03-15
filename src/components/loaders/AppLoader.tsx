import styles from '@/styles/loaders/app-loader.module.scss';

export default function AppLoader() {
  return (
    <div style={appLoader}>
      <div className={styles.loadingLine} />
    </div>
  );
}

const appLoader: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  background: '#1c242d',
};
