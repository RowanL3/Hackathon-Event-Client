import React from 'react';
import './App.css';
import alarms from './alarms'

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
  InputBase,
  createStyles,
  Divider,
  IconButton
}  from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import debounce from 'lodash'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';

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
      color: 'black'
    },
    time: {
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
      color: 'black',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 80,
        '&:focus': {
          width: 100,
        },
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'center',
      color: 'gray',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 300,
        },
      },
    },
    TableEmph: {
      background: '#0f313b1f'
    },
  }),
);

function SearchAppBar({value, onSearch, onRefresh, time, onTimeChange}) {
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
            onClick={() => onRefresh(value)}
          >
            <RefreshIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            HackAZ 2020 Event Client
            
          </Typography>
          <div className={classes.time}>
            <InputBase
              value={time}
              onChange={onTimeChange}
              placeholder="-Minutes"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.search}>
            <InputBase
              value={value}
              onChange={onSearch}
              placeholder="Source Id"
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

function makePositionData(position, classes, key) {
  return [
  <TableCell align="right" key={key+"1"}>{ position.latitude }</TableCell>,
  <TableCell align="right" key={key+"2"}>{ position.longitude }</TableCell>,
  <TableCell align="right" key={key+"3"}>{ position.altitude }</TableCell>,
  <TableCell align="right" key={key+"4"}>{ position.heading }</TableCell>,
  <TableCell align="right" key={key+"5"}>{ position.velocity }</TableCell>,
  ]
}

function makePositionHeading(title, classes) {
  return [
  <TableCell align="right" key={ `${title}-latitude` }>{ `${title}-latitude` }</TableCell>,
  <TableCell align="right" key={ `${title}-long` }>{ `${title}-longitude` }</TableCell>,
  <TableCell align="right" key={ `${title}-alt` }>{ `${title}-altitude` }</TableCell>,
  <TableCell align="right" key={ `${title}-head` }>{ `${title}-heading` }</TableCell>,
  <TableCell align="right" key={ `${title}-vel` }> {`${title}-velocity` }</TableCell>,
  ]
}

function SimpleTable({data}) {
  console.log(data)

  return (
    <TableContainer className="table" component={Paper}>
      <Table  size="small" stickyHeader>
        <TableHead>
          <TableRow key="header">
             <TableCell align="right">{ 'alarmId' }</TableCell>
             <TableCell align="right">{ 'streamId' }</TableCell>
             <TableCell align="right">{ 'sourceId' }</TableCell>
             <TableCell align="right">{ 'type' }</TableCell>
             <TableCell align="right">{ 'region' }</TableCell>
             {makePositionHeading('position')}
             {makePositionHeading('target1Position')}
             {makePositionHeading('target2Position')}
             {makePositionHeading('target3Position')}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data && data.map((alarm,i) => (
            <TableRow key={i}>
              <TableCell align="right" key="alarmId">{ alarm.alarmId }</TableCell>
              <TableCell align="right"key="streamId">{ alarm.streamId }</TableCell>
              <TableCell align="right"key="sourceId">{ alarm.sourceId }</TableCell>
              <TableCell align="right"key="type">{ alarm.type }</TableCell>
              <TableCell align="right"key="regin">{ alarm.region }</TableCell>
             {makePositionData(alarm.position)}
             {makePositionData(alarm.target1Position)}
             {makePositionData(alarm.target2Position)}
             {makePositionData(alarm.target3Position)}
            </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </TableContainer>
  )
}




let data
function App() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState('5cf1009186ef473aa4a4c3109d0982bb')
  const [time, setTime] = React.useState('60')
  const [data, setData] = React.useState([])

  function search(term) {
    setSearchTerm(term)
    doSearch(term)
  }

  function doSearch() {
    const params = { minutesToSearch: parseInt(time) } 
    axios.get(`https://hackaz.modularminingcloud.com/api/Alert/${searchTerm}`, params).then(response => response.data && setData(response.data)).catch(err => setData([]))
  }

  const simpleTable = React.useMemo(() => <SimpleTable data={data} />, [data])

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
        <SearchAppBar time={time} value={searchTerm} onTimeChange={event => setTime(event.target.value)} onSearch={event => setSearchTerm(event.target.value)} onRefresh={doSearch} />
      <div className="Body">
        <div className="row">
          <div className="column">
            {simpleTable}
          </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
