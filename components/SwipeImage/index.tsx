// import React from "react";
// import TinderCard from "react-tinder-card";

// function SwipeImage() {
//   const onSwipe = (direction: string) => {
//     console.log(`swiped ${direction}`);
//   };
//   const onCardLeftScreen = (direction: string, id: string) =>
//     console.log(`${id} left the screen from ${direction} direction`);

//   return (
//     <TinderCard
//       onSwipe={onSwipe}
//       onCardLeftScreen={(direction) => onCardLeftScreen(direction, "fooBar")}
//       preventSwipe={["right", "left"]}
//     >
//       Hello World!
//       {/* <div className="rounded-md h-96 overflow-hidden">
//         <img
//           alt="content"
//           className="object-cover object-center h-full w-full"
//           src="/profile.jpg"
//         />
//       </div> */}
//     </TinderCard>
//   );
// }

// export default SwipeImage;

import React, { useState } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";

const character = {
  name: "Richard Hendricks",
  url: "/profile.jpg",
};

function Simple() {
  const [lastDirection, setLastDirection] = useState<string>();

  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>React Tinder Card</h1>
      <div className="cardContainer">
        <TinderCard
          key={character.name}
          onSwipe={(dir) => swiped(dir, character.name)}
          onCardLeftScreen={() => outOfFrame(character.name)}
        >
          {/* <div
            style={{ backgroundImage: `url(${character.url})` }}
            className="rounded-md w-40 h-40 bg-red-100"
          ></div> */}
          <div className="rounded-lg h-96 w-96 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="/profile.jpg"
            />
          </div>
        </TinderCard>
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}

export default Simple;
