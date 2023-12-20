/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useState } from "react";
import TextArea from "./TextArea";
import { useDeleteReviews, useReviews } from "../hooks/useReview";
import { serverUrl } from "../services/server";
import LoginSpinner from "../ui/LoginSpinner";
import { useUser } from "../authentication/useAuth";
import ReviewStar from "../ui/ReviewStar";

function Reviews({ ratingsAverage }) {
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const { filter, itemId } = useParams();
  const { isFetching, reviewsList } = useReviews(filter, itemId);
  const { isPending, handleDeleteReview } = useDeleteReviews();
  const { user } = useUser();

  const handleWriteReviewClick = () => {
    setIsReviewVisible(!isReviewVisible);
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }
  const mainData = reviewsList.data?.reviews;

  const calculatePercentage = (total, current) => {
    return (current / total) * 100;
  };

  const validateUserReview = (review) => {
    return review.user._id === user._id;
  };

  return (
    <div className="py-6 sm:py-8 lg:py-12 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="rounded-lg border p-4">
            <h2 className="mb-3 text-lg font-bold text-gray-800 lg:text-xl">
              Reviews
            </h2>

            <div className="mb-0.5 flex items-center gap-2">
              <div className="-ml-1 flex gap-0.5">
                <ReviewStar ratingsAverage={ratingsAverage} />
              </div>

              <span className="text-sm font-semibold">{ratingsAverage}/5</span>
            </div>

            <span className="block text-sm text-gray-500">
              Based on {mainData.length} reviews
            </span>

            <div className="my-5 flex flex-col gap-2 border-t border-b py-5">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-10 whitespace-nowrap text-right text-sm text-gray-600">
                    {5 - index} Star
                  </span>
                  <div className="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                    <span
                      style={{
                        width: `${calculatePercentage(
                          mainData.length,
                          mainData.filter((r) => r.rating === 5 - index).length
                        )}%`,
                      }}
                      className="h-full rounded bg-yellow-400"
                    ></span>
                  </div>
                </div>
              ))}
            </div>

            <span
              onClick={handleWriteReviewClick}
              className="block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base cursor-pointer"
            >
              Write a review
            </span>
            {isReviewVisible && (
              <TextArea setIsReviewVisible={setIsReviewVisible} />
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="border-b pb-4 md:pb-6">
              <h2 className="text-lg font-bold text-gray-800 lg:text-xl">
                Latest Reviews
              </h2>
            </div>

            <div className="divide-y">
              {mainData.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col gap-3 py-4 md:py-8"
                >
                  <div className="flex gap-2">
                    <img
                      src={`${serverUrl}${review.user.photo}`}
                      alt={review.user.name}
                      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-sky-200"
                    />
                    <div className="flex-col">
                      <span className="block text-sm font-bold">
                        {review.user.name}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="-ml-1 flex gap-0.5">
                    <ReviewStar ratingsAverage={review.rating} />
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">{review.review}</p>
                    {validateUserReview(review) && (
                      <button
                        className="flex justify-center items-center  h-5 w-5 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        title="Delete"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        {isPending ? (
                          <LoginSpinner />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
