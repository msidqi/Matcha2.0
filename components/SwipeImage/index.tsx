import React /*{ useMemo }*/ from "react";
import TinderCard from "react-tinder-card";
import SwipeImageProfile, {
  SuggestionEmptyCard,
} from "@/components/SwipeImageProfile";
import LikeIcon from "@/components/ui/Icons/LikeIcon";
import DislikeIcon from "@/components/ui/Icons/DislikeIcon";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";
// import { ProfileType } from "@/interfaces";
import { SuggestedUser } from "@/utils/requests/suggestions";
// import dbData from "./db.json";

// const db: ProfileType[] = dbData as ProfileType[];

// const alreadyRemoved: string[] = [];
// let profilesState = db; // This fixes issues with updating profiles state forcing it to use the current state and not the state that was active when the card was created.

export type SwipeDirection = "left" | "right" | "up" | "down";

function SwipeImage({
  suggestedUsers,
  onSwiped,
  onOutOfFrame,
}: {
  suggestedUsers?: SuggestedUser[];
  onSwiped?: (name: string, direction: SwipeDirection) => void;
  onOutOfFrame?: (name: string, direction: SwipeDirection) => void;
}) {
  // const [lastDirection, setLastDirection] = React.useState<string>("");
  const [numberOfSwipes, setNumberOfSwipes] = React.useState<number>(0);

  if (!suggestedUsers) return <>Loading...</>;
  const endOfSuggestions = suggestedUsers.length === numberOfSwipes;
  const swiped = (name: string, direction: SwipeDirection) => {
    // setLastDirection(direction);
    setNumberOfSwipes((prev) => prev + 1);
    onSwiped?.(name, direction);
  };

  /*const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    []
  );

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete, `direction ${direction}`);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name: string, direction: string) => {
    console.log(name + " left the screen!", `direction ${direction}`);
    profilesState = profilesState.filter(
      (character) => character.userName !== name
    );
    setProfiles(profilesState);
  };

  const swipe = (dir: string) => {
    const cardsLeft = profiles.filter(
      (person) => !alreadyRemoved.includes(person.userName)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].userName; // Find the card object to be removed
      const index = db.map((person) => person.userName).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };*/

  return (
    <>
      <div className="z-10 w-full sm:w-screen sm:max-w-sm">
        <section className="relative" style={{ height: "34rem" }}>
          {!endOfSuggestions ? (
            suggestedUsers.map((singleSuggestedUser) => (
              // <TinderCard
              //   preventSwipe={["down", "up"]}
              //   ref={childRefs[index]}
              //   key={profile.userName}
              //   onSwipe={(dir) => swiped(dir, profile.userName)}
              //   onCardLeftScreen={(direction) =>
              //     outOfFrame(profile.userName, direction)
              //   }
              // >
              <TinderCard
                preventSwipe={["down", "up"]}
                key={singleSuggestedUser.id}
                onSwipe={(dir) => swiped(singleSuggestedUser.userName, dir)}
                onCardLeftScreen={(direction: SwipeDirection) =>
                  onOutOfFrame?.(singleSuggestedUser.userName, direction)
                }
              >
                <SwipeImageProfile
                  profile={singleSuggestedUser}
                  // isCurrentlyShown={index === profiles.length - 1}
                />
              </TinderCard>
            ))
          ) : (
            <SuggestionEmptyCard />
          )}
        </section>
        {/* <section className="flex justify-evenly items-center pb-2 sm:mt-2 w-full sm:w-screen sm:max-w-sm">
          <div
            onClick={() => swipe("left")}
            className="transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-16 w-16 sm:h-20 sm:w-20 flex justify-center items-center relative cursor-pointer"
          >
            <DislikeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 sm:h-10 sm:w-10" />
          </div>
          <div
            className="transform transition duration-300 hover:scale-110 mt-12 bg-white rounded-full shadow-md h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center relative cursor-pointer"
            // onClick={() => console.log(suggestedUsers.)}
          >
            <AvatarIcon
              variant="filled"
              color="#F3C245"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 sm:h-10 sm:w-10"
            />
          </div>
          <div
            onClick={() => swipe("right")}
            className="transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-16 sm:h-20 w-16 sm:w-20 flex justify-center items-center relative cursor-pointer"
          >
            <LikeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12" />
          </div>
        </section> */}
      </div>
    </>
  );
}

export default SwipeImage;
