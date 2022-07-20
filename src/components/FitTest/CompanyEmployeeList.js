import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CompanyEmployeeList(props) {

  const [rows, setRows] = useState([]);


	const handleClick = (employee) => {
		props.setSelectedEmployee(employee)
	};

  useEffect(()=> {
    setRows(props.companyEmployeeList);
  }, []);

  return (
    <>
    <Button variant='contained' onClick={()=> props.setHideCompanyEmployeeList(true)}>Back</Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Middle Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">SSN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              hover
              key={row.employeeID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={handleClick(row)}
            >
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.middleName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.dob.substr(0,10)}</TableCell>
              <TableCell align="center">{row.ssn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}