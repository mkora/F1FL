import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import WrappedCircuitsList from '../components/WrappedCircuitsList';
import WrappedSnackbarContent from '../components/WrappedSnackbarContent';
import TimesGraph from './TimesGraph';
import Footer from '../components/Footer';
import { circuits, laps } from '../api';
import withRoot from '../withRoot';
import 'react-vis/dist/style.css';
import { tValueOf } from '../util/moment';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },  
  paper: {
    color: theme.palette.text.secondary,
  },
});

class App extends Component {

  state = {
    circuits: [],
    times: [],
    checked: [],
    prevChecked: [],
    isError: false,
    isLoading: true,
    isOpenDialog: false,
    isOpenSnack: false,
    isCheckedAll: false,
  };

  async componentDidMount() {
    try {
      const circuitsData = await circuits();
      if(circuitsData.status) {
        this.setState({ 
          circuits: circuitsData.data,
          isLoading: false,
          isError: false,
        });
      } else {
        this.setState({
          isError: true,
          isLoading: false,
          isOpenSnack: true,
        });
        console.log(circuitsData.error);
      }
    } catch (err) {
      this.setState({
        isError: true,
        isLoading: false,
        isOpenSnack: true,
      });
      console.log(err);
    }
  }

  handleOpenClick = () => {
    this.setState({ isOpenDialog: true });
  };

  handleCloseClick = () => {
    const {
      prevChecked,
      circuits,
    } = this.state;
    this.setState({
      checked: prevChecked,
      isCheckedAll: prevChecked.length === circuits.length,
      isOpenDialog: false,
    });
  };

  handleSnackCloseClick = () => {  
    this.setState({ isOpenSnack: false });
  };

  handleSearchClick = (ids) => async () => {
    if (!ids.length) {
      this.setState({
        times: [],
        checked: [],
        prevChecked: [],
        isError: false,
        isCheckedAll: false,
        isOpenDialog: false,
      });
    }
    try {
      const timesData = await laps(ids);
      if(timesData.status) {
        this.setState({ 
          times: Object
            .values(timesData.data)
            .map((circuit) => 
              circuit.map((d) => {
                return {
                  x: tValueOf(d.fastestLapTime),
                  y: d.year,
                };
              })
            ),
          prevChecked: this.state.checked,
          isOpenDialog: false,
          isLoading: false,
          isError: false,
        });
      } else {
        this.setState({
          isError: true,
          isOpenSnack: true,
          isOpenDialog: false,
          isLoading: false,
        });
        console.log(timesData.error);
      }
    } catch (err) {
      this.setState({
        isError: true,
        isOpenSnack: true,
        isOpenDialog: false,
        isLoading: false,
      });
      console.log(err);
    }    
  }

  handleCheckedChange = (value) => () => {
    this.setState((prevState) => {
      const { checked, circuits } = prevState;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      return {
        isCheckedAll: newChecked.length === circuits.length,
        checked: newChecked,
      };
    });
  }

  handleCheckedAllClick = () => {
    const { isCheckedAll } = this.state;
    const checked = !isCheckedAll
      ? this.state.circuits.map((v) => v.circuitId) : [];
    this.setState({
      checked,
      isCheckedAll: !isCheckedAll,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      circuits,
      times,
      isError, 
      isLoading,
      isOpenDialog,
      isOpenSnack,
      checked,
      prevChecked,
      isCheckedAll,
    } = this.state;

    if (isLoading) {
      return <LinearProgress color="primary" />
    }

    const showCircuits = !isError && circuits.length;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}>
              F1 Fastest lap by circuit
            </Typography>
            <Button
              color="inherit"
              onClick={this.handleOpenClick}
              disabled={isError}>
              Choose circuits
            </Button>
          </Toolbar>
        </AppBar>

        <Paper className={classes.paper}>
          { (times.length)
              ? <TimesGraph
                data={times}
                legend={prevChecked
                  ? circuits
                    .filter(c => prevChecked.indexOf(c.circuitId) !== -1)
                    .map(c => {
                      return { title: c.name };
                    })
                  : []
                }
              />
              : <Typography
                variant="body2"
                align="center"
                gutterBottom>
                Click `Choose circuits` and build a fastest lap times chart by seasons on circuits.
                <br/>
                Lap time data is available starting from the 1996 season.
              </Typography>
          }
        </Paper>

        { showCircuits
          && <WrappedCircuitsList
            data={circuits}
            isOpen={isOpenDialog}
            checked={checked}
            isCheckedAll={isCheckedAll}
            onSearchClick={this.handleSearchClick(checked)}
            onCloseClick={this.handleCloseClick}
            onCheckedChange={this.handleCheckedChange}
            onCheckedAllClick={this.handleCheckedAllClick}
          />
        }

        { !showCircuits &&
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={isOpenSnack}
            autoHideDuration={6000}>
              <WrappedSnackbarContent
                variant="error"
                className={classes.margin}
                message="Oops! Something went wrong! Please, try again later."
                onClose={this.handleSnackCloseClick}
              />
          </Snackbar>
        }
  
        <Footer />       
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
