import AppButton from "@/components/button/appButton";
import AppDatepicker from "@/components/datepicker";
import AppInput from "@/components/input/appInput";
import { onFormValidate, onRenderError, onRenderInput } from "@/library/helper";
import { loggedInUserState } from "@/redux/slices/loggedInuserSlice";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { EVENT_CREATION_FORM } from "../_data";
import Guest from "./guest";
import AppModal from "@/components/modal";
import { showNotification } from "@/redux/slices/notificationSlice";
import { addEvents } from "@/redux/slices/eventsApiSlice";
import { v4 } from "uuid";

const { createState, schema } = EVENT_CREATION_FORM;
export default function AddEvent({ handleClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(createState({}));
  const [modal, setModal] = useState(false);
  const { guests = [] } = form;
  const [errors, setErrors] = useState({});

  const user = useSelector(loggedInUserState);

  const addGuest = (guest) => {
    const temp = { ...form };
    temp?.guests.push({ ...guest });
    setForm(temp);
  };

  const removeGuest = (e, index) => {
    e.preventDefault();
    const temp = { ...form };
    temp?.guests.splice(index, 1);
    setForm(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, errorPath } = await onFormValidate(schema, form);
    if (error) {
      setErrors(errorPath);
      return;
    }
    dispatch(
      addEvents({
        ...form,
        date: dayjs(form?.date).format("YYYY-MM-DD"),
        host: user?.phone,
        id: v4(),
      })
    );
    dispatch(
      showNotification({
        severity: "success",
        message: "Event created successfully",
      })
    );
    handleClose();
  };

  return (
    <div className="space-y-4">
      <h2 className="card-heading">Create New Event</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        {guests.map((guest, index) => (
          <div
            className="w-full relative block p-4 bg-[#F9F9F9] space-y-2"
            key={index}
          >
            <div className="space-y-1">
              <label className="text-[#A3A3A3] text-sm">Name</label>
              <p className="text-sm">{guest?.name || "NA"}</p>
            </div>
            <div className="w-full flex justify-between">
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Phone</label>
                <p className="text-sm">{`+91 ${guest?.phone}`}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Email</label>
                <p className="text-sm">{guest?.email || "NA"}</p>
              </div>
            </div>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={(e) => removeGuest(e, index)}
            >
              <RiDeleteBinLine color="#EF5055" size={18} />
            </div>
          </div>
        ))}
        <AppButton
          variant="outlined"
          onClick={(e) => {
            e.preventDefault();
            setModal(true);
          }}
        >
          Add Guest
        </AppButton>
        <div className="flex w-full justify-end">
          <AppButton type="submit">Create</AppButton>
        </div>
      </form>
      <AppModal
        ariaDescribedBy="protected-add-event"
        ariaLabelledBy="protected-add-event"
        open={modal}
        handleClose={() => setModal(false)}
        className="w-[calc(100vw_-_32px)] h-auto p-4 lg:w-[40vw]"
      >
        <Guest addGuest={addGuest} handleClose={() => setModal(false)} />
      </AppModal>
    </div>
  );
}
