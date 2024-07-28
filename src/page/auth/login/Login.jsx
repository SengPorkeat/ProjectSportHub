import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaCheckSquare,
  FaFacebook,
} from "react-icons/fa";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchLogin,
  fetchUserProfile,
} from "../../../redux/feature/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { getAccessToken } from "../../../lib/secureLocalStorage";
import registerImg from "../../../assets/register_img.jpg";
import LoginWithGoogle from "./LoginWithGoogle";

// REGEX for strong password
const strongPasswordregex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// initialValues
const initialValues = {
  email: "",
  password: "",
};

// validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("អ៊ីម៉ែលមិនត្រឹមត្រូវ")
    .required("អ៊ីម៉ែលចាំបាច់ត្រូវបញ្ចូល"),
  password: Yup.string()
    .test("is-strong", function (value) {
      const { path, createError } = this;
      const errors = [];
      if (!/^(?=.*[A-Z])/.test(value)) errors.push("អក្សរធំមួយ");
      if (!/^(?=.*[a-z])/.test(value)) errors.push("អក្សរតូចមួយ");
      if (!/^(?=.*\d)/.test(value)) errors.push("លេខមួយ");
      if (!/^(?=.*[!@#$%^&*])/.test(value)) errors.push("សញ្ញាមួយ");
      if (value && value.length < 6)
        errors.push("យ៉ាងហោចណាស់ត្រូវមាន ៦ តួអក្សរ");

      return (
        errors.length === 0 ||
        createError({
          path,
          message: `ពាក្យសម្ងាត់ចាំបាច់ត្រូវមាន: ${errors.join(", ")}`,
        })
      );
    })
    .required("ពាក្យសម្ងាត់ចាំបាច់ត្រូវបញ្ចូល"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState(null);

  // handle navigation to home page
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  // handle navigate to Register page
  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  // handleLogin
  const handleLogin = async (values) => {
    try {
      // Attempt login
      await dispatch(fetchLogin(values)).then(() => {
        // Retrieve access token
        const token = getAccessToken();
        // Check if token is valid and navigate to home
        if (token) {
          setAccessToken(token);
          dispatch(fetchUserProfile());
        } else {
          // Handle case where login is successful but no token received
          toast.error("អ៊ីម៉ែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ !");
        }
      });
    } catch (error) {
      // Handle login errors
      toast.error("Failed to log in. Please check your credentials.");
    }
  };

  /* Login with Google start */
  const [isGoogleLoginVisible, setGoogleLoginVisible] = useState(false);
  //! State for success modal visibility
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleGoogleLoginSuccess = (user) => {
    console.log("Google login success: ", user);
    setGoogleLoginVisible(false); // Hide the Google login component after success
    setShowSuccessModal(true); // Show the success modal
  };

  const handleGoogleLoginFailure = () => {
    console.log("Google login failed");
    setGoogleLoginVisible(false); // Hide the Google login component on failure
  };
  /* Login with Google end */

  return (
    <section className="h-screen flex justify-center items-center flex-col mx-auto px-4 sm:px-6 bg-[#222162]">
      <Toaster position="top-right" reverseOrder={true} />
      <section className="flex justify-center items-center flex-row gap-8 w-full max-w-md sm:max-w-lg lg:max-w-3xl bg-gray-200 p-8 rounded-lg">
        <section className="hidden lg:block w-[320px] h-full">
          <img
            src={registerImg}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
        </section>
        <section className="w-[350px] h-auto flex justify-center items-center flex-col mx-auto">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl text-[#222162] font-bold pb-2">
            ចូលគណនី
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values);
              resetForm();
            }}
          >
            <Form>
              <section className="w-[280px] lg:w-[320px] h-full flex items-center flex-col">
                <div className="relative-label mt-5">
                  <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-none block pr-10 p-2.5"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                    >
                      អ៊ីម៉ែល
                    </label>
                    <FaUser className="absolute right-3 text-[#222162]" />
                  </div>
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-red-700 text-xs"
                  />
                </div>

                <div className="relative-label mt-4 flex flex-col justify-center w-full">
                  <div className="relative w-[280px] lg:w-[320px] h-[50px] flex items-center">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full h-full text-sm font-medium bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-white focus:border-none block pr-10 p-2.5"
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute top-0 left-0 text-gray-500 text-sm transition-transform duration-300 ease-in-out"
                    >
                      ពាក្យសម្ងាត់
                    </label>
                    {showPassword ? (
                      <FaEye
                        className="absolute right-3 text-[#222162] cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <FaEyeSlash
                        className="absolute right-3 text-[#222162] cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="text-red-700 text-sm"
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    {rememberMe ? (
                      <FaCheckSquare
                        className="w-3 h-3 text-blue-700 cursor-pointer"
                        onClick={() => setRememberMe(false)}
                      />
                    ) : (
                      <ImCheckboxUnchecked
                        className="w-3 h-3 text-blue-700 cursor-pointer"
                        onClick={() => setRememberMe(true)}
                      />
                    )}
                    <span className="ml-1 text-sm text-gray-700">
                      ចង់ចាំលេខសម្ងាត់
                    </span>
                  </div>
                  <span className=" text-blue-700 text-sm cursor-pointer hover:underline">
                    ភ្លេចលេខសម្ងាត់
                  </span>
                </div>

                <div className="flex justify-center items-center flex-col">
                  <button
                    type="submit"
                    className="w-[280px] lg:w-[320px] h-[50px] text-white bg-[#222162] font-semibold text-lg rounded-lg px-5 py-2.5 mt-5 focus:outline-none hover:bg-[#27268a]"
                  >
                    ចូលគណនី
                  </button>
                  <p className="text-base text-gray-800 font-semibold mt-5">
                    មិនមានគណនី?{" "}
                    <span
                      onClick={handleNavigateToRegister}
                      className="text-blue-700 cursor-pointer hover:underline"
                    >
                      ចូលបង្កើតគណនី
                    </span>
                  </p>
                </div>
              </section>

              <div className="flex items-center mt-3">
                <hr className="w-full border-t-1 border-red-400" />
                <span className="mx-2 text-md text-gray-600 font-semibold">
                  ឬ
                </span>
                <hr className="w-full border-t-1 border-red-400" />
              </div>
            </Form>
          </Formik>
          {/* Login with Facebook and Google */}
          <div className="flex flex-col space-y-4 mt-4">
            <button className="flex items-center justify-center w-full px-5 py-2.5 rounded-lg ring-2 ring-[#222162] ring-inset text-gray-500 bg-white text-lg font-semibold hover:bg-[#222162] hover:text-white group transition duration-300 ease-in-out">
              <FaFacebook className="mr-2 text-blue-700 group-hover:text-white transition duration-300 ease-in-out" />
              ចូលជាមួយ Facebook
            </button>
            <div className="relative">
              <button
                onClick={() => setGoogleLoginVisible(true)}
                className="flex items-center justify-center w-full px-5 py-2.5 rounded-lg ring-2 ring-[#222162] ring-inset text-gray-500 bg-white text-lg font-semibold hover:bg-[#222162] hover:text-white transition duration-300 ease-in-out"
              >
                <FcGoogle className="mr-2 transition duration-300 ease-in-out" />
                ចូលជាមួយ Google
              </button>
              {isGoogleLoginVisible && (
                <LoginWithGoogle
                  onLoginSuccess={handleGoogleLoginSuccess}
                  onLoginFailure={handleGoogleLoginFailure}
                />
              )}
            </div>
            {/* Success Modal */}
            {showSuccessModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-8 max-w-lg rounded-md shadow-lg relative">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Success</span>
                  </div>
                  <p className="text-lg font-semibold mb-8 text-gray-900">
                    Successfully for Login Account!
                  </p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </section>
    </section>
  );
}
