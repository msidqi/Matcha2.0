import * as React from "react";
import { Range as ReactRange, getTrackBackground } from "react-range";

const MIN = 18;
const MAX = 60;

interface RangeProps {
  initialState?: [number] | [number, number];
  onColor?: string;
  offColor?: string;
  onRangeChange: (currentRange: [number] | [number, number]) => void;
  unit?: string;
  rangeLabelClass?: string;
  label?: string;
}

export const Range = ({
  initialState,
  onColor: activeColor,
  offColor: inactive,
  onRangeChange,
  unit,
  rangeLabelClass,
  label,
}: RangeProps) => {
  const [range, setRange] = React.useState(initialState ?? [18, 30]);

  const onColor = activeColor ?? "#33d398";
  const offColor = inactive ?? "#e6e7eb";
  const colors: string[] =
    range.length === 2 ? [offColor, onColor, offColor] : [offColor, onColor];

  return (
    <div className="pb-5 pt-2 px-2 rounded-2xl border-2 border-gray-100">
      <div className={`${!label ? "mb-10" : "mb-4"} flex justify-between`}>
        {label && (
          <>
            <label className="block text-gray-700 font-semibold">label</label>
            <p className={rangeLabelClass ?? `text-gray-500`}>
              {`${range[0]}${range.length === 2 ? `-${range[1]}` : ""}${
                unit ? unit : ""
              }`}
            </p>
          </>
        )}
      </div>
      <div className="mx-8">
        <ReactRange
          step={1}
          min={MIN}
          max={MAX}
          values={range}
          onChange={(values) => {
            const newValues = [...values];
            setRange(newValues);
            onRangeChange &&
              onRangeChange(newValues as [number] | [number, number]);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: range,
                  colors,
                  min: MIN,
                  max: MAX,
                }),
              }}
              className="rounded w-full h-1.5"
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className={`${
                !label ? "" : "relative"
              } rounded-full border-gray-100 border-4 shadow bg-white h-7 w-7`}
            >
              {!label && (
                <p
                  className={
                    rangeLabelClass ??
                    `absolute -top-7 left-1/2 transform -translate-x-1/2 text-gray-500`
                  }
                >
                  {unit ? `${range[props.key]}${unit}` : range[props.key]}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
