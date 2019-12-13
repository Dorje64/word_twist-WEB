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
      disabledItems: this.props.disabledItems
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // debugger;
    if (nextProps.disabledItems !== prevState.disabledItems) {
      return ({ disabledItems: nextProps.disabledItems }) // <- this is setState equivalent
    }
  }

  generateRow = (col, letterArray) => {
  
    const {perRow, borderColor, borderWidth, disabledItems} = this.state;
    const Rows = [];
    // if(disabledItems == []){
      // debugger
    // }

    for( let i = 0; i < perRow; i++){
      const letter = letterArray[i];
      const cordinate = `${col}-${i}`
      // this.setState({table[col][i]:letter })
      Rows.push(<div
                  className={"square " + AvoidClick(cordinate, disabledItems) }  
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

export const AvoidClick = (cordinate, disabledItems) => {
  // const {disabledItems} = this.state;
  // console.log(disabledItems.includes(cordinate))
  return disabledItems.includes(cordinate) ? 'avoid-clicks text-muted' : 'text-light';
}