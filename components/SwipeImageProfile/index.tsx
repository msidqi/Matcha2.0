import React from "react";
import PositionIcon from "@/components/ui/Icons/PositionIcon";
import { Transition } from "@headlessui/react";
import TagsDisplay from "../TagsDisplay";
import Tag from "@/components/Tag";

interface Props {
  profile: {
    url: string;
    name: string;
    age: number;
    distance: number;
  };
}

const SwipeImageProfile = ({
  profile: { url, name, age, distance },
}: Props) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const handleExpand = () => setExpand(!expand);
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className="absolute bottom-0 bg-white w-screen max-w-sm h-96 rounded-2xl bg-cover bg-center"
    >
      {/* <img
      alt="content"
      className="object-cover object-center h-full w-full rounded-2xl"
      src={url}
    /> */}
      {/* <button onClick={handleExpand}>here</button> */}
      <div
        onClick={expand ? handleExpand : undefined}
        className="bg-white px-2 py-2 border-gray-200 border-2 rounded-2xl  m-auto mb-0 cursor-pointer w-11/12 absolute bottom-2 left-2/4 transform -translate-x-1/2"
      >
        <div onClick={!expand ? handleExpand : undefined}>
          <h4 className="text-gray-600 text-base">
            <span className="font-medium">{name}</span> {age}
          </h4>
          <div className="absolute right-2 top-2">
            <PositionIcon
              width="18"
              height="18"
              className="inline-block mr-1"
            />
            <p className="text-sm inline-block text-gray-500">{`${distance} km`}</p>
          </div>
        </div>
        <Transition
          // className="absolute bottom-2 left-2/4 transform -translate-x-1/2 w-11/12 h-16"
          // className="absolute bottom-2 left-2/4 transform -translate-x-1/2 w-11/12 h-16"
          show={expand}
          enter="transition ease-out duration-100"
          enterFrom="transform scale-y-50"
          enterTo="transform scale-y-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform scale-y-100"
          leaveTo="transform scale-y-50"
        >
          <h4 className="text-gray-600 text-base font-medium mt-2">About:</h4>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            iusto inventore excepturi praesentium
          </p>
          <h4 className="text-gray-600 text-base font-medium mt-2">
            Interests:
          </h4>
          <div className="mt-1">
            {["Hello", "World", "1337", "42"].map((name: string, i) => (
              <Tag key={`tag-${i}`} tagName={name} />
            ))}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SwipeImageProfile;
