'use client'

import { Tooltip as ReactTooltip } from 'react-tooltip'
import InDevelopment from './InDevelopment'

export default function EarlyAccess() {
  return (
    <div style={earlyAccess} data-tooltip-id='early'>
      <p>early access</p>
      <ReactTooltip id='early' content='This application is still in development.' />
    </div>
  )
}
const earlyAccess: React.CSSProperties = {
  position: 'fixed',
  bottom: 5,
  left: 5,
  color: '#ffffffb0',
  cursor: 'help',
}
