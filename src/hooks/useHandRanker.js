import {useCallback, useState} from "react";
import {good5CardHandRanker as handRanker} from "pokerhands/HandRanker";

export function useHandRanker() {
  const [handRank, setHandRank] = useState(undefined)
  const rankHand = useCallback((hand) => {
    setHandRank(handRanker(hand))
  }, [setHandRank])

  return [handRank, rankHand]
}

