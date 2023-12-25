import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../services/apiUpdateUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending, mutate: handleUpdateUser } = useMutation({
    mutationKey: "update_user",
    mutationFn: (updateData) => updateUserApi(updateData),
    onSuccess: () => {
      toast.success("Account Successfully Updated");
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      toast.error("Confirm your details,there was an error");
    },
  });

  return { handleUpdateUser, isPending };
}
