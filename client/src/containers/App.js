import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import CurcuitsList from './CurcuitsList';
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
    circuits: [
      { id: 1, name: 'List 1' },
      { id: 2, name: 'List 2' },
      { id: 3, name: 'List 3' },
      { id: 4, name: 'List 4' },
      { id: 5, name: 'List 5' },
    ],    
  };

  render() {
    const { classes } = this.props;
    const { circuits } = this.state;

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
              <CurcuitsList data={circuits}/>
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
