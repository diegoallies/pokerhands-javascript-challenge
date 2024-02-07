











import React, { useState } from "react";
import './App.css';
import { useDeck } from "./hooks/useDeck";
import { useHandRanker } from "./hooks/useHandRanker";

function App() {
  const [deck, playerHand, aiHand, shuffleDeck, deal] = useDeck(); // Adjust `useDeck` for AI's hand.
  const [playerHandRank, rankPlayerHand] = useHandRanker();
  const [aiHandRank, rankAIHand] = useHandRanker();
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState('');

  const handleStartGame = () => {
    setGameStarted(true);
    shuffleDeck();
  };

  const handleDeal = () => {
    if (!deck || deck.length < 10) { // Ensuring enough cards for both player and AI.
      alert("Not enough cards in the deck to deal.");
    } else {
      deal(); // Assume `deal` updates both playerHand and aiHand.
      // Reset previous result
      setWinner('');
    }
  };

  // New function to trigger hand ranking
  const handleRankHands = () => {
    rankPlayerHand(playerHand);
    rankAIHand(aiHand);
  };

  const determineWinner = () => {
    if (!playerHandRank || !aiHandRank) {
      alert("Both hands need to be ranked first.");
      return;
    }
    
    // Assuming higher handStrength value indicates the better hand.
    if (playerHandRank.handStrength > aiHandRank.handStrength) {
      setWinner("Player Wins!");
    } else if (playerHandRank.handStrength < aiHandRank.handStrength) {
      setWinner("AI Wins!");
    } else {
      setWinner("It's a tie!");
    }
  };

  if (!gameStarted) {
    return (
      <div className="App">
        <div className="start-game-screen">
          <div className="welcome-banner">Welcome to Poker Hands!</div>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="game-area">
        <Deck deck={deck} />
        <Hand title="Player Hand" hand={playerHand} />
        <HandRank handRank={playerHandRank} />
        <Hand title="AI Hand" hand={aiHand} />
        <HandRank handRank={aiHandRank} />
        <div className="controls">
          <button onClick={shuffleDeck}>Shuffle Deck</button>
          <button onClick={handleDeal}>Deal</button>
          <button onClick={handleRankHands}>Rank Hands</button>
          <button onClick={determineWinner}>Determine Winner</button>
        </div>
        {winner && <div className="winner-announcement">{winner}</div>}
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


function Card({ card }) {
  const calculateBackgroundPosition = () => {
    const suitOrder = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];  // Kept with initial capitalization
    const valueOrder = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    // Match case-insensitively by converting both to lowercase for comparison
    const cardValueIndex = valueOrder.indexOf(card.label); 
    const suitIndex = suitOrder.map(suit => suit.toLowerCase()).indexOf(card.suite.toLowerCase());

    // Adjust the per-card width (-150px here) as needed to match your sprite sheet
    const cardIndexInSprite = (suitIndex * valueOrder.length + cardValueIndex +1) * -150; 

    return `${cardIndexInSprite}px center`;
  };

  return (
    <div className="card" style={{ backgroundPosition: calculateBackgroundPosition() }}></div>
  );
}
function HandRank({ handRank }) {
  return (
    <div className="hand-rank-info">
      {handRank ? `Hand rank: ${handRank.description}` : <div className="placeholder">Hand not ranked</div>}
    </div>
  );
}

export default App;