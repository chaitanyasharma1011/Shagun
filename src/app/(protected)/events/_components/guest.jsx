import React, { useEffect, useRef, useState } from "react";
import { InputAdornment } from "@mui/material";
import emailjs from "@emailjs/browser";
import AppInput from "@/components/input/appInput";
import { onFormValidate, onRenderError, onRenderInput } from "@/library/helper";
import { GUEST_CREATION_FORM } from "../_data";
import { useDispatch, useSelector } from "react-redux";
import { usersState } from "@/redux/slices/usersSlice";
import AppButton from "@/components/button/appButton";
import AutoComplete from "./autocomplete";
import { loggedInUserState } from "@/redux/slices/loggedInuserSlice";
import { showNotification } from "@/redux/slices/notificationSlice";

const { createState, schema } = GUEST_CREATION_FORM;
export default function Guest({ addGuest, handleClose, guest }) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const users = useSelector(usersState);
  const user = useSelector(loggedInUserState);
  const [form, setForm] = useState(createState({}));
  const [errors, setErrors] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);

  const buttonText = users[form?.phone] ? "Add" : "Invite";

  const emailParams = {
    to_name: form?.name,
    to_email: form?.email,
    from_name: user?.name,
    signup_link: process.env.NEXT_PUBLIC_DOMAIN + "signup",
  };

  const handleSearch = (search, size) => {
    setFilteredUsers(
      Object.values(users)
        .filter((result) => result.phone.includes(search))
        .map((result) => {
          return {
            id: result.id,
            option: result.phone,
            description: result.phone,
            ...result,
          };
        })
    );
  };

  const handleSelect = (option, _, index, item) => {
    const { name, phone, city, email } = item;
    setForm({ ...form, name, phone, city, email });
  };

  const handleChange = (val) => {
    setForm((form) => ({ ...form, phone: val }));
  };

  const invite = (e) => {
    e.preventDefault();
    dispatch(
      showNotification({
        severity: "info",
        message: "Sending Invitation",
      })
    );
    emailjs.send("service_wlk6jws", "template_kjrjlaf", emailParams).then(
      (result) => {
        dispatch(
          showNotification({
            severity: "success",
            message: "Invitation sent successfully",
          })
        );
      },
      (error) => {
        console.log(error);
        dispatch(showNotification({ severity: "error", message: error.text }));
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, errorPath } = await onFormValidate(schema, form);
    if (error) {
      setErrors(errorPath);
      return;
    }
    addGuest(form);
    !users[form?.phone] && invite(e);
    handleClose();
  };

  useEffect(() => {
    emailjs.init({
      publicKey: "kCnnJd4qf8UIDsFpc",
      limitRate: {
        // Set the limit rate for the application
        id: "shagun",
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
  }, []);

  useEffect(() => {
    setFilteredUsers(
      Object.values(users).map((result) => {
        return {
          id: result.id,
          option: result.phone,
          description: result.phone,
          ...result,
        };
      })
    );
  }, [users]);

  useEffect(() => {
    setForm(createState(guest));
  }, [guest]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
      {" "}
      <h2 className="card-heading">Enter Guest Details</h2>
      <AutoComplete
        options={filteredUsers}
        placeholder="Enter Mobile Number"
        label="Phone"
        onSearch={handleSearch}
        onSelect={handleSelect}
        onChange={handleChange}
        loading={false}
        initialState={form?.phone}
        count={filteredUsers.length}
        {...onRenderError(errors.phone)}
      />
      <AppInput
        label="Name"
        {...onRenderError(errors.name)}
        {...onRenderInput(form, setForm, "name", "")}
      />
      <AppInput
        label="City"
        {...onRenderError(errors.city)}
        {...onRenderInput(form, setForm, "city", "")}
      />
      <AppInput
        label="Email"
        {...onRenderError(errors.email)}
        {...onRenderInput(form, setForm, "email", "")}
      />
      <AppInput
        label="Contribution"
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        {...onRenderInput(form, setForm, "contribution", "")}
      />
      <AppButton type="submit">{buttonText}</AppButton>
    </form>
  );
}
