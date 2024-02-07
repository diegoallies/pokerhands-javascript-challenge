import React, { useState } from "react";
import './App.css';
import { useDeck } from "./hooks/useDeck";
import { useHandRanker } from "./hooks/useHandRanker";

function App() {
  const [deck, hand, shuffleDeck, deal] = useDeck();
  const [handRank, rankHand] = useHandRanker();
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    shuffleDeck();
  };

  if (!gameStarted) {
    return (
      <div className="App">
        <div className="start-game-screen">
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="game-area">
        <div className="welcome-banner">Welcome to Poker Hands!</div>
        <Deck deck={deck} />
        <Hand hand={hand} />
        <HandRank handRank={handRank} />
        <div className="controls">
          <button onClick={shuffleDeck}>Shuffle Deck</button>
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

function Card({ card }) {
  const calculateBackgroundPosition = () => {

    const suitOrder = ['clubs', 'diamonds', 'hearts', 'spades'];
    const valueOrder = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  
    const cardValueIndex = valueOrder.indexOf(card.label); 
    const suitIndex = suitOrder.indexOf(card.suite.toLowerCase());

    const cardIndexInSprite = (suitIndex * valueOrder.length + cardValueIndex) * -150; 

    return `${cardIndexInSprite}px center`;
  };

  return (
    <div className="card" style={{ backgroundPosition: calculateBackgroundPosition() }}></div>
  );
}

export default App;