/* eslint-disable react/prop-types */

const Button = ({ onClick, children }) => {
  return (
    <button
      className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
