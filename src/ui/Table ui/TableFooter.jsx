/* eslint-disable react/prop-types */
function TableFooter({ children }) {
  return (
    <footer className="grid gap-3 border-t border-gray-200 px-6 py-4  md:flex md:items-center md:justify-between">
      {children}
    </footer>
  );
}

export default TableFooter;
