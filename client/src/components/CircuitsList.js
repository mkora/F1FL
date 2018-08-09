import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {},
});

const CircuitsList = ({
  classes,
  data,
  checked,
  isCheckedAll,
  onCheckedChange,
  onCheckedAllClick,
}) => {
  const columnCount = Math.floor(data.length / 3);
  const columnData = [
    data.slice(0, columnCount),
    data.slice(columnCount, columnCount * 2),
    data.slice(columnCount * 2),
  ];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCheckedAll}
              disableRipple
              onClick={onCheckedAllClick}
            />
          }
          label="Choose All"
        />
      </div>
      <List disablePadding={true}>
        <Grid container spacing={0}>
          {columnData.map((row, k) => (
            <Grid 
              item
              xs={12} sm={6} md={4}
              key={`column-${k}`}
            >
              {row.map((d) => (
                <ListItem
                  key={d.circuitId}
                  role={undefined}
                  button
                  onClick={onCheckedChange(d.circuitId)}
                  className={classes.listItem}
                  dense={true}
                >
                  <Checkbox
                    checked={checked.indexOf(d.circuitId) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={d.name} />
                </ListItem>
              ))}
            </Grid>
          ))}
        </Grid>
      </List>        
    </div>
  );
}

CircuitsList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  checked: PropTypes.array.isRequired,
  isCheckedAll: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
  onCheckedAllClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(CircuitsList);
