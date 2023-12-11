// useMenu.js
import { useQuery } from "@tanstack/react-query";
import { getAllMenu } from "../services/apiMenu";

export function useMenu(filterOptions, sortOption) {
  const { isLoading, data: allMenu } = useQuery({
    queryKey: ["allMenu", filterOptions, sortOption],
    queryFn: () => getAllMenu(filterOptions, sortOption),
  });

  return { isLoading, allMenu };
}
