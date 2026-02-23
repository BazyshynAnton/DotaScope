import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { pxToRem } from '@/utils/px-to-rem';
import { useTheme } from '@mui/material';
import { CommonTableContainer, CommonTableHead, CommonTableHeadCell } from '@/styles/common';

/**
 * React component
 *
 * Implementation of the common table
 *
 * @param titles Titles for the header of the table
 * @param children Child elements
 * @returns {JSX.Element}
 */
export default function CommonTable({
  titles,
  children,
}: {
  titles: string[];
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <CommonTableContainer>
      <Table sx={{ border: `${pxToRem(1)} solid ${theme.palette.border2}` }}>
        <CommonTableHead>
          <TableRow>
            {titles.map((titleParts) => {
              const [title, tooltip] = titleParts.split('/');

              return (
                <Tooltip key={title} title={tooltip} placement={'top'} arrow>
                  <CommonTableHeadCell>{title}</CommonTableHeadCell>
                </Tooltip>
              );
            })}
          </TableRow>
        </CommonTableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </CommonTableContainer>
  );
}
