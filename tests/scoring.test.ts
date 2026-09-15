import test from 'node:test'; import assert from 'node:assert/strict'; import { scoreBusiness } from '../lib/scoring';
test('scores a strong business as qualified',()=>{const r=scoreBusiness({rating:4.8,reviews:300,socialScore:15,photos:20,completeness:10,recentPosts:true,hasSocial:true,hasPhone:true});assert.equal(r.grade,'A');assert.equal(r.qualified,true);});
test('does not qualify an incomplete business',()=>assert.equal(scoreBusiness({rating:2,reviews:1}).qualified,false));
