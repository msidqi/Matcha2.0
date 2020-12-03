import React from "react";

type Props = {
  who: string;
};

export function Hello({ who }: Props): JSX.Element {
  return (
    <div className="m-auto">
      <h1 className="text-3xl">Hello {who}!</h1>
      <h4 className="text-center text-sm italic">yes, it works 🎉</h4>
    </div>
  );
}
