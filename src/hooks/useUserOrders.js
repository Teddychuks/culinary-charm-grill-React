import { getUserOrders } from "../services/apiUserOrder";
import { useQuery } from "@tanstack/react-query";

export function useUserOrder() {
  const { isLoading, data: userOrder } = useQuery({
    queryKey: ["user_order"],
    queryFn: getUserOrders,
  });

  return { isLoading, userOrder };
}
