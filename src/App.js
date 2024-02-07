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



















// function Card({ card }) {
//   const calculateBackgroundPosition = () => {
//     const suitOrder = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//     const valueOrder = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

//     // Adjust these indices for case-sensitive comparison
//     const cardValueIndex = valueOrder.indexOf(card.label);
//     const suitIndex = suitOrder.indexOf(card.suite);

//     const cardWidth = 150; // Assuming each card's width in pixels in your sprite sheet.    
//     // The first blank card offsets all other cards by one position.
//     // Adjusting calculation to skip over the first blank card space.
//     // Adding '+1' inside the calculation to offset by a single card's width.
//     const xPosition = -((cardValueIndex + 1) * cardWidth);

//     return `${xPosition}px center`;
//   };

//   return (
//     <div className="card" style={{ backgroundPosition: calculateBackgroundPosition(), backgroundRepeat: 'no-repeat', width: '150px', height: '200px' }}></div>
//   );
// }

// function Card({ card }) {
//   const calculateBackgroundPosition = () => {
//     const suitOrder = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//     const valueOrder = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

//     // Find index for the card's value and suit. These indexes are zero-based.
//     const cardValueIndex = valueOrder.indexOf(card.label);
//     const suitIndex = suitOrder.indexOf(card.suite);

//     // Find the overall index of the card, considering all suits are placed sequentially.
//     // Remember, the sequence in the sprite sheet starts with a blank spot, then follows with all the hearts, diamonds, clubs, and spades.
//     const cardsPerSuit = valueOrder.length; // Number of cards per suit.
//     const overallIndex = suitIndex * cardsPerSuit + cardValueIndex; 

//     const cardWidth = 150; // Assuming each card's width.
//     // Calculate the x-position. We add '+1' because of the initial blank card at the start of the sprite sheet.
//     const xPosition = -((overallIndex + 1) * cardWidth);

//     return `${xPosition}px center`; // y-position is 0px since we're dealing with a horizontal layout.
//   };

//   return (
//     <div className="card" style={{ backgroundPosition: calculateBackgroundPosition(), backgroundRepeat: 'no-repeat', width: '150px', height: '200px' }}>
//   </div>
//   );
// }


export default App;