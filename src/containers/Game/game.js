import React, { Component, Fragment } from 'react';
import Board from '../../components/Board';
import Stats from '../../components/Stats';
import './style.scss'

export default class Game extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){

  }

  render(){
    return <div className="row">
      <div className="col bg-info full-height">
        <Board />
      </div>
      <div className="col bg-success full-height">
          <Stats />
      </div>
    </div>
  }

}