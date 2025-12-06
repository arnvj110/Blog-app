// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from "lucide-react";
// import MarkdownRenderer from "../components/MarkDownEditor";
// import { usePost } from "../hooks/usePosts";

// export default function ViewPost() {
//     const { id } = useParams();
//     const { data, isLoading, error } = usePost(id);


//     const calculateReadingTime = (content) => {
//         if (!content) return 0;
//         const words = content.split(/\s+/).filter(w => w.length > 0).length;
//         return Math.ceil(words / 200);
//     };

//     const formatDate = (iso) => {
//         if (!iso) return '';
//         return new Date(iso).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         });
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//                 <div className="max-w-4xl mx-auto px-6 py-12">
//                     {/* Loading Skeleton */}
//                     <div className="animate-pulse">
//                         <div className="h-8 bg-gray-700 rounded w-20 mb-8"></div>
//                         <div className="h-12 bg-gray-700 rounded w-3/4 mb-6"></div>
//                         <div className="flex items-center space-x-6 mb-8">
//                             <div className="h-4 bg-gray-700 rounded w-32"></div>
//                             <div className="h-4 bg-gray-700 rounded w-24"></div>
//                         </div>
//                         <div className="space-y-4">
//                             <div className="h-4 bg-gray-700 rounded w-full"></div>
//                             <div className="h-4 bg-gray-700 rounded w-5/6"></div>
//                             <div className="h-4 bg-gray-700 rounded w-4/6"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
//                 <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 max-w-md text-center">
//                     <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                     </div>
//                     <h2 className="text-xl font-bold text-gray-100 mb-2">Post Not Found</h2>
//                     <p className="text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
//                     <Link 
//                         to="/"
//                         className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-200"
//                     >
//                         <ArrowLeft className="w-4 h-4" />
//                         <span>Back to Home</span>
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     const readingTime = calculateReadingTime(data?.content);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//             {/* Back Navigation */}
//             <div className="border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-sm sticky top-0 z-10">
//                 <div className="max-w-4xl mx-auto px-6 py-4">
//                     <Link 
//                         to="/"
//                         className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-200 transition-colors"
//                     >
//                         <ArrowLeft className="w-4 h-4" />
//                         <span>Back to all posts</span>
//                     </Link>
//                 </div>
//             </div>

//             {/* Article Content */}
//             <article className="max-w-4xl mx-auto px-6 py-12">
//                 {/* Article Header */}
//                 <header className="mb-12">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">
//                         {data?.title}
//                     </h1>

//                     {/* Metadata */}
//                     <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
//                         {data?.author && (
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                                     <User className="w-5 h-5 text-white" />
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-300 font-medium">
//                                         {data.author.name || data.author.username || 'Anonymous'}
//                                     </p>
//                                     <p className="text-xs text-gray-500">Author</p>
//                                 </div>
//                             </div>
//                         )}

//                         {data?.createdAt && (
//                             <div className="flex items-center space-x-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>{formatDate(data.createdAt)}</span>
//                             </div>
//                         )}

//                         {readingTime > 0 && (
//                             <div className="flex items-center space-x-2">
//                                 <Clock className="w-4 h-4" />
//                                 <span>{readingTime} min read</span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex items-center space-x-3 pt-6 border-t border-gray-700/50">
//                         <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
//                             <Share2 className="w-4 h-4" />
//                             <span>Share</span>
//                         </button>
//                         <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
//                             <Bookmark className="w-4 h-4" />
//                             <span>Save</span>
//                         </button>
//                     </div>
//                 </header>

//                 {/* Article Body */}
//                 <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 shadow-2xl">
//                     {data?.content ? (
//                         <MarkdownRenderer content={data.content} />
//                     ) : (
//                         <p className="text-gray-400 italic">No content available.</p>
//                     )}
//                 </div>

//                 {/* Article Footer */}
//                 <footer className="mt-12 pt-8 border-t border-gray-700/50">
//                     <div className="flex items-center justify-between">
//                         <div className="text-sm text-gray-500">
//                             {data?.updatedAt && data.updatedAt !== data.createdAt && (
//                                 <p>Last updated: {formatDate(data.updatedAt)}</p>
//                             )}
//                         </div>

//                         <Link 
//                             to="/"
//                             className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
//                         >
//                             <span>Read more posts</span>
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                             </svg>
//                         </Link>
//                     </div>
//                 </footer>
//             </article>
//         </div>
//     );
// }
import { useParams, Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { usePost } from "../hooks/usePosts";
import { Eye } from "lucide-react";
export default function ViewPost() {
  const { id } = useParams();
  const { data, isLoading, error } = usePost(id);

  const calculateReadingTime = (content) => {
    if (!content) return 0;
    const words = content.split(/\s+/).filter((w) => w.length > 0).length;
    return Math.ceil(words / 200);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-200 flex items-center justify-center">
        Loading post...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-200 flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="mb-6 text-gray-400">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const readingTime = calculateReadingTime(data.content);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      {/* Back link */}
      <div className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{data.title}</h1>
          <div className="text-gray-400 text-sm">
            {data.author && <span>By {data.author.name || "Anonymous"} • </span>}
            {data.createdAt && <span>{formatDate(data.createdAt)} • </span>}
            {readingTime > 0 && <span>{readingTime} min read</span>}
          </div>
        </header>

        {/* Content */}
        <div className=" overflow-hidden rounded-xl mb-10">
          <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl h-full overflow-y-auto ">



            {/* Cover Image Preview */}
            {data.coverImg && (
              <div className="mb-6 -mx-5 sm:-mx-6 flex justify-center relative shadow-black/20">
                <img
                  src={data.coverImg}
                  alt="Cover"
                  className="w-[90%] h-100 object-cover rounded-xl"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                {/* Bottom fade overlay */}
                <div className="absolute bottom-0 left-0 w-full h-52 rounded-b-xl bg-gradient-to-t from-slate-800 to-transparent pointer-events-none"></div>
              </div>
            )}


            {/* Title */}
            {data.title && (
              <h1 className="text-3xl font-bold text-white mb-6 pb-3 border-b border-slate-800">
                {data.title}
              </h1>
            )}

            {/* divider */}

            <div className="my-6 border-t border-slate-600/50"></div>

            {/* Content Preview */}
            <div data-color-mode="dark">
              <MarkdownPreview
                source={data.content || "_Nothing to preview yet._"}
                style={{ background: "transparent", color: "#e2e8f0" }}
              />
            </div>

          </div>
        </div>
      </article>
    </div>
  );
}
