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
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">💥 Gambling Crash</h1>

      <div className="flex justify-center gap-4 mb-4">
        <div className="bg-gray-100 p-3 rounded">
          <div className="text-sm">Balance</div>
          <div className="text-xl font-semibold">{balance} 💰</div>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <div className="text-sm">Multiplier</div>
          <div className="text-xl font-semibold">{multiplier.toFixed(2)}x</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm mr-2">Indsats:</label>
        <input
          type="number"
          min={1}
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          disabled={isPlaying}
          className="w-24 p-1 border rounded"
        />
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={startGame}
          disabled={isPlaying}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
        >
          Start
        </button>
        <button
          onClick={stopGame}
          disabled={!isPlaying || cashedOut}
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-60"
        >
          Stop
        </button>
        <button
          onClick={() => setBalance(1000)}
          className="px-3 py-2 bg-gray-300 rounded"
        >
          Reset Balance
        </button>
      </div>

      <div style={{ width: '60%', height: 300, background: '#fafafbff', padding: 8, borderRadius: 8 }}>
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


      <div className="mt-4 text-lg font-medium">{message}</div>

      <div className="mt-6 text-sm text-gray-600">
        <strong>Regler:</strong>
        <ul className="list-disc pl-5 text-left inline-block">
          <li>Placer en indsats og tryk <strong>Start</strong>.</li>
          <li>Multiplieren stiger — tryk <strong>Stop</strong> inden den crasher!</li>
          <li>Hvis du når at stoppe før crash, vinder du indsats × multiplier.</li>
          <li>Dette er kun et spil med virtuelle mønter.</li>
          <li>Hey</li>
        </ul>
      </div>
    </div>
  );
}