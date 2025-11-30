// import { useState } from "react";
// import { useCreatePost } from "../hooks/usePosts";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import MarkdownRenderer from "../components/MarkDownEditor";


// export default function CreatePost() {
//   const createPost = useCreatePost();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const publish = () => {
//     createPost.mutate({ title, content });
//   };

//   return (
//     <div className="p-6 grid grid-cols-2 gap-6">
      
//       {/* Editor */}
//       <div>
//         <h2 className="text-xl font-bold">Write Post</h2>

//         <input
//           className="w-full p-2 border rounded my-3"
//           placeholder="Post title..."
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         />

//         <textarea
//           className="w-full h-[400px] p-3 border rounded"
//           placeholder="Write Markdown..."
//           value={content}
//           onChange={e => setContent(e.target.value)}
//         />
        
//         <button
//           onClick={publish}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Publish
//         </button>
//       </div>

//       {/* Live Preview */}
//       <div className="w-full md:w-1/2 p-5 overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-3">Live Preview</h2>

//         {content.trim() ? (
//           <MarkdownRenderer content={content} />
//         ) : (
//           <p className="text-gray-500">Start writing to see preview...</p>
//         )}
//       </div>
      

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useCreatePost } from "../hooks/usePosts";
import { FileText, Eye, Send, Loader2 } from "lucide-react";
import MarkdownRenderer from "../components/MarkDownEditor";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to create a post.");
      navigate("/");
    }
  }, [isLoggedIn]);
  const createPost = useCreatePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const publish = () => {
    if (!title.trim() || !content.trim()) return;
    createPost.mutate({ title, content });
  };

  const isPublishing = createPost.isPending;
  if (createPost.isSuccess) {
    toast.success("Post published successfully!");
    navigate("/");
  }
  const canPublish = title.trim() && content.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-100">Create New Post</h1>
                <p className="text-sm text-gray-400">Write and preview in real-time</p>
              </div>
            </div>
            
            <button
              onClick={publish}
              disabled={!canPublish || isPublishing}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  
                  <span>Publish Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Editor Panel */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-100">Editor</h2>
              </div>

              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                  placeholder="Enter an engaging title..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  {title.length} characters
                </p>
              </div>

              {/* Content Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content (Markdown)
                </label>
                <textarea
                  className="w-full h-[500px] p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm resize-none"
                  placeholder="# Start writing your post...

You can use **Markdown** formatting:
- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks
- And much more!"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    {content.split(/\s+/).filter(w => w.length > 0).length} words • {content.length} characters
                  </p>
                  <p className="text-xs text-gray-500">
                    Markdown supported
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl h-full flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-gray-100">Live Preview</h2>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {title && (
                  <h1 className="text-3xl font-bold text-gray-100 mb-6 pb-4 border-b border-gray-700">
                    {title}
                  </h1>
                )}
                
                {content.trim() ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                      <Eye className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-lg font-medium mb-2">
                      Nothing to preview yet
                    </p>
                    <p className="text-gray-500 text-sm">
                      Start writing to see your post come to life
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
      `}</style>
    </div>
  );
}