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
