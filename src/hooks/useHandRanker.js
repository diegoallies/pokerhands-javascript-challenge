import { useCallback, useState } from "react";
import { good5CardHandRanker as handRanker } from "pokerhands/HandRanker";

export function useHandRanker() {
  const [handRank, setHandRank] = useState(undefined);

  const rankHand = useCallback((hand) => {
    // Only rank if hand is not undefined and not empty
    if (hand && hand.length > 0 && hand.every(card => card.hasOwnProperty('label'))) {
      setHandRank(handRanker(hand));
    } else {
      // Handle empty or malformed hand
      setHandRank({ description: 'Invalid hand' });
    }
  }, [setHandRank]);

  return [handRank, rankHand];
}