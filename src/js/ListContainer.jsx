import React from 'react';

export default class ListContainer extends React.Component {

  // compnent Render

  render(){

    var listData = this.props.listData.map( (item, idx, arr) => {
      return <li key={item+idx}>{item}</li>
    } );

    return (
      <div>
        <ul>
          {listData}
        </ul>
      </div>
    )

  }


}
