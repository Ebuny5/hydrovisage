/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { SessionStatus, TelemetryLog } from '../types';

interface SessionSimTabProps {
  status: SessionStatus;
  currentMA: number;
  targetMA: number;
  onTargetMAChange: (val: number) => void;
  sessionMinutes: number;
  onSessionMinutesChange: (val: number) => void;
  padWetness: number;
  onPadWetnessChange: (val: number) => void;
  elapsedSeconds: number;
  onStartPause: () => void;
  onReset: () => void;
  logs: TelemetryLog[];
}

export const SessionSimTab: React.FC<SessionSimTabProps> = ({
  status,
  currentMA,
  targetMA,
  onTargetMAChange,
  sessionMinutes,
  onSessionMinutesChange,
  padWetness,
  onPadWetnessChange,
  elapsedSeconds,
  onStartPause,
  onReset,
  logs,
}) => {
  const totalSeconds = sessionMinutes * 60;
  const progressPercent = Math.min((elapsedSeconds / totalSeconds) * 100, 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isHalfwayFlipped = elapsedSeconds >= totalSeconds / 2;
  const phaseLabel =
    status === 'active'
      ? 'Treating'
      : status === 'ramping'
      ? 'Ramping up'
      : status === 'paused'
      ? 'Paused · check pad wetness'
      : status === 'completed'
      ? 'Complete'
      : 'Ready';

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-4xl mx-auto">
      {/* 1. Dark Main Display (Matching Puter Screenshots exactly) */}
      <div className="bg-[#0b101b] text-white rounded-xl p-4 md:p-5 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-300">{phaseLabel}</span>
          <span className="text-[11px] text-slate-400">
            {isHalfwayFlipped ? 'This mask (−) · Occipital (+)' : 'This mask (+) · Occipital (−)'}
          </span>
        </div>

        {/* Big Current Readout */}
        <div className="flex items-baseline gap-2 my-2">
          <span className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-white">
            {currentMA.toFixed(1)}
          </span>
          <span className="text-xl font-mono text-slate-400">mA</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden mt-3">
          <div
            className="bg-teal-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
          <span>{formatTime(elapsedSeconds)}</span>
          <span>{formatTime(totalSeconds)}</span>
        </div>
      </div>

      {/* 2. Target Current Slider */}
      <div>
        <div className="flex items-center justify-between mb-1 text-xs">
          <span className="text-slate-600 font-medium">Target current</span>
          <span className="font-medium text-slate-800">{targetMA.toFixed(1)} mA</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1.5"
          step="0.1"
          value={targetMA}
          onChange={(e) => onTargetMAChange(parseFloat(e.target.value))}
          className="w-full accent-teal-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>0.1 mA (Sub-sensory)</span>
          <span className="text-teal-700 font-medium">1.0 mA (Facial Optimal)</span>
          <span className="text-amber-700 font-medium">1.5 mA (Max Safe Ceiling)</span>
        </div>
      </div>

      {/* 3. Session Length Selector */}
      <div>
        <span className="text-xs text-slate-600 font-medium block mb-1.5">
          Session length
        </span>
        <div className="grid grid-cols-4 gap-2">
          {[10, 15, 20, 25].map((mins) => (
            <button
              key={mins}
              onClick={() => onSessionMinutesChange(mins)}
              disabled={status === 'active' || status === 'ramping'}
              className={`py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                sessionMinutes === mins
                  ? 'bg-[#121c2d] text-white border-[#121c2d]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              } disabled:opacity-50`}
            >
              {mins} min
            </button>
          ))}
        </div>
      </div>

      {/* 4. Pad Wetness / Contact Quality Slider */}
      <div>
        <div className="flex items-center justify-between mb-1 text-xs">
          <span className="text-slate-600 font-medium">Pad wetness (contact quality)</span>
          <span className="font-medium text-slate-800">{padWetness}%</span>
        </div>
        <input
          type="range"
          min="20"
          max="100"
          value={padWetness}
          onChange={(e) => onPadWetnessChange(parseInt(e.target.value, 10))}
          className="w-full accent-teal-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          Under 40%, the controller pauses to prevent hot spots.
        </p>
      </div>

      {/* 5. Start / Pause & Reset Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onStartPause}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#0f766e] text-white hover:bg-[#115e59] flex items-center justify-center gap-1.5 transition-colors"
        >
          {status === 'active' || status === 'ramping' ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>{status === 'paused' ? 'Resume session' : 'Start session'}</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 transition-colors"
          title="Reset session"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-slate-500">
        Simulation runs at 1 second = 1 minute. Watch the current flow in the 3D model.
      </p>

      {/* 6. Session Log */}
      <div className="pt-2 border-t border-slate-200">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          SESSION LOG
        </h3>
        {logs.length === 0 ? (
          <p className="text-xs text-slate-400">No events yet.</p>
        ) : (
          <ul className="space-y-1 text-xs">
            {logs.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-slate-400 tabular-nums w-10 shrink-0">{item.time}</span>
                <span className="text-slate-700">{item.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
