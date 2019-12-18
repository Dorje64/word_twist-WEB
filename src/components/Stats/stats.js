import React, { Component, Fragment } from 'react';
import './style.scss';

export default class Stats extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     correctsWords: this.props.correctsWords,
  //     inCorrectWords: this.props.inCorrectWords
  //   }
  // }

  // componentDidMount(){

  // }

  render(){
    const { correctsWords, inCorrectWords } = this.props; 
    return (
      <Fragment>
         
            <div className="list-group d-flex flex-column-reverse word-stack">
            { correctsWords.map(word => Word(word, 'success')) }
            <h4 className="text-light"> Corrects Stack</h4>
            </div>
              
            <div className= "list-group d-flex flex-column-reverse word-stack">
              { inCorrectWords.map(word => Word(word, 'danger')) }
              <h4 className="text-light">Incorrect Stack</h4>
            </div>
         
      </Fragment>
    )
  }
}

const Word = (word,style) => <li className={"list-group-item list-group-item-" + style} key={word}> 
                          {word}
                          <span className={`badge badge-${style} badge-pill float-right`}>{word.length}</span>
                        </li>
                       
