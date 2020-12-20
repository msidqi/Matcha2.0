import React, { useState, ReactNode } from "react";
import Tag from "@/components/Tag";

const TagsDisplay = ({ initialTags }: { initialTags: string[] }) => {
    const set = new Set<string>()
    initialTags.forEach(tagValue => set.add(tagValue))
    const [tagsSet, setTagsSet] = useState<Set<string>>(set)
    const [tagName, setTagName] = useState<string>('')
    // const [renderedTags, setRenderedTags] = useState < ReactNode[]]> (<></>)

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e) {
            // sometimes not true, e.g. React Native
            if (typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            if (typeof e.stopPropagation === 'function') {
                // prevent any outer forms from receiving the event too
                e.stopPropagation();
            }
            const trimmedTag = tagName.trim()
            if (e.which === 13 && trimmedTag.length > 2) {
                tagsSet.add(trimmedTag);
                setTagName('');
            }
        }
    }

    const onAddClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const trimmedTag = tagName.trim()
        if (trimmedTag.length > 2) {
            tagsSet.add(trimmedTag);
            setTagName('');
        }
    }

    let renderedTags: ReactNode[] = []

    let i = 0;
    for (const uniqueTag of tagsSet.values()) {
        renderedTags.push(<Tag key={`tag-${i++}`} tagName={uniqueTag} onClose={() => { tagsSet.delete(uniqueTag); setTagsSet((prevState) => new Set(prevState)) }} />)
    }
    return (
        <div className="block w-full border-gray-200 rounded-md border-2 p-4">
            <div className="flex flex-wrap justify-center pb-2">
                {renderedTags}
            </div>
            <div className="relative">
                <input name="userName" value={tagName} onChange={(e) => setTagName(e.target.value)} onKeyUp={addTag} className="form-input block w-full pr-16" placeholder="write the tag you want to add" />
                <button onClick={onAddClick} className="absolute bg-blue-500 text-white rounded-md px-2 py-1" style={{ top: '50%', right: '6px', transform: 'translate(0, -50%)' }}>add it</button>
            </div>
        </div>
    )
}

export default TagsDisplay
