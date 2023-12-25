// useMenu.js
import { useQuery } from "@tanstack/react-query";
import { getAllMenu } from "../services/apiMenu";
import { getMenu } from "../services/apiMenu";

export function useMenuAll(filterOptions, sortOption) {
  const {
    isLoading,
    data: allMenu,
    refetch,
  } = useQuery({
    queryKey: ["allMenu", filterOptions, sortOption],
    queryFn: () => getAllMenu(filterOptions, sortOption),
  });

  return { isLoading, allMenu, refetch };
}

export function useMenu(filter, itemId) {
  const { isFetching, data: menuDetail } = useQuery({
    queryKey: ["menu_detail", filter, itemId],
    queryFn: () => getMenu(filter, itemId),
  });

  return { isFetching, menuDetail };
}
