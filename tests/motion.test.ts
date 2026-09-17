import {test} from 'node:test';
import assert from 'node:assert/strict';
import {flightPose,seatedPose,FLIGHT_MS,type Pose} from '../lib/cartridge-motion.ts';
const rest:Pose={position:[-3.25,.9,.15],rotation:[-.25,0,-.16],scale:1};
test('a cartridge leaves its own place, clears the console, then seats exactly',()=>{
 assert.deepEqual(flightPose(rest,0,true),rest);
 assert.ok(flightPose(rest,560,true).position[2]>1,'lifts toward the visitor');
 assert.ok(flightPose(rest,950,true).position[1]>3,'flies above the slot');
 assert.deepEqual(flightPose(rest,1250,true).rotation,[0,0,0]);
 assert.deepEqual(flightPose(rest,FLIGHT_MS,true),seatedPose);
});
test('ejection starts in the slot and returns to the original position',()=>{
 assert.deepEqual(flightPose(rest,0,false),seatedPose);
 assert.ok(flightPose(rest,220,false).position[1]>3);
 const end=flightPose(rest,FLIGHT_MS,false);
 end.position.forEach((v,i)=>assert.ok(Math.abs(v-rest.position[i])<1e-9));
});
test('flight has no discontinuities at lift, alignment, or insertion boundaries',()=>{
 for(const time of [300,570,1180,1280]){const before=flightPose(rest,time-.001,true),after=flightPose(rest,time+.001,true);before.position.forEach((v,i)=>assert.ok(Math.abs(v-after.position[i])<.001));}
});
