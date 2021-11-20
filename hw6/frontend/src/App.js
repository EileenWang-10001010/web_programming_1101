import {useState} from 'react';
import './App.css';
import {guess, startGame, restart} from './axios';



function App() {
  const [hasStarted,setHasStarted] =useState(false);
  const [hasWon, setHasWon] =useState(false);
  const [number, setNumber] =useState('');
  const [status,setStatus] =useState('');

  const handleGuess = async ()=>{
    const response = await guess(number) //return Equal/Smaller/Bigger

    if(response === 'Equal') setHasWon(true)
    else{
      setStatus(response)
      setNumber('')
    }
  }

  const startMenu = 
  <div>
    <button onClick={
      async ()=>{await startGame();
                setHasStarted(true);
              }
    }>start game</button>
  </div>

  const gameMode=
  <div>
    <p>Guess a number between 1 to 100</p>
    <input //get the value from input
    onChange={(e)=>{setNumber(e.target.value)}}
    ></input>
    <button //send number to backend
    onClick={handleGuess}
    disabled={!number}
    >guess!</button>
    <p>{status}</p>
  </div>

  const winningMode=(
    <>
    <p>you won! the number was {number}.</p>
    <button //handle restart for backend and frontend
    onClick={
      async ()=>{
      setHasStarted(true);
      setHasWon(false);
      setStatus('');
      setNumber('');
      restart();
    } 
    }
    
    >restart</button>
    </>
  )

  const game = 
  <div>
    {hasWon? winningMode : gameMode}
  </div>



  return (
    <div className="App">
      {hasStarted? game: startMenu}
    </div>
  );
}

export default App;
