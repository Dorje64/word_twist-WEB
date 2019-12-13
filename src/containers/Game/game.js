import React, { Component, Fragment } from 'react';
import Board from '../../components/Board';
import Stats from '../../components/Stats';
import './style.scss';
import { ValidWord } from '../../Api';


const alphabatesMain = 'abcdefghijklmnopqrstuvwxyz'.split('');
export default class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      word: '',
      perRow: 4,
      alphabates: [[]],
      clickedItems: [],
      correctsWords: [],
      inCorrentWords: [],
      score: 265
    }
  }

  componentWillMount(){
    this.generateContent()
  }

  generateContent = () => {
    const alphabates = [];
    const {perRow} = this.state;
    for(let i = 0; i < perRow; i++){
      const rowData = []
      for(let j = 0; j < perRow; j++){
        rowData.push(alphabatesMain.random())
      }
      alphabates.push(rowData)
    }

    this.setState({ alphabates: alphabates })
  }

  getLetter = (letter, cordinate) => {
    const {word, clickedItems} = this.state;
    clickedItems.push(cordinate);
    const newWord = word + letter;
    this.setState({word: newWord, clickedItems: clickedItems})
  }

  submit = _ => {
    const { word } = this.state;
    let {correctsWords, inCorrentWords} = this.state;
    ValidWord(word)
      .then( res => {
        //Fill the bucket
        if(res.data.match){
          // eslint-disable-next-line no-undef
          correctsWords.push(res.data.word)          
        }else{
          // eslint-disable-next-line no-undef
          inCorrentWords.push(res.data.word)
        }
        this.setState({ correctsWords: correctsWords, inCorrentWords: inCorrentWords});
        this.setState({ word: '', clickedItems: [] }, _ => {
          console.log(this.state.word +' +  '+ this.state.clickedItems)
        })

      }).catch( error => {        
        alert('network error')
      })

     
  }

  render(){
    const { word, alphabates, clickedItems, correctsWords, inCorrentWords } = this.state;
    const wordLength = word.length;
    
    return (
    <div className="row">
      <div className="col bg-info full-height  pt-5">
        <div className="row">
          <div className="col">
          <div className="board-wrapper mx-auto">
            <Board 
              perRow = {4}
              borderColor = 'abc'
              borderWidth = '2px'
              getLetter = {this.getLetter }
              alphabates = {alphabates}
              disabledItems = {clickedItems}
            />
          </div>
          </div>
        </div>
        <div className="row">
        <div className="col">
        <div className="word-wrapper">
          <button className={`word ${WordButton(wordLength)}`} onClick={this.submit}> 
            {word.toUpperCase() || '"__"' }
          </button>
        </div>
        </div>
        </div>
      </div>
      <div className="col bg-success full-height">
        <div className="row">
          <div className="col flex-column">
          { correctsWords.map(word => <div className="word" key={word}> {word} </div>) }
          </div>
          <div className="col">
          { inCorrentWords.map(word => <div className="word" key={word}> {word} </div>) }
          </div>
        </div>
      </div>
    </div>);
  }
}


//style-js
export const WordButton = (wordLength) => {
  return wordLength > 2 ? "btn btn-success btn-lg" : "btn btn-danger btn-lg"
}