/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { Viewport3D } from './components/Viewport3D';
import { FeasibilityTab } from './components/FeasibilityTab';
import { DesignPartsTab } from './components/DesignPartsTab';
import { BuildGuideTab } from './components/BuildGuideTab';
import { SessionSimTab } from './components/SessionSimTab';
import { ProductExportModal, ProductKey } from './components/ProductExportModal';
import { SessionStatus, TelemetryLog } from './types';

type TabType = 'feasibility' | 'design' | 'build' | 'session';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feasibility');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportModalProduct, setExportModalProduct] = useState<ProductKey>('mask');

  const handleOpenExportModal = (product: ProductKey = 'mask') => {
    setExportModalProduct(product);
    setIsExportModalOpen(true);
  };

  // Simulation states
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('idle');
  const [currentMA, setCurrentMA] = useState<number>(0.0);
  const [targetMA, setTargetMA] = useState<number>(1.2);
  const [sessionMinutes, setSessionMinutes] = useState<number>(20);
  const [padWetness, setPadWetness] = useState<number>(85);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [logs, setLogs] = useState<TelemetryLog[]>([]);

  const addLog = (message: string, type: 'info' | 'warn' | 'success' = 'info') => {
    const m = Math.floor(elapsedSeconds / 60);
    const s = elapsedSeconds % 60;
    const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    setLogs((prev) => [{ time: timeStr, message, type }, ...prev]);
  };

  // Timer loop for simulation (1 second wall time = 1 minute simulated)
  useEffect(() => {
    let timer: any = null;

    if (sessionStatus === 'active' || sessionStatus === 'ramping') {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          const totalSecs = sessionMinutes * 60;

          // Polarity reversal at midpoint
          if (next === Math.floor(totalSecs / 2)) {
            addLog('Halfway: polarity reversed', 'info');
          }

          // Complete
          if (next >= totalSecs) {
            setSessionStatus('completed');
            setCurrentMA(0);
            addLog('Session complete. Dry face and rinse the hydrogel pads', 'success');
            return totalSecs;
          }

          return next;
        });

        // Soft current ramp
        setCurrentMA((curr) => {
          if (curr < targetMA) {
            const next = Math.min(curr + 0.1, targetMA);
            if (next === targetMA && sessionStatus === 'ramping') {
              setSessionStatus('active');
            }
            return next;
          } else if (curr > targetMA) {
            return Math.max(curr - 0.1, targetMA);
          }
          return curr;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [sessionStatus, targetMA, sessionMinutes, elapsedSeconds]);

  // Handle contact quality wetness changes
  const handlePadWetnessChange = (val: number) => {
    setPadWetness(val);
    if (val < 40 && (sessionStatus === 'active' || sessionStatus === 'ramping')) {
      setSessionStatus('paused');
      setCurrentMA(0);
      addLog('Pad too dry. Current stopped (safety cutoff)', 'warn');
    } else if (val >= 40 && sessionStatus === 'paused') {
      addLog('Contact restored. Ramping back up', 'info');
    }
  };

  const handleStartPause = () => {
    if (sessionStatus === 'active' || sessionStatus === 'ramping') {
      setSessionStatus('paused');
      setCurrentMA(0);
      addLog('Paused by user', 'info');
    } else {
      if (padWetness < 40) {
        addLog('Pad too dry. Please moisten before starting.', 'warn');
        return;
      }
      setSessionStatus('ramping');
      if (elapsedSeconds === 0) {
        addLog(`Session started, ramping to ${targetMA.toFixed(1)} mA`, 'info');
      } else {
        addLog('Resumed', 'info');
      }
    }
  };

  const handleReset = () => {
    setSessionStatus('idle');
    setElapsedSeconds(0);
    setCurrentMA(0);
    setLogs([]);
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden bg-slate-100 text-slate-800 antialiased font-sans">
      {/* 3D Viewport: Top on mobile, Left on desktop */}
      <section className="relative h-[46vh] min-h-[260px] lg:h-full lg:flex-1 lg:w-7/12 shrink-0 overflow-hidden flex flex-col bg-[#eef2f5]">
        <Viewport3D
          selectedPartId={selectedPartId}
          onSelectPart={setSelectedPartId}
          sessionStatus={sessionStatus}
          currentMA={currentMA}
          sessionMinutes={sessionMinutes}
          elapsedSeconds={elapsedSeconds}
          onOpenExportModal={() => handleOpenExportModal('mask')}
        />
      </section>

      {/* Tabs & Information Workspace: Bottom on mobile, Right on desktop */}
      <section className="flex-1 min-h-0 lg:w-5/12 lg:h-full flex flex-col bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 relative z-30">
        {/* Tab Navigation Pill Bar (Matching Puter layout) */}
        <div className="p-2 bg-white border-b border-slate-200 flex justify-center shrink-0">
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] sm:text-xs font-medium w-full max-w-xl">
            <button
              onClick={() => setActiveTab('feasibility')}
              className={`py-1.5 px-1.5 sm:px-2.5 rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer ${
                activeTab === 'feasibility'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Feasibility
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`py-1.5 px-1.5 sm:px-2.5 rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="sm:hidden">Parts</span>
              <span className="hidden sm:inline">Design &amp; parts</span>
            </button>
            <button
              onClick={() => setActiveTab('build')}
              className={`py-1.5 px-1.5 sm:px-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'build'
                  ? 'bg-teal-700 text-white shadow-xs font-semibold'
                  : 'text-teal-800 bg-teal-50/70 hover:bg-teal-100/80 font-semibold'
              }`}
            >
              <Wrench className="w-3 h-3 shrink-0" />
              <span>Build guide</span>
            </button>
            <button
              onClick={() => setActiveTab('session')}
              className={`py-1.5 px-1.5 sm:px-2.5 rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer ${
                activeTab === 'session'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="sm:hidden">Session</span>
              <span className="hidden sm:inline">Session sim</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'feasibility' && <FeasibilityTab />}
          {activeTab === 'design' && (
            <DesignPartsTab
              selectedPartId={selectedPartId}
              onSelectPart={setSelectedPartId}
              onOpenProductModal={handleOpenExportModal}
              onOpenBuildGuide={() => setActiveTab('build')}
            />
          )}
          {activeTab === 'build' && (
            <BuildGuideTab onSelectPart={setSelectedPartId} />
          )}
          {activeTab === 'session' && (
            <SessionSimTab
              status={sessionStatus}
              currentMA={currentMA}
              targetMA={targetMA}
              onTargetMAChange={setTargetMA}
              sessionMinutes={sessionMinutes}
              onSessionMinutesChange={setSessionMinutes}
              padWetness={padWetness}
              onPadWetnessChange={handlePadWetnessChange}
              elapsedSeconds={elapsedSeconds}
              onStartPause={handleStartPause}
              onReset={handleReset}
              logs={logs}
            />
          )}
        </div>
      </section>

      {/* Finished Product Photo & Updated Copy Export Modal */}
      <ProductExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        initialProduct={exportModalProduct}
      />
    </div>
  );
}
