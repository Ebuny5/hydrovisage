/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import step1Img from '../assets/images/build_step1_shell_1794701582853.jpg';
import step2Img from '../assets/images/build_step2_eyering_1794701583662.jpg';
import step3Img from '../assets/images/build_step3_tpu_1794701584571.jpg';
import step4Img from '../assets/images/build_step4_electrodes_1794701584556.jpg';
import step5Img from '../assets/images/build_step5_wiring_1794701597523.jpg';
import step6Img from '../assets/images/build_step6_controller_1794701598411.jpg';
import step7Img from '../assets/images/build_step7_benchtest_1794701599187.jpg';
import step8Img from '../assets/images/build_step8_hydrogel_1794701599049.jpg';

export type DiagramType =
  | 'shell_layout'
  | 'eye_buffer'
  | 'tpu_lamination'
  | 'electrode_zones'
  | 'wiring_bus'
  | 'controller_pcb'
  | 'bench_test'
  | 'final_stack';

export interface BuildStep {
  stepNumber: number;
  id: string;
  title: string;
  subtitle: string;
  layerTag: string;
  linkedPartIds: string[];
  linkedPartBadges: { n: number; id: string; label: string }[];
  image: string;
  downloadName: string;
  clinicalMaterial: {
    name: string;
    spec: string;
  };
  diyMaterial: {
    name: string;
    spec: string;
    sourcingTip: string;
  };
  toolsNeeded: string[];
  instructions: string[];
  wiringNote: string;
  safetyVerification: string;
  diagramType: DiagramType;
  isCriticalSafety?: boolean;
}

