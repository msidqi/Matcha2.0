import React from "react";
import HistoryItem from "@/modules/History/components/HistoryItem";
import { useUserHistory } from "@/utils/requests/userRequests";
import { User } from "@/components/auth/classes";
import { useUser } from "@/components/auth";
import { LikeHistoryItemType } from "@/interfaces";

const History = (): JSX.Element => {
  // fetch history
  const [state] = useUser();
  const { authorization, data: userData }: User = state.user!;
  const { data, fetchNextPage, isLoading, isFetching, error } = useUserHistory({
    authorization,
    userId: -1, //userData.id,
  });
  const likesHistory: LikeHistoryItemType[] = [
    { hello: "world" },
    { hello: "world" },
    { hello: "world" },
    { hello: "world" },
  ];

  const loadMore = () => fetchNextPage();
  const canLoadMoreItems = true;
  if (isLoading && !isFetching) return <>loading...</>;
  if (error) return <>error...</>;
  return (
    <div className="h-full w-full sm:w-1/2 bg-white">
      {isFetching ? (
        <div className="w-full text-center">
          <p>loading more...</p>
        </div>
      ) : likesHistory.length === 0 ? (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-gray-400">No activity yet !</p>
        </div>
      ) : (
        likesHistory.map((like) => <HistoryItem {...like} />)
      )}
      {!isFetching && !isLoading && !error && canLoadMoreItems && (
        <div className="w-full text-center">
          <button
            className="text-green-500 hover:text-green-500 text-sm"
            onClick={loadMore}
          >
            load more...
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
