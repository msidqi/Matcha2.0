import Hint from "@/components/Hint";

const SwipeImageHints = () => {
  return (
    <div className="flex justify-center my-4 px-2">
      <Hint direction="left" label="nope" />
      <Hint direction="right" label="like" />
      <Hint direction="up" label="open profile" />
    </div>
  );
};

export default SwipeImageHints;
