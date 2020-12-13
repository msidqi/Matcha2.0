import React, { useState, ReactNode } from "react";
import Tag from "@/components/Tag";

const TagsDisplay = ({ initialTags }: { initialTags: string[] }) => {
    const set = new Set<string>()
    initialTags.forEach(tagValue => set.add(tagValue))
    const [tags, setTags] = useState<Set<string>>(set)
    const [tagName, setTagName] = useState<string>('')

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
            if (e.which === 13) {
                console.log('add tag')
            }
        }
    }

    let renderedTags: ReactNode[] = []

    let i = 0;
    for (const uniqueTag of tags.values()) {
        renderedTags.push(<Tag key={`tag-${i++}`} tagName={uniqueTag} onClose={() => tags.delete(uniqueTag)} />)
    }
    return (
        <div className="m-auto">
            <input name="userName" value={tagName} onChange={(e) => setTagName(e.target.value)} onKeyUp={addTag} className="form-input block" />
            {renderedTags}
        </div>
    )
}

export default TagsDisplay
