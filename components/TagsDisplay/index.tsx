import React, { useState, ReactNode } from "react";
import Tag from "@/components/ui/Tag";

interface TagsDisplayProps {
  variant?: string;
  onTagChange?: (
    currenlyAdded: string,
    currentTags: string[],
    action: "add" | "delete"
  ) => void;
  tagsSet: Set<string>;
  setTagsSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const TagsDisplay = ({
  variant,
  onTagChange,
  tagsSet,
  setTagsSet,
}: TagsDisplayProps): JSX.Element => {
  const [tagName, setTagName] = useState<string>("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e) {
      // sometimes not true, e.g. React Native
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      if (typeof e.stopPropagation === "function") {
        // prevent any outer forms from receiving the event too
        e.stopPropagation();
      }
      const trimmedTag = tagName.trim();
      if (e.which === 13 && trimmedTag.length >= 2) {
        tagsSet.add(trimmedTag);
        setTagName("");
        // onTagChange?.(trimmedTag, [...tagsSet]);
      }
    }
  };

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const trimmedTag = tagName.trim();
    if (trimmedTag.length > 2) {
      tagsSet.add(trimmedTag);
      setTagName("");
      onTagChange?.(trimmedTag, [...tagsSet], "add");
    }
  };

  const renderedTags: ReactNode[] = [];

  let i = 0;
  for (const uniqueTag of tagsSet.values()) {
    renderedTags.push(
      <Tag
        key={`tag-${i++}`}
        tagName={uniqueTag}
        onClose={() => {
          tagsSet.delete(uniqueTag);
          setTagsSet((prevState) => new Set(prevState));
          onTagChange?.(uniqueTag, [...tagsSet], "delete");
        }}
      />
    );
  }
  return (
    <div
      className={`block w-full border-gray-200 border-2 p-4 ${
        variant === "secondary" ? "rounded-2xl" : "rounded-md"
      }`}
    >
      <div className="flex flex-wrap justify-center pb-2">{renderedTags}</div>
      <div className="relative">
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          onKeyUp={addTag}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="write the tag you want to add"
        />
        <button
          onClick={onAddClick}
          className="absolute bg-green-500 hover:bg-green-400 text-white rounded-md px-2 py-1"
          style={{ top: "50%", right: "6px", transform: "translate(0, -50%)" }}
        >
          add it
        </button>
      </div>
    </div>
  );
};

export default TagsDisplay;
