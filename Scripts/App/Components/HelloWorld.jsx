var React = require('react');

var HelloWorld = React.createClass({
  render: function() {
    return (
      <p> Hello {this.props.name}! </p>
      );
  }
});
module.exports = HelloWorld;