import test from 'node:test'; import assert from 'node:assert/strict'; import { isDuplicate } from '../lib/dedupe';
test('matches normalized phone numbers',()=>assert.ok(isDuplicate({name:'A',phone:'+964 770 123 4567'},{name:'B',phone:'9647701234567'})));
test('does not merge unrelated businesses',()=>assert.equal(isDuplicate({name:'A',address:'Mosul'},{name:'B',address:'Baghdad'}),false));
