import { useQuery } from "react-query";
import { getSnippets } from "../api/getSnippets";

export const useSnippets = () => {
  const query = useQuery("snippets", getSnippets);

  return query;
};
