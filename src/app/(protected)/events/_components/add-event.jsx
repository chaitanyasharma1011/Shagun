import AppButton from "@/components/button/appButton";
import AppDatepicker from "@/components/datepicker";
import AppInput from "@/components/input/appInput";
import { onFormValidate, onRenderError, onRenderInput } from "@/library/helper";
import { loggedInUserState } from "@/redux/slices/loggedInuserSlice";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { EVENT_CREATION_FORM } from "../_data";
import Guest from "./guest";
import AppModal from "@/components/modal";
import { showNotification } from "@/redux/slices/notificationSlice";
import {
  addEvents,
  eventsState,
  updateEvents,
} from "@/redux/slices/eventsApiSlice";
import { FiEdit } from "react-icons/fi";

const { createState, schema } = EVENT_CREATION_FORM;
export default function AddEvent({ handleClose, event }) {
  const dispatch = useDispatch();
  const events = useSelector(eventsState);
  const [form, setForm] = useState(createState({}));
  const [modal, setModal] = useState(false);
  const [guest, setGuest] = useState({});
  const [errors, setErrors] = useState({});

  const { guests = [] } = form;

  const user = useSelector(loggedInUserState);

  const addGuest = (guest) => {
    let temp = { ...form };
    let ind = temp?.guests.findIndex((item) => item?.id === guest?.id);
    let tempGuests = [...temp.guests];
    if (ind === -1) temp.guests = [...tempGuests, { ...guest }];
    else {
      tempGuests[ind] = { ...guest };
      temp.guests = tempGuests;
    }
    setForm(temp);
  };

  const removeGuest = (e, index) => {
    e.preventDefault();
    const temp = { ...form };

    let tempGuests = [...temp?.guests];
    tempGuests.splice(index, 1);
    temp.guests = tempGuests;
    setForm(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, errorPath } = await onFormValidate(schema, form);
    if (error) {
      setErrors(errorPath);
      return;
    }
    const temp = [...events];
    let ind = temp?.findIndex((item) => item?.id === form?.id);
    if (ind === -1)
      dispatch(
        addEvents({
          ...form,
          date: dayjs(form?.date).format("YYYY-MM-DD"),
          host: user?.phone,
        })
      );
    else {
      temp[ind] = { ...form, date: dayjs(form?.date).format("YYYY-MM-DD") };
      dispatch(updateEvents([...temp]));
    }

    dispatch(
      showNotification({
        severity: "success",
        message:
          ind === -1
            ? "Event created successfully"
            : "Event Updated Successfully",
      })
    );
    handleClose();
  };

  const handleGuest = (e, guest) => {
    e.preventDefault();
    setModal(true);
    setGuest(guest);
  };

  useEffect(() => {
    setForm(createState(event));
  }, [event]);

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
            <div className="absolute flex space-x-4 top-2 right-2 cursor-pointer">
              <FiEdit
                color="#1982F8"
                size={18}
                className="cursor-pointer"
                onClick={(e) => handleGuest(e, guest)}
              />
              <RiDeleteBinLine
                color="#EF5055"
                className="cursor-pointer"
                size={18}
                onClick={(e) => removeGuest(e, index)}
              />
            </div>
          </div>
        ))}
        <AppButton variant="outlined" onClick={(e) => handleGuest(e, {})}>
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
        <Guest
          addGuest={addGuest}
          guest={guest}
          handleClose={() => setModal(false)}
        />
      </AppModal>
    </div>
  );
}
