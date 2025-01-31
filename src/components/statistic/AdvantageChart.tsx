import { useAppSelector } from '@/hooks/useAppSelector'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
  TooltipProps,
} from 'recharts'

import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import type { MatchDetails } from '@/types/statistic/matchData'

import styles from '@/styles/statistic/AdvantageChart.module.scss'

export default function AdvantageChart() {
  const { matchDetails } = useAppSelector((store) => store.statisticSlice)

  if (!matchDetails) return

  const chartDataLength = Math.floor(matchDetails.duration / 60)
  const data = genChartData(matchDetails, chartDataLength)
  const maxY =
    Math.ceil(Math.max(...matchDetails.radiant_gold_adv, ...matchDetails.radiant_xp_adv) / 5000) *
    5000
  const minY =
    Math.floor(Math.min(...matchDetails.radiant_gold_adv, ...matchDetails.radiant_xp_adv) / 5000) *
    5000

  return (
    <div className={styles.advantageChart}>
      <h4>Advantage</h4>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <ReferenceArea y1={0} y2={maxY} fill='rgba(102, 187, 106, 0.12)' />
          <ReferenceArea y1={0} y2={minY} fill='rgba(255, 76, 76, 0.12)' />
          <ReferenceLine y={0} stroke='#505050' strokeWidth={2} opacity={1} />
          <CartesianGrid stroke='#505050' strokeWidth={1} opacity={0.5} />
          <XAxis dataKey='time' />
          <YAxis domain={[minY, maxY]} mirror={true} padding={{ top: 5, bottom: 5 }} />
          <Tooltip content={<CustomChartTooltip />} />
          <Legend />
          <Line dot={false} dataKey='xp' stroke='#acc9ed' strokeWidth={2} name='Experience' />
          <Line dot={false} dataKey='gold' stroke='#e9bc37' strokeWidth={2} name='Gold' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function genChartData(matchDetails: MatchDetails, chartDataLength: number) {
  const chartData = []

  for (let i = 0; i <= chartDataLength; ++i) {
    chartData.push({
      time: `${i}:00`,
      gold: matchDetails.radiant_gold_adv[i],
      xp: matchDetails.radiant_xp_adv[i],
    })
  }

  return chartData
}

function CustomChartTooltip(props: TooltipProps<ValueType, NameType>) {
  if (
    props &&
    props.payload &&
    props.payload.length &&
    props.payload[0].value &&
    props.payload[1].value
  ) {
    const gold = props.payload[1].value.valueOf() as number
    const xp = props.payload[0].value.valueOf() as number

    return (
      <div style={{ padding: '5px', background: 'rgba(35, 46, 56, 0.86)', color: '#ffffffde' }}>
        <p>{props.label}</p>
        <p style={{ color: '#e9bc37' }}>
          <span style={{ color: gold > 0 ? '#59ce8f' : '#df2e38' }}>
            {gold > 0 ? 'Radiant ' : 'Dire '}
          </span>
          {gold.toString().replace('-', '')} Gold
        </p>
        <p style={{ color: '#acc9ed' }}>
          <span style={{ color: xp > 0 ? '#59ce8f' : '#df2e38' }}>
            {xp > 0 ? 'Radiant ' : 'Dire '}
          </span>
          {xp.toString().replace('-', '')} Experience
        </p>
      </div>
    )
  }
}
