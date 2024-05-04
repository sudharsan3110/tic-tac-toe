import React, { useState } from 'react';
import './styles.css';

function Board({xIsNext, squares, onplay}) {


function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}
const winner = calculateWinner(squares);
let status;
if (winner){
  status = "Winner " + winner;
}
else{
  status= "Next player " + (xIsNext ? "X" :"O");
}
function handleCicked(i){
  if(squares[i] || calculateWinner(squares)){
    return;
  }
  const nextSquare =  squares.slice();
  if(xIsNext){
    nextSquare[i]="X";
  }else{
    nextSquare[i]="O";  
  }
  onplay(nextSquare);

}
  return (
    <div>
      <div className="status">{status}</div>
        <div className='grid-container'>
        <Square value = {squares[0]} onSquareClick={()=>{handleCicked(0)}}/>
        <Square value = {squares[1]} onSquareClick={()=>{handleCicked(1)}}/>
        <Square value = {squares[2]} onSquareClick={()=>{handleCicked(2)}}/>
     
      
        <Square value = {squares[3]} onSquareClick={()=>{handleCicked(3)}}/>
        <Square value = {squares[4]} onSquareClick={()=>{handleCicked(4)}}/>
        <Square value = {squares[5]} onSquareClick={()=>{handleCicked(5)}}/>
      
      
        <Square value = {squares[6]} onSquareClick={()=>{handleCicked(6)}}/>
        <Square value = {squares[7]} onSquareClick={()=>{handleCicked(7)}}/>
        <Square value = {squares[8]} onSquareClick={()=>{handleCicked(8)}}/>
        </div> 
    </div>
  );
}

function Square({value,onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export default function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  function handleplay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove +1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    
  }
  const move = history.map((squares,move)=>{
    let description;
    if(move > 0){
      description = 'go to move' + move;
    }
    else{
      description = 'go to game state';
    }
    return(
      <li key={move}>
        <button onClick={()=>{jumpTo(move)}}>{description}</button>
      </li>
    )
  });
  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares = {currentSquare} onplay = {handleplay}/>
      </div>
    <div className='game-info'>
      <ol>{move}</ol>
    </div>
    </div>
  );
}