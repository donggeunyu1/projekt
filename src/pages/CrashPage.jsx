import React from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
import GamblingCrash from "../components/GamblingCrash";
import "../styles/Crash.css"; // importér din CSS her

function CrashPage() {
  return (
    <div className="crash-page-container">
      <div>
        <Header/>
      </div>
      <div className="crash-page-content">
      <GamblingCrash/>
    </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default CrashPage;