import React, { Component, Fragment } from 'react';
import Board from '../../components/Board';
import Stats from '../../components/Stats';
import './style.scss';
import Countdown from '../../components/Countdown';
import { ValidWord } from '../../Api';
import moment from 'moment';


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
      inCorrectWords: [],
      score: 0
    }
  }

  componentWillMount(){
    this.generateContent()
  }

  validate = word => {
    const { correctsWords, inCorrectWords } = this.state;
    const isExist = [ ...correctsWords, ...inCorrectWords ].includes(word)
    if(word.length < 3 || isExist ){
      return false
    }
    return true
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
    if(this.validate(word) === false){
      this.setState({ word: '', clickedItems: [] })
      return;
    } 
    let {correctsWords, inCorrectWords, score} = this.state;
    ValidWord(word)
      .then( res => {
        //Fill the bucket
        if(res.data.match){
          // eslint-disable-next-line no-undef
          correctsWords.push(res.data.word)  
          this.updateSocre(res.data.word, score)      
        }else{
          // eslint-disable-next-line no-undef
          inCorrectWords.push(res.data.word)
        }
        this.setState({ correctsWords: correctsWords, inCorrectWords: inCorrectWords});
        this.setState({ word: '', clickedItems: [] })

      }).catch( error => {        
        alert('network error')
      })
     
  }

  updateSocre = (word, score) => {
    const newScore = score + word.length * 10;
    this.setState({ score: newScore })
  }

  //This word are correct but not in file
  //month name

  render(){
    const { word, alphabates, clickedItems, correctsWords, inCorrectWords, score } = this.state;
    const wordLength = word.length;
    
    return (
    <div className="row">
      <div className="col bg-info  pt-5">
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
          <button className={`word-board ${WordButton(wordLength)}`} onClick={this.submit}> 
            {word.toUpperCase() || '"__"' }
          </button>
        </div>
        </div>
        </div>
      </div>
      <div className="col order-1st bg-success">
        <div className="row">
          
          <div className="col-12">
            <Countdown timeTillDate={moment().add(3,'minutes').toDate().getTime()} timeFormat="" />
          </div>

          <div className="col-12">
            <span className="score text-bold text-danger">
              <span> {score} </span>
              <span className="text-white label">[pt]</span>
              
            </span>  
          </div>
          <div className="col-12">
          <div className="float-down d-flex flex-row justify-content-around">
            <Stats inCorrectWords={inCorrectWords} correctsWords={correctsWords} score={score}/>
          </div>
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