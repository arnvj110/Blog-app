
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react";
import Error from "../components/Error";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";

const RegisterSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

const Register = () => {
  const { isLoggedIn, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8">


      <div className="relative bg-gray-700/50 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-400/50 w-full max-w-md">


        <h1 className="text-center mb-8 text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        <Formik
          initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            setSubmitting(true);

            try {
              await register({
                username: values.username,
                email: values.email,
                password: values.password,
              });
            } catch (err) {
              setErrors({
                general: err?.response?.data?.message || "Registration failed",
              });
            } finally {
              setSubmitting(false);
            }
          }}>
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">

              {/* Global Error */}
              {errors.general && <Error message={errors.general} />}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <Field
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                      text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      transition-all duration-200"
                  />
                </div>

                {touched.username && errors.username && (
                  <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                      text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                      transition-all duration-200"
                  />
                </div>

                {touched.email && errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    className="w-full pl-11 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                      text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500
                      transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {touched.password && errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full pl-11 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg 
                      text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500
                      transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium 
                  hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed 
                  transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 
                  flex items-center justify-center space-x-2 mt-6"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gray-800/50 text-gray-400">or</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>


      </div>
    </div>
  );
};

export default Register;