export const BUILD_STEPS: BuildStep[] = [
  {
    stepNumber: 1,
    id: 'step_1_shell',
    title: 'Prepare & Measure the Outer Mask Shell',
    subtitle: 'Establish orbital eye openings, temple channels, and facial compression fit',
    layerTag: 'Layer L1 • Chassis',
    linkedPartIds: ['chassis_mesh'],
    linkedPartBadges: [{ n: 7, id: 'chassis_mesh', label: '3D Knit Shell' }],
    image: step1Img,
    downloadName: 'HydroVisage_Build_Step1_MaskShell.jpg',
    clinicalMaterial: {
      name: 'Seamless 3D Breathable Compression Knit Shell',
      spec: 'Antimicrobial CoolMax + Spandex yarn, 18–22 mmHg uniform compression, molded nose bridge',
    },
    diyMaterial: {
      name: 'Breathable Sports Compression Balaclava / Neoprene Face Mask Base',
      spec: '1.5 mm perforated neoprene or stretch nylon-spandex athletic face mask with rear velcro straps',
      sourcingTip: 'Trace eye holes on paper first using your own pupillary distance (~62–64 mm) before cutting.',
    },
    toolsNeeded: [
      'Vernier calipers or millimeter ruler',
      'Tailor chalk / silver fabric marker',
      'Sharp curved fabric shears',
    ],
    instructions: [
      'Hold the mask shell flat and measure the interpupillary center-to-center distance (typically 60–65 mm) and mark two symmetrical oval orbital openings.',
      'Cut the orbital openings cleanly so no fabric fringes enter your field of vision, leaving a smooth 3 mm seam allowance around the rim.',
      'Test-fit the shell on your face with the rear retention straps to confirm gentle, even pressure across the forehead, temples, and upper lip without pinching ears.',
      'Mark the 4 target treatment zones inside the mask with chalk: wide forehead band (28 cm²), left & right temples (7 cm² each), and philtrum/upper lip (8 cm²).',
    ],
    wiringNote: 'No wires yet. Confirm side temple straps have at least 12 mm width so the multi-wire ribbon bus can run cleanly along them in Step 5.',
    safetyVerification: 'Ensure eye openings sit comfortably clear of eyelashes and upper cheeks when smiling or blinking.',
    diagramType: 'shell_layout',
  },
  {
    stepNumber: 2,
    id: 'step_2_eye_rings',
    title: 'Bond the 25mm Periorbital Eye-Safety Rings',
    subtitle: 'Create a physical non-conductive mechanical moat around both eye sockets',
    layerTag: 'Orbital Safety Barrier',
    linkedPartIds: ['eye_safety_isolator'],
    linkedPartBadges: [{ n: 9, id: 'eye_safety_isolator', label: 'Eye Isolator Ring' }],
    image: step2Img,
    downloadName: 'HydroVisage_Build_Step2_EyeSafetyRings.jpg',
    clinicalMaterial: {
      name: '25mm Periorbital Eye-Safety Isolator Ring',
      spec: 'Shore 30A medical-grade platinum-cured silicone, dielectric strength > 20 kV/mm',
    },
    diyMaterial: {
      name: 'Flexible Medical-Grade Silicone Gasket Strip + Sil-Poxy Adhesive',
      spec: '2–3 mm thick soft U-channel silicone edging trim (non-conductive, zero metal wire core)',
      sourcingTip: 'Check packaging carefully: NEVER use weatherstripping or silicone trim containing metal reinforcing wire.',
    },
    toolsNeeded: [
      'Millimeter ruler / 25 mm spacing gauge',
      'Silicone applicator / spatula tool',
      'Skin-safe medical silicone adhesive (e.g., Sil-Poxy)',
    ],
    instructions: [
      'Wrap the soft non-conductive silicone isolator ring cleanly around the inner and outer perimeter of both orbital eye cutouts.',
      'Use medical silicone adhesive to bond the ring securely to the knit edges and press firmly with a silicone spatula until flush.',
      'Place a millimeter ruler directly above the top edge of each eye ring and draw a strict 25 mm "Keep-Out Line" across the lower brow.',
      'Allow adhesive to cure completely (30–60 minutes) so the silicone forms a slightly raised, hydrophobic ridge around each eye.',
    ],
    wiringNote: 'This ring acts as an insulating dam. Never route any wire, metallic foil, or hydrogel pad within 25 mm of the orbital eye ring edge.',
    safetyVerification: 'Measure at least 25 mm clearance from top of eye ring to the bottom edge of the forehead chalk mark to protect the optic nerve and prevent phosphenes.',
    diagramType: 'eye_buffer',
    isCriticalSafety: true,
  },
  {
    stepNumber: 3,
    id: 'step_3_tpu',
    title: 'Laminate the Waterproof TPU Moisture Barrier',
    subtitle: 'Isolate wet electrodes from the outer knit fabric and direct 100% current inward',
    layerTag: 'Layer L2 • Insulation',
    linkedPartIds: ['barrier_layer'],
    linkedPartBadges: [{ n: 5, id: 'barrier_layer', label: 'TPU Barrier Film' }],
    image: step3Img,
    downloadName: 'HydroVisage_Build_Step3_TPUBarrier.jpg',
    clinicalMaterial: {
      name: 'Hermetic 30 μm High-Elasticity TPU Film',
      spec: '10,000 mm H₂O hydrostatic head, heat-laminated polyurethane membrane',
    },
    diyMaterial: {
      name: 'Tegaderm Transparent Film Dressing or 0.05 mm Clear TPU Stretch Sheet',
      spec: 'Breathable waterproof medical film roll or heat-bondable thin TPU vinyl sheet',
      sourcingTip: 'Clear adhesive Tegaderm-style medical PU film sticks smoothly to fabric and flexes naturally with facial expressions.',
    },
    toolsNeeded: [
      'Plastic smoothing squeegee',
      'Precision craft knife / scissors',
      'Isopropyl alcohol prep wipe (clean inner mask first)',
    ],
    instructions: [
      'Lay the mask shell face-down on the ESD mat so the inner skin-facing surface is facing up.',
      'Cut a single continuous or zoned piece of clear TPU film covering the forehead, both temples, and upper lip—stopping strictly ABOVE your 25 mm eye keep-out line.',
      'Peel back the carrier liner gradually while pressing with a plastic squeegee from the center outward to eliminate air bubbles and wrinkles.',
      'Trim excess film around the nose bridge and chin vents so natural breathing and speech remain completely unobstructed.',
    ],
    wiringNote: 'The TPU film prevents damp saline hydrogel from soaking through the fabric and creating accidental sweat bridges or short circuits across your hair.',
    safetyVerification: 'Spray 2 drops of water onto the finished TPU surface and confirm zero seepage reaches the outer charcoal textile.',
    diagramType: 'tpu_lamination',
  },
  {
    stepNumber: 4,
    id: 'step_4_electrodes',
    title: 'Mount Zoned Silver Electrodes & Crimp Snap Studs',
    subtitle: 'Attach the 4 isolated conductive plates onto the TPU barrier with snap buttons',
    layerTag: 'Layer L3 • Electrodes',
    linkedPartIds: ['electrode_layer'],
    linkedPartBadges: [{ n: 4, id: 'electrode_layer', label: 'Ag/AgCl Electrodes' }],
    image: step4Img,
    downloadName: 'HydroVisage_Build_Step4_ElectrodesSnaps.jpg',
    clinicalMaterial: {
      name: 'Screen-Printed Silver/Silver-Chloride (Ag/AgCl) Polyimide Flex',
      spec: '0.04 Ω/sq sheet resistance, 4 isolated current zones, reversible electrochemistry',
    },
    diyMaterial: {
      name: 'Conductive Carbon-Silicone Rubber Sheet or Silver Ripstop Nylon Fabric',
      spec: '0.5 mm conductive carbon-silicone sheet (or silver-plated conductive textile) + 10 mm stainless/nickel-free TENS snap studs',
      sourcingTip: 'Avoid bare copper or brass tape directly under wet pads—they corrode and irritate skin. Use carbon-silicone or silver-plated fabric.',
    },
    toolsNeeded: [
      'Hand snap-fastener crimping pliers',
      'Precision tweezers',
      '4x male/female conductive metal snap studs (TENS standard 3.5 mm or flat snap)',
    ],
    instructions: [
      'Cut 4 separate conductive electrode backing plates: Forehead (11 × 2.5 cm), Left Temple (3.5 × 2 cm), Right Temple (3.5 × 2 cm), and Philtrum/Upper Lip (4 × 2 cm).',
      'Verify at least a 10–15 mm insulating TPU gap between the Forehead electrode and the Temple electrodes so current passes through skin rather than shorting sideways.',
      'Punch a clean center hole in each plate and crimp one conductive snap stud firmly through the electrode and TPU layer (making sure the back of the stud sits accessible on the side/outer seam without touching bare skin).',
      'Bond the conductive plates flat onto the TPU layer using flexible waterproof adhesive around the perimeter edges.',
    ],
    wiringNote: 'Channel Pairing: Forehead + Philtrum act together as Pole A (+), and Left + Right Temples act together as Pole B (−), reversing cleanly every 5 minutes.',
    safetyVerification: 'Use multimeter continuity mode between neighboring electrode plates to verify they are electrically isolated (Open Loop / ∞ Ω) with zero accidental touching.',
    diagramType: 'electrode_zones',
  },
  {
    stepNumber: 5,
    id: 'step_5_wiring',
    title: 'Route & Insulate the Stretchable Wiring Bus',
    subtitle: 'Connect all 4 electrode studs back to the occipital rear strap cleanly',
    layerTag: 'Wiring Harness',
    linkedPartIds: ['stretchable_traces'],
    linkedPartBadges: [{ n: 6, id: 'stretchable_traces', label: 'Silver Wiring Bus' }],
    image: step5Img,
    downloadName: 'HydroVisage_Build_Step5_WiringBus.jpg',
    clinicalMaterial: {
      name: 'Stretchable Silver-Plated Silicone Ribbon Bus',
      spec: 'Double-insulated medical silicone jacket, multi-conductor flexible micro-strands',
    },
    diyMaterial: {
      name: 'Ultra-Flexible 28–30 AWG Silicone-Jacketed Stranded Ribbon Wire',
      spec: 'Soft silicone insulated test/hookup wire (Red/Teal = Pole A, Black = Pole B) + 2 mm heat-shrink tubing',
      sourcingTip: 'Silicone wire stays limp and comfortable like fabric thread; avoid stiff PVC wire which pokes or pulls the mask off your face.',
    },
    toolsNeeded: [
      'Fine tweezers & wire strippers',
      'Soldering iron + lead-free solder (for stud tabs)',
      'Heat-shrink tubing & fabric thread / elastic keepers',
    ],
    instructions: [
      'Cut two Pole A leads (Forehead stud + Philtrum stud) and two Pole B leads (Left Temple stud + Right Temple stud) with 4 cm extra slack for head stretching.',
      'Solder each stripped wire tip neatly to the outer solder lug/ring of its matching snap stud (keep heat brief so you do not melt the TPU beneath!).',
      'Slip heat-shrink tubing or neutral silicone sealant completely over every exposed solder joint so ZERO bare metal can touch skin or hair.',
      'Route the bundled wires cleanly inside sewn elastic fabric keepers along the outer side channels of the mask all the way to the rear occipital strap.',
    ],
    wiringNote: 'Color-code carefully: Pole A (Forehead + Upper Lip) → Teal/Red wire pair; Pole B (Left + Right Temples) → Black wire pair. Terminate at a 4-pin magnetic or JST-SH connector at the back.',
    safetyVerification: 'Pull gently on each wire joint and inspect under bright light to verify 100% insulation coverage—zero stray copper whiskers anywhere.',
    diagramType: 'wiring_bus',
  },
  {
    stepNumber: 6,
    id: 'step_6_controller',
    title: 'Assemble & Wire the Rear Occipital Controller',
    subtitle: 'Build the constant-current ≤1.5 mA microcurrent limiter, polarity H-bridge & battery pod',
    layerTag: 'Electronics • Occiput',
    linkedPartIds: ['controller_box'],
    linkedPartBadges: [{ n: 8, id: 'controller_box', label: 'Occipital Controller' }],
    image: step6Img,
    downloadName: 'HydroVisage_Build_Step6_ControllerPCB.jpg',
    clinicalMaterial: {
      name: 'Rear Occipital Microcurrent Controller & OLED HUD',
      spec: '38g counterweight pod, dual-core MCU + H-bridge polarity swap, 18V boost limit, 850mAh Li-Po, 128×32 OLED',
    },
    diyMaterial: {
      name: 'Proportional Constant-Current Driver + Microcontroller + Small Enclosure',
      spec: 'ESP32-C3 / Arduino Nano + 18V boost module + hardware op-amp/LM334 constant-current limiter capped at 1.5 mA + L293D/DRV8833 H-bridge + 3.7V 850mAh Li-Po',
      sourcingTip: 'CRITICAL: Add a physical series 10 kΩ safety resistor + hardware current limiter (LM334 or op-amp sink) so even a software bug can NEVER push >1.5 mA.',
    },
    toolsNeeded: [
      'Fine-tip soldering iron + lead-free solder',
      'ESD wrist strap & tweezers',
      'Small 3D-printed or ABS project enclosure (~55×35×14 mm)',
    ],
    instructions: [
      'Build the constant-current stage on perfboard/PCB: boost 3.7V Li-Po up to 15–18V max, feed through a calibrated 0.1–1.5 mA constant-current regulator and H-bridge polarity swapper.',
      'Wire the 0.91" I2C OLED display (VCC, GND, SDA, SCL) to display target mA, timer countdown, and active polarity (+/-).',
      'Solder the mask harness JST/pogo connector directly to the H-bridge output terminals (OUT1 = Pole A, OUT2 = Pole B).',
      'Seat the 850mAh Li-Po (with protection BMS) and PCB inside the rear matte-charcoal enclosure and mount it centered on the back strap as an ergonomic counterweight.',
    ],
    wiringNote: 'Battery (+) → Power Switch → TP4056 BMS Charger → Boost (18V max) → Hardware Current Clamp (≤1.5 mA) → H-Bridge → Mask Pole A & Pole B.',
    safetyVerification: 'Double-check Li-Po polarity before plugging in! Verify OLED powers up cleanly and enclosure closes with zero pinched battery wires.',
    diagramType: 'controller_pcb',
    isCriticalSafety: true,
  },
  {
    stepNumber: 7,
    id: 'step_7_bench_test',
    title: 'Bench-Test Current Ceiling & Polarity Swap (Mandatory)',
    subtitle: 'Prove ≤1.5 mA safety limit on a dummy resistor load BEFORE touching human skin',
    layerTag: 'Clinical Safety Gate',
    linkedPartIds: ['controller_box', 'electrode_layer'],
    linkedPartBadges: [
      { n: 8, id: 'controller_box', label: 'Controller Limit' },
      { n: 4, id: 'electrode_layer', label: 'Test Snaps' },
    ],
    image: step7Img,
    downloadName: 'HydroVisage_Build_Step7_BenchSafetyTest.jpg',
    clinicalMaterial: {
      name: 'Automated 20 Hz Impedance & 1.5 mA Clamp Calibration',
      spec: 'Open-circuit cutoff < 10 ms, hard cranial current clamp ≤ 1.50 mA across 1 kΩ–10 kΩ skin loads',
    },
    diyMaterial: {
      name: 'Digital Multimeter (mA DC Range) + 4.7 kΩ / 10 kΩ Dummy Load Resistor',
      spec: 'Standard 1/4W metal-film resistor simulating hydrated facial skin impedance (~5 kΩ)',
      sourcingTip: 'NEVER test an unverified home-built electrotherapy driver on your own face! Always verify first with a resistor + multimeter.',
    },
    toolsNeeded: [
      'Digital Multimeter set to mA DC (milliamps)',
      '4.7 kΩ and 10 kΩ 1/4W resistors (alligator clip leads)',
      'Oscilloscope or timer stopwatch',
    ],
    instructions: [
      'Clip a 4.7 kΩ dummy resistor between the Pole A snap stud (Forehead) and Pole B snap stud (Temple) in series with your Digital Multimeter set to DC mA.',
      'Power on the controller and ramp target current from 0.2 mA up to max setting (1.5 mA). Confirm the multimeter smoothly tracks 0.2 → 1.5 mA and STOPS rising at ≤ 1.50 mA.',
      'Swap the 4.7 kΩ resistor to a short circuit (0 Ω jumper wire) briefly to confirm the hardware current limiter STILL holds ≤ 1.5 mA and never surges!',
      'Wait for the 5-minute midpoint (or press polarity test) and watch the multimeter sign flip smoothly from +1.20 mA → 0.00 mA → −1.20 mA without spikes.',
      'Unclip one alligator lead mid-run to verify open-circuit lift-off protection drops output to 0.0 mA immediately.',
    ],
    wiringNote: 'Test Circuit Loop: Controller Pole A Snap → [4.7 kΩ Test Resistor] → [Multimeter mA Red Probe → Black Probe] → Controller Pole B Snap.',
    safetyVerification: 'PASS CRITERIA: Max current ≤ 1.50 mA even on short circuit; Max open-circuit voltage ≤ 18.0 V; Smooth ramp & 0.0 mA lift-off shutoff.',
    diagramType: 'bench_test',
    isCriticalSafety: true,
  },
  {
    stepNumber: 8,
    id: 'step_8_hydrogel',
    title: 'Snap On Isotonic Hydrogel Pads & Final Fit Check',
    subtitle: 'Attach sterile 0.9% saline pads and inspect eye clearance before first 10-min trial',
    layerTag: 'Layer L4 • Skin Contact',
    linkedPartIds: ['forehead_pad', 'temple_pads', 'philtrum_pad'],
    linkedPartBadges: [
      { n: 1, id: 'forehead_pad', label: 'Forehead Pad' },
      { n: 2, id: 'temple_pads', label: 'Temple Wings' },
      { n: 3, id: 'philtrum_pad', label: 'Philtrum Pad' },
    ],
    image: step8Img,
    downloadName: 'HydroVisage_Build_Step8_HydrogelPads.jpg',
    clinicalMaterial: {
      name: 'Replaceable 0.9% Isotonic Saline Hydrogel Pads',
      spec: 'ISO 10993 biocompatible hydrogel, 1.2 mm thick, magnetic snap backing',
    },
    diyMaterial: {
      name: 'Cut-to-Shape Medical TENS Hydrogel Electrodes or Damp PVA Chamois Sponge Pads',
      spec: 'Fresh medical self-adhesive gel pads (or thin 2 mm PVA sponge pads snapped onto studs & dampened with 0.9% saline)',
      sourcingTip: 'Using 0.9% isotonic saline (1 tsp non-iodized salt in 500 ml distilled water) matches body fluid conductivity and prevents tingling.',
    },
    toolsNeeded: [
      'Clean nitrile gloves & tweezers',
      '0.9% Isotonic saline spray bottle (for PVA sponge pads)',
      'Mirror for final visual alignment check',
    ],
    instructions: [
      'Wearing clean gloves, snap the soft cyan hydrogel contact pads onto the 4 internal magnetic studs (Forehead, Left Temple, Right Temple, Upper Lip).',
      'Ensure each hydrogel pad sits strictly over its silver electrode plate and does NOT bridge across the TPU insulating gaps or touch the gold eye rings.',
      'Lightly mist PVA sponge surfaces (or verify tackiness of pre-gelled pads) so contact wetness is uniform—moist, never dripping.',
      'Put on the completed headset in front of a mirror: verify the eye rings frame your eyes comfortably with 25 mm clearance to the forehead pad, then run your first gentle 0.5 mA 10-minute session.',
    ],
    wiringNote: 'Final Stack Verification: Skin ↔ [L4 Hydrogel Pad] ↔ [L3 Silver Electrode + Snap] ↔ [L2 TPU Film] ↔ [L1 Compression Shell] ↔ [Rear Controller].',
    safetyVerification: 'Rinse/wipe hydrogel pads after every session and replace every 7–10 treatments to keep skin resistance low and hygienic.',
    diagramType: 'final_stack',
  },
];
