import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import WrappedCircuitsList from '../components/WrappedCircuitsList';
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
    isOpen: false,
    isCheckedAll: false,
  };

  async componentDidMount() {
    try {
      const circuitsData = await circuits();
      if(circuitsData.status) {
        this.setState({ 
          circuits: circuitsData.data,
          isLoading: false,
        });
      } else {
        this.setState({
        isError: true,
        isLoading: false,
      });        
      }
    } catch (err) {
      this.setState({
        isError: true,
        isLoading: false,
      });
    }
  }

  handleOpenClick = () => {
    this.setState({ isOpen: true });
  };

  handleCloseClick = () => {
    this.setState({ isOpen: false });
  };

  handleSearchClick = (ids) => async () => {
    try {
      const timesData = await laps(ids);
      if(timesData.status) {
        this.setState({ 
          times: timesData.data,
          isOpen: false,
          isLoading: false,
        });
console.log(timesData.data);
      } else {
        this.setState({
          isError: true,
          isOpen: false,
          isLoading: false,
        });        
      }
    } catch (err) {
      this.setState({
        isError: true,
        isOpen: false,
        isLoading: false,
      });
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
      isOpen,
      checked,
      isCheckedAll,
    } = this.state;

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
            isOpen={isOpen}
            checked={checked}
            isCheckedAll={isCheckedAll}
            onSearchClick={this.handleSearchClick(checked)}
            onCloseClick={this.handleCloseClick}
            onCheckedChange={this.handleCheckedChange}
            onCheckedAllClick={this.handleCheckedAllClick}
          />
        }
        { !showCircuits && <div>ERROR</div>}
  
        <Footer />       
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
