const Avatar = ({
  isConnected,
  src,
}: {
  isConnected?: boolean;
  src: string;
}) => (
  <div className="relative">
    <div className="rounded-full h-14 w-14 overflow-hidden ">
      {src && (
        <img src={src} className="object-cover object-center h-full w-full" />
      )}
    </div>
    {isConnected && (
      <div className="box-content border-2 border-white  bg-green-500 w-2.5 h-2.5 rounded-full absolute right-0 bottom-1"></div>
    )}
  </div>
);

export default Avatar;
