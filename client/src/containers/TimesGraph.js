import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  Hint,
  DiscreteColorLegend,
} from 'react-vis';
import { tStringOf } from '../util/moment';

const styles = theme => ({
  legend: {
    paddingBottom: 20,
  }
});

class TimesGraph extends Component {
  state = {
    tooltip: null,
    highlight: null,
  };

  static xTickFormatValue = (v) => tStringOf(v);

  handleMouseOver = (tooltip) => {
    this.setState({ tooltip });
  }

  handleMouseOut = () => {
    this.setState({
      tooltip: null
    });
  }

  handleSeriesMouseOver = (str) => () => {
    this.setState({
      highlight: str,
    });
  }

  handleSeriesMouseOut = () => {
    this.setState({
      highlight: null,
    });
  }

  render() {
    const {
      tooltip,
      highlight,
    } = this.state;
    const {
      classes,
      data,
      legend,
    } = this.props;

    const flatten = data
      .map(d => d.map(e => e.x))
      .reduce((acc, val) => acc.concat(val), []);
    const xMin = Math.min(...flatten) - 2500;
    const xMax = Math.max(...flatten);

    return (
      <Grid container spacing={0}>
        <Grid item md={12} lg={8}>
          <XYPlot
            onMouseLeave={this.handleMouseLeave}
            width={768}
            height={460}
            xType="linear"
            xDomain={[xMin, xMax]}
            yType="ordinal"
            margin={{
              top: 10,
              right: 10,
              left: 60,
              bottom: 40
            }}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis
              title="Fastest lap (minutes:seconds.milliseconds)"
              tickFormat={TimesGraph.xTickFormatValue}
            />
            <YAxis title="Period of time (year)" />
            { data.map((d, k) => {
                return (
                  <LineMarkSeries
                    onValueMouseOver={this.handleMouseOver}
                    onValueMouseOut={this.handleMouseOut}
                    onSeriesMouseOver={this.handleSeriesMouseOver(legend[k].title)}
                    onSeriesMouseOut={this.handleSeriesMouseOut}
                    stroke={legend[k].title === highlight ? 'black' : null}
                    size="3"
                    key={k}
                    data={d}
                  />
                );
              })
            }
            {tooltip &&
              <Hint value={tooltip}>
                <div className="rv-hint__content">
                  {highlight && <strong>{`${highlight}`}<br /></strong>}
                  {`year: ${tooltip.y}`}
                  <br />
                  {`time: ${tStringOf(tooltip.x)}`}
                </div>
              </Hint>
            }
          </XYPlot>
        </Grid>
        <Grid item md={12} lg={4} className={classes.legend}>        
          <DiscreteColorLegend
            height={460}
            width={460}
            items={legend}
          />
        </Grid>
      </Grid>
    );
  }
}

TimesGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  legend: PropTypes.array.isRequired,
};

export default withStyles(styles)(TimesGraph);
