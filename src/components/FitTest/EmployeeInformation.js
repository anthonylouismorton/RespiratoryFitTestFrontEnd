import {
	TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button
} from '@mui/material';
export default function EmployeeInformation(props){
  const handleQuantitative = () =>{
    props.setShowQuantitativeFitTest(true);
    props.setShowEmployee(false);
    props.setShowFitTests(false);
  };
  const handleQualitative = () =>{
    props.setShowQuantitativeFitTest(true);
    props.setShowEmployee(false);
    props.setShowFitTests(false);
  };
  return(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Middle Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">SSN</TableCell>
            <TableCell align="center"> New Fit Test</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              hover
              key={props.selectedEmployee.employeeID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{props.selectedEmployee.firstName}</TableCell>
              <TableCell align="center">{props.selectedEmployee.middleName}</TableCell>
              <TableCell align="center">{props.selectedEmployee.lastName}</TableCell>
              <TableCell align="center">{props.selectedEmployee.dob}</TableCell>
              <TableCell align="center">{props.selectedEmployee.ssn}</TableCell>
              <TableCell align="center">
                <Button variant='contained' onClick={handleQuantitative}>Quantitative</Button>
                <Button variant='contained' onClick={handleQualitative}>Qualitative</Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
)}