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
  labelClass?: string;
}

export const Range = ({
  initialState,
  onColor: activeColor,
  offColor: inactive,
  onRangeChange,
  unit,
  labelClass,
}: RangeProps) => {
  const [range, setRange] = React.useState(initialState ?? [18, 30]);

  const onColor = activeColor ?? "#33d398";
  const offColor = inactive ?? "#e6e7eb";
  const colors: string[] =
    range.length === 2 ? [offColor, onColor, offColor] : [offColor, onColor];

  return (
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
          className="relative rounded-full border-gray-100 border-4 shadow bg-white h-10 w-10"
        >
          <p
            className={
              labelClass ??
              `absolute -top-7 left-1/2 transform -translate-x-1/2 text-gray-500`
            }
          >
            {unit ? `${range[props.key]}${unit}` : range[props.key]}
          </p>
        </div>
      )}
    />
  );
};
