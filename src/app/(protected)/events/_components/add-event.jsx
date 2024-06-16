import AppButton from "@/components/button/appButton";
import AppDatepicker from "@/components/datepicker";
import AppInput from "@/components/input/appInput";
import { onRenderError, onRenderInput } from "@/library/helper";
import { loggedInUserState } from "@/redux/slices/loggedInuserSlice";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EVENT_CREATION_FORM } from "../_data";

const { createState } = EVENT_CREATION_FORM;
export default function AddEvent() {
  const [form, setForm] = useState(createState({}));
  const [errors, setErrors] = useState({});

  const user = useSelector(loggedInUserState);
  return (
    <div className="space-y-4">
      <h2 className="card-heading">Create New Event</h2>
      <form className="space-y-4">
        <div className="w-full md:w-1/2 space-y-4">
          <AppInput
            label="Name"
            {...onRenderError(errors.name)}
            {...onRenderInput(form, setForm, "name", "")}
          />
          <AppInput
            label="Venue"
            {...onRenderError(errors.venue)}
            {...onRenderInput(form, setForm, "venue", "")}
          />
          <AppDatepicker
            label="Date"
            {...onRenderError(errors.date)}
            {...onRenderInput(form, setForm, "date", dayjs())}
          />
        </div>

        <div className="flex w-full justify-end">
          <AppButton type="submit">Create</AppButton>
        </div>
      </form>
    </div>
  );
}
