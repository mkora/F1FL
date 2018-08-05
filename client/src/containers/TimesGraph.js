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
} from 'react-vis';
import { tStringOf } from '../util/moment';

const styles = theme => ({
  root: {

  },
});

class TimesGraph extends Component {

  static xTickFormatValue = (v) => tStringOf(v);

  static yTickFormatValue = (v) => `${v}`;

  render() {
    const { data } = this.props;

    const flatten = data
      .map(d => d.map(e => e.x))
      .reduce((acc, val) => acc.concat(val), []);
    const xMin = Math.min(...flatten);
    const xMax = Math.max(...flatten);

    return (
      <XYPlot
        onMouseLeave={this.handleMouseLeave}
        width={750}
        height={400}
        xType="linear"
        xDomain={[xMin, xMax]}
        yType="linear"
        margin={{top: 10, right: 10, left: 60, bottom: 40}}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={TimesGraph.xTickFormatValue}/>
        <YAxis tickFormat={TimesGraph.yTickFormatValue}/>

        { data.map((d, k) => <LineSeries
          key={k}
          data={d}/>) }

      </XYPlot>
    );
  }
}

TimesGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(TimesGraph);
