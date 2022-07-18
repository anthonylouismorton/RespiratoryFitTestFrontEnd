import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddEmployeeForm from './AddEmployeeForm'
import EmployeeList from './EmployeeList'
import {useState} from 'react'
// import EmployeeEditForm from './EmployeeEditForm'

export default function Employees() {
	const [hideAddEmployeeForm, setHideAddEmployeeForm] = useState(true);
	const [hideEmployeeEdit, setHideEmployeeEdit] = useState(true);
	const [selectedEmployee, setSelectedEmployee] = useState([])
	const handleClick = () => {
		setHideAddEmployeeForm(false)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideAddEmployeeForm === true && hideEmployeeEdit === true &&
		<Button variant="contained" onClick={handleClick}>Add New Employee</Button>
		}
	</Stack>
	{hideEmployeeEdit === true && hideAddEmployeeForm === true &&
		<EmployeeList selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} hideEmployeeEdit={hideEmployeeEdit} setHideEmployeeEdit={setHideEmployeeEdit}/>
	}
	{hideAddEmployeeForm === false &&
		<AddEmployeeForm hideAddEmployeeForm={hideAddEmployeeForm} setHideAddEmployeeForm={setHideAddEmployeeForm}/>
	}
	{/* {hideEmployeeEdit === false &&
		<EmployeeEditForm selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} hideEmployeeEdit={hideEmployeeEdit} setHideEmployeeEdit={setHideEmployeeEdit}/>
	} */}
	</>
);

}