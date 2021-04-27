import * as React from "react";
import { Range as ReactRange, getTrackBackground } from "react-range";

const MIN_DEFAULT = 18;
const MAX_DEFAULT = 60;

interface RangeProps {
  onColor?: string;
  offColor?: string;
  onRangeChange: (currentRange: [number] | [number, number]) => void;
  unit?: string;
  rangeLabelClass?: string;
  label?: string;
  step?: number;
  max?: number;
  min?: number;
  range: [number] | [number, number];
  setRange:
    | React.Dispatch<React.SetStateAction<[number]>>
    | React.Dispatch<React.SetStateAction<[number, number]>>;
}

type setRangeType = (value: [number] | [number, number]) => void;

export const Range = ({
  onColor: activeColor,
  offColor: inactive,
  onRangeChange,
  unit,
  rangeLabelClass,
  label,
  step,
  max,
  min,
  range,
  setRange,
}: RangeProps) => {
  const onColor = activeColor ?? "#33d398";
  const offColor = inactive ?? "#e6e7eb";
  const colors: string[] =
    range.length === 2 ? [offColor, onColor, offColor] : [onColor, offColor];

  const MIN = min ?? MIN_DEFAULT;
  const MAX = max ?? MAX_DEFAULT;
  return (
    <div className="pb-5 pt-2 px-2 rounded-2xl border-2 border-gray-200">
      <div className={`${!label ? "mb-10" : "mb-4"} flex justify-between`}>
        {label && (
          <>
            <label className="block text-gray-700 font-semibold">{label}</label>
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
          step={step || 1}
          min={MIN}
          max={MAX}
          values={range}
          onChange={(values) => {
            const newValues: [number] | [number, number] =
              typeof values[0] === "number" && typeof values[1] === "number"
                ? [values[0], values[1]]
                : typeof values[0] === "number"
                ? [values[0]]
                : [0, 0];
            (setRange as setRangeType)(newValues);
            onRangeChange && onRangeChange(newValues);
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
