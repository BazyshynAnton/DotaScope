import { Image } from '@/shared/nextjsImports'

export default function DataLoader() {
  return (
    <div style={loaderContainer}>
      <p>Loading...</p>
      <Image src='/pictures/dotaScopeIcons/tango.gif' alt='tango' width={22} height={22} priority />
    </div>
  )
}

const loaderContainer: React.CSSProperties = {
  padding: '3rem 0rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: '100%',
  height: 'max-content',
  color: '#ffffffde',
}
