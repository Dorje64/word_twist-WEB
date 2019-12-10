import React, { Component, Fragment } from 'react';
import  './board.scss';
export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      perRow: 4
    }
  }

  render(){
    const { perRow } = this.state;
    const Rows = [];
    const Columns = []
    for( let i = 0; i < perRow; i++){
      Rows.push(<div className="p-2 square"></div>)
    }

    for (let index = 0; index < perRow; index++) {
      Columns.push(<div className="d-flex d-row"> { Rows } </div>)
    }
    
    return(
      <Fragment>
        <div className="d-flex flex-column">
          {Columns}
        </div>
      </Fragment>
    )
  }
}