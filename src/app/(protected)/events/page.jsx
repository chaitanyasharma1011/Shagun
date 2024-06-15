"use client";

import React from "react";
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

export default function Events() {
  const dispatch = useDispatch();
  const user = useSelector(loggedInUserState);
  const results = useSelector(eventsState) || [];
  //   console.log(useSelector(eventsState));
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
            onClick={(e) => {
              e.stopPropagation();
              handleModal("view", true);
            }}
          >
            <TableCell sx={sx}>{row?.product_data?.name || "NA"}</TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {parseFloat(units)?.toFixed(1) || "NA"}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {row?.valuation_date
                ? dayjs(row?.valuation_date)?.format("DD MMM[,] YYYY")
                : "NA"}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {portfolioWithDenotion(market_value) || "NA"}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {`${((since_inception_xirr || 0) * 100).toFixed(1)} %`}
            </TableCell>
            {/* <TableCell sx={{ ...sx, textAlign: "center" }}>
                  {portfolioWithDenotion(row?.investment_amount) || "NA"}
                </TableCell>
                <TableCell sx={{ ...sx, textAlign: "center" }}>
                  {dayjs(row?.investment_date)?.format("DD MMM[,] YYYY") || "NA"}
                </TableCell> */}
            {writable ? (
              <TableCell sx={{ ...sx, textAlign: "center" }}>
                <div
                  className="w-full flex justify-center items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModal("delete", true);
                  }}
                >
                  <RiDeleteBinLine color="#EF5055" size={18} />
                </div>
              </TableCell>
            ) : null}
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
            {writable ? (
              <span
                className="cursor-pointer absolute right-2 top-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleModal("delete", true);
                }}
              >
                <RiDeleteBinLine color="#EF5055" size={18} />
              </span>
            ) : null}
            <div className="space-y-1">
              <label className="text-[#A3A3A3] text-sm">Name</label>
              <p className="text-sm">{row?.product_data?.name || "NA"}</p>
            </div>
            <div className="w-full flex justify-between">
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Units</label>
                <p className="text-sm">
                  {parseFloat(units)?.toFixed(1) || "NA"}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Valuation Date</label>
                <p className="text-sm">
                  {row?.valuation_date
                    ? dayjs(row?.valuation_date)?.format("DD MMM[,] YYYY")
                    : "NA"}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">
                  Since Inception XIRR
                </label>
                <p className="text-sm">{`${(
                  (since_inception_xirr || 0) * 100
                ).toFixed(1)} %`}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Current Value</label>
                <p className="text-sm">
                  {portfolioWithDenotion(market_value) || "NA"}
                </p>
              </div>
            </div>

            {/* <div className="w-full flex justify-between">
                  <div className="space-y-1">
                    <label className="text-[#A3A3A3] text-sm">Investment Amount</label>
                    <p className="text-sm">
                      {portfolioWithDenotion(row?.investment_amount) || "NA"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#A3A3A3] text-sm">Investment Date</label>
                    <p className="text-sm">
                      {dayjs(row?.investment_date)?.format("DD MMM[,] YYYY") || "NA"}
                    </p>
                  </div>
                </div> */}
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
      <h2 className="card-heading">Your Events</h2>
      {results.length ? render_table : render_empty_list}
    </div>
  );
}
