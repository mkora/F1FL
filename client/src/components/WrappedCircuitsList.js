import React from 'react';
import PropTypes from 'prop-types';
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
  isOpen,
  data,
  checked,
  onCloseClick,
  onCheckedChange,
}) => (
  <Dialog
    open={isOpen}
    onClose={onCloseClick}
    aria-labelledby="dialog-title"
    className={classes.root}
    scroll="body"
    fullWidth={true}
    maxWidth="md"
  >
    <DialogTitle id="responsive-dialog-title">
      Add circuits for display
    </DialogTitle>
    <DialogContent>
      <CircuitsList
        onCheckedChange={onCheckedChange}
        data={data}
        checked={checked}
      />
    </DialogContent>
    <DialogActions>
      <Button 
        onClick={onCloseClick}
        color="primary"
      >Search
      </Button>
      <Button
        onClick={onCloseClick}
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
  isOpen: PropTypes.bool.isRequired,
  checked: PropTypes.array.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
};

export default withMobileDialog()(withStyles(styles)(WrappedCircuitsList));
