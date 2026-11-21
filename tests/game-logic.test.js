import test from 'node:test';
import assert from 'node:assert/strict';
import {upgradeCost,clamp,VEHICLES,MISSIONS,STAGES} from '../src/data.js';
test('upgrade prices rise with level',()=>{assert.ok(upgradeCost(100,2)>upgradeCost(100,1));});
test('clamp keeps values inside bounds',()=>{assert.equal(clamp(12,0,10),10);assert.equal(clamp(-2,0,10),0);});
test('vehicle roster contains ten distinct configurations',()=>{assert.equal(VEHICLES.length,10);assert.equal(new Set(VEHICLES.map(v=>v.id)).size,10);assert.ok(new Set(VEHICLES.map(v=>v.speed)).size>5);});
test('campaign and mission data have requested counts',()=>{assert.equal(STAGES.length,10);assert.equal(MISSIONS.length,50);});
