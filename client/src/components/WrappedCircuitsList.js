import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

import CircuitsList from '../containers/CircuitsList';

const styles = theme => ({ 
  root: {
    color: theme.palette.text.secondary,
  },
});

const WrappedCircuitsList = ({
  classes,
  open,
  data,
  onClickClose,
}) => (
  <Dialog
    open={open}
    onClose={onClickClose}
    aria-labelledby="dialog-title"
    className={classes.root}
    scroll="body"
  >
    <DialogTitle id="responsive-dialog-title">
      Add circuits for display
    </DialogTitle>
    <DialogContent>
      <CircuitsList data={data}/>
    </DialogContent>
    <DialogActions>
      <Button 
        onClick={onClickClose}
        color="primary"
      >Search
      </Button>
      <Button
        onClick={onClickClose}
        color="primary"
        autoFocus
      >Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

WrappedCircuitsList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClickClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(withStyles(styles)(WrappedCircuitsList));
