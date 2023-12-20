/* eslint-disable react/prop-types */
function TableButton({ children, type, onClick, disabled, isActive }) {
  const styles = {
    operations: `py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ${
      isActive
        ? "bg-slate-900 hover:bg-slate-800 border-gray-700 text-gray-400 focus:ring-offset-gray-800 transition-all duration-300"
        : ""
    }`,

    footerbutton: `inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white ${
      disabled ? "cursor-not-allowed" : ""
    }`,
  };
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return <button className={styles[type]}>{children}</button>;
}

export default TableButton;
