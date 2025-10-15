import React from "react";
import GamblingCrash from "./components/GamblingCrash";
import "./styles/Crash.css";

export default function App() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Crash test</h2>
      <GamblingCrash />
    </div>
  );
}