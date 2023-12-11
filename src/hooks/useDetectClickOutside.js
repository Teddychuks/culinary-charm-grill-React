import { useEffect } from "react";

/**
 * Custom hook to handle clicks outside a specified element.
 * @param {React.RefObject} ref - Ref object for the target element.
 * @param {function} callback - Callback function to be executed when a click outside occurs.
 * @param {boolean} listenCapturing - Flag to determine whether to listen during the capturing phase.
 */
function useDetectClickOutside(ref, callback, listenCapturing = true) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
    };
  }, [ref, callback, listenCapturing]);
}

export default useDetectClickOutside;
