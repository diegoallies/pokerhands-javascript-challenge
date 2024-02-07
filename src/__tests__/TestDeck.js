import {createShuffledDeck, pick} from "pokerhands/Deck"

it('test deck size', () => {
  const deck = createShuffledDeck()
  expect(deck.length).toBe(52)
})

it('test deck pick', () => {
  const deck = createShuffledDeck()
  const [hand, remainingDeck] = pick(deck, 1)
  expect(hand.length).toBe(1)
  expect(remainingDeck.length).toBe(51)
  expect(deck.length).toBe(52) // make sure we don't have any side effects
})

it('test deck pick hand', () => {
  const deck = createShuffledDeck()
  const [hand, remainingDeck] = pick(deck, 5)
  expect(hand.length).toBe(5)
  expect(remainingDeck.length).toBe(47)
  expect(deck.length).toBe(52) // make sure we don't have any side effects
})

it('test deck pick zero', () => {
  const deck = createShuffledDeck()
  const [hand, remainingDeck] = pick(deck, 0)
  expect(hand.length).toBe(0)
  expect(remainingDeck.length).toBe(52)
  expect(deck.length).toBe(52) // make sure we don't have any side effects
})

it('test deck pick 52', () => {
  const deck = createShuffledDeck()
  const [hand, remainingDeck] = pick(deck, 52)
  expect(hand.length).toBe(52)
  expect(remainingDeck.length).toBe(0)
  expect(deck.length).toBe(52) // make sure we don't have any side effects
})

it('test deck pick large number', () => {
  expect(() => {
    const deck = createShuffledDeck()
    pick(deck, 1000)
  }).toThrowError()
})