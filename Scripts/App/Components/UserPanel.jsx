var React = require('react');
var ElapsedTime = require('./ElapsedTime');

var UserPanel = React.createClass({
  render: function() {
    return (
      <div>
        <div className='greeting'> Hello {this.props.name}! </div>
        <a className='logout' href='#'>Log out</a>
        <div className='elapsed'>Logged in <ElapsedTime since={new Date()}/></div>
      </div>
      );
  }
});
module.exports = UserPanel;
