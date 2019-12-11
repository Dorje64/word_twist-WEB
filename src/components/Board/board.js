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
    }
  }

  generateRow = (col) => {
    const { perRow } = this.state; 
    const {borderColor, borderWidth} = this.state;
    const Rows = [];

    for( let i = 0; i < perRow; i++){
      const letter = alphabates.random();
      // this.setState({table[col][i]:letter })
      Rows.push(<div className="square" 
                style={{borderColor: borderColor, borderWidth: borderWidth }} 
                key={`${col}-${i}`}
                onClick={_ => { this.props.getLetter(letter) }}
                >
        <div className="content">  {letter} </div> 
      </div>)
    }
    return Rows;
  }

  render(){
    const { perRow } = this.state;
    const Columns = []

    for (let index = 0; index < perRow; index++) {
      Columns.push(<div className="d-flex d-row" key={index}> { this.generateRow(index)} </div>)
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