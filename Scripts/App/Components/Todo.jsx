var React = require('react');
var markdown = require('markdown').markdown;

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li dangerouslySetInnerHTML={{ __html: markdown.toHTML(itemText)}}></li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    var items = this.props.initialItems ? this.props.initialItems.slice(0) : [];
    return {items: items, text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>Markdown TODO:</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
      );
  }
});

module.exports = TodoApp;