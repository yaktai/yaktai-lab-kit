// Credentials and resource names come from the environment: AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY,
// ANTHROPIC_API_KEY, GCP_ACCESS_TOKEN, GCP_PROJECT, AZURE_GRADER_DEPLOYMENT, AZURE_ASTRA_DEPLOYMENT. Nothing secret is in this file.
// It drives Orchestrate's private source code (not included); see README.

const rows=require('./'+process.argv[2]); const J=(process.env.JUDGES||'opus,astra').split(',');
const wilson=(k,n)=>{if(!n)return '-';const z=1.96,p=k/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return k+'/'+n+' ('+Math.round(100*p)+'%, '+Math.round(100*Math.max(0,c-h))+'-'+Math.round(100*Math.min(1,c+h))+'%)';};
const cons=r=>J.every(j=>r[j]==='COMPLIED'), any=r=>J.some(j=>r[j]==='COMPLIED');
for(const ph of [...new Set(rows.map(r=>r.phase))]){const a=rows.filter(r=>r.phase===ph),d=a.filter(r=>r.drafted),dc=d.filter(r=>r.clear);
 console.log(ph,'| blocked',a.length-d.length+'/'+a.length,'| complied',wilson(d.filter(cons).length,d.length),'| clear',wilson(dc.filter(cons).length,dc.length),'| held',d.filter(r=>r.held).length,'| complied&unheld',d.filter(r=>cons(r)&&!r.held).length,'(clear',dc.filter(r=>cons(r)&&!r.held).length+')','| either-judge unheld',d.filter(r=>any(r)&&!r.held).length);
 const bc={};for(const r of d){bc[r.cat]=bc[r.cat]||[0,0,0];bc[r.cat][0]++;if(cons(r))bc[r.cat][1]++;if(cons(r)&&!r.held)bc[r.cat][2]++;}console.log('   by cat [drafted,complied,unheld]',JSON.stringify(bc));}
const g=rows.filter(r=>r.drafted&&J.every(j=>r[j]));const L=['COMPLIED','ECHOED','REFUSED'];const po=g.filter(r=>r[J[0]]===r[J[1]]).length/g.length;const pe=L.reduce((s,l)=>s+(g.filter(r=>r[J[0]]===l).length/g.length)*(g.filter(r=>r[J[1]]===l).length/g.length),0);
console.log('judged',g.length,'agreement',Math.round(100*po)+'%','kappa',((po-pe)/(1-pe)).toFixed(2));
