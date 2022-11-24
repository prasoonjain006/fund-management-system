import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./funds.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

function createData(name, Amount, TransactionId, Date,Message) {
  return { name,Amount, TransactionId, Date, Message};
}

const rows = [
  createData('Nitin Mittal', 10000, "01ASFRT45628", "15-11-22", "Good Initiative"),
  createData('Amit Agarwal', 5000, "01ASFRT45628", "12-11-22", "Good Work"),
  createData('Abhay Gupta', 15000, "01ASFGRT45628", "10-11-22", "Good Initiative"),
  createData('Ashi Gupta', 30000, "01ASFRFGD45628", "1-11-22", "Good Initiative"),
  createData('Anita Agarwal', 10000, "01ASFRSFET45628", "26-10-22", "Good Initiative"),
];

export default function CustomizedTables() {
  return (
    <div className='tbh'>
        <div className='hd'>
            <p> All Transactions</p>
        </div>
        <TableContainer width= "80%" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Payee Name</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Transaction - Id</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.Amount}</StyledTableCell>
                <StyledTableCell align="center">{row.TransactionId}</StyledTableCell>
                <StyledTableCell align="center">{row.Date}</StyledTableCell>
                <StyledTableCell align="center">{row.Message}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>

    </div>

  );
}