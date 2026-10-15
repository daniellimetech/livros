export const initialBooks = [
 {title:'O Ego Transformado',theme:'Espiritualidade',priority:2},
 {title:'Reprograme-se',theme:'Mente & Comportamento',priority:3,total:604},
 {title:'Hábitos Atômicos',theme:'Mente & Comportamento',priority:2,page:368,total:705,reader:'Lorena'},
 {title:'Espiritualidade Emocionalmente Saudável',theme:'Espiritualidade',priority:3,reader:'Lorena'},
 {title:'Dinheiro é Emocional',theme:'Finanças',priority:2},
 {title:'Psicologia Financeira',theme:'Finanças',priority:1,status:'Pausado'}
].map((b,i)=>({id:String(i+1),page:0,total:null,status:'Lendo',reader:'Você',notes:'',...b}));
export function percent(book){return book.total ? Math.min(100,Math.round(book.page/book.total*100)):0;}
export function validate(book){if(!book.title.trim())return 'Informe o título.';if(!Number.isInteger(book.page)||book.page<0)return 'Informe uma página atual válida.';if(book.total!==null&&(!Number.isInteger(book.total)||book.total<1))return 'Informe um total de páginas válido.';if(book.total!==null&&book.page>book.total)return 'A página atual não pode ultrapassar o total.';if(book.status==='Concluído'&&(!book.total||book.page!==book.total))return 'Para concluir, informe o total e registre a última página.';return '';}

// Each reader has an independent rotation; paused and finished books are excluded.
export function rotationTurn(books, rotation = {}, reader = 'Você') {
  const eligible = books.filter(b => (b.reader || 'Você') === reader && b.status === 'Lendo' && (!b.total || b.page < b.total));
  const categories = [...new Set(eligible.map(b => b.theme))];
  if (!categories.length) return null;
  const cursor = rotation[reader] || {};
  const index = categories.indexOf(cursor.lastTheme);
  const theme = categories[(index + 1) % categories.length];
  const candidates = eligible.filter(b => b.theme === theme);
  const lastIndex = candidates.findIndex(b => b.id === cursor.lastBooks?.[theme]);
  const book = candidates[(lastIndex + 1) % candidates.length];
  const target = book.total ? Math.min(book.page + 10, book.total) : book.page + 10;
  return {book, theme, categories, target, pages: target - book.page};
}

export function completeRotation(state, reader) {
  const turn = rotationTurn(state.books, state.rotation, reader);
  if (!turn) return null;
  const next = structuredClone(state);
  const book = next.books.find(b => b.id === turn.book.id);
  book.page = turn.target;
  if (book.total && book.page === book.total) book.status = 'Concluído';
  next.rotation ||= {};
  const cursor = next.rotation[reader] || {};
  next.rotation[reader] = {lastTheme: turn.theme, lastBooks: {...cursor.lastBooks, [turn.theme]: book.id}};
  next.history.push({title: book.title, date: new Date().toISOString(), description: `${reader} · Rodízio · página ${turn.book.page} → ${book.page} (+${turn.pages}) · ${book.status}`});
  return next;
}
