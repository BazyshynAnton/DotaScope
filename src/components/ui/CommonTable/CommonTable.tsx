import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { CommonTableContainer, CommonTableHead, CommonTableHeadCell } from '@/styles/common';

export default function CommonTable({
  titles,
  children,
}: {
  titles: string[];
  children: React.ReactNode;
}) {
  return (
    <CommonTableContainer>
      <Table>
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
