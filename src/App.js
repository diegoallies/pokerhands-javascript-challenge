import React from "react";
import './App.css';
// Ensure that hooks are properly imported. The following paths are just placeholders and must reflect your actual project structure.
import { useDeck } from "./hooks/useDeck";
import { useHandRanker } from "./hooks/useHandRanker";

function App() {
  const [deck, hand, shuffleDeck, deal] = useDeck();
  const [handRank, rankHand] = useHandRanker();

  return (
    <div className="App">
      <div className="game-area">
        <div className="welcome-banner">Welcome to Poker Hands!</div>
        <Deck deck={deck}/>
        <Hand hand={hand}/>
        <HandRank handRank={handRank}/>
        <div className="controls">
          <button onClick={shuffleDeck}>Create Deck</button>
          <button onClick={deal}>Deal</button>
          <button onClick={() => rankHand(hand)}>Rank Hand</button>
        </div>
      </div>
    </div>
  );
}

function Deck({deck}) {
  return (
    <div className="deck-info">
      {deck ? `Number of cards in the deck: ${deck.length}` : <div className="placeholder">Deck not created</div>}
    </div>
  );
}

function Hand({hand}) {
  if (!hand) return null;
  return (
    <div className="hand-info">
      {hand.length > 0 ? (
        <>
          Number of cards in the hand: {hand.length}
          <div className="card-container">
            {hand.map(card => <Card key={`${card.label}-${card.suite}`} card={card}/>)}
          </div>
        </>
      ) : (
        <div className="placeholder">No cards dealt</div>
      )}
    </div>
  );
}

function HandRank({handRank}) {
  return (
    <div className="hand-rank-info">
      {handRank ? `Hand rank: ${handRank.description}` : <div className="placeholder">Hand not ranked</div>}
    </div>
  );
}

function Card({card}) {
  if (!card) return null;
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
  );
}

export default App;