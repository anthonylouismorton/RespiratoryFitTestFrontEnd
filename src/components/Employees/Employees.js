import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import EmployeeForm from './EmployeeForm'
// import EmployeeList from './EmployeeList'
import {useState} from 'react'
// import EmployeeEditForm from './EmployeeEditForm'

export default function Employees() {
	const [hideEmployeeForm, setHideEmployeeForm] = useState(true);
	const [hideEmployeeEdit, setHideEmployeeEdit] = useState(true);
	const [selectedEmployee, setSelectedEmployee] = useState([])
	const handleClick = () => {
		setHideEmployeeForm(false)
	};

return (
	<>
	{/* <Stack spacing={2} direction="row">
		{hideEmployeeForm === true && hideEmployeeEdit === true &&
		<Button variant="contained" onClick={handleClick}>Add New Employee</Button>
		}
	</Stack>
	{hideEmployeeEdit === true && hideEmployeeForm === true &&
		<EmployeeList selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} hideEmployeeEdit={hideEmployeeEdit} setHideEmployeeEdit={setHideEmployeeEdit}/>
	}
	{hideEmployeeForm === false &&
		<EmployeeForm hideEmployeeForm={hideEmployeeForm} setHideEmployeeForm={setHideEmployeeForm}/>
	}
	{hideEmployeeEdit === false &&
		<EmployeeEditForm selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} hideEmployeeEdit={hideEmployeeEdit} setHideEmployeeEdit={setHideEmployeeEdit}/>
	} */}
	</>
);

}