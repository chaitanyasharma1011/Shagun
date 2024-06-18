import { yupDateFormat } from "@/library/helper";
import * as yup from "yup";
import { v4 } from "uuid";
import dayjs from "dayjs";

export const header = [
  {
    id: v4(),
    name: "Date",
  },
  {
    id: v4(),
    name: "Name",
  },
  {
    id: v4(),
    name: "Venue",
  },
  {
    id: v4(),
    name: "Guest Count",
  },
  {
    id: v4(),
    name: "Total Contribution",
  },
  {
    id: v4(),
    name: "Actions",
  },
];

export const EVENT_CREATION_FORM = {
  createState: (data = {}) => ({
    name: data?.name || "",
    venue: data?.venue || "",
    date: dayjs(data?.date),
    guests: data?.guests || [],
    open: true,
    host: data?.host || "",
    id: data?.id || v4(),
  }),
  schema: yup.object().shape({
    name: yup.string().required("This field is required").trim(),
    venue: yup.string().required("This field is required").trim(),
    date: yupDateFormat(true),
  }),
};

export const GUEST_CREATION_FORM = {
  createState: (data = {}) => ({
    name: data?.name || "",
    phone: data?.phone || "",
    email: data?.email || "",
    city: data?.city || "",
    host: data?.host || "",
    id: data?.id || v4(),
    contribution: data?.contribution || "",
  }),
  schema: yup.object().shape({
    name: yup.string().required("This field is required").trim(),
    city: yup.string().required("This field is required").trim(),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required")
      .trim(),
    phone: yup
      .string()
      .length(10, "Enter a valid phone number")
      .required("Phone number is required"),
  }),
};
