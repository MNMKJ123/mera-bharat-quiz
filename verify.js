const fs=require('fs');
const h=fs.readFileSync('index.html','utf8');
global.window={}; global.document={querySelector:()=>null,getElementById:()=>null,addEventListener:()=>{}};
const re=/window\.MBQ_BANK = \(window\.MBQ_BANK \|\| \[\]\)\.concat\(\[\{[\s\S]*?\n\]\}\]\);/g;
(h.match(re)||[]).forEach(b=>eval(b));
const BANK=window.MBQ_BANK||[];
let total=0,leak=0,bad=[],seen=new Map();
BANK.forEach(c=>{
  total+=c.qs.length;
  if(c.qs.length<50) bad.push('POOL <50: '+c.name+' = '+c.qs.length);
  c.qs.forEach((q,i)=>{
    const w=c.name+'['+i+']';
    if(!q.h) bad.push('NO HINT: '+w);
    if(!q.o||q.o.length!==4) bad.push('OPTIONS!=4: '+w);
    else{
      if(new Set(q.o.map(o=>o[1].toLowerCase())).size!==4) bad.push('DUP OPTION: '+w+' '+q.q);
      if(q.o.map(o=>o[0]).includes(q.e)){ leak++; console.log('LEAK '+w+' '+q.e+' '+q.q); }
    }
    const k=q.q.toLowerCase().replace(/[sp{P}]/gu,'');
    if(seen.has(k)) bad.push('DUP Q: '+w+' == '+seen.get(k)); else seen.set(k,w);
  });
});
console.log('\nsubjects:',BANK.length,' total questions:',total);
BANK.forEach(c=>console.log('  '+String(c.qs.length).padStart(3)+'  '+c.emoji+' '+c.name+'  ('+c.color+')'));
console.log('\nemoji leaks:',leak);
console.log(bad.length?'PROBLEMS:\n'+bad.join('\n'):'No other problems.');
