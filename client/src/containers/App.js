import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import CircuitsList from './CircuitsList';
import { circuits } from '../api';
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
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>Graphs are here</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              { showCircuits && <CircuitsList data={circuits}/> }
              { !showCircuits && <div>ERROR</div>}
            </Paper>
          </Grid>        
        </Grid>
        <Footer />       
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
