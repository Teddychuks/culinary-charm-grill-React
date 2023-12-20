import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

import { createNewOrder as createNewOrderApi } from "../services/apiOrder";

export function useCreateNewOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending, mutate: handleCreateNewOrder } = useMutation({
    queryKey: "createorder",
    mutationFn: (menu) => createNewOrderApi(menu),
    onSuccess: (data) => {
      dispatch(clearCart());
      toast.success(`Order Successfully Created.`);
      navigate("/invoice", { state: { orderData: data }, replace: true });
    },

    onError: () => {
      toast.error("Error Creating Order");
    },
  });

  return { handleCreateNewOrder, isPending };
}
