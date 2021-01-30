import LoadingIcon from "@/components/ui/Icons/LoadingIcon";

const Loading = ({
  width,
  height,
}: {
  width?: string;
  height?: string;
}): JSX.Element => (
  <div className="flex justify-center items-center h-screen">
    <LoadingIcon className="animate-spin" width={width} height={height} />
  </div>
);

export default Loading;
