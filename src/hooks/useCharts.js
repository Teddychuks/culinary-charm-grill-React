import { useQuery } from "@tanstack/react-query";
import { getAggregation, getMenuStats } from "../services/apiChart";

export function useMenuStats() {
  const {
    isFetching,
    data: menuStatsDataInfo,
    isError,
  } = useQuery({
    queryKey: ["menustats_data"],
    queryFn: () => getMenuStats(),
  });

  return { isFetching, menuStatsDataInfo, isError };
}

export function useAggregation() {
  const { isFetching, data: aggregationData } = useQuery({
    queryKey: ["aggregation"],
    queryFn: () => getAggregation(),
  });

  return { isFetching, aggregationData };
}
