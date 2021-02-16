import { apiRequest } from "@/utils/API";
import { useInfiniteQuery } from "react-query";

interface UseSuggestionsProps {
  authorization: string;
  enabled?: boolean;
  row_count?: number;
  offset?: number;
  tri?: {
    age: number;
  };
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
};

export const useSuggestions = ({
  authorization,
  enabled,
  row_count,
  offset,
  tri,
}: UseSuggestionsProps) => {
  return useInfiniteQuery(
    "suggestions",
    ({ pageParam = 0 }) =>
      apiRequest<SuggestedUser[]>(
        "post",
        "/api/suggestions",
        { offset: pageParam, row_count, tri },
        {
          headers: {
            Authorization: authorization,
          },
        }
      )[0],
    {
      enabled,
      keepPreviousData: true,
      getNextPageParam: () => offset,
    }
  );
};
