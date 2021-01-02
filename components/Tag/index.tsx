import React from "react";
import ColorHash from "color-hash";

interface TagProps {
  onClose?: () => void;
  tagName: string;
}

const Tag = ({ onClose, tagName }: TagProps): JSX.Element => {
  const colorHash = new ColorHash();
  return (
    <div
      style={{ backgroundColor: colorHash.hex(tagName) }}
      className="relative rounded-xl  inline-block px-4 py-1  mx-1 cursor-pointer transform transition duration-300 hover:scale-110 hover:shadow"
    >
      <div>
        <p className="text-white pr-1">{tagName}</p>
        {onClose && (
          <div className="absolute top-2 right-2">
            <img
              onClick={onClose}
              width={20}
              src="/close.svg"
              className="w-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
