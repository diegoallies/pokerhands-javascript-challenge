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

function evaluateHand(hand) {
  // No need to rely on an external CARD_RANKS mapping as rank is already part of the card object
  hand.sort((a, b) => a.rank - b.rank);

  // Check if all cards are of the same suite
  const isFlush = hand.every(card => card.suite === hand[0].suite);
  
  // Check for a straight. The Ace can either play high or low; this simple check assumes Ace is always high.
  const isStraight = hand.every((card, index, arr) => {
    return index === 0 || card.rank - arr[index - 1].rank === 1;
  }) || (hand[0].rank === 2 && hand[4].rank === 14); // Special Case: Five-high Straight ("Wheel") with an Ace

  // Tally the rank occurrences
  const rankCounts = hand.reduce((acc, {rank}) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {});

  const rankCountValues = Object.values(rankCounts);
  const hasFourOfAKind = rankCountValues.includes(4);
  const hasThreeOfAKind = rankCountValues.includes(3);
  const hasPair = rankCountValues.includes(2);
  const hasTwoPairs = rankCountValues.filter(count => count === 2).length === 2;

  if (isFlush && isStraight) return hasAceHigh(hand) ? HAND_STRENGTH.royalFlush : HAND_STRENGTH.straightFlush;
  if (hasFourOfAKind) return HAND_STRENGTH.fourOfAKind;
  if (hasThreeOfAKind && hasPair) return HAND_STRENGTH.fullHouse;
  if (isFlush) return HAND_STRENGTH.flush;
  if (isStraight) return HAND_STRENGTH.straight;
  if (hasThreeOfAKind) return HAND_STRENGTH.threeOfAKind;
  if (hasTwoPairs) return HAND_STRENGTH.twoPair;
  if (hasPair) return HAND_STRENGTH.onePair;
  return HAND_STRENGTH.highCard;
}

// Additional helper function to check if a straight flush is a royal flush (i.e., ends with an Ace high)
function hasAceHigh(hand) {
  return hand.some(card => card.rank === 14);
}

export function good5CardHandRanker(hand) {
  console.log(JSON.stringify(hand), 'hand in good5CardHandRanker');
  const handStrength = evaluateHand(hand);
  let description = '';

  switch (handStrength) {
    case HAND_STRENGTH.royalFlush:
      description = 'Royal Flush';
      break;
    case HAND_STRENGTH.straightFlush:
      description = 'Straight Flush';
      break;
    case HAND_STRENGTH.fourOfAKind:
      description = 'Four of a Kind';
      break;
    case HAND_STRENGTH.fullHouse:
      description = 'Full House';
      break;
    case HAND_STRENGTH.flush:
      description = 'Flush';
      break;
    case HAND_STRENGTH.straight:
      description = 'Straight';
      break;
    case HAND_STRENGTH.threeOfAKind:
      description = 'Three of a Kind';
      break;
    case HAND_STRENGTH.twoPair:
      description = 'Two Pair';
      break;
    case HAND_STRENGTH.onePair:
      description = 'One Pair';
      break;
    default:
      description = `High card: ${hand[hand.length - 1].label}`;
      break;
  }

  return {
    hand,
    handStrength,
    description,
  };
}
