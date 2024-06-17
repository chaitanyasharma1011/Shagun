"use client";

import AuthButton from "@/components/button/authButton";
import AuthInput from "@/components/input/authInput";
import { onRenderInput, onRenderError, onFormValidate } from "@/library/helper";
import { showNotification } from "@/redux/slices/notificationSlice";
import { signupUser, usersState } from "@/redux/slices/usersSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { schema } from "./_data";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const users = useSelector(usersState);

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      error,
      values = {},
      errorPath,
    } = await onFormValidate(schema, form);
    const { phone, email, password, name, city } = values;
    if (error) {
      setErrors(errorPath);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" });
      return;
    }
    if (users[phone]) {
      setErrors({ phone: "Number already exists" });
      return;
    }
    setErrors({});

    try {
      dispatch(signupUser({ [phone]: { email, password, name, city, phone } }));
      dispatch(
        showNotification({ severity: "success", message: "Signup Successful" })
      );
      router.push("/login");
    } catch (err) {
      dispatch(
        showNotification({ severity: "error", message: "Some error occured" })
      );
      return;
    }
  };
  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center space-y-4 md:space-y-2"
      onSubmit={onSubmit}
    >
      <h2 className="font-montserrat text-2xl leading-[36px] text-[#FCFCFD]">
        Sign up
      </h2>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-signup-name"
          label="Name"
          placeholder="Enter your name"
          autocomplete="on"
          type="text"
          //   disabled={isLoading}
          {...onRenderError(errors.name)}
          {...onRenderInput(form, setForm, "name", "")}
        />
      </div>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-signup-city"
          label="City"
          placeholder="Enter your city"
          autocomplete="on"
          //   disabled={isLoading}
          {...onRenderError(errors.city)}
          {...onRenderInput(form, setForm, "city", "")}
        />
      </div>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-signup-email"
          label="Email"
          placeholder="Enter your email"
          autocomplete="on"
          type="email"
          //   disabled={isLoading}
          {...onRenderError(errors.email)}
          {...onRenderInput(form, setForm, "email", "")}
        />
      </div>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-signup-mobile-number"
          label="Mobile Number"
          placeholder="Enter your Mobile Number"
          autocomplete="on"
          type="phone"
          //   disabled={isLoading}
          {...onRenderError(errors.phone)}
          {...onRenderInput(form, setForm, "phone", "")}
        />
      </div>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-signup-password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          autocomplete="on"
          //   disabled={isLoading}
          {...onRenderError(errors.password)}
          {...onRenderInput(form, setForm, "password", "")}
        />
      </div>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-signup-confirm-password"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          autocomplete="on"
          //   disabled={isLoading}
          {...onRenderError(errors.confirmPassword)}
          {...onRenderInput(form, setForm, "confirmPassword", "")}
        />
      </div>
      <AuthButton
        type="submit"
        className="mt-[20px]"
        // disabled={isFetching || isLoading}
      >
        Create Account
      </AuthButton>
    </form>
  );
}
