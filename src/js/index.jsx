// React.
import React from 'react';
import ReactDOM from 'react-dom';
import ListHeader from './ListHeader.jsx';
import ListContainer from './ListContainer.jsx';
import InsertBtn from './InsertBtn.jsx';

class SimpleList extends React.Component {

  // Constructor.
  constructor() {
    super();

    this.state = {
      myList: ['Create Flyer', 'Work on Outreach Plan'],
      correctList: [{'name': 'create flyer', 'checked': true}],
      userName: 'stephanie56',
      favoriteDrink: 'beer'
    }

  }

 handleAddNew(item) {

   // copy of old list
    var listCopy = this.state.myList.slice();

    listCopy.push(item);

    this.setState({
      myList: listCopy
    })

  }




  // Component Render.
  render() {
    return (
      <div>

        <ListHeader listName = {this.state.userName}/>

        <ListContainer
          listData={this.state.myList}

        />

      <InsertBtn handleAddNew={this.handleAddNew.bind(this)} btnValue ={this.state.favoriteDrink} />
      </div>
    )
  }
}

// Render to the DOM.
ReactDOM.render(<SimpleList/>, document.getElementById('react-target'));
