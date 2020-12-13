import React, { useState } from "react";
import Layout from "@/components/ui/Layout";
import Tag from "@/components/Tags";

const index = (): JSX.Element => {
  const [tags, setTags] = useState(['hello', 'world', '1337', '42'])
  return (
    <Layout>
      Index Page
      {tags.map((name, index) => (
        <Tag key={`tag-${index}`} tagName={name} onClose={() => setTags(tags.filter((_, i) => index !== i))} />
      )
      )}
    </Layout>
  )
}

export default index;
