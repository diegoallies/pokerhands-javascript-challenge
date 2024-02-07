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
  if (!hand || hand.length !== 5) throw new Error("Invalid hand");

  hand.sort((a, b) => a.rank - b.rank);

  const isFlush = hand.every(card => card.suite === hand[0].suite);

  // Handling for regular and Ace-low straights
  let isStraight = hand.every((_, i, arr) => i === 0 || arr[i].rank === arr[i - 1].rank + 1);
  // Special handling for an Ace-low straight (A-2-3-4-5)
  const aceLowRanks = [2, 3, 4, 5, 14];
  let isAceLowStraight = hand.map(card => card.rank).every((rank, index) => rank === aceLowRanks[index]);
  if (isAceLowStraight) {
      isStraight = true;
  }

  let rankCounts = hand.reduce((acc, card) => {
      acc[card.rank] = (acc[card.rank] || 0) + 1;
      return acc;
  }, {});

  const counts = Object.values(rankCounts);
  
  // Determine the hand strength
  if (isFlush && isStraight) {
      // Check for Ace-high straight flush (Royal flush)
      return hand[4].rank === 14 && isAceLowStraight === false ? HAND_STRENGTH.royalFlush : HAND_STRENGTH.straightFlush;
  }
  if (counts.includes(4)) return HAND_STRENGTH.fourOfAKind;
  if (counts.includes(3) && counts.includes(2)) return HAND_STRENGTH.fullHouse;
  if (isFlush) return HAND_STRENGTH.flush;
  if (isStraight) return HAND_STRENGTH.straight;
  if (counts.includes(3)) return HAND_STRENGTH.threeOfAKind;
  if (counts.filter(count => count === 2).length === 2) return HAND_STRENGTH.twoPair; // Checks for exactly two pairs
  if (counts.includes(2)) return HAND_STRENGTH.onePair;
  return HAND_STRENGTH.highCard;
}

export function good5CardHandRanker(hand) {
  if (!hand || hand.length !== 5) throw new Error("Invalid hand");

  const handStrength = evaluateHand(hand);

  let description = "";
  switch (handStrength) {
      case HAND_STRENGTH.highCard:
          description = `High card ${hand[4].rank === 14 ? 'A' : hand[4].label}`;
          break;
      case HAND_STRENGTH.onePair:
          const pairRank = Object.keys(hand.reduce((acc, { rank }) => {
              acc[rank] = (acc[rank] || 0) + 1;
              return acc;
          }, {})).find(rank => hand.filter(card => card.rank == rank).length === 2);
          description = `One pair of ${pairRank == 14 ? 'A' : pairRank}s`;
          break;
      case HAND_STRENGTH.twoPair:
          const pairRanks = [...new Set(hand.filter(({rank}, index, self) => 
          self.filter(card => card.rank === rank).length === 2).map(({ rank }) => rank))].sort((a, b) => b - a);
          description = `Two pair, ${pairRanks[0] === 14 ? 'A' : pairRanks[0]}s and ${pairRanks[1]}s`;
          break;
      case HAND_STRENGTH.threeOfAKind:
          const threeKindRank = hand.find(card => hand.filter(h => h.rank === card.rank).length === 3).rank;
          description = `Three of a kind of ${threeKindRank === 14 ? 'A' : threeKindRank}s`;
          break;
      case HAND_STRENGTH.straight:
          const isAceLowStraight = hand[0].rank === 2 && hand[1].rank === 3 && hand[2].rank === 4 && hand[3].rank === 5 && hand[4].rank === 14;
          description = isAceLowStraight 
              ? "Straight, 5 high" 
              : `Straight, ${hand[4].rank === 14 ? 'A' : hand[4].label} high`;
          break;
      case HAND_STRENGTH.flush:
          description = `Flush, ${hand[4].rank === 14 ? 'A' : hand[4].label} high`;
          break;
      case HAND_STRENGTH.fullHouse:
          const fullHouseRanks = Object.keys(hand.reduce((acc, { rank }) => {
              acc[rank] = (acc[rank] || 0) + 1;
              return acc;
          }, {}));
          const fullHouseThree = fullHouseRanks.find(rank => hand.filter(card => card.rank == rank).length === 3);
          const fullHouseTwo = fullHouseRanks.find(rank => hand.filter(card => card.rank == rank).length === 2);
          description = `Full house, ${fullHouseThree === 14 ? 'A' : fullHouseThree}s over ${fullHouseTwo}s`;
          break;
      case HAND_STRENGTH.fourOfAKind:
          const fourKindRank = Object.keys(hand.reduce((acc, { rank }) => {
              acc[rank] = (acc[rank] || 0) + 1;
              return acc;
          }, {})).find(rank => hand.filter(card => card.rank == rank).length === 4);
          description = `Four of a kind of ${fourKindRank === 14 ? 'A' : fourKindRank}s`;
          break;
      case HAND_STRENGTH.straightFlush:
          description = `Straight flush, ${hand[4].rank === 14 ? 'A' : hand[4].label} high`;
          break;
      case HAND_STRENGTH.royalFlush:
          description = `Royal flush of ${hand[0].suite}`;
          break;
  }

  return { handStrength, description };
}