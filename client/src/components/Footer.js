import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    paddingTop: theme.spacing.unit * 2,
  },
});

const Footer = ({
  classes
}) => (
  <Typography
    variant="body2"
    align="right"
    className={classes.footer}
  >
    Data provided by <Button
      target="_blank"
      rel="noopener noreferrer"
      href="http://ergast.com/mrd/db/"
    >Ergast</Button>
  </Typography>
);

export default withStyles(styles)(Footer);
