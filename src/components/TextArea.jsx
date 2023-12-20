/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../ui/StarRating";
import { useCreateReview } from "../hooks/useReview";
import LoginSpinner from "../ui/LoginSpinner";
import useDetectClickOutside from "../hooks/useDetectClickOutside";

const TextArea = ({ setIsReviewVisible }) => {
  const [review, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const { filter, itemId } = useParams();
  const { isPending, handleCreateReview } = useCreateReview();
  const TextAreaRef = useRef(null);

  const handlePostReview = () => {
    if (!review.trim()) {
      return;
    }

    handleCreateReview({
      filter,
      itemId,
      review: { rating, review, menu: itemId },
    });
    setReviewText("");
    setRating(0);
    setIsReviewVisible(false);
  };

  function handleCloseTextArea() {
    if (setIsReviewVisible) {
      setIsReviewVisible(false);
    }
  }
  useDetectClickOutside(TextAreaRef, handleCloseTextArea);

  return (
    <div className="w-full py-3" ref={TextAreaRef}>
      <label htmlFor="Reviews" className="sr-only">
        Reviews
      </label>

      <div
        className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handlePostReview();
          }
        }}
        tabIndex={0}
      >
        <textarea
          id="OrderNotes"
          value={review}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full h-24 resize-none border-none p-3 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Note: you can only review menu items ordered"
        ></textarea>

        <div className="flex items-center justify-between gap-2 bg-white p-3">
          <div>
            <StarRating
              maxRating={5}
              color="#fcc419"
              size={24}
              defaultRating={rating}
              onSetRating={(value) => setRating(value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600 focus:outline-none focus:ring focus:border-blue-500"
              onClick={() => setRating(0)}
            >
              Clear
            </button>

            <button
              type="button"
              className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:border-blue-500"
              onClick={handlePostReview}
              disabled={isPending}
            >
              {isPending ? <LoginSpinner /> : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
