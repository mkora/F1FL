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
import Footer from '../components/Footer';
import { circuits, laps } from '../api';
import withRoot from '../withRoot';
import 'react-vis/dist/style.css';

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
    this.setState({ isOpenDialog: false });
  };

  handleSnackCloseClick = () => {
    this.setState({ isOpenSnack: false });
  };

  handleSearchClick = (ids) => async () => {
    try {
      const timesData = await laps(ids);
      if(timesData.status) {
        this.setState({ 
          times: timesData.data,
          isOpenDialog: false,
          isLoading: false,
          isError: false,
        });
console.log(timesData.data);
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
      isError,
      isLoading,
      isOpenDialog,
      isOpenSnack,
      checked,
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
            <Typography variant="title" color="inherit" className={classes.flex}>
              F1 Fastest lap by circuit
            </Typography>
            <Button
              color="inherit"
              onClick={this.handleOpenClick}
              disabled={isError}
            >Choose circuits</Button>
          </Toolbar>
        </AppBar>

        <Paper className={classes.paper}>
          Graph is here
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
            autoHideDuration={6000}
            onClose={this.handleSnackCloseClick}
          >
            <WrappedSnackbarContent
              variant="error"
              className={classes.margin}
              message="Oops! Something went wrong! Please, try again later."
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
