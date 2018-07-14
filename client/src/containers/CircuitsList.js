import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  root: {},
  header: {

  }
});

class CircuitsList extends Component {
  state = {
    checked: [],
    isChoosedAll: false,
  };

  handleToggle = (value) => () => {
    this.setState((prevState) => {
      const { checked } = prevState;

      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      return {
        checked: newChecked,
        isChoosedAll: newChecked.length
          === this.props.data.length,
      };
    });
  };

  handleChooseAll = () => {
    this.setState((prevState) => {
      const { isChoosedAll } = prevState;

      return {
        isChoosedAll: !isChoosedAll,
        checked: !isChoosedAll
          ? this.props.data.map((v) => v.id) : [],
      };
    });
  };

  render() {
    const { 
      data,
      classes,
    } = this.props;
    const {
      checked,
      isChoosedAll,
    } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChoosedAll}
                disableRipple
                onClick={this.handleChooseAll}
              />
            }
            label="Choose All"
          />
        </div>              
        <List>
            {data.map((d) => (
              <ListItem
                key={d.circuitId}
                role={undefined}
                button
                onClick={this.handleToggle(d.circuitId)}
                className={classes.listItem}
              >
                <Checkbox
                  checked={checked.indexOf(d.circuitId) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={d.name} />
              </ListItem>
            ))}
          </List>        
      </div>
    );
  }
}

CircuitsList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(CircuitsList);
