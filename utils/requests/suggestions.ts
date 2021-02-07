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
      apiRequest(
        "post",
        "/api/suggestions",
        { offset, row_count, tri },
        {
          headers: {
            Authorization: authorization,
          },
        }
      )[0],
    { enabled }
  );
};
