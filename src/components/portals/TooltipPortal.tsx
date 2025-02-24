'use client'

export default function TooltipPortal() {
  return <div id='tooltip_portal' style={tooltipPortalContainer}></div>
}

const tooltipPortalContainer: React.CSSProperties = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none',
  zIndex: 9999,
}
