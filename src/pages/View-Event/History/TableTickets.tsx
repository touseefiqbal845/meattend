import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Define interface for table row data
interface RowData {
  name: string;
  price: number;
  event: string;
  date: number;
  time: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Function to create data row based on defined structure
function createData(
  name: string,
  price: number,
  event: string,
  date: number,
  time: number,
): RowData {
  return { name, price, event, date, time };
}

const rows: RowData[] = [
  // createData('New York', 0, 'Friday Night', 0, 0),
  // createData('California', 40, 'Friday Night', 0, 0),
  // createData('Bostan', 120, 'Friday Night', 0, 0),
  // createData('Dalas', 150, 'Friday Night', 0, 0),
  // createData('Settale', 10, 'Friday Night', 0, 0),
  // createData('San Dieago', 150, 'Friday Night', 0, 0),
];

export default function CustomizedTicketTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticket Name</StyledTableCell>
            <StyledTableCell align="right">Ticket Price</StyledTableCell>
            <StyledTableCell align="right">Event Name</StyledTableCell>
            <StyledTableCell align="right">Event Date</StyledTableCell>
            <StyledTableCell align="right">Event Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.event}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
