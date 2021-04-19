import React /*{ useMemo }*/ from "react";
import TinderCard from "react-tinder-card";
import SwipeImageProfile, {
  SuggestionEmptyCard,
} from "@/components/SwipeImageProfile";
import { SuggestedUser } from "@/utils/requests/suggestions";

export type SwipeDirection = "left" | "right" | "up" | "down";

interface SwipeImageProps {
  suggestedUsers?: SuggestedUser[];
  onSwiped?: (name: string, direction: SwipeDirection) => void;
  onOutOfFrame?: (name: string, direction: SwipeDirection) => void;
  endOfSuggestions: boolean;
}

function SwipeImage({
  suggestedUsers,
  endOfSuggestions,
  onSwiped,
  onOutOfFrame,
}: SwipeImageProps) {
  if (!suggestedUsers) return <>Loading...</>;
  const swiped = (name: string, direction: SwipeDirection) =>
    onSwiped?.(name, direction);
  const leftScreen = (name: string, direction: SwipeDirection) =>
    onOutOfFrame?.(name, direction);

  return (
    <>
      <div className="z-10 w-full sm:w-screen sm:max-w-sm">
        <section className="relative" style={{ height: "34rem" }}>
          {!endOfSuggestions ? (
            suggestedUsers.map((singleSuggestedUser) => (
              <TinderCard
                preventSwipe={["down"]}
                key={singleSuggestedUser.id}
                onSwipe={(dir) => swiped(singleSuggestedUser.userName, dir)}
                onCardLeftScreen={(dir) =>
                  leftScreen(singleSuggestedUser.userName, dir)
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
