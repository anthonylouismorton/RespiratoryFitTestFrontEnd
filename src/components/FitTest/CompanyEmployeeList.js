import React from 'react';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'

export default function CompanyEmployeeList(props) {

	const handleClick = async (id) => {
      let employee = await axios.get(`${process.env.REACT_APP_DATABASE}/employee/${id}`)
      let employeeSSN = Number(String(employee.data.ssn).slice(-4))
      props.setSelectedEmployee(
        {
          address1: employee.data.address1,
          address2: employee.data.address2,
          address3: employee.data.address3,
          city: employee.data.city,
          companyID: employee.data.companyID,
          dob: employee.data.dob.substr(0,10),
          employeeEmail: employee.data.employeeEmail,
          employeeID: employee.data.employeeID,
          employeePhoneNumber: employee.data.employeePhoneNumber,
          firstName: employee.data.firstName,
          lastName: employee.data.lastName,
          middleName: employee.data.middleName,
          ssn: employeeSSN,
          state: employee.data.state,
          zip: employee.data.zip,
        }
      );
      props.setShowFitTests(true);
      props.setShowEmployee(true);
      props.setShowCompanyList(false);
  };

  const handleBack = () => {
    props.setShowCompanyList(false);
    props.setShowEmployeeSearch(true);
    props.setcompanyEmployeeList([])

  };
  return (
    <>
    <Button variant='contained' onClick={handleBack}>Back</Button>
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
          {props.companyEmployeeList.map((row) => (
            <TableRow
              hover
              key={row.employeeID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleClick(row.employeeID)}
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