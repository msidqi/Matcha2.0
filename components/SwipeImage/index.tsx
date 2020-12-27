// import React from "react";
// import TinderCard from "react-tinder-card";

// function SwipeImage() {
//   const onSwipe = (direction: string) => {
//     console.log(`swiped ${direction}`);
//   };
//   const onCardLeftScreen = (direction: string, id: string) =>
//     console.log(`${id} left the screen from ${direction} direction`);
//   if (global.window === undefined) {
//     return <div>no window</div>;
//   }
//   return (
//     // <div>tmp</div>
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
      <div className="cardContainer">
        <TinderCard
          key={character.name}
          onSwipe={(dir) => swiped(dir, character.name)}
          onCardLeftScreen={() => outOfFrame(character.name)}
        >
          <div className="rounded-lg h-96 w-96 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="/profile.jpg"
            />
          </div>
        </TinderCard>
      </div>
      {/* {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )} */}
    </div>
  );
}

export default Simple;
