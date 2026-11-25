/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Layers,
  ScanEye,
  Rotate3d,
  Tag,
  X,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Download,
} from 'lucide-react';
import { buildVisage, VisageModel } from '../3d/visageModel';
import { PARTS } from '../data/parts';
import { ViewPreset, SessionStatus } from '../types';

interface Viewport3DProps {
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
  sessionStatus: SessionStatus;
  currentMA: number;
  sessionMinutes: number;
  elapsedSeconds: number;
  onOpenExportModal: () => void;
}

const VIEWS: Record<ViewPreset | 'back', { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  front: {
    pos: new THREE.Vector3(0, 0.1, 8.6),
    target: new THREE.Vector3(0, -0.4, 0.2),
  },
  back: {
    pos: new THREE.Vector3(0, 0.2, -8.6),
    target: new THREE.Vector3(0, -0.3, -0.2),
  },
  profile: {
    pos: new THREE.Vector3(-7.5, 0.2, 3.8),
    target: new THREE.Vector3(0, -0.3, 0),
  },
  forehead: {
    pos: new THREE.Vector3(0.5, 4.8, 6.6),
    target: new THREE.Vector3(0, -0.2, 0.4),
  },
};

export const Viewport3D: React.FC<Viewport3DProps> = ({
  selectedPartId,
  onSelectPart,
  sessionStatus,
  currentMA,
  sessionMinutes,
  elapsedSeconds,
  onOpenExportModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hotspotsLayerRef = useRef<HTMLDivElement>(null);

  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [exploded, setExploded] = useState<boolean>(false);
  const [xray, setXray] = useState<boolean>(false);
  const [labelsOn, setLabelsOn] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  const modelRef = useRef<VisageModel | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const flyRef = useRef<{
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
    progress: number;
  } | null>(null);

  const explodeAnimRef = useRef<{ current: number; target: number }>({
    current: 0,
    target: 0,
  });

  const spotsRef = useRef<{ a: any; el: HTMLButtonElement }[]>([]);
  const labelsOnRef = useRef<boolean>(true);
  labelsOnRef.current = labelsOn;

  const sessionStatusRef = useRef(sessionStatus);
  sessionStatusRef.current = sessionStatus;
  const currentMARef = useRef(currentMA);
  currentMARef.current = currentMA;
  const elapsedSecondsRef = useRef(elapsedSeconds);
  elapsedSecondsRef.current = elapsedSeconds;
  const sessionMinutesRef = useRef(sessionMinutes);
  sessionMinutesRef.current = sessionMinutes;

  // Initialize Three.js scene
  useEffect(() => {
    const wrap = containerRef.current;
    const hsLayer = hotspotsLayerRef.current;
    if (!wrap || !hsLayer) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    wrap.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeef2f5);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      36,
      wrap.clientWidth / wrap.clientHeight,
      0.1,
      100
    );
    camera.position.copy(VIEWS.front.pos);
    cameraRef.current = camera;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.target.copy(VIEWS.front.target);
    controlsRef.current = controls;

    // Studio Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 7, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcdeafe, 1.2);
    rimLight.position.set(-6, 3, -6);
    scene.add(rimLight);

    const softFill = new THREE.HemisphereLight(0xffffff, 0xcbd5e1, 0.6);
    scene.add(softFill);

    // Circular ground shadow disk
    const floorGeo = new THREE.CircleGeometry(3.6, 64);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0xdce3ea });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.85;
    scene.add(floor);

    // Build HydroVisage Model
    const visage = buildVisage();
    modelRef.current = visage;
    scene.add(visage.root);

    // Setup direct DOM hotspots (identical to Puter HydroGlove implementation)
    hsLayer.innerHTML = '';
    spotsRef.current = visage.anchors.map((a) => {
      const part = PARTS.find((p) => p.id === a.id);
      const el = document.createElement('button');
      el.className = 'hotspot';
      el.textContent = String(part?.n || '');
      el.title = part?.title || '';
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectPart(a.id);
      });
      hsLayer.appendChild(el);
      return { a, el };
    });

    // Resize observer
    const handleResize = () => {
      if (!wrap) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.zoom = w < 640 ? 0.72 : 0.95;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(wrap);
    handleResize();

    // Render loop
    let reqId: number;
    let clock = new THREE.Clock();
    const v = new THREE.Vector3();
    const n = new THREE.Vector3();
    const camDir = new THREE.Vector3();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);

      // Smooth camera flying
      if (flyRef.current) {
        flyRef.current.progress += dt * 2.2;
        const t = Math.min(flyRef.current.progress, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        camera.position.lerpVectors(flyRef.current.startPos, flyRef.current.endPos, ease);
        controls.target.lerpVectors(flyRef.current.startTarget, flyRef.current.endTarget, ease);

        if (t >= 1) {
          flyRef.current = null;
        }
      }

      controls.update();

      // Smooth layer explode
      explodeAnimRef.current.current = THREE.MathUtils.lerp(
        explodeAnimRef.current.current,
        explodeAnimRef.current.target,
        0.1
      );
      visage.setExplode(explodeAnimRef.current.current);

      // Current flow particles along curves
      const isSimActive = sessionStatusRef.current === 'active' || sessionStatusRef.current === 'ramping';
      visage.particles.forEach((p) => {
        p.visible = isSimActive;
        if (isSimActive && p.userData?.path) {
          p.userData.t = (p.userData.t + dt * 0.45 * (currentMARef.current / 1.5 || 0.4)) % 1;
          p.position.copy(p.userData.path.getPoint(p.userData.t));
        }
      });

      // Update OLED screen on rear controller
      const totalSecs = sessionMinutesRef.current * 60;
      const remSecs = Math.max(0, totalSecs - elapsedSecondsRef.current);
      const remStr = `${Math.floor(remSecs / 60).toString().padStart(2, '0')}:${(remSecs % 60)
        .toString()
        .padStart(2, '0')}`;
      visage.drawScreen({
        mA: currentMARef.current,
        remaining: remStr,
        polarity: elapsedSecondsRef.current >= totalSecs / 2 ? '−' : '+',
        state: isSimActive ? 'ACTIVE' : sessionStatusRef.current === 'paused' ? 'PAUSED' : 'READY',
      });

      (visage.led.material as THREE.MeshBasicMaterial).color.setHex(
        sessionStatusRef.current === 'paused'
          ? 0xf59e0b
          : currentMARef.current > 0.1
          ? 0x22d3ee
          : sessionStatusRef.current === 'completed'
          ? 0x22c55e
          : 0x64748b
      );

      // Update hotspots on DOM
      if (wrap) {
        const w = wrap.clientWidth;
        const h = wrap.clientHeight;
        const labelsActive = labelsOnRef.current;

        spotsRef.current.forEach(({ a, el }) => {
          a.obj.localToWorld(v.copy(a.offset));
          n.copy(a.normal).transformDirection(a.obj.matrixWorld);
          camDir.copy(camera.position).sub(v).normalize();
          const facing = n.dot(camDir) > -0.05;
          v.project(camera);

          el.style.left = `${((v.x + 1) / 2) * w}px`;
          el.style.top = `${((1 - v.y) / 2) * h}px`;
          el.classList.toggle('hidden-spot', !labelsActive || !facing);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (wrap && renderer.domElement) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Explode
  useEffect(() => {
    explodeAnimRef.current.target = exploded ? 1.0 : 0.0;
  }, [exploded]);

  // Update X-ray
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.setXray(xray);
    }
  }, [xray]);

  // Update Auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 2.0;
    }
  }, [autoRotate]);

  // Sync selectedPartId on hotspots and model glow
  useEffect(() => {
    spotsRef.current.forEach(({ a, el }) => {
      el.classList.toggle('active', a.id === selectedPartId);
    });

    if (!modelRef.current) return;
    const tealGlow = new THREE.Color(0x0f766e);

    Object.values(modelRef.current.parts).flat().forEach((mat) => {
      if ('emissive' in mat) {
        (mat as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
      }
    });

    if (selectedPartId && modelRef.current.parts[selectedPartId]) {
      modelRef.current.parts[selectedPartId].forEach((mat) => {
        if ('emissive' in mat) {
          (mat as THREE.MeshStandardMaterial).emissive.copy(tealGlow).multiplyScalar(0.4);
        }
      });

      const part = PARTS.find((p) => p.id === selectedPartId);
      if (part) {
        if (part.side === 'rear') flyToView('back');
        else flyToView('front');
      }
    }
  }, [selectedPartId]);

  const flyToView = (preset: 'front' | 'back') => {
    if (!cameraRef.current || !controlsRef.current) return;
    setActiveView(preset);
    flyRef.current = {
      startPos: cameraRef.current.position.clone(),
      endPos: VIEWS[preset].pos.clone(),
      startTarget: controlsRef.current.target.clone(),
      endTarget: VIEWS[preset].target.clone(),
      progress: 0,
    };
  };

  const selectedPart = PARTS.find((p) => p.id === selectedPartId);

  return (
    <div className="relative w-full h-full flex-1 bg-[#eef2f5] overflow-hidden select-none">
      {/* 1. Header Overlay (Matching Puter layout exactly) */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-3.5 bg-gradient-to-b from-[#eef2f5]/95 via-[#eef2f5]/70 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] font-semibold text-slate-900 leading-tight">
                HydroVisage
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Facial iontophoresis mask · concept v0.1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Download Render & Website Copy Button */}
          <button
            onClick={onOpenExportModal}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-800 text-white hover:bg-teal-900 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            title="Download HD Product Photo & Website Copy"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Product Photo</span>
            <span className="sm:hidden">Photo</span>
          </button>

          {/* Dynamic Status Pill */}
          <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center gap-1.5 shadow-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                sessionStatus === 'active'
                  ? 'bg-emerald-500 animate-pulse'
                  : sessionStatus === 'ramping'
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-slate-400'
              }`}
            />
            <span>
              {sessionStatus === 'active'
                ? `Session · ${currentMA.toFixed(1)} mA`
                : sessionStatus === 'ramping'
                ? 'Ramping…'
                : sessionStatus === 'paused'
                ? 'Paused'
                : 'Idle'}
            </span>
          </div>
        </div>
      </header>

      {/* 2. WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* 3. Screen-Space Hotspots DOM Layer */}
      <div
        id="hotspots"
        ref={hotspotsLayerRef}
        className="absolute inset-0 pointer-events-none [&>*]:pointer-events-auto z-10"
      />

      {/* 4. Part Info Card (Bottom Left Popup, identical to Puter card) */}
      {selectedPart && (
        <div className="absolute left-4 bottom-20 z-20 w-80 max-w-[calc(100%-2rem)] bg-white border border-slate-200 rounded-xl p-4 shadow-xl animate-in fade-in duration-150">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-slate-900">
              {selectedPart.n}. {selectedPart.title}
            </h3>
            <button
              onClick={() => onSelectPart(null)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            {selectedPart.body}
          </p>

          <p className="text-[11px] text-teal-700 font-medium mt-2">
            {selectedPart.cost}
          </p>
        </div>
      )}

      {/* 5. Floating Bottom Pill Toolbar (With ALWAYS visible text labels!) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 max-w-[calc(100%-1rem)] overflow-x-auto flex items-center gap-0.5 sm:gap-1 bg-white border border-slate-200 rounded-xl p-1 text-[11px] sm:text-xs font-medium shadow-md whitespace-nowrap">
        {/* Front / Face Button */}
        <button
          onClick={() => flyToView('front')}
          className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
            activeView === 'front' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700" />
          <span>Front</span>
        </button>

        {/* Back Button */}
        <button
          onClick={() => flyToView('back')}
          className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
            activeView === 'back' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Rotate3d className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-700" />
          <span>Back</span>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-0.5 sm:mx-1 shrink-0" />

        {/* Explode Button */}
        <button
          onClick={() => setExploded(!exploded)}
          className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
            exploded ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
          <span>Explode</span>
        </button>

        {/* X-ray Button */}
        <button
          onClick={() => setXray(!xray)}
          className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
            xray ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ScanEye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
          <span>X-ray</span>
        </button>

        {/* Labels Button */}
        <button
          onClick={() => setLabelsOn(!labelsOn)}
          className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
            labelsOn ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
          <span>Labels</span>
        </button>

        {/* Spin Button */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 transition-colors shrink-0 ${
            autoRotate ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
          <span>Spin</span>
        </button>
      </div>
    </div>
  );
};
