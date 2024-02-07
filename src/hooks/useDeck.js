// In useDeck.js
import {useCallback, useState} from "react";
import {createShuffledDeck, pick} from "pokerhands/Deck";

export function useDeck() {
  const [deck, setDeck] = useState(createShuffledDeck()) // Initialize with a shuffled deck
  const [playerHand, setPlayerHand] = useState([])
  const [aiHand, setAiHand] = useState([])

  const shuffleDeck = useCallback(() => {
    setDeck(createShuffledDeck())
  }, [])

  const deal = useCallback(() => {
    const [newPlayerHand, deckAfterPlayer] = pick(deck, 5)
    const [newAIHand, remainingDeck] = pick(deckAfterPlayer, 5)
    setDeck(remainingDeck)
    setPlayerHand(newPlayerHand)
    setAiHand(newAIHand)
  }, [deck])

  return [deck, playerHand, aiHand, shuffleDeck, deal]
}