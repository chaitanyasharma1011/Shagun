"use client";

import { eventsState } from "@/redux/slices/eventsApiSlice";
import { loggedInUserState } from "@/redux/slices/loggedInuserSlice";
import React from "react";
import { useSelector } from "react-redux";
import Comparison from "./_components/comparison";
import TopContributed from "./_components/top-contributed";
import TopRecieved from "./_components/top-recieved";
import VisualRepresentation from "./_components/visual-representation";

export default function Dashboard() {
  const events = useSelector(eventsState);
  const user = useSelector(loggedInUserState);
  let results = {};

  events.forEach((event) => {
    if (event.host !== user?.phone) {
      let ind = event.guests.findIndex(
        (guest) => guest["phone"] === user?.phone
      );
      if (ind >= 0) {
        let eventContri = parseInt(event.guests[ind]?.contribution || 0);
        let { contributed = 0, recieved = 0 } = results[event?.host] || {};
        results[event?.host] = {
          host: event?.host,
          contributed: eventContri + parseInt(contributed),
          recieved,
        };
      }
    } else {
      const { guests = [] } = event;
      guests.forEach((guest) => {
        let eventContri = parseInt(guest?.contribution || 0);
        let { contributed = 0, recieved = 0 } = results[guest?.phone] || {};
        results[guest?.phone] = {
          host: guest?.phone,
          contributed,
          recieved: parseInt(recieved) + eventContri,
        };
      });
    }
  });
  return (
    <div className="w-full min-h-inherit bg-white rounded-md p-4 space-y-6">
      <h2 className="card-heading">Dashboard</h2>
      <Comparison results={results} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopRecieved results={results} />
        <TopContributed results={results} />
      </div>
      <VisualRepresentation results={results} />
    </div>
  );
}
