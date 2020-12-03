import React from "react";
import { Hello } from "@/components/Hello";

function IndexPage(): JSX.Element {
  return (
    <div className="flex h-screen">
      <Hello who="world" />
    </div>
  );
}

export default IndexPage;
