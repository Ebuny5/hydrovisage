/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PartData {
  id: string;
  n: number;
  title: string;
  category: 'pad' | 'electrode' | 'chassis' | 'electronics' | 'safety';
  cost: string;
  body: string;
  specs: string;
  safetyNote: string;
  side: 'front' | 'side' | 'rear';
}

export interface ZoneData {
  id: string;
  name: string;
  desc: string;
  areaCm2: number;
  currentRatio: number;
}

export type ViewPreset = 'front' | 'profile' | 'forehead';

export interface TelemetryLog {
  time: string;
  message: string;
  type: 'info' | 'warn' | 'success';
}

export type SessionStatus = 'idle' | 'ramping' | 'active' | 'paused' | 'completed';
