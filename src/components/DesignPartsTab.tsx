/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ChevronRight,
  ShieldCheck,
  DollarSign,
  Layers,
  Download,
  Sparkles,
  ExternalLink,
  Footprints,
  Hand,
  Smile,
  Wrench,
} from 'lucide-react';
import { PARTS } from '../data/parts';
import { PartData } from '../types';
import visageThumb from '../assets/images/hydrovisage_product_1792704520097.jpg';
import gloveThumb from '../assets/images/hydroglove_product_1792708963076.jpg';
import sockThumb from '../assets/images/hydrosock_product_1792708976829.jpg';

interface DesignPartsTabProps {
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
  onOpenProductModal?: (productKey: 'mask' | 'sock' | 'glove') => void;
  onOpenBuildGuide?: () => void;
}

export const DesignPartsTab: React.FC<DesignPartsTabProps> = ({
  selectedPartId,
  onSelectPart,
  onOpenProductModal,
  onOpenBuildGuide,
}) => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Step-by-Step Prototype Assembly Shortcut */}
      {onOpenBuildGuide && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-teal-950">
                Ready to Assemble These Materials?
              </h3>
              <p className="text-[11px] text-teal-800 mt-0.5">
                Follow the 8-step illustrated workbench manual with wiring diagrams, DIY equivalents &amp; multimeter safety test.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBuildGuide}
            className="py-2 px-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>Open Build Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 0. Commercial Finished Product Photography Hub (Glove, Socks & Mask) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 sm:p-5 text-white border border-slate-700/60 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                Commercial Finished Products & Website Kit
              </h2>
              <p className="text-[11px] text-slate-300">
                High-resolution studio product photography (standalone, no human face/limbs) & updated copy for giftovate.world
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-500/30 w-fit">
            Ready to Publish
          </span>
        </div>

        {/* 3 Commercial Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* HydroGlove */}
          <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 hover:border-teal-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-[4/3] mb-2.5 border border-slate-700/60 flex items-center justify-center">
                <img
                  src={gloveThumb}
                  alt="HydroGlove Finished Product"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold bg-slate-900/80 text-teal-300 px-2 py-0.5 rounded backdrop-blur-xs border border-teal-500/30">
                  Palmar Protocol
                </span>
              </div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-teal-400" />
                HydroGlove
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                Portable palmar iontophoresis glove with zoned palm & fingertip hydrogel pads.
              </p>
            </div>

            <button
              onClick={() => onOpenProductModal && onOpenProductModal('glove')}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download & Text</span>
            </button>
          </div>

          {/* HydroSock */}
          <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 hover:border-teal-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-[4/3] mb-2.5 border border-slate-700/60 flex items-center justify-center">
                <img
                  src={sockThumb}
                  alt="HydroSock Finished Product"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold bg-slate-900/80 text-teal-300 px-2 py-0.5 rounded backdrop-blur-xs border border-teal-500/30">
                  The Plantar Protocol
                </span>
              </div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-teal-400" />
                HydroSock
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                Five-toe plantar electrotherapy sock with 5-zone sole hydrogel electrodes.
              </p>
            </div>

            <button
              onClick={() => onOpenProductModal && onOpenProductModal('sock')}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download & Text</span>
            </button>
          </div>

          {/* HydroVisage */}
          <div className="bg-slate-800/90 rounded-xl p-3 border border-slate-700 hover:border-teal-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-[4/3] mb-2.5 border border-slate-700/60 flex items-center justify-center">
                <img
                  src={visageThumb}
                  alt="HydroVisage Finished Product"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold bg-slate-900/80 text-teal-300 px-2 py-0.5 rounded backdrop-blur-xs border border-teal-500/30">
                  Craniofacial
                </span>
              </div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-teal-400" />
                HydroVisage
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                Targeted craniofacial microcurrent mask with 25mm periorbital safety buffer.
              </p>
            </div>

            <button
              onClick={() => onOpenProductModal && onOpenProductModal('mask')}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download & Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Pad Layer Stack Visualization (Matching Screenshots) */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Pad Layer Stack (Facial Interface)
        </h2>
        <div className="rounded-xl overflow-hidden border border-slate-200 text-xs shadow-xs">
          <div className="bg-[#1e242c] text-white p-3 flex items-center justify-between">
            <span className="font-mono font-semibold">L1</span>
            <span className="font-medium">Outer Headset: 3D Breathable Compression Knit</span>
            <span className="text-slate-400 text-[11px]">CoolMax + Spandex</span>
          </div>
          <div className="bg-[#334155] text-white p-3 flex items-center justify-between border-t border-slate-700/50">
            <span className="font-mono font-semibold">L2</span>
            <span className="font-medium">Waterproof TPU Barrier that Keeps Outer Textile Dry</span>
            <span className="text-slate-300 text-[11px]">30 μm Hermetic Film</span>
          </div>
          <div className="bg-[#475569] text-white p-3 flex items-center justify-between border-t border-slate-600/50">
            <span className="font-mono font-semibold">L3</span>
            <span className="font-medium">Four-Zone Flexible Printed Silver (Ag/AgCl) Electrodes</span>
            <span className="text-slate-200 text-[11px]">Screen-Printed Traces</span>
          </div>
          <div className="bg-[#2dd4bf] text-teal-950 p-3 flex items-center justify-between font-medium border-t border-teal-300">
            <span className="font-mono font-bold">L4</span>
            <span>Replaceable Isotonic Hydrogel Contact Pads (Magnetic Snap-On)</span>
            <span className="text-teal-900 text-[11px] font-semibold">0.9% Saline Matrix</span>
          </div>
          <div className="bg-[#fed7aa] text-amber-950 p-2.5 px-3 flex items-center justify-between text-[11px] font-medium border-t border-amber-200">
            <span className="font-mono font-bold">—</span>
            <span>Patient Facial Skin (Forehead, Temples, Philtrum)</span>
            <span className="text-amber-900">15–20 μm Stratum Corneum</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-teal-700" />
          <span>Tap <strong>Explode</strong> on the 3D viewport toolbar to separate these physical layers dynamically.</span>
        </p>
      </div>

      {/* 2. BOM Components Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Bill of Materials & Sub-Assemblies
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            12 Tracked Components
          </span>
        </div>

        <div className="space-y-2">
          {PARTS.map((part) => {
            const isSelected = selectedPartId === part.id;
            return (
              <div
                key={part.id}
                onClick={() => onSelectPart(isSelected ? null : part.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/90 border-teal-400 ring-1 ring-teal-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-teal-700 text-white'
                        : 'border-2 border-teal-700 text-teal-700 bg-white'
                    }`}
                  >
                    {part.n}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {part.title}
                      </span>
                      <span className="text-xs font-medium text-teal-800 shrink-0">
                        {part.cost}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {part.body}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isSelected ? 'rotate-90 text-teal-700' : ''
                    }`}
                  />
                </div>

                {/* Expanded Details when selected */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-teal-200/60 text-xs space-y-1.5 animate-in fade-in duration-100">
                    <p className="text-slate-700 leading-relaxed">{part.body}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="p-2 rounded bg-white/80 border border-teal-100">
                        <span className="font-semibold text-slate-700 block">Engineering Specs:</span>
                        <span className="font-mono text-slate-600">{part.specs}</span>
                      </div>
                      <div className="p-2 rounded bg-white/80 border border-teal-100">
                        <span className="font-semibold text-teal-800 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Safety Verification:
                        </span>
                        <span className="text-slate-600">{part.safetyNote}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Cost Outlook Card */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Manufacturing Cost Outlook
          </span>
          <p className="text-xs text-slate-300 mt-1 max-w-md">
            Total prototype bill of materials is calculated at ~$56.50/unit at small batch volume (1,000 units), scaling to &lt;$22.00 at high volume production.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-2xl font-bold font-mono text-white">$56.50</span>
          <span className="text-[11px] text-slate-400 block">Estimated BOM / unit</span>
        </div>
      </div>
    </div>
  );
};
