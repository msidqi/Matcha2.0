import React from "react";
import ActivityItem from "@/modules/ActivityLogs/components/ActivityItem";
import { useActivityLogs } from "@/utils/requests/userRequests";
import { User } from "@/components/auth/classes";
import { useUser } from "@/components/auth";

const ActivityLogs = (): JSX.Element => {
  // fetch history
  const [state] = useUser();
  const { authorization, data: userData }: User = state.user!;
  const {
    data: activityLogs,
    fetchNextPage,
    isLoading,
    isFetching,
    error,
  } = useActivityLogs({
    authorization,
    userId: userData.id,
  });
  const loadMore = () => fetchNextPage();
  const canLoadMoreItems = true;
  if (isLoading) return <>loading...</>;
  if (isFetching) {
    return (
      <div className="w-full text-center">
        <p>loading more...</p>
      </div>
    );
  }

  if (error || !activityLogs || !Array.isArray(activityLogs?.pages))
    return <>error...</>;
  return (
    <div className="h-full w-full sm:w-1/2 bg-white">
      <div className="border-b border-gray-300 px-4 pt-2 pb-6">
        <h1 className="font-bold text-3xl">Activity logs</h1>
      </div>
      {activityLogs.pages.length === 0 ? (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-gray-400">No activity yet !</p>
        </div>
      ) : (
        activityLogs.pages
          .flatMap((page) => page)
          .map((activity) => <ActivityItem {...activity} />)
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

export default ActivityLogs;
