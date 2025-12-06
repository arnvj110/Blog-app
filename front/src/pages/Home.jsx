
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
export default function Home() {

    const { data: posts, isLoading, isError, error } = usePosts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
            <div className="max-w-5xl mx-auto p-6 py-12">
                {/* Header */}
                <div className="mb-12 flex justify-between">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                        Latest Posts
                    </h1>

                    {posts && posts.length > 0 && (
                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 animate-pulse">
                                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-700 rounded"></div>
                                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                

                {/* Empty State */}
                {!isLoading && !isError && posts?.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border border-gray-700 mb-4">
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-lg mb-2">No posts yet</p>

                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                   {posts
  ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  .map((post) => (
                  <article
  key={post._id || post.id}
  className="group bg-gray-900 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
>
  <div className="flex flex-col sm:flex-row">
    {/* Cover Image - Left Side */}
    {post.coverImg && (
      <div className="relative w-full sm:w-64 sm:h-auto flex-shrink-0 overflow-hidden">
        <img
          src={post.coverImg}
          alt={post.title}
          className="w-full h-full sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/20"></div>
      </div>
    )}

    {/* Content Container - Right Side */}
    <div className="p-6 flex-1 flex flex-col">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-3">
        <h2 className="font-bold text-xl text-gray-100 group-hover:text-blue-400 transition-colors duration-200 flex-1">
          {post.title}
        </h2>
        <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Metadata */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(post.createdAt)}
        </div>
        {post.author && (
          <>
            <span className="text-gray-700">•</span>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </div>
          </>
        )}
      </div>

      {/* Content Preview */}
      <div className="text-gray-300 text-sm line-clamp-2 markdown-preview flex-1" data-color-mode="dark">
        <MarkdownPreview
          source={post.content || "_Nothing to preview yet._"}
          style={{ background: "transparent", color: "#e2e8f0" }}
        />
      </div>

      {/* Read More Link */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <Link
          to={`/posts/${post._id || post.id}`}
          className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Read full post
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
</article>
                    ))}
                </div>



            </div>
        </div>
    );
}

const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};