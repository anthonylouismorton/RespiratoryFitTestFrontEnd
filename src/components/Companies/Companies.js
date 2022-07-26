import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react'
import AddCompanyForm from './AddCompanyForm';
import CompanyList from './CompanyList';
import CompanyEditForm from './CompanyEditForm';
import CompanyInformation from './CompanyInformation';

export default function Companies() {
	const [hideAddCompanyForm, setHideAddCompanyForm] = useState(true);
	const [hideCompanyEdit, setHideCompanyEdit] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState([]);
	const [showCompanyInformation, setShowCompanyInformation] = useState(false)
	const handleClick = () => {
    setHideAddCompanyForm(false)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideAddCompanyForm === true && hideCompanyEdit === true && !showCompanyInformation &&
		<Button variant="contained" onClick={handleClick}>Add New Company</Button>
		}
	</Stack>
	{hideCompanyEdit === true && hideAddCompanyForm && !showCompanyInformation &&
	  <CompanyList selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} hideCompanyEdit={hideCompanyEdit} setHideCompanyEdit={setHideCompanyEdit} setShowCompanyInformation={setShowCompanyInformation}/>
	}
	{hideAddCompanyForm === false &&
		<AddCompanyForm hideAddCompanyForm={hideAddCompanyForm} setHideAddCompanyForm={setHideAddCompanyForm}/>
	}
	{hideCompanyEdit === false &&
		<CompanyEditForm selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} hideCompanyEdit={hideCompanyEdit} setHideCompanyEdit={setHideCompanyEdit}/>
	}
	{showCompanyInformation && 
		<CompanyInformation selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany}/>
	}
	</>
);

}