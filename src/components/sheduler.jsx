import React, { useState, useEffect, useCallback } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { format, isWithinInterval, eachHourOfInterval, isWeekend, setHours,  } from "date-fns";

export default function Scheduler(props) {
  const [openScheduler, setOpenScheduler] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: setHours(new Date(), 8), 
    endDate: setHours(new Date(), 16), 
    key: "selection",
  });
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  const getAllAppointments = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:500/appointments", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          startDate: format(selectionRange.startDate, "yyyy-MM-dd"),
          endDate: format(selectionRange.endDate, "yyyy-MM-dd"),
        },
      });
      const allAppointments = response.data.data;
      setAppointments(allAppointments);
    } catch (error) {
      console.log(error);
    }
  }, [selectionRange]);

  useEffect(() => {
    if (openScheduler) {
      getAllAppointments();
    }
  }, [openScheduler, getAllAppointments]);

  const handleClick = () => {
    setOpenScheduler(!openScheduler);
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const isSlotAvailable = (slotStart, slotEnd) => {
    return (
      !isWeekend(slotStart) && 
      !isWeekend(slotEnd) && 
      !appointments.some((appointment) => {
        const appointmentStart = new Date(appointment.startTime);
        const appointmentEnd = new Date(appointment.endTime);
        return (
          isWithinInterval(slotStart, { start: appointmentStart, end: appointmentEnd }) ||
          isWithinInterval(slotEnd, { start: appointmentStart, end: appointmentEnd })
        );
      })
    );
  };

  const handleSelectAppointment = (selectedAppointment) => {
    setSelectedAppointment(selectedAppointment);
    props.onSendDateRange(selectedAppointment);
  };

  return (
    <>
      <h1 onClick={handleClick}>Book your appointment</h1>
      {openScheduler && (
        <DateRangePicker
          className="flex flex-col w-full justify-center items-center"
          ranges={[selectionRange]}
          onChange={handleSelect}
          minDate={new Date()}
          color="blue"
          rangeColors={["blue"]}
        />
      )}
      <div>
        <h2>
          {eachHourOfInterval({
            start: selectionRange.startDate,
            end: selectionRange.endDate,
          }).map((hour, index) => (
            <div
              key={index}
              className={`bg-gray-200 p-4 rounded-lg mb-4 ${
                !isSlotAvailable(hour, new Date(hour.getTime() + 2 * 60 * 60 * 1000))
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (isSlotAvailable(hour, new Date(hour.getTime() + 2 * 60 * 60 * 1000))) {
                  handleSelectAppointment({ startTime: hour, endTime: new Date(hour.getTime() + 2 * 60 * 60 * 1000) });
                }
              }}
            >
              <p className="text-gray-800">
                Time Slot: {format(hour, "dd/MM/yyyy HH:mm:ss")} - {format(new Date(hour.getTime() + 2 * 60 * 60 * 1000), "HH:mm:ss")}
              </p>
              {!isSlotAvailable(hour, new Date(hour.getTime() + 2 * 60 * 60 * 1000)) && (
                <p className="text-gray-600">Unavailable</p>
              )}
            </div>
          ))}
        </h2>
      </div>
      <div>
        <h2>
          Selected Appointment:
          {selectedAppointment && (
            <div>
              <p>
                Start Time: {format(selectedAppointment.startTime, "dd/MM/yyyy HH:mm:ss")}
              </p>
              <p>
                End Time: {format(selectedAppointment.endTime, "dd/MM/yyyy HH:mm:ss")}
              </p>
            </div>
          )}
        </h2>
      </div>
    </>
  );
}
