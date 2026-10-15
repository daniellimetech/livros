import test from 'node:test';
import assert from 'node:assert/strict';
import {initialBooks,percent,validate} from './model.js';
test('PDF initial progress and reader are preserved',()=>{const b=initialBooks.find(b=>b.title==='Hábitos Atômicos');assert.equal(b.reader,'Lorena');assert.equal(percent(b),52);assert.equal(initialBooks.length,6);});
test('unknown totals are allowed but not interpreted as completed',()=>{assert.equal(validate(initialBooks[0]),'');assert.equal(percent(initialBooks[0]),0);assert.match(validate({...initialBooks[0],status:'Concluído'}),/concluir/);});
test('rejects impossible page counts',()=>{for(const page of [-1,3.5,101])assert.ok(validate({...initialBooks[0],page,total:100}));assert.equal(validate({...initialBooks[0],page:100,total:100,status:'Concluído'}),'');});
