import React, { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function GamblingCrash() {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(50);
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [crashPoint, setCrashPoint] = useState(null);
  const [cashedOut, setCashedOut] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const timerRef = useRef(null);

  function startGame() {
    if (isPlaying) return;
    if (bet <= 0 || bet > balance) {
      setMessage("Ugyldig indsats");
      return;
    }
    const newCrash = generateCrashPoint();
    setIsPlaying(true);
    setMultiplier(1);
    setCashedOut(false);
    setBalance((b) => b - bet);
    setCrashPoint(newCrash);
    setData([{ time: 0, multiplier: 1 }]);
    setMessage("Spillet kører... Tryk STOP inden det crasher!");
  }

  function generateCrashPoint() {
    const r = Math.random();
    return Math.max(1.1, Math.round((1 / (1 - r)) * 10) / 10);
  }

  function stopGame() {
    if (!isPlaying || cashedOut) return;
    setCashedOut(true);
    const payout = Math.floor(bet * multiplier);
    setBalance((b) => b + payout);
    setMessage(`Du stoppede ved ${multiplier.toFixed(2)}x og vandt ${payout} 💰`);
    clearInterval(timerRef.current);
    setIsPlaying(false);
  }

  useEffect(() => {
  if (!isPlaying) return;

  const start = Date.now();
  setData([{ time: 0, multiplier: 1 }]); // startpunkt
  setMultiplier(1);

  timerRef.current = setInterval(() => {
    const elapsed = (Date.now() - start) / 1000;
    const newMult = 1 + elapsed / 2; // hastighed justeret

    // tilføj datapunkt
    setData((prev) => [...prev, { time: elapsed, multiplier: newMult }]);
    setMultiplier(newMult);

    if (newMult >= crashPoint) {
      clearInterval(timerRef.current);
      if (!cashedOut) {
        setMessage(`Crash ved ${crashPoint.toFixed(2)}x 😭 du tabte!`);
        setIsPlaying(false);
      }
    }
  }, 100);

  return () => clearInterval(timerRef.current);
}, [isPlaying, crashPoint, cashedOut]);


  return (
    <div className="crash-container">
      <h1 className="crash-title">💥 Gambling Crash</h1>
      <div className="crash-stats">
        <div className="stat-card">
          <div className="stat-label">Balance</div>
          <div className="stat-value">{balance} 💰</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Multiplier</div>
          <div className="stat-value">{multiplier.toFixed(2)}x</div>
        </div>
      </div>
      <div className="bet-row">
        <label className="bet-label">Indsats:</label>
        <input
          type="number"
          min={1}
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          disabled={isPlaying}
          className="bet-input"
        />
      </div>

      {/* Buttons moved below the graph, only Reset remains here for layout */}
      <div className="reset-row">
        <button onClick={() => setBalance(1000)} className="btn-reset">
          Reset Balance
        </button>
      </div>


      <div style={{ width: '60%', height: 300, background: '#fafafbff', padding: 8, borderRadius: 8, marginLeft: 8}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(val) => val.toFixed(1) + 's'} />
            <YAxis dataKey="multiplier" type="number" domain={[1, 'auto']} tickFormatter={(val) => val.toFixed(2) + 'x'} />
            <Tooltip formatter={(val) => val.toFixed(2) + 'x'} labelFormatter={(label) => 'Tid: ' + label.toFixed(1) + 's'} />
            <Line type="monotone" dataKey="multiplier" stroke="#82ca9d" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Start and Stop buttons moved below the graph */}
      <div className="control-row">
        <button
          onClick={() => {
            if (!isPlaying) startGame();
            else stopGame();
          }}
          className="btn-toggle"
          disabled={isPlaying && cashedOut}
        >
          {isPlaying ? (cashedOut ? 'Cashed' : 'Stop') : 'Start'}
        </button>
      </div>


  <div className="crash-message">{message}</div>

      <div className="rules">
        <strong>Regler:</strong>
        <ul>
          <li>Placer en indsats og tryk <strong>Start</strong>.</li>
          <li>Multiplieren stiger — tryk <strong>Stop</strong> inden den crasher!</li>
          <li>Hvis du når at stoppe før crash, vinder du indsats × multiplier.</li>
          <li>Dette er kun et spil med virtuelle mønter.</li>
        </ul>
      </div>
    </div>
  );
}