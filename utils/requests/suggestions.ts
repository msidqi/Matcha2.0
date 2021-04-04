import { apiRequest } from "@/utils/API";
import { useInfiniteQuery } from "react-query";
import React from "react";

interface Authorization {
  authorization: string;
}

interface UseSuggestionsProps {
  enabled?: boolean;
  row_count?: number;
  offset?: number;
  tri?: { [x: string]: string };
  // tri?: {
  //   age: string;
  //   distance: string;
  //   experience: string;
  //   tags: string;
  // };
  filter?: {
    age: number[];
    distance: number[];
    experience: number[];
    tags: string[];
  };
  isSearch?: boolean;
}

export type SuggestedUser = {
  age: number;
  bio: string | null;
  communTags: number;
  distance: number;
  email: string;
  experience: number;
  gender: "Female" | "Male";
  id: number;
  orientation: "bisexual" | "heterosexual" | "homosexual";
  userName: string;
  image: string;
};

export const useSuggestions = ({
  authorization,
  enabled,
  row_count,
  offset,
  tri,
  filter,
  isSearch,
}: UseSuggestionsProps & Authorization) => {
  return useInfiniteQuery(
    [isSearch ? "research" : "suggestions", filter, tri],
    ({ pageParam = 0 }) =>
      apiRequest<SuggestedUser[]>(
        "post",
        `/api/${isSearch ? "research" : "suggestions"}`,
        {
          offset: pageParam,
          row_count,
          tri,
          filter,
        },
        {
          headers: {
            Authorization: authorization,
          },
        }
      )[0],
    {
      enabled,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage) =>
        offset ?? JSON.parse(lastPage.config.data)?.offset + 1,
    }
  );
};

export const useSuggestion = ({
  authorization,
  row_count,
  offset,
  tri,
}: UseSuggestionsProps & Authorization) => {
  const [suggestedUsers, setSuggestedUsers] = React.useState<SuggestedUser[]>(
    []
  );
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const [call, cancel] = apiRequest<SuggestedUser[]>(
      "post",
      "/api/suggestions",
      { offset, row_count, tri },
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    const getSuggestions = async () => {
      setLoading(true);
      const result = await call;
      if (result.status === 200) {
        setSuggestedUsers((prev) => [...result.data, ...prev]);
      }
      setLoading(false);
      setError("");
    };

    try {
      getSuggestions();
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
    return cancel;
  }, [row_count, tri, authorization]);

  return { error, suggestedUsers, loading };
};
