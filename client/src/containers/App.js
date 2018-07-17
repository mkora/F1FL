import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import WrappedCircuitsList from './WrappedCircuitsList';
import Footer from '../components/Footer';
import { circuits, laps } from '../api';
import withRoot from '../withRoot';
import '../css/App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 2,
  },
  container: {
    padding: theme.spacing.unit * 2,
  },  
  paper: {
    color: theme.palette.text.secondary,
  },
});

class App extends Component {

  state = {
    circuits: [],
    error: false,
    loading: true,
    open: false,
  };

  async componentDidMount() {
    try {
      const circuitsData = await circuits();
      if(circuitsData.status) {
        this.setState({ 
          circuits: circuitsData.data,
          loading: false,
        });
      } else {
        this.setState({
        error: true,
        loading: false,
      });        
      }
    } catch (err) {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      circuits,
      error,
      loading,
    } = this.state;

    const showCircuits = !error && circuits.length;

    return (
      <div className={classes.root}>
        <Typography variant="display1" align="center">
          F1 Fastest Lap by Curcuit
        </Typography>
        <Paper className={classes.paper}>
          <Button
            onClick={this.handleClickOpen}
            disabled={error}
          >Choose circuits</Button>
          Graph is here
        </Paper>

        { showCircuits && <WrappedCircuitsList data={circuits} /> }
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
