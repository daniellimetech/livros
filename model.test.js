import test from 'node:test';
import assert from 'node:assert/strict';
import {initialBooks,percent,validate} from './model.js';
test('PDF initial progress and reader are preserved',()=>{const b=initialBooks.find(b=>b.title==='Hábitos Atômicos');assert.equal(b.reader,'Lorena');assert.equal(percent(b),52);assert.equal(initialBooks.length,6);});
test('unknown totals are allowed but not interpreted as completed',()=>{assert.equal(validate(initialBooks[0]),'');assert.equal(percent(initialBooks[0]),0);assert.match(validate({...initialBooks[0],status:'Concluído'}),/concluir/);});
test('rejects impossible page counts',()=>{for(const page of [-1,3.5,101])assert.ok(validate({...initialBooks[0],page,total:100}));assert.equal(validate({...initialBooks[0],page:100,total:100,status:'Concluído'}),'');});

import {rotationTurn,completeRotation} from './model.js';
const fresh=()=>({books:structuredClone(initialBooks),history:[]});
test('rotation alternates categories, adds 10 pages, preserves original state',()=>{
 const state=fresh();assert.equal(rotationTurn(state.books,undefined,'Você').theme,'Espiritualidade');
 const next=completeRotation(state,'Você');assert.equal(next.books[0].page,10);assert.equal(state.books[0].page,0);assert.equal(next.history.length,1);
 const second=completeRotation(next,'Você');assert.equal(second.books[1].page,10);assert.equal(rotationTurn(second.books,second.rotation,'Você').theme,'Finanças');
 const third=completeRotation(second,'Você');assert.equal(rotationTurn(third.books,third.rotation,'Você').theme,'Espiritualidade');
});
test('rotation is per reader and skips paused books',()=>{
 const state=completeRotation(fresh(),'Você');assert.equal(rotationTurn(state.books,state.rotation,'Lorena').book.reader,'Lorena');
 assert.equal(rotationTurn(state.books,state.rotation,'Outro'),null);
 const onlyPaused={books:[{...initialBooks[0],status:'Pausado'}],history:[]};assert.equal(completeRotation(onlyPaused,'Você'),null);
});
test('rotation rotates books within a category after returning to it',()=>{
 let s=fresh();s.books.push({...s.books[0],id:'extra',title:'Outro livro'});
 for(let i=0;i<3;i++)s=completeRotation(s,'Você');
 assert.equal(rotationTurn(s.books,s.rotation,'Você').book.id,'extra');
});
test('last turn uses remaining pages and completes the book without exceeding total',()=>{
 const s={books:[{...initialBooks[0],page:18,total:23}],history:[]};
 assert.equal(rotationTurn(s.books,{},'Você').pages,5);
 const next=completeRotation(s,'Você');assert.equal(next.books[0].page,23);assert.equal(next.books[0].status,'Concluído');assert.equal(rotationTurn(next.books,next.rotation,'Você'),null);
});
test('single category can continue and missing category does not break rotation',()=>{
 const s={books:[initialBooks[1]],history:[],rotation:{'Você':{lastTheme:'Categoria removida'}}};
 const next=completeRotation(s,'Você');assert.equal(rotationTurn(next.books,next.rotation,'Você').book.page,10);
});
