// src/pages/CrashPage.jsx
import React from "react";
import GamblingCrash from "../components/GamblingCrash";
import "../styles/Crash.css"; // importér din CSS her

export default function CrashPage() {
  return (
    <div className="page-wrapper">
      <GamblingCrash />
    </div>
  );
}