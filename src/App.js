import React from "react";
import './App.css'
import { useDeck } from "hooks/useDeck"
import { useHandRanker } from "hooks/useHandRanker"

function App() {
  const [deck, hand, shuffleDeck, deal] = useDeck()
  const [handRank, rankHand] = useHandRanker()

  return (
    <div className="App">
      <div className="welcome-banner">
        Welcome to Poker Hands!
      </div>
      <Deck {...{deck}}/>
      <Hand {...{hand}}/>
      <HandRank {...{handRank}} />
      <div className="controls">
        <button onClick={shuffleDeck}>Create Deck</button>
        <button onClick={deal}>Deal</button>
        <button onClick={() => {rankHand(hand)}}>Rank Hand</button>
      </div>
    </div>
  )
}

function Deck({deck}) {
  if (!deck) return null
  return (
    <div className="deck-info">
      Number of cards in the deck: {deck.length}
    </div>
  )
}

function Hand({hand}) {
  if (!hand) return null
  return (
    <div className="hand-info">
      Number of cards in the hand: {hand.length}
      <div className="card-container">
        {hand.map(card => <Card key={`${card.label}-${card.suite}`} card={card}/>)}
      </div>
    </div>
  )
}

function HandRank({handRank}) {
  if (!handRank) return null
  return (
    <div className="hand-rank-info">
      Hand rank: {handRank.description}
    </div>
  )
}

function Card({card}) {
  if (!card) return null
  const suitSymbols = {
    diamonds: '♦️',
    clubs: '♣️',
    hearts: '♥️',
    spades: '♠️',
  };
  const suitColor = ['diamonds', 'hearts'].includes(card.suite) ? 'red' : 'black';
  return (
    <div className={`card ${suitColor}`}>
      {card.label} {suitSymbols[card.suite]}
    </div>
  )
}

export default App