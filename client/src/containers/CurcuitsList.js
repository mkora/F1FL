import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  root: {
    
  },
});

class CurcuitsList extends Component {
  state = {
    checked: [],
    chooseAll: false,
  };

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleChooseAll = (event) => {
    const chooseAll = event.target.checked;
    const { checked } = this.state;
    const newChecked = [];

    if (chooseAll) {
      console.log(checked);
      // fill out newChecked
    }

    this.setState({
      chooseAll: chooseAll,
      checked: newChecked,
    })
  };

  render() {
    const { classes } = this.props;
    const data = [0, 1, 2, 3];
    
    const { checked, chooseAll } = this.state;

    return (
      <div className={classes.root}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={chooseAll}
                onChange={this.handleChooseAll}
              />
            }
            label="Choose All"
          />
        </FormGroup>              
        <List>
            {data.map((value, key) => (
              <ListItem
                key={`curcuit-${key}`}
                role={undefined}
                button
                onClick={this.handleToggle(value)}
                className={classes.listItem}
              >
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`Line item ${value + 1}`} />
              </ListItem>
            ))}
          </List>        
      </div>
    );
  }
}

CurcuitsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurcuitsList);
