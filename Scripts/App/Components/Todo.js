/** @jsx React.DOM */
var React = require('react');
var markdown = require('markdown').markdown;

var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var createItem = function(itemText) {
      return React.DOM.li( {dangerouslySetInnerHTML:{ __html: markdown.toHTML(itemText)}});
    };
    return React.DOM.ul(null, this.props.items.map(createItem));
  }
});
var TodoApp = React.createClass({displayName: 'TodoApp',
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
      React.DOM.div(null, 
        React.DOM.h3(null, "TODO (supports Markdown syntax):"),
        TodoList( {items:this.state.items} ),
        React.DOM.form( {onSubmit:this.handleSubmit}, 
          React.DOM.input( {onChange:this.onChange, value:this.state.text} ),
          React.DOM.button(null, 'Add #' + (this.state.items.length + 1))
        )
      )
      );
  }
});

module.exports = TodoApp;
