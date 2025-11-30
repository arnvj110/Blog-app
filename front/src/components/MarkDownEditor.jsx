// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css";

// export default function MarkdownRenderer({ content }) {
//   return (
//     <div className="prose prose-lg dark:prose-invert max-w-none">
//       <ReactMarkdown
//         children={content}
//         remarkPlugins={[remarkGfm]}
//         rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
//       />
//     </div>
//   );
// }


import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Dark theme for code blocks

export default function MarkdownRenderer({ content }) {
  return (
    <div 
    // className="prose prose-invert prose-lg max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline prose-strong:text-gray-200 prose-code:text-purple-400 prose-code:bg-gray-700/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900/80 prose-pre:border prose-pre:border-gray-700 prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-400 prose-hr:border-gray-700 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-table:border-gray-700 prose-thead:border-gray-700 prose-th:text-gray-200 prose-td:text-gray-300"
    className="text-white"
    >
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        components={{
          // Custom link styling
          a: ({ node, ...props }) => (
            <a 
              {...props} 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              target={props.href?.startsWith('http') ? '_blank' : undefined}
              rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            />
          ),
          // Custom code block styling
          code: ({ node, inline, ...props }) => (
            inline ? (
              <code 
                {...props} 
                className="text-purple-400 bg-gray-700/50 px-1.5 py-0.5 rounded text-sm font-mono"
              />
            ) : (
              <code {...props} className="text-sm" />
            )
          ),
          // Custom blockquote styling
          blockquote: ({ node, ...props }) => (
            <blockquote 
              {...props} 
              className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4"
            />
          ),
          // Custom table styling
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table {...props} className="min-w-full border border-gray-700 rounded-lg overflow-hidden" />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th {...props} className="bg-gray-700/50 text-gray-200 px-4 py-2 text-left font-semibold border-b border-gray-700" />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="text-gray-300 px-4 py-2 border-b border-gray-700/50" />
          ),
        }}
      />
    </div>
  );
}