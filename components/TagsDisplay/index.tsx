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

    let renderedTags: ReactNode[] = []

    let i = 0;
    for (const uniqueTag of tagsSet.values()) {
        renderedTags.push(<Tag key={`tag-${i++}`} tagName={uniqueTag} onClose={() => { tagsSet.delete(uniqueTag); setTagsSet((prevState) => new Set(prevState)) }} />)
    }
    return (
        <div className="block w-full">
            <input name="userName" value={tagName} onChange={(e) => setTagName(e.target.value)} onKeyUp={addTag} className="form-input block w-full" />
            <div className="flex justify-center p-2">
                {renderedTags}
            </div>
        </div>
    )
}

export default TagsDisplay
