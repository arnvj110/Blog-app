import { useEffect } from "react";
import { FileText, Eye, Loader2, Image } from "lucide-react";
import { useCreatePost } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import toast from "react-hot-toast";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// =====================
// Form Validation Schema
// =====================
const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  coverImage: Yup.string().url("Invalid image URL").nullable(),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
});

export default function CreatePost() {
  
  const navigate = useNavigate();
  const createPost = useCreatePost();

 

  useEffect(() => {
  if (createPost.isSuccess) {
    toast.success("Post published successfully!");
    navigate("/");
  }
}, [createPost.isSuccess, navigate]);


  return (
    <div className="min-h-screen bg-slate-950" data-color-mode="dark">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Create New Post</h1>
                <p className="text-sm text-slate-400 hidden sm:block">Write with Markdown</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <Formik
        initialValues={{
          title: "",
          coverImg: "",
          content: "",
        }}
        validationSchema={PostSchema}
        onSubmit={(values) => {
          createPost.mutate(values);
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
              <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-6">

                {/* Editor */}
                <div className="space-y-4  rounded-xl">
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl">

                    <div className="flex items-center gap-2 mb-5">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <h2 className="text-lg font-semibold text-white">Editor</h2>
                    </div>

                    {/* TITLE */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Post Title
                      </label>

                      <Field
                        name="title"
                        placeholder="Enter an engaging title..."
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
                      />

                      {touched.title && errors.title && (
                        <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                      )}
                    </div>

                    {/* COVER IMAGE */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Cover Image URL
                      </label>

                      <div className="relative">
                        <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                        <Field
                          name="coverImg"
                          placeholder="https://example.com/image.jpg"
                          className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      {touched.coverImg && errors.coverImg && (
                        <p className="text-red-400 text-sm mt-1">{errors.coverImg}</p>
                      )}
                    </div>

                    {values.coverImg && (
                      <div className="mb-6 -mx-5 sm:-mx-2 rounded-xl  overflow-hidden border border">
                        <img
                          src={values.coverImg}
                          alt="Cover"
                          className="w-full h-100 object-cover"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                    )}

                    {/* MARKDOWN EDITOR */}
                    <div data-color-mode="dark">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Content
                      </label>

                      <MDEditor
                        value={values.content}
                        onChange={(val) => setFieldValue("content", val || "")}
                        height={450}
                        className="rounded-xl overflow-hidden border border-slate-700"
                      />

                      {touched.content && errors.content && (
                        <p className="text-red-400 text-sm mt-1">{errors.content}</p>
                      )}
                    </div>

                    {/* Publish Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || createPost.isPending}
                      className="mt-5 w-full bg-gradient-to-r from-blue-600 to-violet-600 py-3 rounded-xl text-white flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createPost.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        "Publish Post"
                      )}
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className=" overflow-hidden rounded-xl mb-10">
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl h-full overflow-y-auto custom-scroll">

                    <div className="flex items-center gap-2 mb-5 top-0 bg-slate-900/80 px-5 py-3 border-b border-slate-800">
                      <Eye className="w-5 h-5 text-violet-400" />
                      <h2 className="text-lg font-semibold text-white">Preview</h2>
                    </div>

                    {/* Cover Image Preview */}
                    {values.coverImg && (
                      <div className="mb-6 -mx-5 sm:-mx-6">
                        <img
                          src={values.coverImg}
                          alt="Cover"
                          className="w-full h-100 object-cover"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                    )}

                    {/* Title */}
                    {values.title && (
                      <h1 className="text-3xl font-bold text-white mb-6 pb-4 border-b border-slate-800">
                        {values.title}
                      </h1>
                    )}

                    {/* Content Preview */}
                    <div data-color-mode="dark">
                      <MarkdownPreview
                        source={values.content || "_Nothing to preview yet._"}
                        style={{ background: "transparent", color: "#e2e8f0" }}
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
