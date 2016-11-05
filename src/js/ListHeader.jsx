import React from 'react';

export default class ListHeader extends React.Component {

  // compnent Render

  render(){

    console.log(this.props.listName)
    return (

      <h1>{this.props.listName} To-Do List</h1>

    )

  }


}
