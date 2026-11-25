/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Check,
  Wrench,
  ShieldAlert,
  ShieldCheck,
  Cable,
  Sparkles,
  FlaskConical,
  Layers,
  Box,
} from 'lucide-react';
import { BUILD_STEPS, BuildStep, DiagramType } from '../data/buildSteps';

interface BuildGuideTabProps {
  onSelectPart: (partId: string | null) => void;
}

const StepDiagram: React.FC<{ type: DiagramType }> = ({ type }) => {
  switch (type) {
    case 'shell_layout':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
          {/* Mask silhouette */}
          <path
            d="M 110 28 Q 210 14 310 28 L 325 75 Q 210 116 95 75 Z"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Orbital eyes */}
          <ellipse cx="165" cy="58" rx="26" ry="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <ellipse cx="255" cy="58" rx="26" ry="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* IPD dimension line */}
          <line x1="165" y1="58" x2="255" y2="58" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="210" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f766e">
            62–64 mm IPD
          </text>
          {/* Forehead chalk zone */}
          <rect x="145" y="26" width="130" height="14" rx="4" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="210" y="36" textAnchor="middle" fontSize="8" fontWeight="600" fill="#5eead4">
            Forehead Zone (28 cm²)
          </text>
          {/* Straps */}
          <line x1="95" y1="62" x2="45" y2="62" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <line x1="325" y1="62" x2="375" y2="62" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <text x="58" y="80" textAnchor="middle" fontSize="8" fill="#475569">
            ≥12 mm strap
          </text>
          <text x="362" y="80" textAnchor="middle" fontSize="8" fill="#475569">
            ≥12 mm strap
          </text>
        </svg>
      );

    case 'eye_buffer':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#fffbeb" stroke="#fde68a" />
          {/* Forehead electrode edge */}
          <rect x="70" y="20" width="280" height="22" rx="6" fill="#2dd4bf" opacity="0.35" stroke="#0d9488" strokeWidth="1.5" />
          <text x="210" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#115e59">
            Active Forehead Pad Edge (Stops Here)
          </text>
          {/* 25mm Buffer arrow */}
          <line x1="150" y1="43" x2="150" y2="75" stroke="#d97706" strokeWidth="2" />
          <polygon points="146,48 150,42 154,48" fill="#d97706" />
          <polygon points="146,70 150,76 154,70" fill="#d97706" />
          <text x="160" y="63" fontSize="9.5" fontWeight="700" fill="#b45309">
            ≥ 25 mm Non-Conductive Buffer (Keep Out!)
          </text>
          {/* Silicone gold eye ring */}
          <ellipse cx="150" cy="95" rx="34" ry="16" fill="#ffffff" stroke="#d97706" strokeWidth="4" />
          <ellipse cx="270" cy="95" rx="34" ry="16" fill="#ffffff" stroke="#d97706" strokeWidth="4" />
          <text x="150" y="98" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">
            Eye Aperture
          </text>
          <text x="270" y="98" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">
            Shore 30A Ring
          </text>
        </svg>
      );

    case 'tpu_lamination':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="210" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">
            Cross-Section: Stopping Moisture Leaks Outward
          </text>
          {/* Outer shell L1 */}
          <rect x="40" y="85" width="340" height="22" rx="4" fill="#1e293b" />
          <text x="210" y="99" textAnchor="middle" fontSize="9" fontWeight="600" fill="#e2e8f0">
            L1: Outer Breathable Charcoal Shell (Stays 100% Dry)
          </text>
          {/* TPU L2 */}
          <rect x="40" y="62" width="340" height="18" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
          <text x="210" y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0369a1">
            L2: 30 μm Waterproof TPU Film (10,000 mm H₂O Barrier)
          </text>
          {/* Upward current arrow */}
          <path d="M 110 58 L 110 38" stroke="#0d9488" strokeWidth="2.5" />
          <polygon points="105,42 110,33 115,42" fill="#0d9488" />
          <path d="M 210 58 L 210 38" stroke="#0d9488" strokeWidth="2.5" />
          <polygon points="205,42 210,33 215,42" fill="#0d9488" />
          <path d="M 310 58 L 310 38" stroke="#0d9488" strokeWidth="2.5" />
          <polygon points="305,42 310,33 315,42" fill="#0d9488" />
          <text x="210" y="50" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f766e">
            100% Ionic Current Directed Inward Toward Skin
          </text>
        </svg>
      );

    case 'electrode_zones':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
          {/* Left Temple (Pole B) */}
          <rect x="35" y="42" width="66" height="48" rx="8" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <circle cx="68" cy="66" r="6" fill="#0f172a" />
          <text x="68" y="34" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#334155">
            L. Temple (−)
          </text>

          {/* Gap callout */}
          <line x1="104" y1="66" x2="128" y2="66" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="116" y="82" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#dc2626">
            15mm gap
          </text>

          {/* Forehead (Pole A) */}
          <rect x="130" y="24" width="160" height="32" rx="8" fill="#99f6e4" stroke="#0f766e" strokeWidth="1.5" />
          <circle cx="210" cy="40" r="6" fill="#0f766e" />
          <text x="210" y="19" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f766e">
            Forehead Zone (+) • Snap #1
          </text>

          {/* Philtrum (Pole A) */}
          <rect x="165" y="76" width="90" height="28" rx="6" fill="#99f6e4" stroke="#0f766e" strokeWidth="1.5" />
          <circle cx="210" cy="90" r="5" fill="#0f766e" />
          <text x="210" y="114" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f766e">
            Philtrum / Upper Lip (+) • Snap #3
          </text>

          {/* Gap callout right */}
          <line x1="292" y1="66" x2="316" y2="66" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="304" y="82" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#dc2626">
            15mm gap
          </text>

          {/* Right Temple (Pole B) */}
          <rect x="319" y="42" width="66" height="48" rx="8" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <circle cx="352" cy="66" r="6" fill="#0f172a" />
          <text x="352" y="34" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#334155">
            R. Temple (−)
          </text>
        </svg>
      );

    case 'wiring_bus':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
          {/* Left Front Snaps */}
          <rect x="24" y="24" width="115" height="32" rx="6" fill="#ccfbf1" stroke="#0d9488" />
          <text x="81" y="43" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f766e">
            Forehead + Lip (Pole A)
          </text>
          <rect x="24" y="72" width="115" height="32" rx="6" fill="#e2e8f0" stroke="#475569" />
          <text x="81" y="91" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1e293b">
            L + R Temples (Pole B)
          </text>

          {/* Ribbon wires with heatshrink sleeves */}
          <line x1="139" y1="40" x2="290" y2="52" stroke="#0d9488" strokeWidth="3" />
          <line x1="139" y1="88" x2="290" y2="76" stroke="#1e293b" strokeWidth="3" />
          {/* Heat shrink markers */}
          <rect x="175" y="39" width="24" height="8" rx="2" fill="#0f172a" />
          <rect x="175" y="79" width="24" height="8" rx="2" fill="#0f172a" />
          <rect x="235" y="45" width="24" height="8" rx="2" fill="#0f172a" />
          <rect x="235" y="73" width="24" height="8" rx="2" fill="#0f172a" />
          <text x="215" y="28" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">
            28 AWG Silicone Wire + Heat-Shrink Keepers
          </text>

          {/* Rear 4-Pin Plug */}
          <rect x="290" y="34" width="106" height="60" rx="8" fill="#1e293b" stroke="#0d9488" strokeWidth="1.5" />
          <text x="343" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5eead4">
            4-Pin Rear Plug
          </text>
          <text x="343" y="70" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            Pin 1–2: Pole A (Teal)
          </text>
          <text x="343" y="82" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            Pin 3–4: Pole B (Blk)
          </text>
        </svg>
      );

    case 'controller_pcb':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="210" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5eead4">
            Hardware Current-Clamped Architecture (No Software Over-Current Risk)
          </text>
          {/* Blocks */}
          <rect x="22" y="42" width="66" height="48" rx="6" fill="#1e293b" stroke="#64748b" />
          <text x="55" y="62" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f8fafc">
            3.7V Li-Po
          </text>
          <text x="55" y="75" textAnchor="middle" fontSize="7" fill="#94a3b8">
            + BMS 850mAh
          </text>

          <line x1="88" y1="66" x2="106" y2="66" stroke="#2dd4bf" strokeWidth="2" />

          <rect x="106" y="42" width="76" height="48" rx="6" fill="#1e293b" stroke="#64748b" />
          <text x="144" y="62" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f8fafc">
            Boost ≤18V
          </text>
          <text x="144" y="75" textAnchor="middle" fontSize="7" fill="#94a3b8">
            + MCU OLED
          </text>

          <line x1="182" y1="66" x2="200" y2="66" stroke="#2dd4bf" strokeWidth="2" />

          <rect x="200" y="38" width="90" height="56" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <text x="245" y="57" textAnchor="middle" fontSize="8" fontWeight="700" fill="#6ee7b7">
            HW Clamp
          </text>
          <text x="245" y="70" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff">
            ≤ 1.5 mA Max
          </text>
          <text x="245" y="82" textAnchor="middle" fontSize="7" fill="#a7f3d0">
            LM334 / Op-Amp
          </text>

          <line x1="290" y1="66" x2="308" y2="66" stroke="#2dd4bf" strokeWidth="2" />

          <rect x="308" y="42" width="90" height="48" rx="6" fill="#1e293b" stroke="#38bdf8" />
          <text x="353" y="61" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7dd3fc">
            H-Bridge Out
          </text>
          <text x="353" y="74" textAnchor="middle" fontSize="7" fill="#e0f2fe">
            5-Min Flip (A/B)
          </text>
        </svg>
      );

    case 'bench_test':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#fffbeb" stroke="#fcd34d" />
          <text x="210" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">
            Mandatory Bench Load Test Circuit (DO NOT WEAR DURING THIS TEST)
          </text>

          {/* Controller */}
          <rect x="26" y="44" width="84" height="52" rx="6" fill="#1e293b" />
          <text x="68" y="66" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff">
            Controller
          </text>
          <text x="68" y="80" textAnchor="middle" fontSize="7.5" fill="#5eead4">
            Pole A (+) / B (−)
          </text>

          {/* Series wire top */}
          <line x1="110" y1="54" x2="155" y2="54" stroke="#ef4444" strokeWidth="2" />

          {/* 4.7k Dummy Resistor */}
          <rect x="155" y="41" width="90" height="26" rx="5" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
          <text x="200" y="53" textAnchor="middle" fontSize="8" fontWeight="700" fill="#b45309">
            4.7 kΩ Resistor
          </text>
          <text x="200" y="63" textAnchor="middle" fontSize="7" fill="#78350f">
            (Simulated Skin)
          </text>

          {/* Wire to meter */}
          <line x1="245" y1="54" x2="290" y2="54" stroke="#ef4444" strokeWidth="2" />

          {/* Digital Multimeter */}
          <rect x="290" y="34" width="104" height="72" rx="8" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <rect x="300" y="42" width="84" height="28" rx="3" fill="#ecfccb" stroke="#84cc16" />
          <text x="342" y="60" textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="monospace" fill="#1e293b">
            1.20 mA
          </text>
          <text x="342" y="85" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#422006">
            SET: mA DC MODE
          </text>
          <text x="342" y="96" textAnchor="middle" fontSize="7" fontWeight="700" fill="#713f12">
            PASS IF ≤ 1.50 mA
          </text>

          {/* Return wire bottom */}
          <polyline points="290,86 110,86" fill="none" stroke="#0f172a" strokeWidth="2" />
        </svg>
      );

    case 'final_stack':
      return (
        <svg viewBox="0 0 420 130" className="w-full h-auto">
          <rect x="8" y="8" width="404" height="114" rx="10" fill="#f0fdfa" stroke="#99f6e4" />
          <text x="210" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#115e59">
            Complete 4-Layer Therapeutic Assembly Stack
          </text>
          <rect x="45" y="33" width="330" height="17" rx="4" fill="#1e293b" />
          <text x="210" y="44" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ffffff">
            L1: 3D Knit Compression Shell + Gold 25mm Eye Rings
          </text>
          <rect x="45" y="53" width="330" height="17" rx="4" fill="#334155" />
          <text x="210" y="64" textAnchor="middle" fontSize="8" fontWeight="600" fill="#e2e8f0">
            L2: 30 μm Waterproof TPU Barrier + Insulated Side Bus
          </text>
          <rect x="45" y="73" width="330" height="17" rx="4" fill="#64748b" />
          <text x="210" y="84" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ffffff">
            L3: 4-Zone Ag/AgCl Electrodes + Magnetic Snap Studs
          </text>
          <rect x="45" y="93" width="330" height="19" rx="4" fill="#2dd4bf" stroke="#0d9488" />
          <text x="210" y="106" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#042f2e">
            L4: Snap-On 0.9% Isotonic Hydrogel Pads → Patient Skin
          </text>
        </svg>
      );
  }
};

