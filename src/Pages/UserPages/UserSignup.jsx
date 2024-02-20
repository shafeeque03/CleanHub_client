import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik, Formik, Form, Field } from "formik";
import userSignupValidation from "../../validation/user/userSignupValidation";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../api/userApi";

const initialValues = {
  name: "",
  email: "",
  number: "",
  location: "",
  password: "",
  cPassword: "",
};

const UserSignup = () => {
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      // e.preventDefault()
      // console.log(values, "hiiiii");
      const res = await userSignup(values);
      console.log(res.status, "this is reponseee");
      if (res?.status === 201) {
        const { userData } = res.data;
        toast.success(res?.data.message)
        navigate("/login");
        // const { user } = res.data;
        // toast(res.data.message);
      }
      // console.log("user signup");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  }
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: userSignupValidation,
    onSubmit,
  });

  return (
    <>
      <div class="wrapper">
        <div class="login-box mt-6 mb-6">
          <div class="login-header">
            <span> Signup</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="input-box">
              <input
                type="text"
                id="mb"
                name="name"
                class="input-field"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Name
              </label>
              <i class="bx bx-user icon"></i>
              {errors.name && (
                <p className="text-red-500 text-sm mb-3 ms-2">{errors.name}</p>
              )}
            </div>
            <div class="input-box">
              <input
                type="email"
                id="mb"
                name="email"
                class="input-field"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Email
              </label>
              <i class="bx bx-envelope icon"></i>
              {errors.email && (
                <p className="text-red-500 text-sm mb-3 ms-2">{errors.email}</p>
              )}
            </div>
            <div class="input-box">
              <input
                type="number"
                id="mb"
                name="number"
                class="input-field"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Number
              </label>
              <i class="bx bx-phone icon"></i>
              {errors.number && (
                <p className="text-red-500 text-sm mb-3 ms-2">{errors.number}</p>
              )}
            </div>
            <div class="input-box">
              <input
                type="text"
                id="mb"
                name="location"
                class="input-field"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <label for="user" class="label">
                Location
              </label>
              <i class="bx bx-phone icon"></i>
              {errors.location && (
                <p className="text-red-500 text-sm mb-3 ms-2">{errors.location}</p>
              )}
            </div>
            <div class="input-box">
              <input
                type="password"
                id="mb"
                name="password"
                class="input-field"
                autocomplete="off"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label for="pass" class="label">
                Password
              </label>
              <i class="bx bx-lock-alt icon" id="show-password"></i>
              {errors.password && (
                <p className="text-red-500 text-sm mb-3 ms-2">
                  {errors.password}
                </p>
              )}
            </div>

            <div class="input-box">
              <input
                type="password"
                id="mb"
                name="cPassword"
                class="input-field"
                autocomplete="off"
                value={values.cPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label for="pass" class="label">
                Confirm Password
              </label>
              <i class="bx bx-lock-alt icon" id="show-password"></i>
              {errors.cPassword && (
                <p className="text-red-500 text-sm mb-3 ms-2">
                  {errors.cPassword}
                </p>
              )}
            </div>

            <div class="input-box">
              <input type="submit" class="input-submit" value="Signup" />
            </div>
            <div class="register">
              <span class="hover:underline">
                Already have account? <Link to="/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
