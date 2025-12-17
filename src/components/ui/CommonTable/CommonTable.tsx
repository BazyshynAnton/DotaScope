import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { CommonTableContainer, CommonTableHead } from '@/styles/common';

export default function CommonTable({ titles }: { titles: string[] }) {
  return (
    <CommonTableContainer>
      <Table>
        <CommonTableHead>
          <TableRow>
            {titles.map((titleParts) => {
              const [title, tooltip] = titleParts.split('/');

              return (
                <Tooltip key={title} title={tooltip} placement={'top'} arrow>
                  <TableCell>{title}</TableCell>
                </Tooltip>
              );
            })}
          </TableRow>
        </CommonTableHead>
      </Table>
    </CommonTableContainer>
  );
}
