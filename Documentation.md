# Poker Hands Simulation

## Overview

This project simulates a simplified poker game where a user competes against an AI opponent in comparing hand strengths. The core gameplay includes card deck mechanics, dealing hands, and determining hand rankings.

## Technical Components

* **Programming Language:** JavaScript
* **Framework:** React
* **Code Modules:**
    * **Deck.js:** Handles card deck creation, shuffling, and card distribution (picking).
    * **HandRanker.js:** Contains logic for analyzing a poker hand and determining its rank (high card, pair, straight, etc.).
    * **app.js:** The main React component for the game's user interface and game flow control.
    * **useDeck.js:** Custom React hook managing deck state and actions (shuffle, deal).
    * **useHandRanker.js:** Custom React hook encapsulating hand-ranking logic and state.

## Code Structure

### Deck.js

**Constants:**

*   **CARD_RANKS:** Object mapping card names to numerical values.
*   **SUITES:** Object defining the four card suits.

**Functions:**

*   **createDeck()**: Generates a complete 52-card deck.
*   **shuffleDeck(deck):** Implements the Fisher-Yates shuffle algorithm to randomize a deck.
*   **createShuffledDeck():** Combines card creation and shuffling for convenience.
*   **pick(deck, pickCount):** 'Deals' a specified number of cards from a deck, returning the dealt cards and the remaining deck.

### HandRanker.js

**Constants:**

*   **CARD_RANKS, SUITES:** (Re-used from Deck.js)
*   **HAND_STRENGTH:** Index of poker hand strengths (from weakest to strongest).

**Functions**

*   **evaluateHand(hand):** Core logic for determining poker hand rank based on flush, straight, and card counts within the hand.
*   **good5CardHandRanker(hand):** Adds descriptive functionality on top of `evaluateHand()`, providing user-friendly descriptions of the hand.

### app.js

**React Component:** Central game component.

**State Management (useState):**

*   Tracks the deck, hands (player/AI), hand rankings, game commencement, and winner declaration.

**Functions:**

*   **handleStartGame():** Likely uses `useDeck` hook to trigger game initiation and deck shuffling.
*   **handleDeal():** Utilizes `useDeck` for dealing cards to player and AI.
*   **handleRankHands():** Leverages `useHandRanker` to assess hands.
*   **determineWinner():** Simple comparison logic using `handStrength` values in hand rank objects.

**UI Elements (JSX):**

*   Visual representations of the deck, player/AI hands, hand rankings, and game controls.

**... (rest of your modules)** 

## Considerations

*   **Card Display:** Describe how cards are visually represented (images, CSS styling, etc.).
*   **Game Loop:**  Outline the flow of the game (rounds, betting, potential expansion?).
*   **Error Handling:**  Detail any error handling strategies used.
