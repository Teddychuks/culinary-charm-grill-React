import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getReviews } from "../services/apiReviews";
import { deleteReview as deleteReviewApi } from "../services/apiReviews";
import { createReview as createReviewApi } from "../services/apiReviews";
import toast from "react-hot-toast";

export function useReviews(filter, itemId) {
  const { isFetching, data: reviewsList } = useQuery({
    queryKey: ["reviews", filter, itemId],
    queryFn: () => getReviews(filter, itemId),
  });

  return { isFetching, reviewsList };
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { isPending, mutate: handleCreateReview } = useMutation({
    mutationFn: ({ filter, itemId, review }) =>
      createReviewApi(filter, itemId, review),
    onSuccess: () => {
      toast.success(`Review Successfully Posted.`);
      queryClient.invalidateQueries(["menu_Detail"]);
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: () => {
      toast.error("You can only review items you have ordered");
    },
  });

  return { handleCreateReview, isPending };
}

export function useDeleteReviews() {
  const queryClient = useQueryClient();

  const { isPending, mutate: handleDeleteReview } = useMutation({
    mutationFn: (id) => deleteReviewApi(id),
    onSuccess: () => {
      toast.success(`Review Successfully deleted.`);
      queryClient.invalidateQueries(["menu_Detail"]);
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  return { isPending, handleDeleteReview };
}
