import {HAND_STRENGTH, good5CardHandRanker as rankHand} from "pokerhands/HandRanker";

it('test invalid hand', () => {
  expect(() => {
    const hand = []
    rankHand(hand)
  }).toThrowError()
})

it('test high card', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '3', suite: 'Diamonds', rank: 3 },
    { label: '6', suite: 'Clubs', rank: 6 },
    { label: '8', suite: 'Hearts', rank: 8 },
    { label: 'Ace', suite: 'Spades', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.highCard)
  expect(handRank.description).toBe("High card A")
})

it('test one pair', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '2', suite: 'Diamonds', rank: 2 },
    { label: '6', suite: 'Clubs', rank: 6 },
    { label: '8', suite: 'Hearts', rank: 8 },
    { label: 'Ace', suite: 'Spades', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.onePair)
  expect(handRank.description).toBe("One pair of 2s")
})

it('test two pair', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '2', suite: 'Diamonds', rank: 2 },
    { label: '6', suite: 'Clubs', rank: 6 },
    { label: '6', suite: 'Hearts', rank: 6 },
    { label: 'Ace', suite: 'Spades', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.twoPair)
  expect(handRank.description).toBe(`Two pair, 6s and 2s`)
})

it('test three of a kind', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '8', suite: 'Diamonds', rank: 8 },
    { label: '8', suite: 'Clubs', rank: 8 },
    { label: '8', suite: 'Hearts', rank: 8 },
    { label: 'Ace', suite: 'Spades', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.threeOfAKind)
  expect(handRank.description).toBe("Three of a kind of 8s")
})

it('test straight', () => {
  const hand = [
    { label: '5', suite: 'Spades', rank: 5 },
    { label: '6', suite: 'Diamonds', rank: 6 },
    { label: '7', suite: 'Clubs', rank: 7 },
    { label: '8', suite: 'Spades', rank: 8 },
    { label: '9', suite: 'Hearts', rank: 9 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.straight)
  expect(handRank.description).toBe("Straight, 9 high")
})

it('test straight ace low', () => {
  const hand = [
    { label: 'Ace', suite: 'Spades', rank: 14 },
    { label: '2', suite: 'Diamonds', rank: 2 },
    { label: '3', suite: 'Clubs', rank: 3 },
    { label: '4', suite: 'Spades', rank: 4 },
    { label: '5', suite: 'Hearts', rank: 5 }
  ];
  const handRank = rankHand(hand);
  expect(handRank.handStrength).toBe(HAND_STRENGTH.straight);
  expect(handRank.description).toBe("Straight, 5 high"); // Adjust expectation to "5 high"
});

it('test flush', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '3', suite: 'Spades', rank: 3 },
    { label: '6', suite: 'Spades', rank: 6 },
    { label: '8', suite: 'Spades', rank: 8 },
    { label: 'Ace', suite: 'Spades', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.flush)
  expect(handRank.description).toBe("Flush, A high")

})

it('test full house', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '2', suite: 'Diamonds', rank: 2 },
    { label: '6', suite: 'Clubs', rank: 6 },
    { label: '6', suite: 'Hearts', rank: 6 },
    { label: '6', suite: 'Spades', rank: 6 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.fullHouse)
  expect(handRank.description).toBe("Full house, 6s over 2s")
})

it('test four of a kind', () => {
  const hand = [
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '2', suite: 'Diamonds', rank: 2 },
    { label: '2', suite: 'Clubs', rank: 2 },
    { label: '2', suite: 'Hearts', rank: 2 },
    { label: 'Ace', suite: 'Spades', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.fourOfAKind)
  expect(handRank.description).toBe("Four of a kind of 2s")
})

it('test straight flush', () => {
  const hand = [
    { label: '5', suite: 'Spades', rank: 5 },
    { label: '6', suite: 'Spades', rank: 6 },
    { label: '7', suite: 'Spades', rank: 7 },
    { label: '8', suite: 'Spades', rank: 8 },
    { label: '9', suite: 'Spades', rank: 9 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.straightFlush)
  expect(handRank.description).toBe("Straight flush, 9 high")
})

it('test straight flush ace low', () => {
  const hand = [
    { label: 'Ace', suite: 'Spades', rank: 14 },
    { label: '2', suite: 'Spades', rank: 2 },
    { label: '3', suite: 'Spades', rank: 3 },
    { label: '4', suite: 'Spades', rank: 4 },
    { label: '5', suite: 'Spades', rank: 5 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.straightFlush)
  expect(handRank.description).toBe("Straight flush, A high")
})

it('test royal flush', () => {
  const hand = [
    { label: '10', suite: 'Diamonds', rank: 10 },
    { label: 'J', suite: 'Diamonds', rank: 11 },
    { label: 'Q', suite: 'Diamonds', rank: 12 },
    { label: 'K', suite: 'Diamonds', rank: 13 },
    { label: 'Ace', suite: 'Diamonds', rank: 14 }
  ]
  const handRank = rankHand(hand)
  expect(handRank.handStrength).toBe(HAND_STRENGTH.royalFlush)
  expect(handRank.description).toBe("Royal flush of Diamonds")
})
