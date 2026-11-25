/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';

// Procedural knit fabric bump texture
function knitTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#808080';
  g.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 8) {
    for (let x = 0; x < 128; x += 8) {
      g.fillStyle = (x / 8 + y / 8) % 2 ? '#9a9a9a' : '#6a6a6a';
      g.beginPath();
      g.ellipse(x + 4, y + 4, 2.6, 3.6, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 4);
  return t;
}

// Procedural breathable mesh bump texture
function meshTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d')!;
  g.fillStyle = '#fff';
  g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#000';
  for (let y = 0; y < 128; y += 16) {
    for (let x = 0; x < 128; x += 16) {
      const ox = (y / 16) % 2 ? 8 : 0;
      g.beginPath();
      g.arc(x + ox + 4, y + 8, 3.2, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  return t;
}

export interface VisageAnchor {
  id: string;
  obj: THREE.Object3D;
  offset: THREE.Vector3;
  normal: THREE.Vector3;
}

export interface ExplodeItem {
  obj: THREE.Object3D;
  base: THREE.Vector3;
  dir: THREE.Vector3;
  dist: number;
}

export interface VisageModel {
  root: THREE.Group;
  parts: Record<string, THREE.Material[]>;
  explode: ExplodeItem[];
  anchors: VisageAnchor[];
  fabricMats: THREE.Material[];
  particles: THREE.Mesh[];
  led: THREE.Mesh;
  drawScreen: (params: { mA?: number; remaining?: string; polarity?: string; state?: string }) => void;
  setExplode: (progress: number) => void;
  setXray: (enable: boolean) => void;
}

export function buildVisage(): VisageModel {
  const root = new THREE.Group();
  const parts: Record<string, THREE.Material[]> = {};
  const explode: ExplodeItem[] = [];
  const anchors: VisageAnchor[] = [];
  const fabricMats: THREE.Material[] = [];

  const reg = (id: string, mat: THREE.Material): THREE.Material => {
    (parts[id] ||= []).push(mat);
    return mat;
  };

  const addExplode = (obj: THREE.Object3D, dir: THREE.Vector3, dist: number) => {
    explode.push({
      obj,
      base: obj.position.clone(),
      dir: dir.clone().normalize(),
      dist,
    });
  };

  const knit = knitTexture();
  const mesh = meshTexture();

  // Materials
  const fabricOuter = reg(
    'chassis_mesh',
    new THREE.MeshStandardMaterial({
      color: 0x1f242d,
      roughness: 0.9,
      bumpMap: knit,
      bumpScale: 0.6,
      side: THREE.DoubleSide,
    })
  ) as THREE.MeshStandardMaterial;

  const fabricInner = reg(
    'chassis_mesh',
    new THREE.MeshStandardMaterial({
      color: 0x2b333e,
      roughness: 0.85,
      bumpMap: mesh,
      bumpScale: 0.8,
      side: THREE.DoubleSide,
    })
  ) as THREE.MeshStandardMaterial;

  const tealTrim = reg(
    'chassis_mesh',
    new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.5,
      metalness: 0.1,
    })
  ) as THREE.MeshStandardMaterial;

  const hydrogelForeheadMat = reg(
    'forehead_pad',
    new THREE.MeshPhysicalMaterial({
      color: 0x5eead4,
      roughness: 0.5,
      transmission: 0.2,
      thickness: 0.25,
      clearcoat: 0.7,
      clearcoatRoughness: 0.3,
    })
  ) as THREE.MeshPhysicalMaterial;

  const hydrogelTempleMat = reg(
    'temple_pads',
    new THREE.MeshPhysicalMaterial({
      color: 0x2dd4bf,
      roughness: 0.5,
      transmission: 0.2,
      thickness: 0.2,
      clearcoat: 0.6,
    })
  ) as THREE.MeshPhysicalMaterial;

  const hydrogelPhiltrumMat = reg(
    'philtrum_pad',
    new THREE.MeshPhysicalMaterial({
      color: 0x5eead4,
      roughness: 0.5,
      transmission: 0.2,
      thickness: 0.2,
      clearcoat: 0.6,
    })
  ) as THREE.MeshPhysicalMaterial;

  const electrodeSilverMat = reg(
    'electrode_layer',
    new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.45,
      metalness: 0.7,
    })
  ) as THREE.MeshStandardMaterial;

  const studMat = reg(
    'electrode_layer',
    new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.95,
      roughness: 0.2,
    })
  ) as THREE.MeshStandardMaterial;

  const barrierMat = reg(
    'barrier_layer',
    new THREE.MeshStandardMaterial({
      color: 0xb0bec5,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    })
  ) as THREE.MeshStandardMaterial;

  const traceMat = reg(
    'stretchable_traces',
    new THREE.MeshStandardMaterial({
      color: 0xd9dee3,
      metalness: 0.85,
      roughness: 0.25,
    })
  ) as THREE.MeshStandardMaterial;

  const eyeIsolatorMat = reg(
    'eye_safety_isolator',
    new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.15,
    })
  ) as THREE.MeshStandardMaterial;

  const controllerBoxMat = reg(
    'controller_box',
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.1,
    })
  ) as THREE.MeshStandardMaterial;

  const pcbMat = reg(
    'microcurrent_driver',
    new THREE.MeshStandardMaterial({
      color: 0x166534,
      roughness: 0.4,
      metalness: 0.5,
    })
  ) as THREE.MeshStandardMaterial;

  const batteryMat = reg(
    'battery_cell',
    new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.4,
      metalness: 0.2,
    })
  ) as THREE.MeshStandardMaterial;

  fabricMats.push(fabricOuter, fabricInner, barrierMat);

  // -------------------------------------------------------------
  // 1. ANATOMICAL FACIAL MASK SHELL (Clearly recognizable face mask)
  // -------------------------------------------------------------
  const maskGroup = new THREE.Group();
  root.add(maskGroup);

  // A. Forehead / Brow Upper Band (Wide curved plate across top)
  const browShape = new THREE.Shape();
  browShape.moveTo(-1.8, 0.4);
  browShape.bezierCurveTo(-1.8, 1.4, -0.9, 1.85, 0, 1.9);
  browShape.bezierCurveTo(0.9, 1.85, 1.8, 1.4, 1.8, 0.4);
  browShape.bezierCurveTo(1.5, 0.2, 0.7, 0.25, 0.35, 0.2); // above right eye
  browShape.bezierCurveTo(0.1, 0.1, -0.1, 0.1, -0.35, 0.2); // nose notch
  browShape.bezierCurveTo(-0.7, 0.25, -1.5, 0.2, -1.8, 0.4); // above left eye

  const browExtrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  };
  const browMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(browShape, browExtrudeSettings), fabricOuter);
  browMesh.position.set(0, 0.45, 0.75);
  maskGroup.add(browMesh);

  // B. Left and Right Orbital Eye Openings with Contoured Bezels
  [-0.85, 0.85].forEach((eyeX, idx) => {
    // Eye cutout bezel ring (Clearly shows the eye socket openings!)
    const eyeBezelGeo = new THREE.TorusGeometry(0.48, 0.065, 12, 32);
    const eyeBezel = new THREE.Mesh(eyeBezelGeo, tealTrim);
    eyeBezel.scale.set(1.15, 0.75, 1);
    eyeBezel.position.set(eyeX, 0.42, 1.02);
    eyeBezel.rotation.y = idx === 0 ? 0.25 : -0.25;
    maskGroup.add(eyeBezel);

    // Amber 25mm Eye-Safety Isolator Ring
    const isolatorGeo = new THREE.TorusGeometry(0.56, 0.04, 12, 32);
    const isolator = new THREE.Mesh(isolatorGeo, eyeIsolatorMat);
    isolator.scale.set(1.18, 0.78, 1);
    isolator.position.set(eyeX, 0.42, 1.05);
    isolator.rotation.y = idx === 0 ? 0.25 : -0.25;
    maskGroup.add(isolator);
    addExplode(isolator, new THREE.Vector3(idx === 0 ? -0.3 : 0.3, 0, 1), 0.45);

    if (idx === 0) {
      anchors.push({
        id: 'eye_safety_isolator',
        obj: isolator,
        offset: new THREE.Vector3(0, -0.4, 0.05),
        normal: new THREE.Vector3(0, 0, 1),
      });
    }
  });

  // C. Central Nose Bridge and Nasal Ridge
  const noseBridgeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.65, 1.0),
    new THREE.Vector3(0, 0.25, 1.35),
    new THREE.Vector3(0, -0.25, 1.45),
    new THREE.Vector3(0, -0.65, 1.25),
  ]);
  const noseBridgeGeo = new THREE.TubeGeometry(noseBridgeCurve, 20, 0.16, 12, false);
  const noseBridge = new THREE.Mesh(noseBridgeGeo, fabricOuter);
  maskGroup.add(noseBridge);

  // D. Left and Right Cheekbone Wings (Zygomatic arches tapering to jaw)
  [-1, 1].forEach((sign) => {
    const cheekCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 1.5, 0.5, 0.7),
      new THREE.Vector3(sign * 1.7, 0.0, 0.9),
      new THREE.Vector3(sign * 1.4, -0.6, 0.95),
      new THREE.Vector3(sign * 0.8, -1.1, 0.85),
    ]);
    const cheekGeo = new THREE.TubeGeometry(cheekCurve, 20, 0.18, 12, false);
    const cheek = new THREE.Mesh(cheekGeo, fabricOuter);
    maskGroup.add(cheek);
  });

  // E. Philtrum & Upper Lip Band (Below nose, above mouth)
  const philtrumChassis = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.42, 0.18),
    fabricOuter
  );
  philtrumChassis.position.set(0, -0.85, 1.15);
  maskGroup.add(philtrumChassis);

  // F. Chin Cradle (Bottom of mask)
  const chinCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.9, -1.15, 0.8),
    new THREE.Vector3(0, -1.45, 1.05),
    new THREE.Vector3(0.9, -1.15, 0.8),
  ]);
  const chinGeo = new THREE.TubeGeometry(chinCurve, 16, 0.12, 10, false);
  const chin = new THREE.Mesh(chinGeo, tealTrim);
  maskGroup.add(chin);

  // G. Dual Ergonomic Head Straps wrapping to the back
  const upperStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.75, 0.75, 0.6),
    new THREE.Vector3(-2.15, 0.85, -0.8),
    new THREE.Vector3(0, 0.95, -2.25),
    new THREE.Vector3(2.15, 0.85, -0.8),
    new THREE.Vector3(1.75, 0.75, 0.6),
  ]);
  const upperStrap = new THREE.Mesh(new THREE.TubeGeometry(upperStrapCurve, 32, 0.08, 10, false), fabricInner);
  maskGroup.add(upperStrap);

  const lowerStrapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.6, -0.35, 0.6),
    new THREE.Vector3(-2.1, -0.4, -0.8),
    new THREE.Vector3(0, -0.35, -2.3),
    new THREE.Vector3(2.1, -0.4, -0.8),
    new THREE.Vector3(1.6, -0.35, 0.6),
  ]);
  const lowerStrap = new THREE.Mesh(new THREE.TubeGeometry(lowerStrapCurve, 32, 0.08, 10, false), fabricInner);
  maskGroup.add(lowerStrap);

  anchors.push({
    id: 'chassis_mesh',
    obj: browMesh,
    offset: new THREE.Vector3(0, 1.1, 0.25),
    normal: new THREE.Vector3(0, 0.3, 1),
  });

  // -------------------------------------------------------------
  // 2. LAYER STACK: FOREHEAD ACTIVE PAD (Explodes outward along +Z)
  // -------------------------------------------------------------
  const foreheadGroup = new THREE.Group();
  foreheadGroup.position.set(0, 1.25, 1.05);
  root.add(foreheadGroup);

  // L2: Waterproof TPU Barrier
  const fhBarrier = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.85, 0.03), barrierMat);
  fhBarrier.position.set(0, 0, 0.04);
  foreheadGroup.add(fhBarrier);
  addExplode(fhBarrier, new THREE.Vector3(0, 0.1, 1), 0.35);

  // L3: Zoned Silver Electrode Plate with Snap Studs
  const fhElectrode = new THREE.Group();
  const fhElMesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.75, 0.04), electrodeSilverMat);
  fhElectrode.add(fhElMesh);
  [
    [-0.8, 0.22],
    [0.8, 0.22],
    [-0.8, -0.22],
    [0.8, -0.22],
  ].forEach(([x, y]) => {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16), studMat);
    s.rotation.x = Math.PI / 2;
    s.position.set(x, y, 0.035);
    fhElectrode.add(s);
  });
  fhElectrode.position.set(0, 0, 0.11);
  foreheadGroup.add(fhElectrode);
  addExplode(fhElectrode, new THREE.Vector3(0, 0.15, 1), 0.75);

  // L4: Replaceable Isotonic Hydrogel Forehead Contact Pad (Porous Dimples)
  const fhPad = new THREE.Group();
  const fhPadMesh = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.7, 0.12), hydrogelForeheadMat);
  fhPad.add(fhPadMesh);

  // Sponge dimples
  const dimpleGeo = new THREE.CircleGeometry(0.03, 8);
  const dimpleMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 });
  for (let i = 0; i < 40; i++) {
    const d = new THREE.Mesh(dimpleGeo, dimpleMat);
    d.position.set(
      (Math.random() - 0.5) * 1.9,
      (Math.random() - 0.5) * 0.55,
      0.065
    );
    fhPad.add(d);
  }
  fhPad.position.set(0, 0, 0.22);
  foreheadGroup.add(fhPad);
  addExplode(fhPad, new THREE.Vector3(0, 0.2, 1), 1.25);

  anchors.push(
    {
      id: 'forehead_pad',
      obj: fhPad,
      offset: new THREE.Vector3(0, 0, 0.08),
      normal: new THREE.Vector3(0, 0, 1),
    },
    {
      id: 'electrode_layer',
      obj: fhElectrode,
      offset: new THREE.Vector3(-0.8, 0.22, 0.06),
      normal: new THREE.Vector3(0, 0, 1),
    },
    {
      id: 'barrier_layer',
      obj: fhBarrier,
      offset: new THREE.Vector3(0.9, -0.3, 0.03),
      normal: new THREE.Vector3(0, 0, 1),
    }
  );

  // -------------------------------------------------------------
  // 3. DUAL TEMPLE WINGS (Lateral pads on temple sides)
  // -------------------------------------------------------------
  const leftTemplePad = new THREE.Group();
  const templeGeo = new THREE.BoxGeometry(0.12, 0.6, 0.7);
  const leftTempleMesh = new THREE.Mesh(templeGeo, hydrogelTempleMat);
  leftTemplePad.add(leftTempleMesh);
  leftTemplePad.position.set(-1.95, 0.85, 0.4);
  root.add(leftTemplePad);
  addExplode(leftTemplePad, new THREE.Vector3(-1, 0, 0.2), 0.6);

  const rightTemplePad = new THREE.Group();
  const rightTempleMesh = new THREE.Mesh(templeGeo, hydrogelTempleMat);
  rightTemplePad.add(rightTempleMesh);
  rightTemplePad.position.set(1.95, 0.85, 0.4);
  root.add(rightTemplePad);
  addExplode(rightTemplePad, new THREE.Vector3(1, 0, 0.2), 0.6);

  anchors.push({
    id: 'temple_pads',
    obj: leftTemplePad,
    offset: new THREE.Vector3(0, 0, 0.1),
    normal: new THREE.Vector3(-1, 0, 0.2),
  });

  // -------------------------------------------------------------
  // 4. PHILTRUM / UPPER LIP PAD
  // -------------------------------------------------------------
  const philtrumPadGroup = new THREE.Group();
  const philtrumMesh = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.32, 0.1), hydrogelPhiltrumMat);
  philtrumPadGroup.add(philtrumMesh);
  philtrumPadGroup.position.set(0, -0.85, 1.3);
  root.add(philtrumPadGroup);
  addExplode(philtrumPadGroup, new THREE.Vector3(0, -0.4, 1), 0.7);

  anchors.push({
    id: 'philtrum_pad',
    obj: philtrumPadGroup,
    offset: new THREE.Vector3(0, 0, 0.08),
    normal: new THREE.Vector3(0, -0.2, 1),
  });

  // -------------------------------------------------------------
  // 5. SILVER TRACE BUS (Runs from controller along strap to pads)
  // -------------------------------------------------------------
  const traceCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.5, 0.35, -2.48), // From controller
    new THREE.Vector3(1.4, 0.45, -1.8),
    new THREE.Vector3(2.1, 0.75, -0.6),
    new THREE.Vector3(1.9, 0.85, 0.3),  // Temple junction
    new THREE.Vector3(1.1, 1.25, 0.95),  // Forehead bus
  ]);
  const traceMesh = new THREE.Mesh(new THREE.TubeGeometry(traceCurve, 32, 0.03, 8, false), traceMat);
  root.add(traceMesh);

  anchors.push({
    id: 'stretchable_traces',
    obj: traceMesh,
    offset: new THREE.Vector3(1.7, 0.85, 0.3),
    normal: new THREE.Vector3(1, 0, 0.5),
  });

  // -------------------------------------------------------------
  // 6. REAR OCCIPITAL CONTROLLER MODULE (Mounted on back strap, -Z)
  // -------------------------------------------------------------
  const controller = new THREE.Group();
  controller.position.set(0, 0.35, -2.4);
  root.add(controller);
  addExplode(controller, new THREE.Vector3(0, 0, -1), 0.85);

  // Outer casing
  const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.25, 0.45), controllerBoxMat);
  controller.add(caseMesh);

  // Internal PCB (visible when Explode / X-ray)
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.05, 0.04), pcbMat);
  pcb.position.z = 0.02;
  controller.add(pcb);

  // Battery pack
  const bat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.75, 0.16), batteryMat);
  bat.position.set(0, 0, 0.12);
  controller.add(bat);

  // Dynamic OLED Screen (facing -Z)
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 256;
  screenCanvas.height = 150;
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.25, 0.65),
    new THREE.MeshBasicMaterial({ map: screenTex })
  );
  screenMesh.rotation.y = Math.PI;
  screenMesh.position.set(0, 0.12, -0.235);
  controller.add(screenMesh);

  // Status LED
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x64748b })
  );
  led.position.set(-0.75, -0.32, -0.235);
  controller.add(led);

  // Dial / Button
  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.14, 0.06, 24),
    tealTrim
  );
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0.65, -0.32, -0.235);
  controller.add(dial);

  // Occipital return cable
  const cableCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.6, -2.4),
    new THREE.Vector3(0, -1.2, -2.2),
    new THREE.Vector3(0.3, -1.8, -1.8),
  ]);
  const cable = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 20, 0.04, 8, false), traceMat);
  root.add(cable);

  anchors.push({
    id: 'controller_box',
    obj: controller,
    offset: new THREE.Vector3(0, 0.2, -0.25),
    normal: new THREE.Vector3(0, 0, -1),
  });

  // Screen Drawing Function
  function drawScreen({ mA = 0, remaining = '15:00', polarity = '+', state = 'IDLE' }: {
    mA?: number;
    remaining?: string;
    polarity?: string;
    state?: string;
  }) {
    const g = screenCanvas.getContext('2d')!;
    g.fillStyle = '#05090b';
    g.fillRect(0, 0, 256, 150);

    g.fillStyle = '#5eead4';
    g.font = '600 18px Inter, sans-serif';
    g.fillText(state, 14, 28);

    g.fillStyle = '#94a3b8';
    g.font = '500 16px Inter, sans-serif';
    g.fillText(polarity === '+' ? 'POL +' : 'POL −', 180, 28);

    g.fillStyle = '#f8fafc';
    g.font = '700 52px Inter, sans-serif';
    g.fillText(mA.toFixed(1), 14, 94);

    g.fillStyle = '#94a3b8';
    g.font = '500 18px Inter, sans-serif';
    g.fillText('mA', 135, 94);

    g.fillStyle = '#cbd5e1';
    g.font = '500 20px Inter, sans-serif';
    g.fillText(remaining, 14, 134);

    // Progress bar on screen
    g.fillStyle = '#1e293b';
    g.fillRect(110, 122, 132, 10);
    g.fillStyle = '#2dd4bf';
    g.fillRect(110, 122, 132 * Math.min(1, mA / 1.5), 10);

    screenTex.needsUpdate = true;
  }
  drawScreen({});

  // -------------------------------------------------------------
  // 7. CURRENT FLOW PARTICLES (Cyan beads along paths into pads)
  // -------------------------------------------------------------
  const flowPaths = [
    // Controller -> Temple -> Forehead
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 0.35, -2.48),
      new THREE.Vector3(1.4, 0.45, -1.8),
      new THREE.Vector3(2.1, 0.75, -0.6),
      new THREE.Vector3(1.9, 0.85, 0.3),
      new THREE.Vector3(1.1, 1.25, 0.95),
      new THREE.Vector3(0, 1.35, 1.3),
      new THREE.Vector3(-0.6, 1.25, 1.3),
    ]),
    // Controller -> Left Temple
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, 0.35, -2.48),
      new THREE.Vector3(-1.4, 0.45, -1.8),
      new THREE.Vector3(-2.1, 0.75, -0.6),
      new THREE.Vector3(-1.95, 0.85, 0.4),
      new THREE.Vector3(-1.8, 0.85, 0.6),
    ]),
    // Forehead -> Philtrum
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.1, 1.1),
      new THREE.Vector3(0, 0.3, 1.35),
      new THREE.Vector3(0, -0.4, 1.45),
      new THREE.Vector3(0, -0.85, 1.35),
    ]),
  ];

  const particleMat = new THREE.MeshBasicMaterial({
    color: 0x67e8f9,
    transparent: true,
    opacity: 0.95,
  });
  const particleGeo = new THREE.SphereGeometry(0.045, 10, 8);
  const particles: THREE.Mesh[] = [];

  for (let i = 0; i < 36; i++) {
    const m = new THREE.Mesh(particleGeo, particleMat);
    m.userData = { path: flowPaths[i % flowPaths.length], t: Math.random() };
    m.visible = false;
    root.add(m);
    particles.push(m);
  }

  // Explode animation helper
  const setExplode = (progress: number) => {
    explode.forEach((item) => {
      item.obj.position.copy(item.base).addScaledVector(item.dir, item.dist * progress);
    });
  };

  // X-Ray animation helper
  const setXray = (enable: boolean) => {
    fabricMats.forEach((mat) => {
      mat.transparent = enable;
      mat.opacity = enable ? 0.22 : 1.0;
      mat.depthWrite = !enable;
      mat.needsUpdate = true;
    });

    electrodeSilverMat.emissive = new THREE.Color(enable ? 0x0284c7 : 0x000000);
    electrodeSilverMat.emissiveIntensity = enable ? 0.45 : 0;
    pcbMat.emissive = new THREE.Color(enable ? 0x10b981 : 0x000000);
    pcbMat.emissiveIntensity = enable ? 0.4 : 0;
  };

  root.position.y = -0.65;

  return {
    root,
    parts,
    explode,
    anchors,
    fabricMats,
    particles,
    led,
    drawScreen,
    setExplode,
    setXray,
  };
}
