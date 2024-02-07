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
  SPADES: "spades",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  HEARTS: "hearts",
};

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
  royalFlush: 9,
};

export function fiveCardHandRanker(hand) {
  // Imagine this function evaluates the hand passed to it
  return {
    hand,
    handStrength: HAND_STRENGTH.highCard,
    description: `High card ${hand[0].label}`,
  };
}

// New or Updated Function as needed
export function good5CardHandRanker(hand) {
  // Assuming you want to evaluate if the hand is good based on some criteria.
  // This is a placeholder logic; you should replace this with your actual hand ranking logic.
  const result = fiveCardHandRanker(hand);
  // Modify the result or perform additional checks as per the game rules.
  // Example: Check if the hand strength is more than a predefined value.
  if (result.handStrength > HAND_STRENGTH.twoPair) {
    result.description = "Good Hand: " + result.description;
  } else {
    result.description = "Try Again: " + result.description;
  }
  return result;
}