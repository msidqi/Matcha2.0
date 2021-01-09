import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import SwipeImageProfile from "@/components/SwipeImageProfile";
import LikeIcon from "@/components/ui/Icons/LikeIcon";
import DislikeIcon from "@/components/ui/Icons/DislikeIcon";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";

type Profile = {
  name: string;
  url: string;
  distance: number;
  age: number;
  gender: "male" | "female";
  orientation: "male" | "female" | "both";
  bio: string;
  tags: string[];
};

const db: Profile[] = [
  {
    name: "Richard Hendricks",
    url: "/profile.jpg",
    distance: 0.3,
    age: 42,
    gender: "male",
    orientation: "both",
    tags: ["Hello", "World", "1337", "42"],
    bio:
      "Dignissim suspendisse in est ant nibh Nisi est ? sit amet facilisis...Urna condimentum mattis pellentesque id nibh tortor id 🖤❤️",
  },
  {
    name: "Erlich Bachman",
    url: "/profile.jpg",
    distance: 0.8,
    age: 42,
    gender: "male",
    orientation: "female",
    tags: ["Hello", "World", "1337", "42"],
    bio:
      "Dignissim suspendisse in est ant nibh Nisi est ? sit amet facilisis...Urna condimentum mattis pellentesque id nibh tortor id 🖤❤️",
  },
  {
    name: "Monica Hall",
    url: "/profile.jpg",
    distance: 0.6,
    age: 19,
    gender: "female",
    orientation: "male",
    tags: ["Hello", "World", "1337", "42"],
    bio:
      "Dignissim suspendisse in est ant nibh Nisi est ? sit amet facilisis...Urna condimentum mattis pellentesque id nibh tortor id 🖤❤️",
  },
  {
    name: "Jared Dunn",
    url: "/profile.jpg",
    distance: 0.2,
    age: 1337,
    gender: "female",
    orientation: "male",
    tags: ["Hello", "World", "1337", "42"],
    bio:
      "Dignissim suspendisse in est ant nibh Nisi est ? sit amet facilisis...Urna condimentum mattis pellentesque id nibh tortor id 🖤❤️",
  },
  {
    name: "vmod",
    url: "/profile.jpg",
    distance: 1.1,
    age: 42,
    gender: "male",
    orientation: "female",
    tags: ["Hello", "World", "1337", "42"],
    bio:
      "Dignissim suspendisse in est ant nibh Nisi est ? sit amet facilisis...Urna condimentum mattis pellentesque id nibh tortor id 🖤❤️",
  },
];

const alreadyRemoved: string[] = [];
let profilesState = db; // This fixes issues with updating profiles state forcing it to use the current state and not the state that was active when the card was created.

function Advanced() {
  const [profiles, setProfiles] = useState<Profile[]>(db);
  const [lastDirection, setLastDirection] = useState<string>("");

  const childRefs = useMemo(
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
      (character) => character.name !== name
    );
    setProfiles(profilesState);
  };

  const swipe = (dir: string) => {
    const cardsLeft = profiles.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      <div className="h-full w-full sm:w-screen sm:max-w-sm overflow-y-scroll overflow-x-hidden sm:overflow-visible">
        <section className="relative" style={{ height: "34rem" }}>
          {profiles.map((profile, index) => (
            <TinderCard
              preventSwipe={["down", "up"]}
              ref={childRefs[index]}
              key={profile.name}
              onSwipe={(dir) => swiped(dir, profile.name)}
              onCardLeftScreen={(direction) =>
                outOfFrame(profile.name, direction)
              }
            >
              <SwipeImageProfile
                profile={profile}
                // isCurrentlyShown={index === profiles.length - 1}
              />
            </TinderCard>
          ))}
        </section>
        <section className="flex justify-evenly items-center pb-2 sm:mt-2 w-full sm:w-screen sm:max-w-sm">
          <div
            onClick={() => swipe("left")}
            className="transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-16 w-16 sm:h-20 sm:w-20 flex justify-center items-center relative cursor-pointer"
          >
            <DislikeIcon
              // height="28"
              // width="28"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 sm:h-10 sm:w-10"
            />
          </div>
          <div className="transform transition duration-300 hover:scale-110 mt-12 bg-white rounded-full shadow-md h-12 w-12 sm:h-16 sm:w-16 flex justify-center items-center relative cursor-pointer">
            <AvatarIcon
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
        </section>
      </div>

      <style jsx>{`
        cardContainer {
          height: 34rem;
        }

        @media (max-width: 640px) {
          cardContainer {
            height: 27rem;
          }
        }

        h1 {
          font-family: "Damion", cursive;
          color: #fff;
          text-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
        }

        h2 {
          color: #fff;
        }

        .infoText {
          width: 100%;
          height: 28px;
          justify-content: center;
          display: flex;
          color: #000;
          animation-name: popup;
          animation-duration: 800ms;
        }

        @keyframes popup {
          0% {
            transform: scale(1, 1);
          }
          10% {
            transform: scale(1.1, 1.1);
          }
          30% {
            transform: scale(0.9, 0.9);
          }
          50% {
            transform: scale(1, 1);
          }
          57% {
            transform: scale(1, 1);
          }
          64% {
            transform: scale(1, 1);
          }
          100% {
            transform: scale(1, 1);
          }
        }
      `}</style>
    </>
  );
}

export default Advanced;
