import HintArrowLeft from "@/components/ui/Icons/HintArrowLeft";
import HintArrowRight from "@/components/ui/Icons/HintArrowRight";
import HintArrowDown from "@/components/ui/Icons/HintArrowDown";
import HintArrowUp from "@/components/ui/Icons/HintArrowUp";

interface HintProps {
  direction: "up" | "down" | "left" | "right";
  label: string;
}

const Hint: React.FC<HintProps> = ({ direction, label }) => {
  const containerClassName = "flex mx-2 items-center";
  const labelClassName = "pl-2 uppercase text-xs sm:text-sm text-gray-500";
  switch (direction) {
    case "down":
      return (
        <div className={containerClassName}>
          <HintArrowDown height="24" width="24" color="#6B7280" />
          <p className={labelClassName}>{label}</p>
        </div>
      );
    case "up":
      return (
        <div className={containerClassName}>
          <HintArrowUp height="24" width="24" color="#6B7280" />
          <p className={labelClassName}>{label}</p>
        </div>
      );
    case "right":
      return (
        <div className={containerClassName}>
          <HintArrowRight height="24" width="24" color="#6B7280" />
          <p className={labelClassName}>{label}</p>
        </div>
      );
    case "left":
      return (
        <div className={containerClassName}>
          <HintArrowLeft height="24" width="24" color="#6B7280" />
          <p className={labelClassName}>{label}</p>
        </div>
      );
    default:
      return (
        <div className={containerClassName}>
          <HintArrowLeft height="24" width="24" color="#6B7280" />
          <p className={labelClassName}>{label}</p>
        </div>
      );
  }
};

export default Hint;
