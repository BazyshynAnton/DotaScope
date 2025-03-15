import AdvantageChart from './AdvantageChart';
import BuildingsMap from './BuildingsMap';

import styles from '@/styles/statistic/map-and-chart.module.scss';

export default function MapAndChart() {
  return (
    <section className={styles.mapAndChart}>
      <BuildingsMap />
      <AdvantageChart />
    </section>
  );
}
