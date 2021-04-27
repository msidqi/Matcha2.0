import React from "react";
import ColorHash from "color-hash";
import CloseIcon from "@/components/ui/Icons/CloseIcon";

interface TagProps {
  onClose?: () => void;
  tagName: string;
}

const Tag = ({ onClose, tagName }: TagProps): JSX.Element => {
  const colorHash = new ColorHash();
  const color = colorHash.hex(tagName);
  return (
    <div
      // style={{ backgroundColor: colorHash.hex(tagName) }}
      // className="relative rounded-xl  inline-block px-4 py-1 mb-1 mx-1 cursor-pointer transform transition duration-300 hover:scale-110 hover:shadow"
      style={{ border: `solid 1px ${color}` }}
      className="relative rounded  inline-block px-4 py-1 mb-1 mx-1 cursor-pointer transform transition duration-150 hover:shadow"
    >
      <div>
        <p style={{ color }} className="pr-1">
          {tagName}
        </p>
        {onClose && (
          <div className="absolute top-1 right-1">
            <CloseIcon onClick={onClose} className="w-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tag;
