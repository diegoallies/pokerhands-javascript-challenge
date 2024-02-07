import {CARD_RANKS, SUITES} from "pokerhands/HandRanker";

function createDeck() {

  // Convert suites and labels to arrays appropriately
  const suits = Object.keys(SUITES).map(key => SUITES[key]);
  const labels = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  const rank = Object.keys(CARD_RANKS).map(key => CARD_RANKS[key]);

  // Generate a new deck by combining each label with each suite
  return labels
    .flatMap((label, i) => {
      // Use flatMap for a one-level deep flat array result
      return suits.map(suite => {
        return {label, suite, rank: rank[i]}
      });
    });
}

export function shuffleDeck(deck) {
  // Clone the deck array to avoid direct mutation
  const clone = [...deck];
  // Shuffle using Fisher-Yates Shuffle Algorithm
  for (let x = clone.length - 1; x > 0; x--) {
    const y = Math.floor(Math.random() * (x + 1)); // Ensure even distribution
    [clone[x], clone[y]] = [clone[y], clone[x]]; // Swap
  }
  return clone;
}

export function createShuffledDeck() {
  // Create a new deck and shuffle it
  return shuffleDeck(createDeck());
}

// Implemented Task 1 - Picking from the Deck
export function pick(deck, pickCount) {
  // Ensure we don't pick more than the deck length
  pickCount = Math.min(deck.length, pickCount);

  // Split the deck into the part that will be picked and the remaining
  const pickedCards = deck.slice(0, pickCount);
  const remainingDeck = deck.slice(pickCount);

  return [pickedCards, remainingDeck];
}