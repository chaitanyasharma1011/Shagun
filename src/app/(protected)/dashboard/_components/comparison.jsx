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
import { summary_header } from "../_data";

const sx = {
  borderColor: "#F8F8F8",
  color: "#6E6E6E",
};
export default function Comparison({ results }) {
  let pastSmallScreen = useMediaQuery("(min-width:768px)");

  const render_empty_list = (
    <div className="flex flex-col justify-center items-center space-y-4 min-h-full my-[50px]">
      <Image src={Empty} alt="empty-product-list" />
      <p className="text-base font-normal text-center">No Data!</p>
    </div>
  );

  const render_header = (
    <TableHead sx={{ borderBottom: "1px solid #323232" }}>
      <TableRow>
        {summary_header.map(({ id, name }, index) => (
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
      {Object.values(results).map((row = {}, index) => {
        return (
          <TableRow key={index}>
            <TableCell sx={sx}>{row?.host || "NA"}</TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {row?.recieved.toLocaleString("en-IN") || 0}
            </TableCell>
            <TableCell sx={{ ...sx, textAlign: "center" }}>
              {row?.contributed.toLocaleString("en-IN") || 0}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );

  let render_table = (
    <div className="w-full space-y-3">
      {Object.values(results).map((row = {}) => {
        return (
          <div
            key={row?.id}
            // onClick={(e) => {
            //   e.stopPropagation();
            //   handleModal("view", true);
            // }}
            className="w-full relative block md:hidden mt-4 p-4 bg-[#F9F9F9] space-y-2"
          >
            <div className="space-y-1">
              <label className="text-[#A3A3A3] text-sm">Host</label>
              <p className="text-sm">{row?.host || "NA"}</p>
            </div>
            <div className="w-full flex justify-between">
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Recieved</label>
                <p className="text-sm">
                  {row?.recieved.toLocaleString("en-IN") || 0}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[#A3A3A3] text-sm">Contributed</label>
                <p className="text-sm">
                  {row?.contributed.toLocaleString("en-IN") || 0}
                </p>
              </div>
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
    <div className="space-y-4">
      <h4 className="font-medium">Summary</h4>
      {Object.values(results).length ? render_table : render_empty_list}
    </div>
  );
}
