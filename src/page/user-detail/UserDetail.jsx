import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { updateUserProfile } from "../../redux/feature/user/userSlice"; // Adjust the import path
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object({
  first_name: Yup.string(),
  last_name: Yup.string(),
  username: Yup.string(),
  email: Yup.string().email("Invalid email"),
  gender: Yup.string().oneOf(["M", "F", "O"], "Invalid gender"),
  web: Yup.string().url("Invalid URL"),
  biography: Yup.string(),
  phone_number: Yup.string().matches(/^\d+$/, "Phone number is not valid"),
  contact_info: Yup.string(),
  location: Yup.string(),
  social: Yup.array().of(
    Yup.object({
      platform: Yup.string().required("Platform is required"),
      url: Yup.string().url("Invalid URL").required("URL is required"),
    })
  ),
});

export default function UserDetail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = location.state;

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPointOfUserProfile = import.meta.env.VITE_GET_USER_PROFILE;

  const {
    first_name,
    last_name,
    username,
    email,
    profile_image,
    gender,
    dob,
    biography,
    phone_number,
    contact_info,
    location: userLocation,
    social,
  } = profile || {};

  const defaultAvatar = "https://via.placeholder.com/150";
  const [selectedImage, setSelectedImage] = useState(
    profile_image || defaultAvatar
  );
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setIsImageUpdated(true);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(defaultAvatar);
    setIsImageUpdated(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedProfile = {
        ...values,
      };

      const accessToken = getAccessToken();
      if (!accessToken) {
        console.error("Access token not available");
      }

      // Include profile_image as a string (base64 or URL)
      if (isImageUpdated && selectedImage !== defaultAvatar) {
        updatedProfile.profile_image = selectedImage;
      } else if (isImageUpdated && selectedImage === defaultAvatar) {
        updatedProfile.profile_image = "";
      }

      const response = await axios.put(
        `${baseUrl}${endPointOfUserProfile}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.message);
      console.log("Profile updated:", response.data);
      dispatch(updateUserProfile(response.data));
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full h-auto my-20 mx-10 lg:mx-20 mr-10">
      <Toaster position="top-right" reverseOrder={true} />
      <h1 className="mt-6">Update Your Profile</h1>
      <section className="w-full pr-10 lg:pr-20">
        <Formik
          initialValues={{
            first_name: first_name || "",
            last_name: last_name || "",
            username: username || "",
            email: email || "",
            gender: gender || "",
            dob: dob || "",
            biography: biography || "",
            phone_number: phone_number || "",
            contact_info: contact_info || "",
            location: userLocation || "",
            social: social || [],
            profile_image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="mt-6 grid grid-col grid-cols-1 md:grid-cols-2">
              <section>
                <div>
                  <label htmlFor="profile_image">Profile Picture</label>
                  <div className="flex items-center md:flex-col space-x-4">
                    <img
                      src={selectedImage}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        id="profile_image"
                        name="profile_image"
                        onChange={(e) => {
                          setFieldValue(
                            "profile_image",
                            e.currentTarget.files[0]
                          );
                          handleImageChange(e);
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile_image"
                        className="p-2 bg-blue-500 text-white rounded cursor-pointer text-center"
                      >
                        Update
                      </label>
                      <button
                        type="button"
                        className="p-2 bg-red-500 text-white rounded"
                        onClick={handleImageRemove}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div>
                  <label htmlFor="first_name">First Name</label>
                  <Field
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="last_name">Last Name</label>
                  <Field
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="dob">Date of birth</label>
                  <Field
                    type="text"
                    id="dob"
                    name="dob"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="biography">Bio</label>
                  <Field
                    type="text"
                    id="biography"
                    name="biography"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone_number">Phone Number</label>
                  <Field
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact_info">Contact Info</label>
                  <Field
                    type="text"
                    id="contact_info"
                    name="contact_info"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="contact_info"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="location">Location</label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <FieldArray name="social">
                  {({ insert, remove, push }) => (
                    <div>
                      <label>Social Links</label>
                      {values.social.length > 0 &&
                        values.social.map((social, index) => (
                          <div
                            key={index}
                            className="flex space-x-2 items-center mb-2"
                          >
                            <Field
                              name={`social.${index}.platform`}
                              placeholder="Platform"
                              className="w-1/2 p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage
                              name={`social.${index}.platform`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                            <Field
                              name={`social.${index}.url`}
                              placeholder="URL"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage
                              name={`social.${index}.url`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                        onClick={() => push({ platform: "", url: "" })}
                      >
                        Add Social Link
                      </button>
                    </div>
                  )}
                </FieldArray>
              </section>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
                disabled={isSubmitting}
              >
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </section>
  );
}
