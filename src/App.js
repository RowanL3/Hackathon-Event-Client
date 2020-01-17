import React from 'react';
import './App.css';
import Logo from './logo.png'

import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Divider,
  InputBase,
  createStyles,
}  from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const csvData = `datetime,source_id,scenario_id,warning_type,alarm_region,number_of_targets,alarmID,ownpositionLat,ownpositionLon,ownpositionAlt,target1Lat,target1Lon,target1Alt,target1Heading,target1Velocity,target2Lat,target2Lon,target2Alt,target2Heading,target2Velocity,target3Lat,target3Lon,target3Alt,target3Heading,target3Velocity
2020-01-14T00:02:26+0000,streamingService,Clear_HtHt_Straight_05kph,advice,ahead,1,kjh4d8db67x89as,32.1998293,-112.23132321,100,1.2321,3.43,32.199999,-112.234762,100.1,270.1,3.21,,,,,,,,,
2020-01-14T00:06:16+0000,competitorA,Clear_HtHt_Straight_05kph,alarm,left,1,sdf987sdkjhsdf,32.199890,-112.23132321,100,12.9,3,32.1,-112.234762,99,182,1.2,,,,,,,,,,
2020-01-14T00:08:51+0000,competitorA,Clear_HtHt_Straight_05kph,clear,,,sdf987sdkjhsdf,32.198890,-112.23000321,98.12,360.12,0,,,,,,,,,,,,,`

const parseCSV = (csvText) => csvText.split(/\r?\n/).map(line => line.split(/\r?,/))

const MAKE_REPEATED = (arr, repeats) =>
  [].concat(...Array.from({ length: repeats }, () => arr));

console.log(parseCSV(csvData))

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.common.white,
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }),
);

function SearchAppBar({value}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            HackAZ 2020 Event Client
            
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function SimpleTable() {
  const classes = useStyles();

  const cells = parseCSV(csvData)
  const headerData = cells[0];
  const bodyData = MAKE_REPEATED(cells.slice(1), 20);

  return (
    <TableContainer className="table" component={Paper}>
      <Table  size="small" stickyHeader>
        <TableHead>
          <TableRow>
            { 
             headerData.map(header => <TableCell align="right">{ header }</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            bodyData.map(row => (
              <TableRow key={row[0]}>
                { row.map(cell => <TableCell align="right">{cell}</TableCell>)}
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



function App() {
  const classes = useStyles();
  const [searchTerm, changeSearchTerm] = React.useState('')
  /* const [rows, setRows] = useState(parseCSV(csvData))

  function filterRows(filters){
    
    setRows(rows.filter(row => row.find()))
  }
  */
  

  return (
    <div className="App">
      { /* <header className="App-header"> 
      <AppBar position="static" className="app-bar">
        <div className='header-center'>
          <h4>Modular Mining Hackathon 2020</h4>
          <h1>Event Client</h1>
        </div>
        <div>
          <TextField className="input" variant="filled" id="standard-basic" label="Source ID" />
        </div>
        </AppBar>
       </header> */}
        <SearchAppBar value={searchTerm} />
      <div className="Body">
        <div className="row">
          <div className="column">
            <SimpleTable />
          </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
