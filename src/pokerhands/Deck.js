export const CARD_RANKS = {
  ACE: 14,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
};

export const SUITES = {
  SPADES: "Spades",
  DIAMONDS: "Diamonds",
  CLUBS: "Clubs",
  HEARTS: "Hearts",
};

function createDeck() {
  const suits = Object.values(SUITES);
  const labels = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
  const ranks = Object.values(CARD_RANKS);

  let deck = [];

  for (let suit of suits) {
    for (let i = 0; i < labels.length; i++) {
      deck.push({
        label: labels[i],
        suite: suit,
        rank: ranks[i]
      });
    }
  }
  return deck;
}

export function shuffleDeck(deck) {
  let clone = [...deck];
  for (let i = clone.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

export function createShuffledDeck() {
  return shuffleDeck(createDeck());
}

export function pick(deck, pickCount) {
  if (pickCount > deck.length) {
    throw new Error("Cannot pick more cards than are in the deck.");
  }

  const pickedCards = deck.slice(0, pickCount);
  const remainingDeck = deck.slice(pickCount);

  // Return the picked cards and the remaining deck
  return [pickedCards, remainingDeck];
}