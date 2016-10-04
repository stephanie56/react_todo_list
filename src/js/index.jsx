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
      myList: ['Create Flyer', 'Work on Outreach Plan']
    }

  }

  // Component Render.
  render() {
    return (
      <div>
        <ListHeader/>
        <ListContainer listData={this.state.myList}/>
        <InsertBtn />
      </div>
    )
  }
}

// Render to the DOM.
ReactDOM.render(<SimpleList/>, document.getElementById('react-target'));
