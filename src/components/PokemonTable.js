import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';

import TypeTag from './TypeTag'

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: 'pokemon',
    numeric: false,
    disablePadding: true,
    label: 'Pokemon',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'type1',
    numeric: false,
    disablePadding: false,
    label: 'Type 1',
  },
  {
    id: 'type2',
    numeric: false,
    disablePadding: false,
    label: 'Type 2',
  },
  {
    id: 'Range',
    numeric: true,
    disablePadding: false,
    label: 'Range',
  },
  {
    id: 'HP',
    numeric: true,
    disablePadding: false,
    label: 'HP',
  },
  {
    id: 'Attack',
    numeric: false,
    disablePadding: true,
    label: 'Attack',
  },
  {
    id: 'Defense',
    numeric: true,
    disablePadding: false,
    label: 'Defense',
  },
  {
    id: 'Agility',
    numeric: true,
    disablePadding: false,
    label: 'Agility',
  },
  {
    id: 'EnergyRate',
    numeric: true,
    disablePadding: false,
    label: 'Energy Rate',
  },
  {
    id: 'Special',
    numeric: false,
    disablePadding: false,
    label: 'Special',
  },
  {
    id: 'InBeta1',
    numeric: false,
    disablePadding: false,
    label: 'Beta 1',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort, beta1Only } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

		      {/* TODO: HEADING ICON */}

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
              {headCell.id == "InBeta1" && (
                <Checkbox
                  checked={beta1Only}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              )}

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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function PokemonTable({data, type}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('pokemon');
  const [beta1Only, setBeta1Only] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const navigate = useNavigate();
  

  const handleRequestSort = (event, property) => {
    if (property === 'InBeta1') {
      setBeta1Only(!beta1Only)
      return
    }

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, pokemon) => {
    navigate('/pokemon/'+pokemon.pokemon);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = data

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            beta1Only={beta1Only}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .filter(row => (!beta1Only || row.InBeta1 === "Yes"))
              .filter(row => (type == null) || (row.type1 === type || row.type2 === type))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                  >
                    <TableCell padding="checkbox">
                    <Box
                      component="img"
                      sx={{
                      height: 45,
                      width: 39,
                      maxHeight: { xs: 39, md: 39 },
                      maxWidth: { xs: 45, md: 45 },
                      }}
                      alt="Pokemon Crown"
                      src="https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0001/Normal.png"
                    />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.pokemon}
                    </TableCell>
                    
                    <TableCell align="left">{row.role.split(' ').filter(r => r.length > 0)[1]}</TableCell>
                    <TableCell align="left"><TypeTag type={row.type1}/></TableCell>
                    <TableCell align="left"><TypeTag type={row.type2}/></TableCell>
                    <TableCell align="left">No Data</TableCell>
                    <TableCell align="left">{row.HP}</TableCell>
                    <TableCell align="left">{row.Attack}</TableCell>
                    <TableCell align="left">{row.Defense}</TableCell>
                    <TableCell align="left">{row.Agility}</TableCell>
                    <TableCell align="left">{row.EnergyRate} Attacks</TableCell>
                    <TableCell align="left">{row.Special}</TableCell>
                    <TableCell align="left">{row.InBeta1}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}