export const BuildGuideTab: React.FC<BuildGuideTabProps> = ({ onSelectPart }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('hydrovisage_build_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('hydrovisage_build_progress', JSON.stringify(completedSteps));
    } catch {
      // ignore storage quota errors
    }
  }, [completedSteps]);

  const currentStep: BuildStep = BUILD_STEPS[activeIndex];
  const completedCount = BUILD_STEPS.filter((s) => completedSteps[s.id]).length;
  const progressPct = Math.round((completedCount / BUILD_STEPS.length) * 100);

  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const handleSelectStep = (idx: number) => {
    setActiveIndex(idx);
    setDownloadSuccess(false);
    const firstPart = BUILD_STEPS[idx].linkedPartIds[0];
    if (firstPart) {
      onSelectPart(firstPart);
    }
  };

  const handleDownloadStepImage = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch(currentStep.image);
      const blob = await response.blob();
      const jpegBlob = new Blob([blob], { type: 'image/jpeg' });
      const blobUrl = window.URL.createObjectURL(jpegBlob);

      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = currentStep.downloadName;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      }, 600);
    } catch {
      // Canvas fallback
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 1024;
        canvas.height = img.naturalHeight || 768;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = currentStep.downloadName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      };
      img.onerror = () => setIsDownloading(false);
      img.src = currentStep.image;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-4xl mx-auto">
      {/* 1. Header & Build Progress Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md border border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                Prototype Assembly Manual (8 Steps)
              </h2>
              <p className="text-[11px] text-slate-300">
                Hands-on workbench guide with clinical BOM vs. DIY bench materials &amp; safety test
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-teal-300">
              {completedCount}/{BUILD_STEPS.length} Done ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-teal-400 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* 8-Step Horizontal Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {BUILD_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex;
            const isDone = !!completedSteps[step.id];
            return (
              <button
                key={step.id}
                onClick={() => handleSelectStep(idx)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-400 shadow-xs'
                    : isDone
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {isDone && !isActive ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <span className="font-mono text-[11px]">S{step.stepNumber}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Step Title & Completion Toggle */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-800 text-white">
                Step {currentStep.stepNumber} of {BUILD_STEPS.length}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {currentStep.layerTag}
              </span>
              {currentStep.isCriticalSafety && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  Critical Safety Gate
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {currentStep.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentStep.subtitle}</p>
          </div>

          <button
            onClick={() => toggleStepComplete(currentStep.id)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
              completedSteps[currentStep.id]
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {completedSteps[currentStep.id] ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Step Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark Complete</span>
              </>
            )}
          </button>
        </div>

        {/* Linked 3D Part Highlight Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-500 font-medium flex items-center gap-1 mr-1">
            <Box className="w-3.5 h-3.5 text-teal-700" />
            Highlight in 3D:
          </span>
          {currentStep.linkedPartBadges.map((b) => (
            <button
              key={b.id}
              onClick={() => onSelectPart(b.id)}
              className="px-2 py-0.5 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-[10px] flex items-center justify-center">
                {b.n}
              </span>
              <span>{b.label}</span>
            </button>
          ))}
        </div>

        {/* 3. Clean Workbench Illustration + Download */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
          <div className="relative aspect-[4/3] bg-slate-900 flex items-center justify-center">
            <img
              src={currentStep.image}
              alt={`Step ${currentStep.stepNumber}: ${currentStep.title}`}
              className="w-full h-full object-cover select-auto"
              loading="eager"
            />
            <button
              onClick={handleDownloadStepImage}
              disabled={isDownloading}
              className="absolute bottom-2.5 right-2.5 py-1.5 px-3 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-xs border border-white/20 shadow-md transition-all cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Saved JPG</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Step Photo (.JPG)</span>
                </>
              )}
            </button>
          </div>

          {/* 4. Explanatory Engineering Diagram */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-700" />
                Assembly &amp; Wiring Diagram — Step {currentStep.stepNumber}
              </span>
            </div>
            <StepDiagram type={currentStep.diagramType} />
          </div>
        </div>

        {/* 5. Dual Material Guide: Target Clinical BOM vs DIY Bench Equivalent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>Target Clinical Material (BOM)</span>
            </div>
            <p className="text-xs font-semibold text-slate-900">
              {currentStep.clinicalMaterial.name}
            </p>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {currentStep.clinicalMaterial.spec}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
              <FlaskConical className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>DIY Bench Equivalent (Prototype v1)</span>
            </div>
            <p className="text-xs font-semibold text-slate-900">
              {currentStep.diyMaterial.name}
            </p>
            <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">
              {currentStep.diyMaterial.spec}
            </p>
            <p className="text-[11px] text-amber-900 bg-amber-100/80 rounded-lg p-2 mt-2 border border-amber-200/80">
              <strong>Bench Tip:</strong> {currentStep.diyMaterial.sourcingTip}
            </p>
          </div>
        </div>

        {/* 6. Tools Required */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Tools on Your Workbench
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentStep.toolsNeeded.map((tool, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* 7. Step-by-Step Assembly Instructions */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            How to Assemble Step {currentStep.stepNumber}
          </h4>
          <ol className="space-y-2">
            {currentStep.instructions.map((inst, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{inst}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 8. Wiring & Safety Verification Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-teal-300">
              <Cable className="w-4 h-4 shrink-0" />
              <span>Wiring &amp; Connection Note</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{currentStep.wiringNote}</p>
          </div>

          <div
            className={`p-3 rounded-xl text-xs space-y-1 border ${
              currentStep.isCriticalSafety
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              {currentStep.isCriticalSafety ? (
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span>Pass / Safety Check</span>
            </div>
            <p className="text-[11px] leading-relaxed">{currentStep.safetyVerification}</p>
          </div>
        </div>

        {/* 9. Prev / Next Step Footer Buttons */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => handleSelectStep(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="py-2 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={() => {
              if (!completedSteps[currentStep.id]) {
                toggleStepComplete(currentStep.id);
              }
              if (activeIndex < BUILD_STEPS.length - 1) {
                handleSelectStep(activeIndex + 1);
              }
            }}
            disabled={activeIndex === BUILD_STEPS.length - 1 && !!completedSteps[currentStep.id]}
            className="py-2 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span>
              {activeIndex === BUILD_STEPS.length - 1
                ? 'Finish Prototype Build'
                : 'Complete & Next Step'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
