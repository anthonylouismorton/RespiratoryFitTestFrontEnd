import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'qualitativeTestDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'qualitativeTestExpiration',
    numeric: false,
    disablePadding: false,
    label: 'Expiration',
  },
  {
    id: 'qualitativeTestType',
    numeric: false,
    disablePadding: false,
    label: 'Test Type',
  },
  {
    id: 'qualitativeTasteThreshold',
    numeric: false,
    disablePadding: false,
    label: 'Threshold',
  },
  {
    id: 'respiratorManufacturer',
    numeric: false,
    disablePadding: false,
    label: 'Manufacturer',
  },
  {
    id: 'respiratorModelNumber',
    numeric: false,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'edit',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'delete',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'archive',
    numeric: false,
    disablePadding: false,
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      // sx={{
      //   pl: { sm: 2 },
      //   pr: { xs: 1, sm: 1 },
      //   ...(numSelected > 0 && {
      //     bgcolor: (theme) =>
      //       alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      //   }),
      // }}
    >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Qualitative Fit Tests
        </Typography>
    </Toolbar>
  );
};

export default function QualitativeFitTestList(props) {
  const [rows, setRows] = useState([])
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDeleteWarning, setShowDeleteWarning] = useState([false, null]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleDeleteWarning = (id) => {
    setShowDeleteWarning([!showDeleteWarning, id]);

  };

  const handleEdit = (row) => {
    props.setSelectedFitTest(row);
    props.setShowQualitativeFitTestEdit(true);
  };

  const handleDeleteClick = async (id) => {
    await axios.delete(`${process.env.REACT_APP_DATABASE}/qualitativeFitTest/${id}`);
    setShowDeleteWarning(!showDeleteWarning, null);
    getAllFitTests();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let rowSelection = event.target.value
    if(rowSelection === 'All'){
      rowSelection = parseInt(rows.length)
    }
    setRowsPerPage(parseInt(rowSelection, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  const getAllFitTests = async () =>{
    let fitTests = await axios.get(`${process.env.REACT_APP_DATABASE}/qualitativeFitTest/${props.selectedEmployee.employeeID}`)
    setRows(fitTests.data)
  };
  
  useEffect(()=> {
    getAllFitTests();
  });
 
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.qualitativeTestID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.qualitativeTestID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.qualitativeTestID)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.qualitativeTestDate.substring(0,10)}</TableCell>
                      <TableCell align="left">{row.qualitativeTestExpiration.substring(0,10)}</TableCell>
                      <TableCell align="left">{row.qualitativeTestType}</TableCell>
                      <TableCell align="left">{row.qualitativeTasteThreshold}</TableCell>
                      <TableCell align="left">{row.respiratorManufacturer}</TableCell>
                      <TableCell align="left">{row.respiratorModelNumber}</TableCell> 
                      <Tooltip title="Edit">
                      <TableCell align="center"><EditIcon onClick={() => handleEdit(row)}/></TableCell>
                      </Tooltip>
                      <TableCell align="center">
                        {showDeleteWarning[0] === false && showDeleteWarning[1] === row.qualitativeTestID ?
                        <>
                        <span>Are you sure?</span>
                        <Button variant="contained" color="success" onClick={() => handleDeleteClick(row.qualitativeTestID)}> Yes </Button>
                        <Button variant="contained"  color="error" onClick={handleDeleteWarning}>No</Button>
                        </>
                        :
                        <Tooltip title="Delete">
                        <DeleteIcon onClick={() => handleDeleteWarning(row.qualitativeTestID)}/>
                        </Tooltip>
                        }
                      </TableCell>
                      <Tooltip title="Archive">
                      <TableCell aligh="center"><ArchiveIcon/></TableCell>
                      </Tooltip>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, rows.length]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}