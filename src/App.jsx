/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import {nanoid} from "nanoid"
import Die from "./Die"
import { useEffect } from "react"
import Confetti from "react-confetti"

export default function App() {
  //Create state to hold array of numbers
  const [dice, setDice] = useState(allNewDice())
  //Create state to hold game state
  const [tenzies, setTenzies] = useState(false)
  //Create and initialize states to hold rolls stats
  const [rolls, setRolls] = useState(0)
  //Create state to hold nuber of games played
  const [games, setGames] = useState(0)
  //Create state to hold the best number of rolls
  const [bestRolls, setBestRolls] = useState(0)

  //Check if all dice values are the same and they are all held,
  //then game is won
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)
    if(allHeld && sameValue) {
      setTenzies(true)
      countGames()
      rollsStats()
    }
  },[dice])

  function countGames() {
    setGames(prevGames => prevGames + 1)
  }

  //Generate a random number
  function newDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()

    }
  }

  //Create array of ten random numbers
  function allNewDice() {
    const diceArray = []
    for (let i=0; i<10; i++) {
      diceArray.push(newDie())
    }
    return diceArray
  }

  //Flip the "isHeld" property of the item when clicked
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  //Map over the dice array to generate the Die array and render it
  const allDice = dice.map(die => (
    <Die 
      value={die.value} 
      key={die.id} 
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      />
    ))

  //Generate new dice only for the dice that are not held
  function rollDice() {
    updateRolls()
    if(!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : newDie()
      }))
    } else {
      //Restart game if tenzies achieved
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
    }
  }

  //Increase the number of rolls in state
  function updateRolls() {
    setRolls(oldRolls => oldRolls + 1)
  }

  //Set the number of best rolls
  function rollsStats() {
    if (!bestRolls || rolls < bestRolls) {
      setBestRolls(rolls)
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <p style={rolls<=bestRolls ? {color:"green"} : {color:"red"}}>Current Rolls: {rolls}</p>
      <div className="die-container">
        {allDice}
      </div>
      <button 
        className="roll-dice"
        onClick={rollDice}
      >{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <p className="congrats-message">Congratulations! You got Tenzies!</p>}
      <h3>Best Number of Rolls: <span>{bestRolls}</span></h3>
      <h3>Games Played: <span>{games}</span></h3>
    </main>
  )
}
