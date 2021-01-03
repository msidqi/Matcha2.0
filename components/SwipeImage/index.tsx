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
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced() {
  const [characters, setCharacters] = useState<Profile[]>(db);
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
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir: string) => {
    const cardsLeft = characters.filter(
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
      <div className="">
        <div className="relative">
          {characters.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              // className="absolute"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={(direction) =>
                outOfFrame(character.name, direction)
              }
            >
              <SwipeImageProfile profile={character} />
            </TinderCard>
          ))}
          {/* cardContent w-full h-full */}
        </div>
        <section className="flex justify-evenly items-center my-2">
          <div className="transform transition duration-300 hover:scale-110  bg-white rounded-full shadow-md h-20 w-20 flex justify-center items-center relative cursor-pointer">
            <DislikeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="transform transition duration-300 hover:scale-110  mt-10 bg-white rounded-full shadow-md h-20 w-20 flex justify-center items-center relative cursor-pointer">
            <AvatarIcon
              height="41"
              width="41"
              color="#F3C245"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="transform transition duration-300 hover:scale-110  bg-white rounded-full shadow-md h-20 w-20 flex justify-center items-center relative cursor-pointer">
            <LikeIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </section>
        <div className="buttons">
          <button onClick={() => swipe("left")}>Swipe left!</button>
          <button onClick={() => swipe("right")}>Swipe right!</button>
        </div>
        {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText">
            Swipe a card or press a button to get started!
          </h2>
        )}
      </div>
      <style jsx>{`
        root {
          text-align: center;
          display: flex;
          justify-content: center;
          width: 100vw;
          min-height: 100vh;
          overflow: hidden;
          background: linear-gradient(#e66465, #9198e5);
        }

        #root > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .app > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .row {
          flex-direction: row !important;
        }

        .row > * {
          margin: 5px;
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
          color: #fff;
          animation-name: popup;
          animation-duration: 800ms;
        }

        .buttons {
          margin: 20px;
          display: flex;
        }

        .buttons button {
          flex-shrink: 0;
          padding: 10px;
          border-radius: 5px;
          border: none;
          color: #fff;
          font-size: 18px;
          background-color: #9198e5;
          transition: 200ms;
          margin: 0 10px;
          font-weight: bolder;
          width: 160px;
        }

        .buttons button:hover {
          transform: scale(1.05);
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
