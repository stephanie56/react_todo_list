import React from 'react';

export default class ListContainer extends React.Component {

  // compnent Render

  render(){

    /*
    var listData = this.props.listData;
    var itemRow = [];
    for(var i=0 ; i<listData.length; i++){
      itemRow.push(
        <li>{listData[i]}</li>
      );
    }
    */
    var itemRow = this.props.listData.map(function(item, idx, arr) {
      return (
        <li key={idx}>
          {item}
        </li>
      )
    });

    return (
      <div>
        <ul>
          {itemRow}
        </ul>
      </div>
    )

  }


}
