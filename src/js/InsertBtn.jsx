import React from 'react';

export default class InsertBtn extends React.Component {

  constructor(){
    super();

    this.state = {
      todoItem: ""
    }

    // Bind function to this component instances.
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    this.props.handleAddNew(this.state.todoItem)
  }

  handleChange(e) {
    var newState = {
      todoItem: e.target.value
    }

    this.setState(newState)
  }

  render(){

    return(
      <div>
        <input type="text" onChange={this.handleChange} />
        <input type="submit" value ={this.props.btnValue +" up"} onClick={this.handleSubmit.bind(this)}/>
      </div>
    )

  }

}
