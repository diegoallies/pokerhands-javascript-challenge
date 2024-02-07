import {useCallback, useState} from "react";
import {createShuffledDeck, pick} from "pokerhands/Deck";

export function useDeck() {
  const [deck, setDeck] = useState(undefined)
  const [hand, setHand] = useState(undefined)

  const shuffleDeck = useCallback(() => {
    setDeck(createShuffledDeck())
  }, [setDeck])

  const deal = useCallback(() => {
    const [newHand, remainingDeck] = pick(deck, 5)
    setDeck(remainingDeck)
    setHand(newHand)
  }, [setDeck, setHand, deck])

  return [deck, hand, shuffleDeck, deal]
}

