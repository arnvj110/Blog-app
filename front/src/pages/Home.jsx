import { useQuery } from "@tanstack/react-query";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
export default function Home() {

    const { data: posts, isLoading, isError, error } = usePosts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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

                {/* Error State */}
                {isError && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-start space-x-3">
                            <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="font-semibold text-red-400 mb-1">Error Loading Posts</p>
                                <p className="text-red-300/80 text-sm">{error.message}</p>
                            </div>
                        </div>
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
                <div className="grid gap-6">
                    {posts?.map((post) => (
                        <article
                            key={post._id || post.id}
                            className="group bg-gray-900 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                            {/* Post Header */}
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="font-bold text-2xl text-gray-100 group-hover:text-blue-400 transition-colors duration-200 flex-1">
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
                            <div className="prose prose-invert prose-sm max-w-none text-gray-300 line-clamp-3 [&>*]:mb-0">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {post.content}
                                </ReactMarkdown>
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