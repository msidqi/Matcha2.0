import { LoadingAnimation } from "@/components/ui/Icons/LoadingIcon";

const Button: React.FC<{
  loading?: boolean;
  onClick?: () => void | Promise<void>;
}> = ({ loading, onClick, children }) => (
  <button
    className="w-full bg-green-400 hover:bg-green-500 text-white p-2 rounded"
    onClick={onClick}
  >
    {loading ? (
      <div className="flex justify-center items-center">
        <LoadingAnimation height="24" width="24" />
      </div>
    ) : (
      children
    )}
  </button>
);

export default Button;
