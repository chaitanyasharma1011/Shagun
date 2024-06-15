"use client";

import AuthButton from "@/components/button/authButton";
import AuthInput from "@/components/input/authInput";
import { onRenderInput, onRenderError, onFormValidate } from "@/library/helper";
import { loginUser } from "@/redux/slices/loggedInuserSlice";
import { showNotification } from "@/redux/slices/notificationSlice";
import { usersState } from "@/redux/slices/usersSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { schema } from "./_data";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const users = useSelector(usersState);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, errorPath } = await onFormValidate(schema, form);
    if (error) {
      setErrors(errorPath);
      return;
    }
    setErrors({});
    if (users[form?.phone] && users[form?.phone]?.password === form?.password) {
      dispatch(
        showNotification({
          severity: "success",
          message: "Credentials approved",
        })
      );
      dispatch(loginUser({ ...users[form?.phone] }));
      router.push("/events");
    } else
      dispatch(
        showNotification({
          severity: "error",
          message: "Authorization credentials are not valid",
        })
      );
  };

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center space-y-8 md:space-y-4"
      onSubmit={onSubmit}
    >
      <h2 className="font-montserrat text-2xl leading-[36px] text-[#FCFCFD]">
        Login
      </h2>
      <div className="w-full">
        <AuthInput
          id="custom-input-auth-login-mobile-number"
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
          id="custom-input-auth-login-password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          autocomplete="on"
          //   disabled={isLoading}
          {...onRenderError(errors.password)}
          {...onRenderInput(form, setForm, "password", "")}
        />
      </div>
      <AuthButton
        type="submit"
        className="mt-[20px]"
        // disabled={isFetching || isLoading}
      >
        Login
      </AuthButton>
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex space-x-2 text-[#B1B5C4] text-[13px]">
          <span className="font-montserrat">Don&apos;t have an account?</span>{" "}
          <Link href="/signup">
            <span
              className="font-montserrat font-semibold cursor-pointer hover:text-white"
              role="button"
              tabIndex="0"
            >
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </form>
  );
  return null;
}
