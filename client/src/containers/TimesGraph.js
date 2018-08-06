import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  Hint,
} from 'react-vis';
import { tStringOf } from '../util/moment';

const styles = theme => ({
  root: {

  },
});

class TimesGraph extends Component {
  state = {
    tooltip: null,
  };

  static xTickFormatValue = (v) => tStringOf(v);

  static yTickFormatValue = (v) => `${v}`;

  handleMouseOver = (tooltip) => {
    this.setState({ tooltip });
  }

  handleMouseOut = () => {
    this.setState({
      tooltip: null
    });
  }


  render() {
    const { tooltip } = this.state;
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

        { data.map((d, k) => <LineMarkSeries
            onValueMouseOver={this.handleMouseOver}
            onValueMouseOut={this.handleMouseOut}
            key={k}
            data={d}/>
          )
        }
        {tooltip &&
          <Hint value={tooltip}>
            <div className="rv-hint__content">
              {`year: ${tooltip.y}`}
              <br />
              {`time: ${tStringOf(tooltip.x)}`}
            </div>
          </Hint>
        }

      </XYPlot>
    );
  }
}

TimesGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(TimesGraph);
