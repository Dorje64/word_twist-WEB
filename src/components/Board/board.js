import React, { Component, Fragment } from 'react';
import  './board.scss';

const alphabates = 'abcdefghijklmnopqrstuvwxyz'.split('');
export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      perRow: this.props.perRow || 4,
      borderColor: this.props.borderColor || 'coral',
      borderWidth: this.props.borderWith || '4px',
      alphabates: this.props.alphabates,
      clickedItems: this.props.clickedItems
    }
  }

  generateRow = (col, letterArray) => {
  
    const {perRow, borderColor, borderWidth, clickedItems} = this.state;
    const Rows = [];

    for( let i = 0; i < perRow; i++){
      const letter = letterArray[i];
      const cordinate = `${col}-${i}`
      // this.setState({table[col][i]:letter })
      Rows.push(<div
                  className={"square " + AvoidClick(cordinate, clickedItems) }  
                  style={{borderColor: borderColor, borderWidth: borderWidth }} 
                  key={`${col}-${i}`}
                  onClick={_ => { this.props.getLetter(letter, cordinate) }}
                >
                  <div className="content">  {letter.toUpperCase()} </div> 
                </div>)
    }
    return Rows;
  }

  render(){
    const { perRow, alphabates } = this.state;
    const Columns = []

    for (let index = 0; index < perRow; index++) {
      Columns.push(<div className="d-flex d-row" key={index}> { this.generateRow(index, alphabates[index])} </div>)
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


Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

//Style.js

export const AvoidClick = (cordinate, clickedItems) => {
  // const {clickedItems} = this.state;
  // console.log(clickedItems.includes(cordinate))
  return clickedItems.includes(cordinate) ? 'avoid-clicks text-muted' : 'text-light';
}