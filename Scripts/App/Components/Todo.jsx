var React = require('react');
var markdown = require('markdown').markdown;
var ElapsedTime = require('./ElapsedTime');

var TodoItem = React.createClass({
  render: function() {
    return <li>
      <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(this.props.text)}}></div>
      <div className='elapsed'>Added <ElapsedTime since={this.props.createdAt}/></div>
    </li>;
  }
});

var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <TodoItem text={item.Text} createdAt={item.CreatedAt}/>;
    };
    return <ol>{this.props.items.map(createItem)}</ol>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    var items = this.props.entries ? this.props.entries.slice(0) : [];
    return {items: items, text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if(this.state.text.length > 0) {
      var nextItems = this.state.items.concat([{Text: this.state.text, CreatedAt: (new Date).toJSON()}]);
      var nextText = '';
      this.setState({items: nextItems, text: nextText});
    }
  },
  render: function() {
    return (
      <div className='todo'>
        <h3>your todos:</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
          <div className='hint'>*supports Markdown syntax</div>
        </form>
      </div>
      );
  }
});

module.exports = TodoApp;