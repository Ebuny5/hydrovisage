/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { DEVICE_COMPARISON } from '../data/parts';

export const FeasibilityTab: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* 1. Verdict Banner */}
      <div className="bg-teal-50/80 border border-teal-200/90 rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-2 text-teal-900 font-semibold text-sm md:text-base">
          <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
          <span>Verdict: Yes, it's possible with strict facial safety adaptations</span>
        </div>
        <p className="text-xs md:text-sm text-slate-700 mt-2 leading-relaxed">
          Tap-water and hydrogel iontophoresis is clinically proven as a first-line treatment for excessive sweating. Applying this technology to the forehead, temples, and face is fully viable—provided electrical current is scaled down from extremity levels (15–25 mA) to a strict cranial microcurrent ceiling (0.1–1.5 mA), with 25mm anatomical periorbital eye clearance.
        </p>
      </div>

      {/* 2. Why Conventional Treatments Fall Short */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Why Current Treatments Are a Problem for the Face
        </h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Botox (Botulinum Toxin) Injections:</span> Requires 30 to 50 painful facial needle injections every 4–6 months. Carries substantial risks of forehead muscle paralysis, ptosis (eyelid drooping), and costs $800–$1,500 per session.
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Oral Anticholinergics (Glycopyrrolate / Oxybutynin):</span> Systemic pills enter the bloodstream and cause severe dry mouth, urinary retention, brain fog, and blurred vision, forcing up to 40% of patients to discontinue treatment.
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Topical Aluminum Chloride Lotions:</span> Concentrated aluminum salts sting, cause facial erythema (redness), intense itching, and chemical peeling on sensitive facial skin.
            </div>
          </div>
        </div>
      </div>

      {/* 3. How the Facial Wearable Works */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          How HydroVisage Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center mb-2">
              1
            </div>
            <h3 className="text-xs font-semibold text-slate-900 mb-1">
              Biocompatible Hydrogel Contact
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sterile 0.9% saline hydrogel pads snap into the forehead and temple band, molding seamlessly against facial contours without dripping water into eyes or ears.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center mb-2">
              2
            </div>
            <h3 className="text-xs font-semibold text-slate-900 mb-1">
              Biphasic Microcurrent Delivery
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The rear controller delivers 0.2–1.5 mA of steady, low-frequency current. Polarity automatically reverses halfway through the session to keep skin pH completely neutral.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center mb-2">
              3
            </div>
            <h3 className="text-xs font-semibold text-slate-900 mb-1">
              Sweat Duct Ion Blockade
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Positively and negatively charged mineral ions accumulate inside eccrine sweat pores, temporarily obstructing hyperactive secretion for 5–8 days per maintenance session.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Cross-Device Comparison Matrix */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          HydroGlove → HydroSock → HydroVisage Comparison
        </h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Parameter</th>
                <th className="py-2.5 px-3 font-semibold">Glove (Palms)</th>
                <th className="py-2.5 px-3 font-semibold">Sock (Feet)</th>
                <th className="py-2.5 px-3 font-semibold bg-teal-50/70 text-teal-900">
                  Visage (Face / Head)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEVICE_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.feature}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.glove}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.sock}</td>
                  <td className="py-2.5 px-3 font-semibold text-teal-800 bg-teal-50/40">
                    {row.visage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4.5. Competitive Edge: HydroVisage vs Legacy Masks (Hidrex / Dermadry) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-5 border border-slate-700 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Competitive Edge: HydroVisage vs. Legacy Hidrex Mask
            </h2>
            <p className="text-[11px] text-slate-300">
              Why legacy facial iontophoresis suffers from 80%+ user abandonment and how our engineering solves it.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-800/90 text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3 font-semibold">Engineering Dimension</th>
                <th className="py-2.5 px-3 font-semibold text-rose-300">Legacy Hidrex Face Mask</th>
                <th className="py-2.5 px-3 font-semibold text-teal-300 bg-teal-950/40">HydroVisage (Giftovate)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-[11px]">
              <tr className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">Circuit & Return Path</td>
                <td className="py-2.5 px-3 text-rose-200/90">
                  <strong>Transthoracic:</strong> Requires immersing hand/foot into a 500ml water tray. Current travels all the way through neck and chest to the limb.
                </td>
                <td className="py-2.5 px-3 text-teal-200 font-semibold bg-teal-950/20">
                  <strong>Localized Craniofacial:</strong> Dual integrated anode/cathode zones in headband. Current never crosses neck, chest, or cardiac vector.
                </td>
              </tr>
              <tr className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">Fluid Interface</td>
                <td className="py-2.5 px-3 text-rose-200/90">
                  Dripping tap-water soaked silicone. Water drips down neck and clothes; must re-soak if dried.
                </td>
                <td className="py-2.5 px-3 text-teal-200 font-semibold bg-teal-950/20">
                  Zero dripping. Pre-molded 0.9% isotonic saline hydrogel pads snap into place magnetically in 5 seconds.
                </td>
              </tr>
              <tr className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">Portability & Form Factor</td>
                <td className="py-2.5 px-3 text-rose-200/90">
                  Heavy desktop base station tethered to mains wall outlet with multiple long grey cables.
                </td>
                <td className="py-2.5 px-3 text-teal-200 font-semibold bg-teal-950/20">
                  100% cordless wearable headset with ultra-light magnetic microcurrent control pod.
                </td>
              </tr>
              <tr className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">Orbital Eye Safety</td>
                <td className="py-2.5 px-3 text-rose-200/90">
                  Solid silicone mask covering full face without calibrated physical eye standoff boundaries.
                </td>
                <td className="py-2.5 px-3 text-teal-200 font-semibold bg-teal-950/20">
                  Engineered 25mm non-conductive silicone periorbital safety buffer keeping optic nerves strictly isolated.
                </td>
              </tr>
              <tr className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">Digital Ecosystem & Sync</td>
                <td className="py-2.5 px-3 text-rose-200/90">
                  No sensors, no app connectivity. Dumb counter with zero trigger prediction.
                </td>
                <td className="py-2.5 px-3 text-teal-200 font-semibold bg-teal-950/20">
                  Pairs with Giftovate Band & HidroAlly app. Real-time EDA & HRV monitoring triggers predictive maintenance sessions.
                </td>
              </tr>
              <tr className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200">Patient Adherence</td>
                <td className="py-2.5 px-3 text-rose-200/90">
                  High patient drop-out (80%+) due to messy water basins, setup friction, and uncomfortable shock risk.
                </td>
                <td className="py-2.5 px-3 text-teal-200 font-semibold bg-teal-950/20">
                  Maximum compliance: slip on the headset, press one button, and read or work freely for 15 minutes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. What You Need to Solve for Facial Safety */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          What You Need to Solve for Facial Clinical Safety
        </h2>
        <div className="space-y-2.5">
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              1. Strict Cranial Microcurrent Ceiling (≤ 1.5 mA)
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Facial stratum corneum is 15–20 μm thick compared to 400–600 μm on feet and hands. High currents can stimulate the ophthalmic branch of the trigeminal nerve or cause phosphenes (retinal light flashes). Keeping total current below 1.5 mA ensures zero nervous irritation.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              2. 25mm Anatomical Periorbital Eye-Safety Buffer
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Current paths must never cross the ocular globes. The HydroVisage chassis incorporates non-conductive silicone standoffs guaranteeing that electrodes remain strictly on the forehead and temples, well clear of the orbital eye sockets.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              3. Automatic 5-Minute Polarity Inversion (Biphasic Waveform)
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Extended direct current (monophasic DC) causes acidic build-up at the anode and alkaline build-up at the cathode, irritating sensitive facial skin. The microcurrent driver automatically transitions polarities smoothly every 5 minutes to maintain safe physiological pH.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              4. 20 Hz Dynamic Impedance & Lift-Off Cutoff
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              If a user scratches or adjusts the band during treatment, peeling an edge can concentrate current into a tiny contact point. The embedded impedance sensor checks contact quality 20 times per second and instantaneously clamps current to 0 mA within 10 milliseconds if lift-off is detected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
