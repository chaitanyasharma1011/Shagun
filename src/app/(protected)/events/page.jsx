"use client";

import React, { useState } from "react";
import Empty from "images/illustrations/empty_product_views.png";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { eventsState } from "@/redux/slices/eventsApiSlice";
import { loggedInUserState } from "@/redux/slices/loggedInuserSlice";
import { header } from "./_data";
import dayjs from "dayjs";
import AppButton from "@/components/button/appButton";
import AppModal from "@/components/modal";
import AddEvent from "./_components/add-event";

const sx = {
  borderColor: "#F8F8F8",
  color: "#6E6E6E",
};
export default function Events() {
  const dispatch = useDispatch();
  const user = useSelector(loggedInUserState);
  const results = useSelector(eventsState) || [];
  const [modal, setModal] = useState(false);
  let pastSmallScreen = useMediaQuery("(min-width:768px)");

  const render_empty_list = (
    <div className="flex flex-col justify-center items-center space-y-4 min-h-full my-[50px]">
      <Image src={Empty} alt="empty-product-list" />
      <p className="text-base font-normal text-center">
        No Events. Start adding new one now!
      </p>
    </div>
  );

  const render_header = (
    <TableHead sx={{ borderBottom: "1px solid #323232" }}>
      <TableRow>
        {header.map(({ id, name }, index) => (
          <TableCell
            key={id}
            sx={
              index
                ? {
                    border: "none",
                    fontWeight: 500,
                    textAlign: "center",
                  }
                : {
                    border: "none",
                    fontWeight: 500,
                  }
            }
          >
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const render_body = (
    <TableBody>
      {results.map((row = {}) => {
        return (
          <TableRow
            key={row?.id}
            className="cursor-pointer"
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleModal("view", true);
            // }}
          >
            <TableCell sx={sx}>
              {dayjs(row?.date)?.format("DD MMM[,] YYYY")}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {row?.name || "NA"}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {row?.venue || "NA"}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {row?.guests.length || "NA"}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );

  let render_table = (
    <div className="w-full space-y-3">
      {results.map((row = {}) => {
        return (
          <div
            key={row?.id}
            onClick={(e) => {
              e.stopPropagation();
              handleModal("view", true);
            }}
            className="w-full relative block md:hidden mt-4 p-4 bg-[#F9F9F9] cursor-pointer space-y-2"
          >
            <div className="space-y-1">
              <label className="text-[#A3A3A3] text-sm">Name</label>
              <p className="text-sm">{row?.name || "NA"}</p>
            </div>
            <div className="w-full flex justify-between">
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Date</label>
                <p className="text-sm">
                  {dayjs(row?.date)?.format("DD MMM[,] YYYY")}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Venue</label>
                <p className="text-sm">{row?.venue || "NA"}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[#A3A3A3] text-sm">Guest Count</label>
              <p className="text-sm">{row?.guests.length || "NA"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (pastSmallScreen)
    render_table = (
      <TableContainer sx={{ marginTop: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {render_header}
          {render_body}
        </Table>
      </TableContainer>
    );

  return (
    <div className="w-full min-h-inherit bg-white rounded-md p-4 space-y-6">
      <div className="w-full flex justify-between">
        <h2 className="card-heading">Your Events</h2>
        <AppButton onClick={() => setModal(true)}>Add Event</AppButton>
      </div>
      {results.length ? render_table : render_empty_list}
      <AppModal
        ariaDescribedBy="protected-add-event"
        ariaLabelledBy="protected-add-event"
        open={modal}
        handleClose={() => setModal(false)}
        className="w-[calc(100vw_-_32px)] h-auto p-4 lg:w-[50vw]"
      >
        <AddEvent />
      </AppModal>
    </div>
  );
}
