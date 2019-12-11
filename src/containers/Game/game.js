import React, { Component, Fragment } from 'react';
import Board from '../../components/Board';
import Stats from '../../components/Stats';
import './style.scss'

export default class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      word: ''
    }
  }

  componentDidMount(){

  }
  getLetter = letter => {
    console.log(letter)
  }

  render(){
    return <div className="row">
      <div className="col bg-info full-height  pt-5">
        <div className="board-wrapper mx-auto">
        <Board 
          perRow = {4}
          borderColor = 'abc'
          borderWidth = '2px'
          getLetter = {this.getLetter}
        />
        </div>
      </div>
      <div className="col bg-success full-height">
          <Stats />
      </div>
    </div>
  }

}

