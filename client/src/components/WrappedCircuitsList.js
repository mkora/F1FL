import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

import CircuitsList from '../components/CircuitsList';

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
  isCheckedAll,
  onSearchClick,
  onCloseClick,
  onCheckedChange,
  onCheckedAllClick,
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
        checked={checked}
        isCheckedAll={isCheckedAll}      
        onCheckedChange={onCheckedChange}
        onCheckedAllClick={onCheckedAllClick}
        data={data}
      />
    </DialogContent>
    <DialogActions>
      <Button 
        onClick={onSearchClick}
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
  isCheckedAll: PropTypes.bool.isRequired,
  onSearchClick: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
  onCheckedAllClick: PropTypes.func.isRequired,
};

export default withMobileDialog()(withStyles(styles)(WrappedCircuitsList));
