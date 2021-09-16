import { useQuery } from "react-query";
import { getSnippet } from "../api/getSnippet";

export const useSnippet = (snippet_uuid) => {
  const query = useQuery("snippet", () => getSnippet(snippet_uuid), {
    enabled: !!snippet_uuid,
  });
  return query;
};
