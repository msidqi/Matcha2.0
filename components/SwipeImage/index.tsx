import React /*{ useMemo }*/ from "react";
import TinderCard from "react-tinder-card";
import SwipeImageProfile, {
  SuggestionEmptyCard,
} from "@/components/SwipeImageProfile";
import { SuggestedUser } from "@/utils/requests/suggestions";

export type SwipeDirection = "left" | "right" | "up" | "down";

interface SwipeImageProps {
  suggestedUsers?: SuggestedUser[];
  onSwiped?: (name: string, direction: SwipeDirection, payload?: any) => void;
  onOutOfFrame?: (
    name: string,
    direction: SwipeDirection,
    payload?: any
  ) => void;
  endOfSuggestions: boolean;
}

function SwipeImage({
  suggestedUsers,
  endOfSuggestions,
  onSwiped,
  onOutOfFrame,
}: SwipeImageProps) {
  if (!suggestedUsers) return <>Loading...</>;
  const swiped = (name: string, direction: SwipeDirection, payload?: any) =>
    onSwiped?.(name, direction, payload);
  const leftScreen = (name: string, direction: SwipeDirection, payload?: any) =>
    onOutOfFrame?.(name, direction, payload);

  return (
    <>
      <div className="z-10 w-full sm:w-screen sm:max-w-sm">
        <section className="relative" style={{ height: "34rem" }}>
          {!endOfSuggestions ? (
            suggestedUsers.map((singleSuggestedUser) => (
              <TinderCard
                preventSwipe={["down"]}
                key={singleSuggestedUser.id}
                onSwipe={(dir) =>
                  swiped(singleSuggestedUser.userName, dir, {
                    userId: singleSuggestedUser.id,
                  })
                }
                onCardLeftScreen={(dir) =>
                  leftScreen(singleSuggestedUser.userName, dir, {
                    userId: singleSuggestedUser.id,
                  })
                }
              >
                <SwipeImageProfile profile={singleSuggestedUser} />
              </TinderCard>
            ))
          ) : (
            <SuggestionEmptyCard />
          )}
        </section>
      </div>
    </>
  );
}

export default SwipeImage;
