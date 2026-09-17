import {test} from 'node:test';
import assert from 'node:assert/strict';
import {consoleZoom,BODY_WIDTH,BODY_HEIGHT,cartridgeRests} from '../lib/console-layout.ts';
test('the console fits a narrow mobile viewport and a wide desktop stage',()=>{for(const [width,height,compact] of [[288,525,true],[351,555,true],[820,600,false],[1080,660,false]] as const){const zoom=consoleZoom(width,height,compact);assert.ok(BODY_WIDTH*zoom<width);assert.ok(BODY_HEIGHT*zoom<height);if(!compact){for(const [x,y] of cartridgeRests){assert.ok((Math.abs(x)+.6)*zoom<width/2);assert.ok((Math.abs(y)+.55)*zoom<height/2);}}}});
