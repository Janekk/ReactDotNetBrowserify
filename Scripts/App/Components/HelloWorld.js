/** @jsx React.DOM */
var React = require('react');

var HelloWorld = React.createClass({displayName: 'HelloWorld',
  render: function() {
    return (
      React.DOM.p(null,  " Hello ", this.props.name,"! " )
      );
  }
});
module.exports = HelloWorld;
