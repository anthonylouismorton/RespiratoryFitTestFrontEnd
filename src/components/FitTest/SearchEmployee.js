import React, { useState} from 'react';
import CompanyEmployeeList from './CompanyEmployeeList';
import AddQualitativeFitTest from './AddQualitativeFitTest';
import AddQuantitativeFitTest from './AddQuantitativeFitTest';
import QuantitativeFitTestList from './QuantitativeFitTestList';
import QualitativeFitTestList from './QualitativeFitTestList';
import EditQuantitativeFitTest from './EditQuantitativeFitTest';
import EditQualitativeFitTest from './EditQualitativeFitTest';
import EmployeeSearchForm from './EmployeeSearchForm';
import EmployeeInformation from './EmployeeInformation';
import {
	Button,
	Box
} from '@mui/material';

export default function SearchEmployee() {
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [showQuantitativeFitTest, setShowQuantitativeFitTest] = useState(false);
  const [showQualitativeFitTest, setShowQualitativeFitTest] = useState(false);
  const [showQuantitativeFitTestEdit, setShowQuantitativeFitTestEdit] = useState(false);
  const [showQualitativeFitTestEdit, setShowQualitativeFitTestEdit] = useState(false);
  const [showFitTests, setShowFitTests] = useState(false);
  const [showEmployeeSearch,setShowEmployeeSearch] = useState(true);
  const [selectedFitTest, setSelectedFitTest] = useState([]);
  const [showEmployee, setShowEmployee] = useState(false)

  const handleBack = () => {
    setSelectedEmployee([]);
    setShowEmployeeSearch(true);
    setShowEmployee(false);
    setShowFitTests(false)
  };
  console.log(selectedEmployee)

	return (
    <Box>
    {showEmployeeSearch &&
    <EmployeeSearchForm setSelectedEmployee={setSelectedEmployee} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee} setShowEmployeeSearch={setShowEmployeeSearch} setCompanyEmployeeList={setCompanyEmployeeList} setShowCompanyList={setShowCompanyList}/>
    }
    {showCompanyList &&
    <CompanyEmployeeList companyEmployeeList={companyEmployeeList} setCompanyEmployeeList={setCompanyEmployeeList} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} setShowCompanyList={setShowCompanyList} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee} setShowEmployeeSearch={setShowEmployeeSearch}/>
    }
    {showEmployee &&
    <>
    <Button variant='contained' onClick={handleBack}>Back</Button>
    <EmployeeInformation setShowQuantitativeFitTest={setShowQuantitativeFitTest} setShowQualitativeFitTest={setShowQualitativeFitTest} selectedEmployee={selectedEmployee} setShowEmployee={setShowEmployee} setShowFitTests={setShowFitTests}/>
    </>
    }
    <>
    {showQualitativeFitTest &&
    <AddQualitativeFitTest selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} setShowQualitativeFitTest={setShowQualitativeFitTest} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee}/>
    }
    {showQuantitativeFitTest &&
    <AddQuantitativeFitTest selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} setShowQuantitativeFitTest={setShowQuantitativeFitTest} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee}/>
    }
    {showFitTests &&
    <Box>
    <QuantitativeFitTestList selectedEmployee={selectedEmployee} setSelectedFitTest={setSelectedFitTest} selectedFitTest={selectedFitTest} setShowQuantitativeFitTestEdit={setShowQuantitativeFitTestEdit} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee}/>
    <QualitativeFitTestList selectedEmployee={selectedEmployee} selectedFitTest={selectedFitTest} setSelectedFitTest={setSelectedFitTest} setShowQualitativeFitTestEdit={setShowQualitativeFitTestEdit} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee}/>
    </Box>
    }
    {showQuantitativeFitTestEdit &&
    <EditQuantitativeFitTest selectedFitTest={selectedFitTest} setSelectedFitTest={setSelectedFitTest} setShowQuantitativeFitTestEdit={setShowQuantitativeFitTestEdit} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee}/>
    }
    {showQualitativeFitTestEdit &&
    <EditQualitativeFitTest selectedFitTest={selectedFitTest} setSelectedFitTest={setSelectedFitTest} setShowQualitativeFitTestEdit={setShowQualitativeFitTestEdit} setShowFitTests={setShowFitTests} setShowEmployee={setShowEmployee}/>
    }
    </>
  </Box>
	);
}