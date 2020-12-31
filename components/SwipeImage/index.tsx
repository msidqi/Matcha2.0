import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";

const db = [
  {
    name: "Richard Hendricks",
    url: "/profile.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "/profile.jpg",
  },
  {
    name: "Monica Hall",
    url: "/profile.jpg",
  },
  {
    name: "Jared Dunn",
    url: "/profile.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "/profile.jpg",
  },
];

const alreadyRemoved: string[] = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function Advanced() {
  const [characters, setCharacters] = useState(db);
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
      <div>
        <div className="cardContainer">
          {characters.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              // className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={(direction) =>
                outOfFrame(character.name, direction)
              }
            >
              {/* <div className="card rounded-lg h-96 w-96 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={character.url}
                />
              </div> */}
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
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

        .swipe {
          position: absolute;
        }

        .cardContainer {
          position: relative;
        }

        .cardContainer card {
          --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
            var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }

        .card {
          position: absolute;
          background-color: #fff;
          width: 80vw;
          max-width: 360px;
          height: 500px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
        }

        .cardContent {
          width: 100%;
          height: 100%;
        }

        .swipe:last-of-type {
        }

        .card h3 {
          position: absolute;
          bottom: 0;
          margin: 10px;
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
