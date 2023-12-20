/* eslint-disable react/prop-types */

const ReviewStar = ({ ratingsAverage }) => {
  return (
    <div className="flex ">
      {Array.from({ length: 5 }, (_, index) => {
        const integerPart = Math.floor(ratingsAverage);
        const decimalPart = ratingsAverage - integerPart;

        let starFill;

        if (index < integerPart) {
          starFill = "full";
        } else if (index === integerPart && decimalPart >= 0.5) {
          starFill = "half";
        } else {
          starFill = "empty";
        }

        return (
          <svg
            key={index}
            style={{
              fill:
                starFill === "full"
                  ? "currentColor"
                  : starFill === "half"
                  ? "url(#half-fill)"
                  : "gray",
            }}
            className="w-4 h-4 text-yellow-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 20"
            role="img"
            aria-label={`Star ${index + 1}`}
          >
            {starFill === "half" && (
              <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="50%"
                  style={{ stopColor: "currentColor", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "gray", stopOpacity: 1 }}
                />
              </linearGradient>
            )}
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      })}
    </div>
  );
};

export default ReviewStar;
