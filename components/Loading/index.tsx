import LoadingIcon from "@/components/ui/Icons/LoadingIcon";

const Loading = (): JSX.Element => (
  <div className="flex justify-center items-center h-screen">
    <LoadingIcon className="animate-spin" />
  </div>
);

export default Loading;
