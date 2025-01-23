'use client'

export default function EarlyAccess() {
  return (
    <div style={earlyAccess}>
      <p>v1.0.1 - early access</p>
    </div>
  )
}
const earlyAccess: React.CSSProperties = {
  position: 'fixed',
  bottom: 5,
  left: 5,
  color: '#ffffffb0',
}
