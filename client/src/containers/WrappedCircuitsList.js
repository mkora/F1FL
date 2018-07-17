import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

import CircuitsList from './CircuitsList';

const styles = theme => ({ 
  paper: {
    color: theme.palette.text.secondary,
  },
});

class WrappedCircuitsList extends Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };  

  render() {
    const { 
      classes,
      circuits,
    } = this.props;

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClickClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Choose Circuits"}</DialogTitle>
        <DialogContent>
          <Paper className={classes.paper}>
            <CircuitsList data={circuits}/>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickClose} color="primary">
            Search
          </Button>
          <Button onClick={this.handleClickClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

WrappedCircuitsList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withMobileDialog()(withStyles(styles)(WrappedCircuitsList));
