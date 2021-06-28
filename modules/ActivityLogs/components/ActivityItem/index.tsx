import { ActivityType } from "@/interfaces";
import Link from "next/link";
import { deleteLike, deleteBlock } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";

const Button = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => Promise<any>;
}) => (
  <button
    onClick={onClick}
    className="w-24 border bg-white hover:bg-red-50 text-red-500 border-red-500 hover:border-red-400 p-2 rounded"
  >
    {label}
  </button>
);

type ActivityItemViewProps = {
  to_userName: string;
  by_userName: string;
  by_user: number;
  to_user: number;
  type: string;
  authorization: string;
};

const ActivityItemView = ({
  to_userName,
  by_userName,
  by_user,
  to_user,
  type,
  authorization,
}: ActivityItemViewProps) => {
  async function handleUnlike() {
    await deleteLike({
      likedId: to_user,
      authorization: authorization || "",
    });
  }
  async function handleUnBlock() {
    await deleteBlock({
      blocked: to_userName,
      authorization: authorization || "",
    });
  }

  switch (type) {
    case "like": {
      return (
        <div className="w-full">
          <p>
            You liked <strong>{to_userName}</strong>
          </p>
        </div>
      );
    }
    case "unlike": {
      return (
        <div className="w-full">
          <p>
            You unliked <strong>{to_userName}</strong>
          </p>
        </div>
      );
    }
    case "consult": {
      return (
        <div className="w-full">
          <p>
            <strong>{by_userName}</strong> viewed your profile, you can see
            their{" "}
            <Link href={`/profile/${by_user}`}>
              <a className="underline">profile here</a>
            </Link>
          </p>
        </div>
      );
    }
    case "block": {
      return (
        <div className="w-full flex justify-between items-center">
          <p>
            You blocked <strong>{to_userName}</strong>
          </p>
          <Button label="Unblock" onClick={handleUnBlock} />
        </div>
      );
    }
    case "match": {
      return (
        <div className="w-full flex justify-between items-center">
          <p>
            You matched with <strong>{to_userName}</strong>
          </p>
          <Button label="Unlike" onClick={handleUnlike} />
        </div>
      );
    }
    default: {
      return <></>;
    }
  }
};

const ActivityItem = ({ profileImage, ...rest }: ActivityType) => {
  const [state] = useUser();

  return (
    <div className="flex items-center h-20 w-full border-b border-gray-300 py-4 px-6 hover:bg-gray-50">
      <div className="w-10 h-10 mr-4" style={{ minWidth: "2.5rem" }}>
        <img className="w-full h-full rounded-full" src={profileImage.src} />
      </div>
      <ActivityItemView
        {...rest}
        authorization={state.user?.authorization || ""}
      />
    </div>
  );
};

export default ActivityItem;
