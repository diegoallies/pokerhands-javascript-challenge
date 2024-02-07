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
  KING: 13
}

export const SUITES = {
  SPADES: "spades",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  HEARTS: "hearts"
}

export const HAND_STRENGTH = {
  highCard: 0,
  onePair: 1,
  twoPair: 2,
  threeOfAKind: 3,
  straight: 4,
  flush: 5,
  fullHouse: 6,
  fourOfAKind: 7,
  straightFlush: 8,
  royalFlush: 9
}

// todo Task 2 - Ranking the Hand
export function fiveCardHandRanker(hand) {
  return {
    hand,
    handStrength: HAND_STRENGTH.highCard,
    description: `High card ${hand[0].label}`
  }
}