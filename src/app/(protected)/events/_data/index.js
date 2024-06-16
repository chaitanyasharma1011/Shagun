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
];

export const EVENT_CREATION_FORM = {
  createState: (data = {}) => ({
    name: data?.name || "",
    venue: data?.venue || "",
    date: dayjs(data?.date || ""),
    guests: data?.guests || [],
  }),
  schema: yup.object().shape({
    name: yup.string().required("This field is required").trim(),
    venue: yup.string().required("This field is required").trim(),
    date: yupDateFormat(true),
  }),
};
