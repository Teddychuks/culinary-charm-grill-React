/* eslint-disable react/prop-types */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ code }) => {
  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow-lg bg-black text-white">
      <h2 className="font-semibold mb-2 text-sm">Code Snippets</h2>
      <div className="p-2 bg-black relative rounded-md overflow-hidden">
        <button
          className="absolute top-2 right-2 px-4 py-1 font-medium tracking-wide text-white text-xs capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          onClick={copyToClipboard}
        >
          Copy
        </button>
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          className="text-sm"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippet;
