import { apiRequest } from "@/utils/API";
import { useQuery } from "react-query";

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
  return useQuery(
    "suggestions",
    () =>
      apiRequest<SuggestedUser[]>(
        "post",
        "/api/suggestions",
        { offset, row_count, tri },
        {
          headers: {
            Authorization: authorization,
          },
        }
      )[0],
    { enabled, keepPreviousData: true }
  );
};
