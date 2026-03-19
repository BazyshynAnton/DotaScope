import Tooltip from '@mui/material/Tooltip';

export default function ItemTooltip({ children }: { children: React.ReactElement }) {
  return <Tooltip title={<></>}>{children}</Tooltip>;
}
