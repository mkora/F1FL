import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis';

const styles = theme => ({
  root: {

  },
});

class TimesGraph extends Component {
  state = {
    crosshairValues: [],
  };

  handleNearestX = (value, { index }) => {
    this.setState({
      crosshairValues: this.props.data.map(d => d[index])
    });
  }

  handleMouseLeave = () => {
    this.setState({
      crosshairValues: []
    });
  }

  render() {
    const { data } = this.props;
    const { crosshairValues } = this.state;
    return (
      <XYPlot
        onMouseLeave={this.handleMouseLeave}
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />

        <LineSeries
          onNearestX={this.handleNearestX}
          data={data[0]}/>
        <LineSeries
          data={data[1]}/>
        
        <Crosshair values={crosshairValues} />
      </XYPlot>
    );
  }
}

TimesGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(TimesGraph);
