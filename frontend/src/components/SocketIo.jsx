"use client";
import { updatePaitentStatusBoard } from "@/lib/features/patients/patientSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { socket } from "@/util/socket";
import React, { useEffect, useState } from "react";

const SocketIo = () => {
  const { displayPatientStatus } = useAppSelector((store) => store.patients);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect To SocketIo");
    });
    socket.on("disconnect", () => {
      console.log("Disconnect From SocketIo");
    });
    socket.on("updatePatientStatus", (patient) => {
      dispatch(updatePaitentStatusBoard(patient));
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return <div></div>;
};

export default SocketIo;
