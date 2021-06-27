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
    className="w-24 border bg-white hover:bg-red-50 text-red-500 border-red-500 hover:border-red-400 text-black p-2 rounded"
  >
    {label}
  </button>
);

const ActivityItem = ({
  type,
  to_userName,
  by_user,
  profileImage,
  by_userName,
}: ActivityType) => {
  let content;
  const [state] = useUser();

  async function handleUnlike() {
    await deleteLike({
      likedId: by_user,
      authorization: state.user?.authorization || "",
    });
  }
  async function handleUnBlock() {
    await deleteBlock({
      blocked: to_userName,
      blocker: by_userName,
      authorization: state.user?.authorization || "",
    });
  }

  switch (type) {
    case "like": {
      content = (
        <div className="w-full">
          <p>
            You liked <strong>{to_userName}</strong>
          </p>
        </div>
      );
      break;
    }
    case "unlike": {
      content = (
        <div className="w-full">
          <p>
            You unliked <strong>{to_userName}</strong>
          </p>
        </div>
      );
      break;
    }
    case "consult": {
      content = (
        <div className="w-full">
          <p>
            <strong>{to_userName}</strong> viewed your profile, your can visit
            their{" "}
            <Link href={`/profile/${by_user}`}>
              <a className="underline">profile</a>
            </Link>
          </p>
        </div>
      );
      break;
    }
    case "block": {
      content = (
        <div className="w-full flex justify-between items-center">
          <p>
            You blocked <strong>{to_userName}</strong>
          </p>
          <Button label="Unblock" onClick={handleUnBlock} />
        </div>
      );
      break;
    }
    case "match": {
      content = (
        <div className="w-full flex justify-between items-center">
          <p>
            You matched with <strong>{to_userName}</strong>
          </p>
          <Button label="Unlike" onClick={handleUnlike} />
        </div>
      );
      break;
    }
  }
  return (
    <div className="flex items-center h-20 w-full border-b border-gray-300 py-4 px-6 hover:bg-gray-50">
      <div className="w-10 h-10 mr-4" style={{ minWidth: "2.5rem" }}>
        <img className="w-full h-full rounded-full" src={profileImage.src} />
      </div>
      {content}
    </div>
  );
};

export default ActivityItem;
