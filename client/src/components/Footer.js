import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    padding: theme.spacing.unit * 2,
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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
    Data provided by <a
      target="_blank"
      rel="noopener noreferrer"
      href="http://ergast.com/mrd/db/"className={classes.link}>
      Ergast
    </a>
  </Typography>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
