var React = require('react');
var moment= require('moment');

var ElapsedTime = React.createClass({
  getInitialState: function () {
    return {secondsElapsed: 0};
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  tick: function () {
    if (this.state.secondsElapsed >= 59) {
      clearInterval(this.interval);
      this.interval = setInterval(this.tick, 60000);
    }
    this.setState({secondsElapsed: moment().diff(moment(this.props.since), 'seconds')});
  },
  render: function () {
    return (
      <span>{moment(this.props.since).fromNow()}</span>
      );
  }
});


module.exports = ElapsedTime;