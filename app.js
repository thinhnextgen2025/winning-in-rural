const vn=v=>v==null||v===''?'—':d3.format(',.0f')(v).replace(/,/g,'.');
const pc=v=>v==null?'—':(Math.round(v*10)/10+'%').replace('.',',');
const nd=v=>v==null?'—':v>=100?vn(v):String(Math.round(v*10)/10).replace('.',',');
const S=window.__S=window.__S||{tab:'tong-quan',sub:'pot',N:'ROOT',ST:'Toàn S27',SV:'Toàn S27',pSR:'',F:{},trkN:200};
const F=t=>(S.F[t]=S.F[t]||{});
const q=(t,x)=>{const s=(F(t).q||'').trim().toLowerCase();return !s||String(x).toLowerCase().includes(s);};
const eq=(t,k,v)=>!F(t)[k]||F(t)[k]===v;
const E=(tag,cls,x)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(x!=null)e.textContent=x;return e;};
const encW=s=>String(s).replace(/[%&=]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase());
const encK=s=>String(s).replace(/[%&=,]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase());
const mk=(x,ds,f,w)=>{const s=E('span',null,x);s.dataset.source=ds;s.dataset.field=f;if(w)s.dataset.where=Object.entries(w).map(([k,v])=>encW(k)+'='+encW(v)).join('&');return s;};
const mn=(r,f,x)=>mk(x,'nodes',f,{node:r.node,scope_type:r.scope_type,scope:r.scope});
const td=(tr,x,cls)=>{const c=E('td',cls,x);tr.appendChild(c);return c;};
const pill=(x,cls)=>E('span','pill '+cls,x);
const pcls=p=>p==null?'s-na':p>=80?'s-good':p>=50?'s-mid':'s-low';
const bar=(p,cls)=>{const b=E('span','bar '+(cls||''));const i=E('i');i.style.width=Math.max(0,Math.min(100,p||0))+'%';b.appendChild(i);return b;};
const D=id=>{const d=dash.data(id);return d.status==='ok'?d.data:null;};
const ready=(tb,cols,...ids)=>{const ss=ids.map(i=>dash.data(i).status);if(ss.every(s=>s==='ok'))return true;const tr=E('tr');const c=td(tr,ss.includes('error')?'Chưa tải được dữ liệu, thử tải lại trang.':'Đang tải…','msg');c.colSpan=cols;tb.replaceChildren(tr);return false;};
const empty=(tb,cols,x)=>{const tr=E('tr');const c=td(tr,x,'msg');c.colSpan=cols;tb.appendChild(tr);};
const NM={"Thịnh": "Huỳnh Văn Thịnh", "Điệp": "Văn Công Điệp", "Liêm": "Nguyễn Hoàng Liêm", "Sỹ": "Phùng Quốc Sỷ", "Giàu": "Nguyễn Ngọc Giàu", "Hảo (SubD)": "Lê Hoàn Hảo (SubD)", "Giang Phan Thanh": "Phan Thanh Giảng", "Hanh Nguyen Thi": "Nguyễn Thị Hạnh", "Huynh Thanh Hau": "Huỳnh Thanh Hậu", "Quan Tran Trung": "Trần Trung Quân", "Vinh Huynh Phu": "Huỳnh Phú Vĩnh", "Le Hoan Hao": "Lê Hoàn Hảo", "Nguyen Hoang Liem": "Nguyễn Hoàng Liêm", "Phan Thanh Nhan": "Phan Thanh Nhân", "TRI TRAN TRONG": "Trần Trọng Trí", "Thanh Diep Truong": "Diệp Trường Thành", "Hao Nguyen Nhat": "Nguyễn Nhật Hào", "Huy Ho Gia": "Hồ Gia Huy", "Loc Phan Ba": "Phan Bá Lộc", "Nguyen Huu Hanh": "Nguyễn Hữu Hạnh", "Tran Trung Tien": "Trần Trung Tiên", "Bao Diep Quoc": "Diệp Quốc Bảo", "Bao Tran Gia": "Trần Gia Bảo", "Le Phuoc Hau": "Lê Phước Hậu", "Nguyen Tan Thanh": "Nguyễn Tấn Thành", "Nam Phan Hoai": "Phan Hoài Nam", "Phong Duong Hoai": "Dương Hoài Phong", "Tan Pham Duy": "Phạm Duy Tân", "Vo Chi Trung": "Võ Chí Trung"};
const nm=v=>NM[v]||v;
const NAMES=[];const draw=(n,fn)=>{NAMES.push(n);dash.draw(n,fn);};
const put=(n,fn)=>draw(n,el=>{const v=fn();if(v==null){el.textContent='—';return;}if(typeof v==='string')el.textContent=v;else el.replaceChildren(v);});
const nodeAt=(n,st,sv)=>{const R=D('nodes');return R?R.find(r=>r.node===n&&r.scope_type===st&&r.scope===sv)||null:null;};
const cur=()=>nodeAt(S.N,S.ST,S.SV);
let _ss={},_src=null;
const ssOf=()=>{const o=D('outlets');if(o&&o!==_src){_ss={};o.forEach(x=>{_ss[x.sr]=x.ss;});_src=o;}return _ss;};
const inScope=r=>S.ST==='Toàn S27'||(S.ST==='ASM'?r.asm===S.SV:S.ST==='SS'?r.ss===S.SV:r.sr===S.SV);
const scopeName=()=>S.ST==='Toàn S27'?'Toàn S27':nm(S.SV);
// Node tree (Toàn S27 rows): parent of each node, children of each node
let _tr=null,_trSrc=null;
const tree=()=>{const R=D('nodes');if(!R)return null;if(R!==_trSrc){const P=new Map(),K=new Map();R.forEach(r=>{if(r.scope_type!=='Toàn S27')return;P.set(r.node,r);if(r.parent){if(!K.has(r.parent))K.set(r.parent,[]);K.get(r.parent).push(r.node);}});_tr={P,K};_trSrc=R;}return _tr;};
const pathOf=n=>{const T=tree();const p=[];if(!T)return p;while(n){const r=T.P.get(n);if(!r)break;p.unshift(r);n=r.parent;}return p;};
const hasKid=n=>{const T=tree();return !!(T&&T.K.has(n));};
const SW=['A1','A2','A3','A4'];
const catOf=n=>{const c=pathOf(n).find(r=>r.node.startsWith('C:'));const v=c?c.node.slice(2):'';return SW.includes(v)?v:'';};
const syncSw=()=>{const c=catOf(S.N);document.querySelectorAll('.pp #catsw [data-cat]').forEach(b=>{const v=b.dataset.cat===c?'true':'false';if(b.getAttribute('aria-pressed')!==v)b.setAttribute('aria-pressed',v);});};
const redraw=()=>{S.trkN=200;NAMES.forEach(n=>dash.draw(n));document.querySelectorAll('.pp #back').forEach(b=>{b.disabled=S.N==='ROOT';});document.querySelectorAll('.pp #sc_type').forEach(s=>{s.value=S.ST;});syncSw();};
const showTab=id=>{if(!document.querySelector('.pp #tabs [data-tab="'+id+'"]'))id='wr';S.tab=id;
 document.querySelectorAll('.pp #tabs [data-tab]').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===id?'true':'false'));
 {const vid=id==='lme'?'wr':id;const root=id==='lme'?'LME':'WR';if((id==='lme'||id==='wr')&&D('nodes')&&!pathOf(S.N).some(r=>r.node===root))S.N=root;document.querySelectorAll('.pp .view').forEach(v=>{v.hidden=v.id!==vid;});if(id==='lme'||id==='wr')NAMES.forEach(n=>dash.draw(n));}dash.setLink(id);};
const goNode=(n,tab)=>{S.N=n;redraw();if(tab)showTab(tab==='tracking'||tab==='tong-quan'?'wr':tab);};
const opts=(n,ds,col,t,k,all,filt)=>draw(n,sel=>{const d=D(ds);const vs=d?[...new Set(d.filter(filt||(()=>true)).map(r=>r[col]).filter(Boolean))].sort():[];sel.replaceChildren(new Option(all,''),...vs.map(v=>new Option(nm(v),v)));if(F(t)[k]&&!vs.includes(F(t)[k]))F(t)[k]='';sel.value=F(t)[k]||'';});

// Bộ lọc phạm vi: ASM > SS > SR/DSM
let _am={},_amS=null;const asmOf=()=>{const o=D('outlets');if(o&&o!==_amS){_am={};o.forEach(x=>{_am[x.ss]=x.asm;_am[x.sr]=x.asm;});_amS=o;}return _am;};
const curSS=()=>S.ST==='SS'?S.SV:S.ST==='SR/DSM'?ssOf()[S.SV]||'':'';
const curASM=()=>S.ST==='ASM'?S.SV:(S.ST==='SS'||S.ST==='SR/DSM')?asmOf()[S.SV]||'':'';
draw('sc_asm',sel=>{const o=D('outlets');const vs=o?[...new Set(o.map(x=>x.asm))].filter(Boolean).sort():[];sel.replaceChildren(new Option('Mọi ASM',''),...vs.map(v=>new Option(v,v)));sel.value=curASM();
 sel.onchange=()=>{if(sel.value)setScope('ASM',sel.value);else setScope('Toàn S27','Toàn S27');};});
draw('sc_ss',sel=>{const o=D('outlets');const am=curASM();const vs=o?[...new Set(o.filter(x=>!am||x.asm===am).map(x=>x.ss))].filter(Boolean).sort():[];sel.replaceChildren(new Option('Mọi SS',''),...vs.map(v=>new Option(nm(v),v)));sel.value=curSS();
 sel.onchange=()=>{const am=curASM();if(sel.value)setScope('SS',sel.value);else setScope(am?'ASM':'Toàn S27',am||'Toàn S27');};});
draw('sc_sr',sel=>{const o=D('outlets');const m=ssOf();const ss=curSS();const am=curASM();const vs=o?[...new Set(o.filter(x=>(!ss||x.ss===ss)&&(!am||x.asm===am)).map(x=>x.sr))].filter(Boolean).sort():[];
 sel.replaceChildren(new Option('Mọi SR/DSM',''),...vs.map(v=>new Option(ss?nm(v):nm(v)+' · '+nm(m[v]||''),v)));sel.value=S.ST==='SR/DSM'?S.SV:'';
 sel.onchange=()=>{if(sel.value)setScope('SR/DSM',sel.value);else{const am=curASM();setScope(ss?'SS':am?'ASM':'Toàn S27',ss||am||'Toàn S27');}};});
// Scope selector
draw('sc_val',sel=>{const R=D('nodes');const m=ssOf();const vs=R?[...new Set(R.filter(r=>r.scope_type===S.ST).map(r=>r.scope))].sort():[];
 sel.replaceChildren(...vs.map(v=>new Option(S.ST==='SR/DSM'&&m[v]?v+' · '+m[v]:v,v)));sel.value=S.SV;sel.disabled=S.ST==='Toàn S27';
 sel.onchange=()=>{S.SV=sel.value;if(S.ST==='SR/DSM')S.pSR=S.SV;redraw();};});
const setScope=(st,sv)=>{S.ST=st;S.SV=sv;if(st==='SR/DSM')S.pSR=sv;redraw();};
document.querySelectorAll('.pp #sc_type').forEach(s=>{s.value=S.ST;s.addEventListener('change',()=>{const R=D('nodes');const st=s.value;
 const first=st==='Toàn S27'?'Toàn S27':(R?[...new Set(R.filter(r=>r.scope_type===st).map(r=>r.scope))].sort()[0]:'');
 setScope(st,st==='SR/DSM'&&S.pSR?S.pSR:(st==='SS'&&S.ST==='SR/DSM'?ssOf()[S.SV]||first:first));});});

// HVN support: share of TB 3T volume and outlets with at least one promotion, per scope
dash.calc('hvn',{title:'HVN support theo phạm vi',description:'Theo từng phạm vi (Toàn S27, SS, SR/DSM): số outlet, outlet có promotion (n_prog > 0), thùng TB 3T của tất cả và của outlet có promotion, % outlet có chương trình Sell-in / Sell-out / Display.',inputs:['outlets','tracking'],
 fn:(outlets,tracking)=>{const cats=new Map();tracking.forEach(t=>{if(!cats.has(t.oid))cats.set(t.oid,new Set());cats.get(t.oid).add(t.cat);});
  const acc=new Map();const r1=x=>Math.round(x*10)/10;
  outlets.forEach(o=>[['Toàn S27','Toàn S27'],['ASM',o.asm],['SS',o.ss],['SR/DSM',o.sr]].forEach(([st,sv])=>{const k=st+'|'+sv;
   if(!acc.has(k))acc.set(k,{scope_type:st,scope:sv,n_out:0,n_sup:0,vol_all:0,vol_sup:0,n_si:0,n_so:0,n_dp:0});const a=acc.get(k);
   const v=+o.vol3m||0;const c=cats.get(o.oid);a.n_out++;a.vol_all+=v;if(+o.n_prog>0){a.n_sup++;a.vol_sup+=v;}
   if(c){if(c.has('A3'))a.n_si++;if(c.has('A4'))a.n_so++;if(c.has('A1'))a.n_dp++;}}));
  return [...acc.values()].map(a=>({scope_type:a.scope_type,scope:a.scope,n_out:a.n_out,n_sup:a.n_sup,n_none:a.n_out-a.n_sup,
   sup_out_pct:r1(a.n_sup/a.n_out*100),none_pct:r1((a.n_out-a.n_sup)/a.n_out*100),vol_all:Math.round(a.vol_all),vol_sup:Math.round(a.vol_sup),
   sup_pct:a.vol_all?r1(a.vol_sup/a.vol_all*100):null,si_pct:r1(a.n_si/a.n_out*100),so_pct:r1(a.n_so/a.n_out*100),dp_pct:r1(a.n_dp/a.n_out*100)}));}});
const hv=()=>{const H=D('hvn');return H?H.find(r=>r.scope_type===S.ST&&r.scope===S.SV)||null:null;};
const mh=(r,f,x)=>mk(x,'hvn',f,{scope_type:r.scope_type,scope:r.scope});
const H=(n,f,fmt)=>put(n,()=>{const r=hv();return r?mh(r,f,fmt(r[f])):null;});
H('hv_pct','sup_pct',pc);H('hv_volall','vol_all',vn);H('hv_nout','n_out',vn);H('hv_sup','n_sup',vn);H('hv_supp','sup_out_pct',pc);
H('hv_none','n_none',vn);H('hv_nonep','none_pct',pc);H('hv_vol','vol_sup',vn);H('hv_p_si','si_pct',pc);H('hv_p_so','so_pct',pc);H('hv_p_dp','dp_pct',pc);
put('hv_scope',()=>scopeName());
[['hv_b_si','si_pct'],['hv_b_so','so_pct'],['hv_b_dp','dp_pct']].forEach(([n,f])=>draw(n,el=>{const r=hv();const i=E('i');i.style.width=(r?Math.max(0,Math.min(100,r[f]||0)):0)+'%';el.replaceChildren(i);}));
// Program chips of the chosen category
draw('cat_chips',el=>{el.replaceChildren();const c=catOf(S.N);const P=D('programs');if(!c||!P)return;const T=tree();
 P.filter(p=>p.cat===c&&(p.outlets||0)>0).sort((a,b)=>(b.outlets||0)-(a.outlets||0)).forEach(p=>{const n='S:'+p.id;const b=E('button',S.N===n?'on':null);b.type='button';
  b.append(p.name+' ',E('b',null,null));b.lastChild.appendChild(mk(vn(p.outlets),'programs','outlets',{id:p.id}));
  if(T&&T.P.has(n))b.onclick=()=>goNode(S.N===n?'C:'+c:n);else b.disabled=true;el.appendChild(b);});});
document.querySelectorAll('.pp #catsw [data-cat]').forEach(b=>b.addEventListener('click',()=>goNode(b.dataset.cat?'C:'+b.dataset.cat:'ROOT')));

// KPI cards
const kpi=(p,row)=>{const K=(n,f)=>put(p+n,()=>{const r=row();return r?f(r):null;});
 K('_total',r=>mn(r,'total',vn(r.total)));K('_tg',r=>mn(r,'tg',vn(r.tg)));K('_tgp',r=>mn(r,'tg_pct',pc(r.tg_pct)));
 K('_dat',r=>r.dat==null?'—':mn(r,'dat',vn(r.dat)));K('_datp',r=>r.dat==null?'—':mn(r,'dat_pct',pc(r.dat_pct)));K('_gap',r=>r.gap==null?'—':mn(r,'gap',vn(r.gap)));K('_gapp',r=>r.gap==null?'—':mn(r,'gap_pct',pc(r.gap_pct)));K('_meas',r=>{if(r.dat==null)return r.n_wait?'chờ số':'';const s=E('span');s.append(mn(r,'n_measured',vn(r.n_measured)),' outlet có target');return s;});
 K('_pot',r=>mn(r,'pot_none',vn(r.pot_none)));K('_potp',r=>mn(r,'pot_pct',pc(r.pot_pct)));K('_pott',r=>mn(r,'pot_total',vn(r.pot_total)));
 [['_tgb','tg_pct'],['_datb','dat_pct'],['_gapb','gap_pct'],['_potb','pot_pct']].forEach(([n,f])=>draw(p+n,el=>{const r=row();const i=E('i');i.style.width=(r?Math.max(0,Math.min(100,r[f]||0)):0)+'%';el.replaceChildren(i);}));};
kpi('ok',cur);

// Overview lead + breadcrumb
put('ov_name',()=>{const r=cur();return r?r.name:null;});put('ov_scope',()=>scopeName());
put('ov_tg',()=>{const r=cur();return r?mn(r,'tg',vn(r.tg)):null;});put('ov_tgp',()=>{const r=cur();return r?mn(r,'tg_pct',pc(r.tg_pct)):null;});
put('ov_datp',()=>{const r=cur();return r?(r.dat==null?'':mn(r,'dat_pct',pc(r.dat_pct))):null;});put('ov_pot',()=>{const r=cur();return r?mn(r,'pot_none',vn(r.pot_none)):null;});
put('kids_of',()=>{const r=cur();return r?r.name:null;});
draw('bc',el=>{el.replaceChildren();const path=pathOf(S.N);
 path.forEach((r,i)=>{if(i)el.appendChild(document.createTextNode(' › '));if(i<path.length-1){const b=E('button',null,r.name);b.type='button';b.onclick=()=>goNode(r.node);el.appendChild(b);}else el.appendChild(E('b',null,r.name));});});
document.querySelectorAll('.pp #back').forEach(b=>{b.disabled=S.N==='ROOT';b.addEventListener('click',()=>{const r=nodeAt(S.N,'Toàn S27','Toàn S27');if(r&&r.parent)goNode(r.parent);});});

// Node rows (same metric set at every level)
const nodeRow=(r,label,sub,onPick)=>{const tr=E('tr',onPick?'go':null);const c=td(tr,null,'nm');if(onPick)c.appendChild(E('span','chev','›'));c.appendChild(E('b',null,label));if(sub)c.appendChild(E('span','muted',sub));
 td(tr,null,'n').appendChild(mn(r,'total',vn(r.total)));
 const a=td(tr);const av=E('div','cv');av.append(mn(r,'tg',vn(r.tg)),' · ',mn(r,'tg_pct',pc(r.tg_pct)));a.append(av,bar(r.tg_pct));
 const b=td(tr);if(r.dat==null){if(r.n_wait)b.appendChild(E('span','pill t-na','Chờ số · '+vn(r.n_wait)+' outlet'));}else{const bv=E('div','cv');bv.append(mn(r,'dat',vn(r.dat)),' / ',mn(r,'n_measured',vn(r.n_measured)),' · ',mn(r,'dat_pct',pc(r.dat_pct)));b.append(bv,bar(r.dat_pct,'g'));}
 const g=td(tr,null,'n');if(r.gap==null)g.textContent='—';else g.append(mn(r,'gap',vn(r.gap)),' · ',mn(r,'gap_pct',pc(r.gap_pct)));
 const p=td(tr,null,'n');p.append(mn(r,'pot_none',vn(r.pot_none)),' · ',mn(r,'pot_pct',pc(r.pot_pct)));
 if(onPick)tr.onclick=onPick;return tr;};
const childRows=(parent,t)=>{const R=D('nodes');return R?R.filter(r=>r.parent===parent&&r.scope_type===S.ST&&r.scope===S.SV&&q(t,r.name)).sort((a,b)=>b.tg-a.tg):[];};
const schemeSub=r=>hasKid(r.node)?r.n_schemes+' scheme':null;
draw('tb_kids',tb=>{if(!ready(tb,6,'nodes'))return;tb.replaceChildren();const K=childRows(S.N,'kids');
 K.forEach(r=>tb.appendChild(nodeRow(r,r.name,schemeSub(r),()=>goNode(r.node))));
 if(!K.length)empty(tb,6,S.F.kids&&S.F.kids.q?'Không có dòng khớp bộ lọc.':'Đây là cấp scheme: xem tracking từng outlet và theo người phụ trách ở bảng dưới.');});
opts('f_ppl_ss','outlets','ss','ppl','ss','Mọi SS');
draw('tb_ppl',tb=>{if(!ready(tb,6,'nodes','outlets'))return;tb.replaceChildren();const R=D('nodes');const m=ssOf();const grp=F('ppl').grp||'SR/DSM';const so=F('ppl').sort||'pot_none';
 const ssOfRow=r=>grp==='SS'?r.scope:m[r.scope];
 const L=R.filter(r=>r.node===S.N&&r.scope_type===grp&&q('ppl',r.scope)&&eq('ppl','ss',ssOfRow(r))&&(S.ST==='Toàn S27'||(S.ST==='SS'?ssOfRow(r)===S.SV:(grp==='SS'?r.scope===m[S.SV]:r.scope===S.SV)))).sort((a,b)=>(b[so]||0)-(a[so]||0));
 L.forEach(r=>tb.appendChild(nodeRow(r,nm(r.scope),grp==='SR/DSM'?'SS '+nm(m[r.scope]||''):null,()=>setScope(grp,r.scope))));
 if(!L.length)empty(tb,6,'Không có dòng khớp bộ lọc.');});

// Tracking theo outlet × scheme
const TST=['Đã đạt','Đúng tiến độ','Chậm','Rất chậm','Không đạt','Chưa có số','Không có target'];const CHUA=['Đúng tiến độ','Chậm','Rất chậm','Không đạt'];
const TCLS={'Không có target':'t-nt','Đã đạt':'t-ok','Đúng tiến độ':'t-on','Chậm':'t-slow','Rất chậm':'t-vslow','Không đạt':'t-fail','Chưa có số':'t-na'};
const progSet=n=>{if(n==='ROOT'||n==='PROJ')return null;const T=tree();if(!T)return new Set();const out=new Set();const st=[n];
 while(st.length){const x=st.pop();if(/^[SW]:/.test(x))out.add(x.slice(x.lastIndexOf(':')+1));(T.K.get(x)||[]).forEach(c=>st.push(c));}return out;};
let _tb={k:'',v:null};
const trkBase=()=>{const T=D('tracking');if(!T||!D('nodes'))return null;const k=S.N+'|'+S.ST+'|'+S.SV;
 if(_tb.src!==T||_tb.k!==k){const ps=progSet(S.N);_tb={src:T,k,v:T.filter(r=>inScope(r)&&(ps?ps.has(r.prog):r.active!==false))};}return _tb.v;};
const trkRows=()=>{const B=trkBase();if(!B)return null;const st=F('trk').st||'';const so=F('trk').sort||'pct';
 const L=B.filter(r=>(!st||(st==='__chua'?CHUA.includes(r.status):r.status===st))&&q('trk',r.oid+' '+r.outlet+' '+r.sr+' '+r.prog_name));
 const nl=(a,b)=>(a==null)-(b==null);const na=(a,b)=>(a.status==='Chưa có số')-(b.status==='Chưa có số');
 const ep=r=>r.actual==null&&r.status==='Đã đạt'?1e9:r.pct;
 if(so==='gap')L.sort((a,b)=>na(a,b)||nl(a.gap,b.gap)||(b.gap||0)-(a.gap||0));
 else if(so==='name')L.sort((a,b)=>a.outlet.localeCompare(b.outlet)||a.prog_name.localeCompare(b.prog_name));
 else L.sort((a,b)=>na(a,b)||nl(ep(a),ep(b))||(ep(a)||0)-(ep(b)||0)||(b.gap||0)-(a.gap||0));return L;};
put('trk_pool',()=>{const B=trkBase();return B?vn(new Set(B.map(r=>r.oid)).size):null;});
put('trk_info',()=>'');
put('trk_of',()=>{const r=cur();return r?r.name+' · '+scopeName():null;});
const tsc=s=>()=>{const B=trkBase();return B?vn(s?B.filter(r=>r.status===s).length:B.length):null;};
put('ts_all',tsc(''));put('ts_chua',()=>{const B=trkBase();return B?vn(B.filter(r=>CHUA.includes(r.status)).length):null;});[['ts_ok',0],['ts_on',1],['ts_slow',2],['ts_vslow',3],['ts_fail',4],['ts_na',5],['ts_nt',6]].forEach(([n,i])=>put(n,tsc(TST[i])));
put('n_trk',()=>{const L=trkRows();return L?vn(L.length):null;});
put('n_trk_show',()=>{const L=trkRows();return L?vn(Math.min(L.length,S.trkN)):null;});
/* OLD TRK
draw('tb_trk',tb=>{if(!ready(tb,9,'tracking','nodes'))return;tb.replaceChildren();const L=trkRows()||[];const n=Math.min(L.length,S.trkN);
 for(let i=0;i<n;i++){const r=L[i];const tr=E('tr');tr.dataset.key=encK(r.oid)+','+encK(r.prog);td(tr,r.oid);td(tr,r.outlet);td(tr,nm(r.sr));td(tr,r.prog_name);
  const c=td(tr,vn(r.actual)+' / '+vn(r.target),'n');const nores=r.actual==null&&r.status==='Đã đạt';const nos=r.actual==null&&r.status==='Chưa có số';
  if(r.status==='Không có target')c.appendChild(E('span','sub2 muted','không có target'));else if(r.target!=null){if(nos)c.appendChild(E('span','sub2 muted','chưa có số'));else if(nores)c.appendChild(E('span','sub2 grn','đạt (theo file kết quả)'));else if(r.gap>0)c.appendChild(E('span','sub2 red','thiếu '+vn(r.gap)));
   else if(r.actual>r.target)c.appendChild(E('span','sub2 grn','vượt '+vn(r.actual-r.target)));else c.appendChild(E('span','sub2 grn','đạt'));}
  td(tr).appendChild(pill(r.pct==null||nores||nos?'—':pc(r.pct),r.pct==null||nores||nos?'s-na':r.pct>=100?'s-good':r.pct>=60?'s-mid':'s-low'));
  td(tr,pc(r.time_pct),'n');td(tr,nd(r.need_day),'n');td(tr).appendChild(r.status==='Không có target'?E('span','nostat','–'):pill(r.status||'—',TCLS[r.status]||'t-na'));tb.appendChild(tr);}
 if(!L.length)empty(tb,9,'Không có dòng khớp bộ lọc.');
 document.querySelectorAll('.pp #trk_more').forEach(b=>{const h=L.length<=n;if(b.hidden!==h)b.hidden=h;});});
*/
draw('tb_trk',tb=>{if(!ready(tb,6,'tracking','nodes'))return;tb.replaceChildren();const L=trkRows()||[];const n=Math.min(L.length,S.trkN);
 for(let i=0;i<n;i++){const r=L[i];const tr=E('tr');tr.dataset.key=encK(r.oid)+','+encK(r.prog);const o=td(tr);o.append(E('b',null,r.outlet),E('span','muted',r.oid+' · '+nm(r.sr)));td(tr,r.prog_name.split(' (')[0]);
  const c=td(tr,vn(r.actual)+' / '+vn(r.target),'n');const nores=r.actual==null&&r.status==='Đã đạt';const nos=r.actual==null&&r.status==='Chưa có số';
  if(r.status==='Không có target')c.textContent='—';else if(r.target!=null){if(nos)c.appendChild(E('span','sub2 muted','chưa có số'));else if(nores)c.appendChild(E('span','sub2 grn','đạt (theo file kết quả)'));else if(r.gap>0)c.appendChild(E('span','sub2 red','thiếu '+vn(r.gap)));
   else if(r.actual>r.target)c.appendChild(E('span','sub2 grn','vượt '+vn(r.actual-r.target)));else c.appendChild(E('span','sub2 grn','đạt'));}
  td(tr).appendChild(pill(r.pct==null||nores||nos?'—':pc(r.pct),r.pct==null||nores||nos?'s-na':r.pct>=100?'s-good':r.pct>=60?'s-mid':'s-low'));
  td(tr,nd(r.need_day),'n');td(tr).appendChild(r.status==='Không có target'?E('span','nostat','–'):pill(r.status||'—',TCLS[r.status]||'t-na'));tb.appendChild(tr);}
 if(!L.length)empty(tb,6,'Không có dòng khớp bộ lọc.');
 document.querySelectorAll('.pp #trk_more').forEach(b=>{const h=L.length<=n;if(b.hidden!==h)b.hidden=h;});});
document.querySelectorAll('.pp #trk_more').forEach(b=>b.addEventListener('click',()=>{S.trkN+=200;dash.draw('tb_trk');dash.draw('n_trk_show');}));
document.querySelectorAll('.pp #trkst [data-st]').forEach(b=>b.addEventListener('click',()=>{F('trk').st=b.dataset.st;S.trkN=200;
 document.querySelectorAll('.pp #trkst [data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));['tb_trk','n_trk','n_trk_show'].forEach(n=>dash.draw(n));}));

// Winning Rural
const wr=()=>nodeAt(S.tab==='lme'?'LME':'WR',S.ST,S.SV);put('wr_label',()=>S.tab==='lme'?'LME promotion':'Winning Rural');
put('wr_scope',()=>scopeName());put('wr_tg',()=>{const r=wr();return r?mn(r,'tg',vn(r.tg)):null;});put('wr_tgp',()=>{const r=wr();return r?mn(r,'tg_pct',pc(r.tg_pct)):null;});
put('wr_datp',()=>{const r=wr();return r?(r.dat==null?'':mn(r,'dat_pct',pc(r.dat_pct))):null;});put('wr_pot',()=>{const r=wr();return r?mn(r,'pot_none',vn(r.pot_none)):null;});
/* OLD ACC
S.open=S.open||{};
const A2NOTE='Chưa có scheme cấp outlet (Rural Distributors, Target Sub D)';
const accRow=(r,lvl,open,onT,onGo)=>{const tr=E('tr','acc l'+lvl+(open?' open':''));const c=td(tr,null,'nm');
 if(onT){const bt=E('button','tg-btn',open?'▾':'▸');bt.type='button';bt.setAttribute('aria-expanded',open?'true':'false');bt.setAttribute('aria-label',open?'Thu gọn':'Xổ scheme');c.appendChild(bt);}
 const nmB=E('b',null,r.name);c.appendChild(nmB);
 if(lvl===1)c.appendChild(E('span','muted',r.node==='C:A2'?A2NOTE:r.n_schemes+' scheme'));
 if(lvl===3){const p=(D('programs')||[]).find(x=>'S:'+x.id===r.node);if(p){const tg=E('span','muted');tg.textContent=(p.period||'')+(p.mk1?' · MK1 đang tracking':'')+(p.active?'':' · đã kết thúc');c.appendChild(tg);}}
 const base=nodeRow(r,'',null,null);[...base.children].slice(2).forEach(x=>tr.appendChild(x));
 tr.onclick=e=>{if(onT&&(e.target.closest('.tg-btn')||lvl<3))onT();else if(onGo)onGo();};return tr;};
draw('tb_wr4',tb=>{if(!ready(tb,5,'nodes'))return;tb.replaceChildren();const K=childRows('WR','wr4').sort((a,b)=>a.node.localeCompare(b.node));
 const tog=n=>()=>{S.open[n]=!S.open[n];dash.draw('tb_wr4');};
 K.forEach(r=>{const op=!!S.open[r.node];tb.appendChild(accRow(r,1,op,r.n_schemes?tog(r.node):null,null));
  if(!op)return;childRows(r.node,'').forEach(j=>{const h=E('tr','acc-h');const c=td(h,j.name);c.colSpan=5;tb.appendChild(h);
   childRows(j.node,'').forEach(s=>tb.appendChild(accRow(s,3,false,null,()=>goNode(s.node,'tracking'))));});});
 if(!K.length)empty(tb,5,'Không có dòng khớp bộ lọc.');});
*/
/* OLD ACC3
S.open=S.open||{};if(!S.N||S.N==='ROOT')S.N='WR';
const A2NOTE='Chưa có scheme cấp outlet (Rural Distributors, Target Sub D)';
const ACTPLAN={'Expand Bivina Distribution':['Distribution Bivina'],'In-Outlet display':['In Outlet Display'],'In-Home Availability':['In Home Availability'],'TPO & TIP':['TPO','TIP'],'Break SGL / grass beer default':['Sell-out (1 get 2 can)']};
const planTxt=a=>{const W=D('wr_plan');const ks=ACTPLAN[a];if(!W||!ks)return '';return ks.map(k=>{const r=W.find(x=>x.action===k);if(!r)return '';return 'MK1 '+k+': KH '+(r.plan_outlets!=null?vn(r.plan_outlets):'—')+' · re-submit '+vn(r.resub_outlets)+(r.gap_budget?' · GAP '+vn(r.gap_budget)+'đ':'');}).filter(Boolean).join(' | ');};
const selN=n=>{S.N=n;redraw();};
const accRow=(r,lvl,open,onT)=>{const _pth=pathOf(S.N).map(x=>x.node);const tr=E('tr','acc l'+lvl+(open?' open':'')+(S.N===r.node?' cur':_pth.includes(r.node)?' path':(S.N!=='WR'&&S.N!=='LME'?' dim':'')));const c=td(tr,null,'nm');
 if(onT){const bt=E('button','tg-btn',open?'▾':'▸');bt.type='button';bt.setAttribute('aria-expanded',open?'true':'false');bt.setAttribute('aria-label',open?'Thu gọn':'Xổ');bt.onclick=e=>{e.stopPropagation();onT();};c.appendChild(bt);}
 c.appendChild(E('b',null,r.name));
 if(lvl===1)c.appendChild(E('span','muted',r.node==='C:A2'?A2NOTE:r.n_schemes+' scheme'));
 if(lvl===2){const t=planTxt(r.name);if(t)c.appendChild(E('span','muted pln',t));}
 if(lvl===3){const p=(D('programs')||[]).find(x=>'S:'+x.id===r.node);if(p)c.appendChild(E('span','muted pinfo',(p.mk1?'MK1 · ':'')+'Pool '+vn(p.pool)+' · '+(p.period||'')+' · '+(p.req||'')));}
 const base=nodeRow(r,'',null,null);const ch=[...base.children];[ch[2],ch[3],ch[5]].forEach(x=>tr.appendChild(x));
 tr.onclick=()=>{if(lvl===1&&onT&&!open)S.open[r.node]=true;selN(r.node);};return tr;};
draw('tb_wr4',tb=>{if(!ready(tb,4,'nodes'))return;tb.replaceChildren();
 const top=S.tab==='lme'?childRows('LME',''):childRows('WR','').sort((a,b)=>a.node.localeCompare(b.node));
 const tog=n=>()=>{S.open[n]=!S.open[n];dash.draw('tb_wr4');};
 top.forEach(r=>{if(r.node==='C:BAU'){const h=E('tr','acc-sep');const c=td(h,'Ngoài Winning Rural');c.colSpan=4;tb.appendChild(h);}
  const op=!!S.open[r.node];tb.appendChild(accRow(r,1,op,r.n_schemes?tog(r.node):null));if(!op)return;
  childRows(r.node,'').forEach(j=>{if(j.node.startsWith('J:')){tb.appendChild(accRow(j,2,false,null));childRows(j.node,'').forEach(s=>tb.appendChild(accRow(s,3,false,null)));}
   else tb.appendChild(accRow(j,3,false,null));});
  if(r.node==='C:A3'){const W=D('wr_plan')||[];W.filter(x=>/Taskforce/i.test(x.action)).forEach(x=>{const h=E('tr','acc-h');const c=td(h,x.action+' · KH '+vn(x.plan_outlets)+' outlet · chưa có danh sách outlet');c.colSpan=4;tb.appendChild(h);});}});
 if(!top.length)empty(tb,4,'Không có dữ liệu.');});
*/
S.open=S.open||{};if(!S.N||S.N==='ROOT')S.N='WR';
const A2NOTE='Chưa có scheme cấp outlet (Rural Distributors, Target Sub D)';
const ACTPLAN={'Expand Bivina Distribution':['Distribution Bivina'],'In-Outlet display':['In Outlet Display'],'In-Home Availability':['In Home Availability'],'TPO & TIP':['TPO','TIP'],'Break SGL / grass beer default':['Sell-out (1 get 2 can)']};
const planChips=a=>{const W=D('wr_plan');const ks=ACTPLAN[a];if(!W||!ks)return [];return ks.map(k=>{const r=W.find(x=>x.action===k);if(!r)return null;return 'MK1 '+k+': KH '+(r.plan_outlets!=null?vn(r.plan_outlets):'—')+' → '+vn(r.resub_outlets);}).filter(Boolean);};
const selN=n=>{S.N=n;redraw();};
const catKey=n=>{const m=/^[CJ]:(A\d|X|LME)/.exec(n)||[];return m[1]||'';};
const accRow=(r,lvl,open,onT,ck)=>{const _pth=pathOf(S.N).map(x=>x.node);const st=S.N===r.node?' cur':_pth.includes(r.node)?' path':(S.N!=='WR'&&S.N!=='LME'?' dim':'');
 const tr=E('tr','acc l'+lvl+(open?' open':'')+st+(ck?' k-'+ck:''));
 if(lvl===2){const c=td(tr,null,'nm');c.colSpan=4;const h=E('div','acth');h.appendChild(E('b',null,r.name));planChips(r.name).forEach(t=>h.appendChild(E('span','mk1c',t)));c.appendChild(h);tr.onclick=()=>selN(r.node);return tr;}
 const c=td(tr,null,'nm');
 if(lvl===1){const w=E('div','l1w');if(onT){const bt=E('button','tg-btn',open?'▾':'▸');bt.type='button';bt.setAttribute('aria-expanded',open?'true':'false');bt.setAttribute('aria-label',open?'Thu gọn':'Xổ');bt.onclick=e=>{e.stopPropagation();onT();};w.appendChild(bt);}else w.appendChild(E('span','tg-sp'));
  const t=E('div');t.appendChild(E('b',null,r.name));t.appendChild(E('span','muted',r.node==='C:A2'?A2NOTE:r.n_schemes+' scheme'));w.appendChild(t);c.appendChild(w);}
 else{const p=(D('programs')||[]).find(x=>'S:'+x.id===r.node);c.appendChild(E('b',null,r.name));
  if(p){const m=E('div','sbadges');if(p.mk1)m.appendChild(E('span','sb mk','MK1'));m.appendChild(E('span','sb','Pool '+vn(p.pool)));if(p.period)m.appendChild(E('span','sb',p.period));c.appendChild(m);if(p.req)c.appendChild(E('div','sreq',p.req));}}
 const base=nodeRow(r,'',null,null);const ch=[...base.children];[ch[2],ch[3],ch[5]].forEach(x=>tr.appendChild(x));
 tr.onclick=()=>{if(lvl===1&&onT&&!open)S.open[r.node]=true;selN(r.node);};return tr;};
draw('tb_wr4',tb=>{if(!ready(tb,4,'nodes'))return;tb.replaceChildren();
 const top=S.tab==='lme'?childRows('LME',''):childRows('WR','').sort((a,b)=>a.node.localeCompare(b.node));
 const rkS=n=>{const p=(D('programs')||[]).find(x=>'S:'+x.id===n);return !p?3:p.has_target?0:p.fam==='H1'?1:2;};
 const rkN=n=>n.startsWith('S:')?rkS(n):Math.min(3,...childRows(n,'').map(x=>rkN(x.node)));
 const byRk=(a,b)=>(rkN(a.node)-rkN(b.node))||((b.tg||0)-(a.tg||0));
 const tog=n=>()=>{S.open=S.open[n]?{}:{[n]:true};selN(n);};
 {const pth=pathOf(S.N).map(x=>x.node);const cn=top.map(x=>x.node).find(n=>n!==S.N&&pth.includes(n));if(cn&&!S.open[cn])S.open={[cn]:true};}
 top.forEach(r=>{const ck=catKey(r.node)||'LME';const op=!!S.open[r.node];const r1=accRow(r,1,op,r.n_schemes?tog(r.node):null,ck);r1.onclick=()=>{S.open=r.n_schemes?{[r.node]:true}:{};selN(r.node);};tb.appendChild(r1);if(!op)return;
  if(S.N===r.node){const i0=tb.children.length;queueMicrotask(()=>{[...tb.children].slice(i0).forEach(x=>{if(!x.classList.contains('l1'))x.classList.remove('dim');});});}
  childRows(r.node,'').sort(byRk).forEach(j=>{if(j.node.startsWith('J:')){tb.appendChild(accRow(j,2,false,null,ck));childRows(j.node,'').sort(byRk).forEach(s=>tb.appendChild(accRow(s,3,false,null,ck)));}
   else tb.appendChild(accRow(j,3,false,null,ck));});
  {const NL=(D('programs')||[]).filter(p=>p.nolist&&'C:'+p.cat===r.node);if(NL.length){const h=E('tr','acc l2 k-'+ck);const c=td(h,null,'nm');c.colSpan=4;const d=E('div','acth');d.append(E('b',null,'Chưa có danh sách outlet'),E('span','mk1c',NL.length+' scheme'));c.appendChild(d);tb.appendChild(h);
   NL.forEach(p=>{const t=E('tr','acc l3 nol k-'+ck);const c2=td(t,null,'nm');c2.colSpan=4;c2.appendChild(E('b',null,p.short));const m=E('div','sbadges');if(p.period)m.appendChild(E('span','sb',p.period));if(p.pool)m.appendChild(E('span','sb','KH '+vn(p.pool)+' outlet'));if(p.status)m.appendChild(E('span','sb nl',p.status));c2.appendChild(m);if(p.req)c2.appendChild(E('div','sreq',p.req));t.style.cursor='pointer';t.onclick=()=>selN('S:'+p.id);if(S.N==='S:'+p.id)t.classList.add('cur');tb.appendChild(t);});}}
  if(r.node==='C:A3'){const W=D('wr_plan')||[];W.filter(x=>/Taskforce/i.test(x.action)).forEach(x=>{const h=E('tr','acc l2 k-A3');const c=td(h,null,'nm');c.colSpan=4;const d=E('div','acth');d.append(E('b',null,x.action),E('span','mk1c','MK1 KH '+vn(x.plan_outlets)+' outlet'),E('span','muted',' chưa có danh sách outlet'));c.appendChild(d);tb.appendChild(h);});}});
 if(S.tab==='lme'){const NL=(D('programs')||[]).filter(p=>p.nolist&&p.project==='LME');if(NL.length){const h=E('tr','acc l2 k-LME');const c=td(h,null,'nm');c.colSpan=4;const d=E('div','acth');d.append(E('b',null,'Chưa có danh sách outlet'),E('span','mk1c',NL.length+' scheme'));c.appendChild(d);tb.appendChild(h);
   NL.forEach(p=>{const t=E('tr','acc l3 nol k-LME');const c2=td(t,null,'nm');c2.colSpan=4;c2.appendChild(E('b',null,p.short));const m=E('div','sbadges');if(p.period)m.appendChild(E('span','sb',p.period));if(p.pool)m.appendChild(E('span','sb','KH '+vn(p.pool)+' outlet'));if(p.status)m.appendChild(E('span','sb nl',p.status));c2.appendChild(m);if(p.req)c2.appendChild(E('div','sreq',p.req));t.style.cursor='pointer';t.onclick=()=>selN('S:'+p.id);if(S.N==='S:'+p.id)t.classList.add('cur');tb.appendChild(t);});}}
 if(!top.length)empty(tb,4,'Không có dữ liệu.');});

opts('f_plan_p','wr_plan','pillar','plan','pillar','Mọi hạng mục 4A');
draw('tb_plan',tb=>{if(!ready(tb,9,'wr_plan'))return;tb.replaceChildren();const P=new Map((D('programs')||[]).map(x=>[x.id,x]));
 const L=D('wr_plan').filter(r=>q('plan',r.action+' '+r.owner+' '+(r.note||''))&&eq('plan','pillar',r.pillar));
 L.forEach(r=>{const tr=E('tr');tr.dataset.key=encK(r.action);td(tr,r.action);td(tr,r.pillar);td(tr,r.owner);td(tr,vn(r.plan_outlets),'n');td(tr,vn(r.plan_budget),'n');td(tr,vn(r.resub_outlets),'n');td(tr,vn(r.resub_budget),'n');td(tr,vn(r.gap_budget),'n');
  const c=td(tr);(r.sis?r.sis.split(','):[]).map(s=>s.trim()).forEach(id=>{const x=P.get(id);if(!x)return;const dv=E('div');const pl=E('span','pill '+pcls(x.pass_pct));pl.append(mk(vn(x.outlets),'programs','outlets',{id:x.id}),' outlet · đạt ',mk(vn(x.n_pass),'programs','n_pass',{id:x.id}));dv.append(pl,' '+x.name);c.appendChild(dv);});
  if(!c.childNodes.length)c.appendChild(E('span','pill s-na',r.note||'Chưa có file SIS'));else if(r.note)c.appendChild(E('div','muted',r.note));tb.appendChild(tr);});
 if(!L.length)empty(tb,9,'Không có dòng khớp bộ lọc.');});

// Outlet cần xử lý
const potAll=()=>(D('gap')||[]).filter(inScope);const ovAll=()=>(D('overlap')||[]).filter(inScope);
const potRows=()=>potAll().filter(r=>q('pot',r.oid+' '+r.outlet+' '+r.sr+' '+r.de_xuat)&&eq('pot','sr',r.sr)&&eq('pot','tier',r.tier)&&eq('pot','kenh',r.kenh));
const ovRows=()=>ovAll().filter(r=>q('ov',r.oid+' '+r.outlet+' '+r.sr)&&eq('ov','sr',r.sr)&&eq('ov','logic',r.logic)&&eq('ov','pair',r.pair));
const uo=L=>vn(new Set(L.map(r=>r.oid)).size);
put('ac_scope',()=>scopeName());put('ac_scope2',()=>scopeName());put('ac_pot',()=>D('gap')?vn(potAll().length):null);put('ac_ov',()=>D('overlap')?uo(ovAll()):null);
put('k_pot',()=>D('gap')?vn(potAll().length):null);put('k_ov',()=>D('overlap')?uo(ovAll()):null);
opts('f_pot_sr','gap','sr','pot','sr','Mọi SR/DSM',inScope);opts('f_pot_tier','gap','tier','pot','tier','Mọi tier');opts('f_pot_kenh','gap','kenh','pot','kenh','Mọi kênh');
put('n_pot',()=>D('gap')?vn(potRows().length):null);
const lines=(c,s)=>(s?String(s).split(' | '):[]).forEach(x=>c.appendChild(E('div',null,'• '+x)));
draw('tb_pot',tb=>{if(!ready(tb,9,'gap'))return;tb.replaceChildren();const L=potRows().sort((a,b)=>(b.vol3m||0)-(a.vol3m||0));
 L.forEach(r=>{const tr=E('tr');tr.dataset.key=encK(r.oid);td(tr,r.oid);td(tr,r.outlet);td(tr,nm(r.sr));td(tr,nm(r.ss));const t=td(tr);t.appendChild(pill(r.tier,'s-mid'));td(tr,r.kenh);td(tr,vn(r.vol3m),'n');td(tr,r.hien_co||'—');lines(td(tr),r.de_xuat);tb.appendChild(tr);});
 if(!L.length)empty(tb,9,'Không có outlet khớp bộ lọc.');});
opts('f_ov_sr','overlap','sr','ov','sr','Mọi SR/DSM',inScope);opts('f_ov_logic','overlap','logic','ov','logic','Mọi loại trùng');opts('f_ov_pair','overlap','pair','ov','pair','Mọi cặp chương trình',inScope);
put('n_ov',()=>D('overlap')?vn(ovRows().length):null);put('n_ovo',()=>D('overlap')?uo(ovRows()):null);
draw('tb_ov',tb=>{if(!ready(tb,9,'overlap'))return;tb.replaceChildren();const L=ovRows().sort((a,b)=>a.sr.localeCompare(b.sr)||a.outlet.localeCompare(b.outlet));
 L.forEach(r=>{const tr=E('tr');tr.dataset.key=encK(r.oid)+','+encK(r.pair);td(tr,r.oid);td(tr,r.outlet);td(tr,nm(r.sr));td(tr,nm(r.ss));td(tr).appendChild(pill(r.logic,r.logic==='Display × Sell-in'?'s-low':r.logic==='Sell-in'?'s-good':'s-mid'));td(tr,r.prog_a);td(tr,r.prog_b);td(tr,r.skus);td(tr,r.months);tb.appendChild(tr);});
 if(!L.length)empty(tb,9,'Không có outlet khớp bộ lọc.');});
document.querySelectorAll('.pp #subs [data-sub]').forEach(b=>b.addEventListener('click',()=>{S.sub=b.dataset.sub;
 document.querySelectorAll('.pp #subs [data-sub]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
 document.querySelectorAll('.pp [data-subpanel]').forEach(p=>{p.hidden=p.dataset.subpanel!==S.sub;});}));

// Danh mục scheme
put('cat_n',()=>{const P=D('programs');return P?vn(P.length):null;});put('cat_run',()=>{const P=D('programs');return P?vn(P.filter(p=>p.status==='Đang chạy').length):null;});
opts('f_prog_cat','programs','cat','prog','cat','Mọi loại');opts('f_prog_project','programs','project','prog','project','Mọi dự án');opts('f_prog_logic','programs','logic','prog','logic','Mọi logic');opts('f_prog_status','programs','status','prog','status','Mọi tình trạng');
const PO=['Winning Rural','Trade BAU (MK1/S27)','Festive / Tết 2027'],LO=['Sell-in','Sell-out'];
const ord=(A,v)=>{const i=A.indexOf(v);return i<0?99:i;};
draw('tb_prog',tb=>{if(!ready(tb,10,'programs'))return;tb.replaceChildren();const T=tree();
 const L=D('programs').filter(p=>q('prog',p.name+' '+p.skus+' '+p.mechanic)&&eq('prog','cat',p.cat)&&eq('prog','project',p.project)&&eq('prog','logic',p.logic)&&eq('prog','status',p.status))
  .sort((a,b)=>ord(PO,a.project)-ord(PO,b.project)||a.project.localeCompare(b.project)||ord(LO,a.logic)-ord(LO,b.logic)||a.logic.localeCompare(b.logic)||(b.outlets||0)-(a.outlets||0));
 const cnt=d3.rollup(L,v=>v.length,p=>p.project+' · '+p.logic);let g='';
 L.forEach(p=>{const k=p.project+' · '+p.logic;if(k!==g){g=k;const h=E('tr','grp');const c=td(h,k+' · '+cnt.get(k)+' scheme');c.colSpan=10;tb.appendChild(h);}
  const tr=E('tr');tr.dataset.key=encK(p.id);const c=td(tr);if(T&&T.P.has('S:'+p.id)){const b=E('button','lk',p.name);b.type='button';b.onclick=()=>goNode('S:'+p.id,'tracking');c.appendChild(b);}else c.textContent=p.name;
  td(tr).appendChild(pill(p.cat||'—','s-na'));td(tr,p.logic);td(tr,p.skus);td(tr,p.period);td(tr).appendChild(pill(p.status,p.status==='Đang chạy'?'s-good':'s-na'));td(tr,vn(p.outlets),'n');
  td(tr).appendChild(pill(p.pass_pct==null?'—':pc(p.pass_pct),pcls(p.pass_pct)));td(tr,vn(p.cash_vnd),'n');td(tr,p.mechanic);tb.appendChild(tr);});
 if(!L.length)empty(tb,10,'Không có scheme khớp bộ lọc.');});

// SR/DSM
const srList=()=>{const o=D('outlets');if(!o)return [];return [...new Set(o.filter(x=>S.ST!=='SS'||x.ss===S.SV).map(x=>x.sr))].filter(Boolean).sort();};
const pSR=()=>{const L=srList();if(S.ST==='SR/DSM'&&L.includes(S.SV))return S.SV;if(!S.pSR||!L.includes(S.pSR))S.pSR=L.includes('Le Phuoc Hau')?'Le Phuoc Hau':(L[0]||'');return S.pSR;};
draw('sel_sr',sel=>{const L=srList();const v=pSR();sel.replaceChildren(...L.map(s=>new Option(nm(s),s)));sel.value=v;
 sel.onchange=()=>{S.pSR=sel.value;if(S.ST==='SR/DSM')S.SV=sel.value;redraw();};});
put('sr_ss',()=>{const v=pSR();return v&&ssOf()[v]?nm(ssOf()[v]):null;});
kpi('sr',()=>{const v=pSR();return v?nodeAt('ROOT','SR/DSM',v):null;});
opts('f_sr_tier','outlets','tier','sr','tier','Mọi tier',x=>x.sr===pSR());
let _tk=null,_tkSrc=null;
const tkMap=()=>{const T=D('tracking');if(!T)return new Map();if(T!==_tkSrc){_tk=new Map(T.map(r=>[r.oid+'|'+r.prog,r.status]));_tkSrc=T;}return _tk;};
const srBase=()=>{const o=D('outlets'),d=D('detail'),g=D('gap');if(!o||!d||!g)return null;const sr=pSR();
 const by=d3.group(d.filter(x=>x.sr===sr),x=>x.oid);const gp=new Map(g.filter(x=>x.sr===sr).map(x=>[x.oid,x]));
 return o.filter(x=>x.sr===sr).map(x=>{const L=by.get(x.oid)||[];return {...x,L,g:gp.get(x.oid),none:!L.length,kd:L.some(r=>r.result==='Không đạt')};});};
const srRows=()=>{const B=srBase();if(!B)return null;const st=F('sr').st||'';
 return B.filter(x=>q('sr',x.oid+' '+x.outlet)&&eq('sr','tier',x.tier)&&(!st||(st==='none'&&x.none)||(st==='kd'&&x.kd)||(st==='pot'&&x.g))).sort((a,b)=>(a.none?0:1)-(b.none?0:1)||(b.vol3m||0)-(a.vol3m||0));};
const qc=f=>()=>{const B=srBase();return B?vn(B.filter(f).length):null;};
put('q_all',qc(()=>true));put('q_none',qc(x=>x.none));put('q_kd',qc(x=>x.kd));put('q_pot',qc(x=>!!x.g));
put('n_sr',()=>{const R=srRows();return R?vn(R.length):null;});
draw('tb_sr',tb=>{if(!ready(tb,6,'outlets','detail','gap','tracking'))return;tb.replaceChildren();const R=srRows()||[];const M=tkMap();
 R.forEach(o=>{const tr=E('tr');tr.dataset.key=encK(o.oid);td(tr,o.oid);td(tr,o.outlet);td(tr,o.tier);td(tr,vn(o.vol3m),'n');const c=td(tr);
  if(o.none)c.appendChild(pill('Chưa có chương trình','s-na'));
  o.L.forEach(r=>{const st=M.get(r.oid+'|'+r.prog);const p=pill(r.prog_name+(r.target!=null&&r.actual!=null?' · '+vn(r.actual)+'/'+vn(r.target):'')+(st&&st!=='Chưa có số'?' · '+st:''),TCLS[st]||(r.result==='Đạt'?'s-good':r.result==='Không đạt'?'s-low':'s-mid'));c.appendChild(p);});
  const e=td(tr);if(o.g)lines(e,o.g.de_xuat);else e.textContent='—';tb.appendChild(tr);});
 if(!R.length)empty(tb,6,'Không có outlet khớp bộ lọc.');});
document.querySelectorAll('.pp #qf [data-st]').forEach(b=>b.addEventListener('click',()=>{F('sr').st=b.dataset.st;
 document.querySelectorAll('.pp #qf [data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));dash.draw('tb_sr');dash.draw('n_sr');}));

// Plan SR/DSM: lịch visit ngày (suy từ All Visits T10) + scheme của từng outlet
const pad=n=>String(n).padStart(2,'0');
const isoOf=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const todayISO=()=>isoOf(new Date());
const WDN=['CN','T2','T3','T4','T5','T6','T7'];
const dayLabel=iso=>{const d=new Date(iso+'T00:00:00');return WDN[d.getDay()]+' '+pad(d.getDate())+'/'+pad(d.getMonth()+1)+(iso===todayISO()?' (hôm nay)':'');};
const dayList=()=>{const L=[];const d=new Date();const a=new Date(Math.min(new Date(d.getFullYear(),d.getMonth(),d.getDate()-6),new Date(2026,10,2))),z=new Date(Math.max(new Date(d.getFullYear(),d.getMonth(),d.getDate()+14),new Date(2026,11,19)));for(let x=new Date(a);x<=z;x.setDate(x.getDate()+1)){if(x.getDay()!==0)L.push(isoOf(x));}return L;};
const setDay=v=>{S.day=v;['sel_day','day_nav','v_title','vcards','vlist','vdet','v_all','v_kd','v_none','v_pot','tl_where'].forEach(n=>dash.draw(n));};
draw('day_nav',el=>{el.replaceChildren();const L=dayList();const t=todayISO();const tv=L.includes(t)?t:(L.find(v=>v>t)||L[L.length-1]);const i=L.indexOf(S.day||tv);
 const mk=(txt,v,cls,lab)=>{const b=E('button',cls,txt);b.type='button';b.setAttribute('aria-label',lab);if(v==null)b.disabled=true;else b.onclick=()=>setDay(v);return b;};
 el.append(mk('‹',i>0?L[i-1]:null,'dn-b','Lùi 1 ngày'),mk('Hôm nay',tv,'dn-t'+((S.day||tv)===tv?' on':''),'Về hôm nay'),mk('›',i>=0&&i<L.length-1?L[i+1]:null,'dn-b','Tới 1 ngày'));});
draw('sel_day',sel=>{const L=dayList();
 if(!S.day||!L.includes(S.day))S.day=L.includes(todayISO())?todayISO():L.find(v=>v>todayISO())||L[0];sel.replaceChildren(...L.map(v=>new Option(dayLabel(v),v)));sel.value=S.day;sel.onchange=()=>setDay(sel.value);});
let _om=null,_omS=null,_tm=null,_tmS=null,_gm=null,_gmS=null,_vm=null,_vmS=null;
const oMap=()=>{const o=D('outlets');if(!o)return null;if(o!==_omS){_om=new Map(o.map(x=>[x.oid,x]));_omS=o;}return _om;};
const tMap=()=>{const t=D('tracking');if(!t)return null;if(t!==_tmS){_tm=d3.group(t,x=>x.oid);_tmS=t;}return _tm;};
const gMap=()=>{const g=D('gap');if(!g)return null;if(g!==_gmS){_gm=new Map(g.map(x=>[x.oid,x]));_gmS=g;}return _gm;};
const vMap=()=>{const v=D('overlap');if(!v)return null;if(v!==_vmS){_vm=d3.group(v,x=>x.oid);_vmS=v;}return _vm;};
const dueBase=()=>{const V=D('visits'),O=oMap(),T=tMap(),G=gMap();if(!V||!O||!T||!G)return null;const sr=pSR();const iso=S.day||todayISO();
 return V.filter(r=>r.sr===sr&&r.d===iso).sort((a,b)=>a.t.localeCompare(b.t))
  .map(r=>{const L=T.get(r.oid)||[];return {v:r,o:O.get(r.oid),L,g:G.get(r.oid),none:!L.length,kd:L.some(x=>x.active!==false&&['Chậm','Rất chậm','Không đạt'].includes(x.status))};}).filter(x=>x.o);};
const VF={'':()=>true,kd:x=>x.kd,none:x=>x.none,pot:x=>!!x.g};
const vc=k=>()=>{const B=dueBase();return B?vn(B.filter(VF[k]).length):null;};
put('v_all',vc(''));put('v_kd',vc('kd'));put('v_none',vc('none'));put('v_pot',vc('pot'));
draw('v_title',el=>{const B=dueBase();el.textContent='Lịch visit '+dayLabel(S.day||todayISO())+' · '+(nm(pSR())||'—')+(B?': '+vn(B.length)+' outlet':'');});
const FQ={F4:'Hằng tuần',F2:'2 tuần/lần',F1:'1 lần/tháng'};
const CATC={A1:'c1',A2:'c2',A3:'c3',A4:'c4'};
draw('vcards',el=>{el.replaceChildren();const B=dueBase();if(!B){el.appendChild(E('p','muted','Đang tải…'));return;}
 const L=B.filter(VF[S.vf||'']);const sr=pSR();
 if(!(D('visits')||[]).some(r=>r.sr===sr)){el.appendChild(E('p','vempty','Chưa có lịch visit của '+nm(sr)+' trong file All Visits (02/11–19/12). Xem danh sách outlet của SR ở mục bên dưới.'));return;}
 if(!L.length){el.appendChild(E('p','vempty','Không có outlet nào trong lịch ngày này khớp bộ lọc.'));return;}
 const OV=vMap()||new Map();
 L.forEach((x,i)=>{const o=x.o;const a=E('article','vc'+(x.kd?' warn':x.none?' none':''));
  const h=E('header');h.append(E('span','vt',x.v.t),E('span','vi',String(i+1)));const nm=E('div','vh');nm.append(E('b',null,o.outlet),E('span','muted',o.oid+' · '+(o.segment||'—')+(x.v.ah?' · ghé đột xuất':'')));h.appendChild(nm);
  const tg=E('div','vtg');const tp=E('div');tp.append(pill(x.v.st,x.v.st==='Đã ghé'?'s-good':'s-na'),pill(o.tier||'—','s-mid'));tg.appendChild(tp);const vv=E('span','vvol');vv.append(mk(vn(o.vol3m),'outlets','vol3m',{oid:o.oid}),' thùng/th');tg.appendChild(vv);h.appendChild(tg);a.appendChild(h);
  const bd=E('div','vb');
  {const sl=x.L.filter(r=>r.active!==false&&['Chậm','Rất chậm'].includes(r.status)&&r.gap>0).sort((p,q)=>(q.gap||0)-(p.gap||0))[0];
   const br=x.L.find(r=>r.prog==='BREWERY');let t='';
   if(sl)t='Chốt thêm '+vn(sl.gap)+' thùng · '+sl.prog_name.split(' (')[0];
   else if(br)t='Nhắc lịch tham quan nhà máy 03/12';
   else if(x.g)t='Mời chương trình: '+String(x.g.de_xuat||'').split(' | ')[0];
   else if(x.none)t='Giới thiệu chương trình phù hợp';
   if(t){const v=E('div','vtodo',t);v.appendChild(E('small',null,'Việc hôm nay (gợi ý tự động, giả định)'));bd.appendChild(v);}}
  if(x.none)bd.appendChild(E('div','vnone','Chưa có chương trình nào'));
  else if(!x.L.some(r=>r.active!==false&&r.status!=='Không có target'))bd.appendChild(E('div','vnone','Không có chương trình cần chốt số'));
  const rk=r=>(r.active===false?3:r.status==='Không có target'?2:['Chậm','Rất chậm','Không đạt'].includes(r.status)?0:1);
  const LL=x.L.slice().sort((p,q)=>rk(p)-rk(q)||(p.cat||'').localeCompare(q.cat||''));const main=LL.filter(r=>rk(r)<2).slice(0,4);const rest=LL.filter(r=>!main.includes(r));
  const more=rest.length?E('details','vmore'):null;if(more){const sm=E('summary',null,'+'+rest.length+' chương trình khác (không có target / đã kết thúc)');more.appendChild(sm);}
  LL.forEach(r=>{const host=main.includes(r)?bd:more;const row=E('div','vr '+(CATC[r.cat]||''));row.appendChild(E('span','vcat',r.cat||'BAU'));
   const n=E('div','vn');n.append(E('b',null,r.prog_name),E('span','muted',r.activity||r.project||''));row.appendChild(n);
   const m=E('div','vm');const nores=r.actual==null&&r.status==='Đã đạt';
   if(r.target!=null){const t=E('span','vnum');t.append(mk(vn(r.actual),'tracking','actual',{oid:r.oid,prog:r.prog}),' / ',mk(vn(r.target),'tracking','target',{oid:r.oid,prog:r.prog}));m.appendChild(t);
    if(!nores&&r.actual!=null&&r.gap>0)m.appendChild(E('span','vgap','thiếu '+vn(r.gap)+(r.need_day!=null?' · cần '+nd(r.need_day)+'/ngày':'')));}
   m.appendChild(pill(r.active===false?'Đã kết thúc':r.status||'—',r.active===false?'t-na':TCLS[r.status]||'t-na'));row.appendChild(m);host.appendChild(row);});
  if(more)bd.appendChild(more);
  if(x.g){const s=E('div','vsug');s.appendChild(E('b',null,'Đề xuất scheme'));lines(s,x.g.de_xuat);bd.appendChild(s);}
  (OV.get(o.oid)||[]).forEach(r=>{bd.appendChild(E('div','vwarn','Trùng '+r.logic+': '+r.prog_a+' × '+r.prog_b+' ('+r.skus+')'));});
  a.appendChild(bd);el.appendChild(a);});});
document.querySelectorAll('.pp #vf [data-st]').forEach(b=>b.addEventListener('click',()=>{S.vf=b.dataset.st;
 document.querySelectorAll('.pp #vf [data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));dash.draw('vcards');dash.draw('vlist');dash.draw('vdet');}));

// ===== Tab 6: Chọn scheme → pool đề xuất =====
const FAMN={H1:'Mở điểm / độ phủ SKU',H2:'Sell-in theo target',H3:'Trưng bày / nhận diện',H4:'Sell-out cho người uống',H5:'Gắn kết / hợp đồng',H6:'Dịp tiêu dùng',H7:'Trải nghiệm / ảnh hưởng'};
const FDEF={H1:{vol:10,tier:'',rur:'Rural'},H2:{vol:30,tier:'Gold',rur:''},H3:{vol:40,tier:'Silver',rur:''},H4:{vol:10,tier:'',rur:'Rural'},H5:{vol:30,tier:'Gold',rur:''},H6:{vol:10,tier:'',rur:''},H7:{vol:0,tier:'Gold',rur:'Rural'}};
const FRULE={H1:'Distribution chỉ cần vào 1–2 thùng để có điểm bán: chọn outlet vừa và nhỏ (tối đa Silver, sản lượng dưới ngưỡng), off-trade, không phải SubD, chưa bán brand của scheme; loại outlet đang có scheme cùng logic cùng SKU. Outlet lớn hướng sang TIP/P4G.',
 H2:'Outlet Gold/Platinum, đạt ngưỡng sản lượng, không phải SubD; loại outlet đang có sell-in cùng SKU cùng thời gian và outlet đang chạy display (trừ Mega display).',
 H3:'Display chỉ làm ở outlet vừa và nhỏ (tối đa Silver, sản lượng dưới ngưỡng), off-trade; loại outlet đang chạy sell-in (Target Inc, TIP, TPO, P4G, Tie-up). Mega display là ngoại lệ: làm ở outlet lớn. Outlet lớn còn lại hướng sang TIP/P4G.',
 H4:'Outlet đã bán brand của scheme, ưu tiên rural và có giao tận nhà; loại outlet đang có sell-out cùng SKU.',
 H5:'Outlet Gold trở lên, sản lượng ổn định; loại outlet đã có tie-up hoặc P4G.',
 H6:'Outlet có kênh tiệc / giao tận nhà / quán; đạt ngưỡng sản lượng.',
 H7:'Outlet rural Gold trở lên đang ký một phần với HVN (tie-up, P4G hoặc Target Inc); loại outlet đang TPO/TIP26.'};
const TRK={Platinum:4,Gold:3,Silver:2,Bronze:1};
const OFF=/Grocery|Beverage Retail|Wholesaler|Minimart|Sub Distributor/i,SUBD=/Sub Distributor/i,HD=/Home/i,PARTY=/Caterer|Home|Quan|Restaurant|Event|Group|Karaoke|Social/i;
const brandOf=p=>{const s=(p.skus||'')+' '+p.name;return /BIX|BXB|BXP|BIP|Bivina/i.test(s)?'BIVINA':/LB355|LMC|LSC|Larue/i.test(s)?'LARUE':/HNK|TIGER|Heineken|Tiger/i.test(s)?'TIGER':'';};
const skuSet=p=>{const s=String(p.skus||'');return s==='—'||!s?null:new Set(s.split(', '));};
const inter=(a,b)=>!a||!b?false:(a.has('ALL')||b.has('ALL')||[...a].some(x=>b.has(x)));
S.plf=S.plf||{};S.pick=S.pick||{};
const PKEY=pid=>'pp_pool|'+pid+'|'+S.ST+'|'+S.SV;
const lsGet=k=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}};
const PM=()=>new Map((D('programs')||[]).map(p=>[p.id,p]));
/* OLD POOL UI (thay bằng bản chọn nhiều scheme bên dưới)
const plProg=()=>S.plp?PM().get(S.plp)||null:null;
const plF=()=>{const p=plProg();const d=p?FDEF[p.fam]||{vol:0,tier:'',rur:''}:{vol:0,tier:'',rur:''};return Object.assign({},d,S.plf[S.plp]||{});};
const plEval=()=>{const p=plProg();const O=D('outlets'),T=tMap();if(!p||!O||!T)return null;const M=PM();const f=plF();const br=brandOf(p);const sk=skuSet(p);
 const tin=TRK[f.tier]||0;const res={ok:[],ex:[],cur:[]};
 O.filter(inScope).forEach(o=>{const L=(T.get(o.oid)||[]).filter(r=>r.active!==false);const ids=new Set(L.map(r=>r.prog));
  if(ids.has(p.id)){res.cur.push(o);return;}
  const why=[];const v=+o.vol3m||0;const ch=o.channel||o.segment||'';const lead=String(o.lead||'').toUpperCase();
  if(typeof SMALL==='function'&&SMALL(p)){if(f.vol&&v>f.vol)why.push('Trên '+f.vol+' thùng/th → outlet lớn, hướng TIP/P4G');if(tin&&(TRK[o.tier]||0)>tin)why.push('Outlet lớn ('+(o.tier||'—')+') → hướng TIP/P4G');}
  else{if(v<f.vol)why.push('Dưới '+f.vol+' thùng/th');if((TRK[o.tier]||0)<tin)why.push('Tier '+(o.tier||'—'));}
  if(f.rur==='Rural'&&o.demo!=='Rural')why.push('Urban');
  const ov=L.map(r=>M.get(r.prog)).find(q=>q&&q.id!==p.id&&(p.logic==='Sell-in'||p.logic==='Sell-out')&&q.logic===p.logic&&inter(sk,skuSet(q)));
  if(ov)why.push('Trùng '+p.logic+' cùng SKU: '+ov.name.split(' (')[0]);
  const fam=p.fam;
  if((fam==='H1'||fam==='H3')&&!OFF.test(ch))why.push('Không phải off-trade');
  if((fam==='H1'||fam==='H2')&&SUBD.test(ch))why.push('SubD');
  if(fam==='H1'&&br&&lead.includes(br))why.push('Đã bán '+br);
  {const ks=k=>L.map(r=>M.get(r.prog)).filter(q=>q&&q.kind===k&&q.id!=='MEGA');if(p.kind==='Display'&&p.id!=='MEGA'){const q=ks('Sell-in')[0];if(q)why.push('Đang chạy sell-in: '+(q.short||q.name));}if(p.kind==='Sell-in'){const q=ks('Display')[0];if(q)why.push('Đang chạy display: '+(q.short||q.name));}}
  const sellsBr=br&&(lead.includes(br)||L.some(r=>brandOf(M.get(r.prog)||{})===br));
  if(fam==='H4'&&br&&!sellsBr)why.push('Chưa bán '+br);
  if(fam==='H5'&&(ids.has('TIEUP')||ids.has('P4G')))why.push('Đã có hợp đồng');
  if(fam==='H6'&&!PARTY.test(ch))why.push('Không có kênh tiệc/giao nhà');
  const partial=['TIEUP','P4G','TI1_Q4','TI2_Q4','TI_P4G_LB355'].some(x=>ids.has(x));
  if(fam==='H7'&&!partial)why.push('Chưa ký một phần với HVN');
  if(fam==='H7'&&ids.has('TIP26'))why.push('Đang TPO/TIP26');
  if(why.length){res.ex.push({o,why});return;}
  const tags=[];let sc=Math.min(v,200)/200*50+({4:20,3:15,2:8,1:2}[TRK[o.tier]]||0);
  tags.push(o.tier||'—');tags.push(nd(v)+' thùng/th');
  if(o.demo==='Rural'){sc+=10;tags.push('Rural');}
  if(HD.test(ch)){sc+=10;tags.push('Giao tận nhà');}
  if(br&&sellsBr&&(fam==='H3'||fam==='H4')){sc+=10;tags.push('Đang bán '+br);}
  if(fam==='H7'&&partial){sc+=10;tags.push('Đang ký một phần');}
  if(fam==='H2'&&!ids.has('TIEUP')){sc+=10;tags.push('Chưa tie-up');}
  if((p.logic==='Sell-in'||p.logic==='Sell-out'))tags.push('Chưa có '+p.logic+' cùng SKU');
  res.ok.push({o,sc:Math.round(sc),tags});});
 res.ok.sort((a,b)=>b.sc-a.sc||(+b.o.vol3m||0)-(+a.o.vol3m||0));return res;};
const pick=()=>{const id=S.plp;if(!id)return new Set();if(!S.pick[id]){const sv=lsGet(PKEY(id));S.pick[id]=new Set(sv?sv.oids:[]);}return S.pick[id];};
const PLN=['pl_schemes','pl_title','pl_rule','pl_sum','pl_tb','pl_ex','pl_exn','pl_lockv','pl_scope'];
const plDraw=()=>PLN.forEach(n=>dash.draw(n));
put('pl_scope',()=>scopeName());
draw('pl_schemes',el=>{el.replaceChildren();const P=D('programs');if(!P){el.textContent='Đang tải…';return;}
 const L=P.filter(p=>p.active&&p.fam);['H1','H2','H3','H4','H5','H6','H7'].forEach(f=>{const g=L.filter(p=>p.fam===f);if(!g.length)return;
  const box=E('div','plfam');box.appendChild(E('div','plfh',FAMN[f]));const row=E('div','plrow');
  g.forEach(p=>{const b=E('button','plc'+(S.plp===p.id?' on':''));b.type='button';const t=E('div','plct');if(p.cat)t.appendChild(E('span','vcat c-'+p.cat,p.cat));t.appendChild(E('b',null,p.name));b.appendChild(t);
   const m=E('span','muted');m.append((p.period||'')+' · đang chạy ',mk(vn(p.outlets),'programs','outlets',{id:p.id}),' outlet');b.appendChild(m);
   const sv=lsGet(PKEY(p.id));if(sv)b.appendChild(E('span','pill t-ok','Đã chốt '+vn(sv.oids.length)));
   b.onclick=()=>{S.plp=p.id;plDraw();document.querySelectorAll('.pp #pl_vol,.pp #pl_tier,.pp #pl_rur').forEach(syncPlCtl);const t2=document.getElementById('pl_sug');if(t2)t2.scrollIntoView({behavior:'smooth',block:'start'});};
   row.appendChild(b);});box.appendChild(row);el.appendChild(box);});});
draw('pl_title',el=>{const p=plProg();el.textContent=p?'Bước 2 · Pool đề xuất: '+p.name:'Bước 2 · Pool đề xuất (chọn 1 scheme ở bước 1)';});
draw('pl_rule',el=>{const p=plProg();el.textContent=p?'Luật chọn (giả định của team, anh chỉnh ngưỡng bên dưới): '+FRULE[p.fam]:'';});
draw('pl_sum',el=>{el.replaceChildren();const R=plEval();if(!R){el.textContent='—';return;}const k=pick();const sel=R.ok.filter(x=>k.has(x.o.oid));
 const by=d3.rollup(sel,v=>v.length,x=>x.o.sr);const vol=d3.sum(sel,x=>+x.o.vol3m||0);
 el.append('Đề xuất ',E('b',null,vn(R.ok.length)),' outlet · đang tham gia ',E('b',null,vn(R.cur.length)),' · bị loại ',E('b',null,vn(R.ex.length)),' · đã chọn ',E('b',null,vn(sel.length)),' outlet ('+vn(vol)+' thùng/th)');
 if(sel.length){const d=E('div','plsr');[...by].sort((a,b)=>b[1]-a[1]).forEach(([s,n])=>{const sp=E('span','pill '+(n/sel.length>0.4&&sel.length>=5?'t-vslow':'s-na'),nm(s)+' '+n);d.appendChild(sp);});el.appendChild(d);
  if([...by.values()].some(n=>n/sel.length>0.4)&&sel.length>=5)el.appendChild(E('div','note-red','Cảnh báo: 1 SR đang chiếm hơn 40% pool (ngưỡng giả định).'));}});
draw('pl_tb',tb=>{tb.replaceChildren();const R=plEval();if(!R){empty(tb,7,S.plp?'Đang tải…':'Chọn 1 scheme ở bước 1.');return;}const k=pick();
 R.ok.slice(0,400).forEach(x=>{const o=x.o;const tr=E('tr',k.has(o.oid)?'sel':null);tr.dataset.key=encK(o.oid);
  const c=td(tr);const cb=E('input');cb.type='checkbox';cb.checked=k.has(o.oid);cb.setAttribute('aria-label','Chọn '+o.outlet);cb.onclick=e=>{e.stopPropagation();if(cb.checked)k.add(o.oid);else k.delete(o.oid);dash.draw('pl_sum');dash.draw('pl_lockv');tr.classList.toggle('sel',cb.checked);};c.appendChild(cb);
  const n=td(tr);n.append(E('b',null,o.outlet),E('span','muted',' '+o.oid));td(tr,nm(o.sr));td(tr).appendChild(pill(o.tier||'—','s-mid'));td(tr,null,'n').appendChild(mk(vn(o.vol3m),'outlets','vol3m',{oid:o.oid}));
  const s=td(tr,null,'n');s.appendChild(E('b','red',String(x.sc)));const w=td(tr);x.tags.forEach(t=>w.appendChild(pill(t,'s-good')));
  tr.onclick=()=>cb.click();tb.appendChild(tr);});
 if(!R.ok.length)empty(tb,7,'Không có outlet nào đạt luật. Thử hạ ngưỡng sản lượng hoặc tier.');
 if(R.ok.length>400)empty(tb,7,'Đang hiện 400 outlet điểm cao nhất / '+vn(R.ok.length)+'.');});
draw('pl_exn',el=>{const R=plEval();el.textContent='Xem outlet bị loại và lý do ('+(R?vn(R.ex.length):'—')+')';});
draw('pl_ex',tb=>{tb.replaceChildren();const R=plEval();if(!R)return;const k=pick();
 R.ex.sort((a,b)=>(+b.o.vol3m||0)-(+a.o.vol3m||0)).slice(0,300).forEach(x=>{const o=x.o;const tr=E('tr');const c=td(tr);const cb=E('input');cb.type='checkbox';cb.checked=k.has(o.oid);cb.setAttribute('aria-label','Kéo lại '+o.outlet);
  cb.onclick=()=>{if(cb.checked)k.add(o.oid);else k.delete(o.oid);dash.draw('pl_sum');dash.draw('pl_lockv');};c.appendChild(cb);
  td(tr,o.outlet);td(tr,nm(o.sr));td(tr,o.tier||'—');td(tr,vn(o.vol3m),'n');const w=td(tr);x.why.forEach(t=>w.appendChild(pill(t,'s-low')));tb.appendChild(tr);});});
draw('pl_lockv',el=>{el.replaceChildren();if(S.plmsg){el.appendChild(E('p','grn',S.plmsg));S.plmsg='';}const p=plProg();if(!p){el.textContent='Chọn scheme và outlet ở bước 1–2.';return;}const sv=lsGet(PKEY(p.id));const k=pick();
 if(sv){const d=new Date(sv.at);el.appendChild(E('p',null,'Đã chốt '+vn(sv.oids.length)+' outlet lúc '+d.toLocaleString('vi-VN')+' cho phạm vi '+scopeName()+'.'));}
 {const R=plEval();el.appendChild(E('p','muted','Đang chọn '+vn(k.size)+' outlet mới'+(R&&R.cur.length?' + '+vn(R.cur.length)+' outlet đang tham gia (tự gộp vào pool)':'')+'. Bấm "Chốt pool" để lưu; pool đã chốt hiện ở tab Tracking khi mở scheme này. Pool lưu trên máy này (trình duyệt đang dùng).'));}});
const syncPlCtl=s=>{const f=plF();const v=s.id==='pl_vol'?String(f.vol):s.id==='pl_tier'?f.tier:f.rur;if(s.value!==v)s.value=v;};
document.querySelectorAll('.pp #pl_vol,.pp #pl_tier,.pp #pl_rur').forEach(s=>{syncPlCtl(s);s.addEventListener('change',()=>{if(!S.plp)return;const f=plF();if(s.id==='pl_vol')f.vol=+s.value;if(s.id==='pl_tier')f.tier=s.value;if(s.id==='pl_rur')f.rur=s.value;S.plf[S.plp]=f;plDraw();});});
document.querySelectorAll('.pp #pl_top').forEach(b=>b.addEventListener('click',()=>{const R=plEval();if(!R)return;const inp=document.getElementById('pl_n');const n=Math.max(0,parseInt(inp&&inp.value,10)||R.ok.length);const k=pick();k.clear();R.ok.slice(0,n).forEach(x=>k.add(x.o.oid));plDraw();}));
document.querySelectorAll('.pp #pl_clear').forEach(b=>b.addEventListener('click',()=>{if(!S.plp)return;pick().clear();plDraw();}));
document.querySelectorAll('.pp #pl_save').forEach(b=>b.addEventListener('click',()=>{const p=plProg();if(!p)return;const R=plEval();const ok=lsSet(PKEY(p.id),{oids:[...new Set([...pick(),...(R?R.cur.map(o=>o.oid):[])])],at:Date.now(),scope:scopeName()});S.plmsg=ok?'Đã chốt pool ✓':'Không lưu được pool trên trình duyệt này';plDraw();dash.draw('trk_locked');}));
document.querySelectorAll('.pp #pl_copy').forEach(b=>b.addEventListener('click',()=>{const O=oMap();if(!O)return;const t=[...pick()].map(id=>{const o=O.get(id)||{};return [id,o.outlet,nm(o.sr)].join('\t');}).join('\n');
 const msg=x=>{S.plmsg=x;dash.draw('pl_lockv');};try{navigator.clipboard.writeText(t).then(()=>msg('Đã sao chép '+vn(pick().size)+' mã outlet ✓'),()=>msg('Không sao chép được'));}catch(e){msg('Không sao chép được');}}));
draw('trk_locked',el=>{el.replaceChildren();const m=/^S:(.+)$/.exec(S.N||'');if(!m){el.hidden=true;return;}const sv=lsGet(PKEY(m[1]));if(!sv){el.hidden=true;return;}el.hidden=false;
 const T=tMap()||new Map();const inT=sv.oids.filter(id=>(T.get(id)||[]).some(r=>r.prog===m[1])).length;
 el.append('Pool đã chốt ',E('b',null,vn(sv.oids.length)),' outlet ('+new Date(sv.at).toLocaleDateString('vi-VN')+') · đã tham gia ',E('b',null,vn(inT)),' · chưa add ',E('b','red',vn(sv.oids.length-inT)));});

*/
const SMALL=p=>!!p&&(p.fam==='H1'||(p.kind==='Display'&&p.id!=='MEGA'));
const plF=id=>{const p=PM().get(id);const d=p?(SMALL(p)?(p.fam==='H1'?{vol:20,tier:'Silver',rur:'Rural'}:{vol:0,tier:'Silver',rur:''}):FDEF[p.fam]||{vol:0,tier:'',rur:''}):{vol:0,tier:'',rur:''};return Object.assign({},d,S.plf[id]||{});};
let _PE={},_PEO=null;const plEval=id=>{const p=PM().get(id);const O=D('outlets'),T=tMap();if(!p||!O||!T)return null;const ck=id+'|'+S.ST+'|'+S.SV+'|'+JSON.stringify(plF(id));if(_PEO!==O){_PE={};_PEO=O;}if(_PE[ck])return _PE[ck];const M=PM();const f=plF(id);const br=brandOf(p);const sk=skuSet(p);
 const tin=TRK[f.tier]||0;const res={ok:[],ex:[],cur:[]};
 O.filter(inScope).forEach(o=>{const L=(T.get(o.oid)||[]).filter(r=>r.active!==false);const ids=new Set(L.map(r=>r.prog));
  if(ids.has(p.id)){res.cur.push(o);return;}
  const why=[];const v=+o.vol3m||0;const ch=o.channel||o.segment||'';const lead=String(o.lead||'').toUpperCase();
  if(typeof SMALL==='function'&&SMALL(p)){if(f.vol&&v>f.vol)why.push('Trên '+f.vol+' thùng/th → outlet lớn, hướng TIP/P4G');if(tin&&(TRK[o.tier]||0)>tin)why.push('Outlet lớn ('+(o.tier||'—')+') → hướng TIP/P4G');}
  else{if(v<f.vol)why.push('Dưới '+f.vol+' thùng/th');if((TRK[o.tier]||0)<tin)why.push('Tier '+(o.tier||'—'));}
  if(f.rur==='Rural'&&o.demo!=='Rural')why.push('Urban');
  const ov=L.map(r=>M.get(r.prog)).find(q=>q&&q.id!==p.id&&(p.logic==='Sell-in'||p.logic==='Sell-out')&&q.logic===p.logic&&inter(sk,skuSet(q)));
  if(ov)why.push('Trùng '+p.logic+' cùng SKU: '+ov.name.split(' (')[0]);
  const fam=p.fam;
  if((fam==='H1'||fam==='H3')&&!OFF.test(ch))why.push('Không phải off-trade');
  if((fam==='H1'||fam==='H2')&&SUBD.test(ch))why.push('SubD');
  if(fam==='H1'&&br&&lead.includes(br))why.push('Đã bán '+br);
  {const ks=k=>L.map(r=>M.get(r.prog)).filter(q=>q&&q.kind===k&&q.id!=='MEGA');if(p.kind==='Display'&&p.id!=='MEGA'){const q=ks('Sell-in')[0];if(q)why.push('Đang chạy sell-in: '+(q.short||q.name));}if(p.kind==='Sell-in'){const q=ks('Display')[0];if(q)why.push('Đang chạy display: '+(q.short||q.name));}}
  const sellsBr=br&&(lead.includes(br)||L.some(r=>brandOf(M.get(r.prog)||{})===br));
  if(fam==='H4'&&br&&!sellsBr)why.push('Chưa bán '+br);
  if(fam==='H5'&&(ids.has('TIEUP')||ids.has('P4G')))why.push('Đã có hợp đồng');
  if(fam==='H6'&&!PARTY.test(ch))why.push('Không có kênh tiệc/giao nhà');
  const partial=['TIEUP','P4G','TI1_Q4','TI2_Q4','TI_P4G_LB355'].some(x=>ids.has(x));
  if(fam==='H7'&&!partial)why.push('Chưa ký một phần với HVN');
  if(fam==='H7'&&ids.has('TIP26'))why.push('Đang TPO/TIP26');
  if(why.length){res.ex.push({o,why});return;}
  const tags=[];let sc=Math.min(v,200)/200*50+({4:20,3:15,2:8,1:2}[TRK[o.tier]]||0);
  tags.push(o.tier||'—');tags.push(nd(v)+' thùng/th');
  if(o.demo==='Rural'){sc+=10;tags.push('Rural');}
  if(HD.test(ch)){sc+=10;tags.push('Giao tận nhà');}
  if(br&&sellsBr&&(fam==='H3'||fam==='H4')){sc+=10;tags.push('Đang bán '+br);}
  if(fam==='H7'&&partial){sc+=10;tags.push('Đang ký một phần');}
  if(fam==='H2'&&!ids.has('TIEUP')){sc+=10;tags.push('Chưa tie-up');}
  if((p.logic==='Sell-in'||p.logic==='Sell-out'))tags.push('Chưa có '+p.logic+' cùng SKU');
  res.ok.push({o,sc:Math.round(sc),tags});});
 res.ok.sort((a,b)=>b.sc-a.sc||(+b.o.vol3m||0)-(+a.o.vol3m||0));res.ok.forEach((x,i)=>{x.rank=i+1;});res.okM=new Map(res.ok.map(x=>[x.o.oid,x]));res.exM=new Map(res.ex.map(x=>[x.o.oid,x]));res.curS=new Set(res.cur.map(o=>o.oid));_PE[ck]=res;return res;};
S.pls=S.pls||[];S.plq=S.plq||{};
const pick=id=>{if(!S.pick[id]){const sv=lsGet(PKEY(id));S.pick[id]=new Set(sv?sv.oids:[]);}return S.pick[id];};
const PLN=['pl_tbl','pl_schemes','pl_cfg','pl_mx','pl_lockv','pl_scope'];
const plDraw=()=>PLN.forEach(n=>dash.draw(n));
const confl=(oid,id)=>{const M=PM();const p=M.get(id);if(!p)return null;const sk=skuSet(p);const DS=x=>x&&x.kind==='Display'&&x.id!=='MEGA';
 return S.pls.find(j=>j!==id&&pick(j).has(oid)&&(()=>{const q=M.get(j);if(!q)return false;if((DS(p)&&q.kind==='Sell-in')||(DS(q)&&p.kind==='Sell-in'))return true;return (p.logic==='Sell-in'||p.logic==='Sell-out')&&q.logic===p.logic&&inter(sk,skuSet(q));})())||null;};
put('pl_scope',()=>'· phạm vi '+scopeName());
draw('pl_schemes',el=>{el.replaceChildren();const P=D('programs');if(!P){el.textContent='Đang tải…';return;}
 const L=P.filter(p=>p.active&&p.fam);['H1','H2','H3','H4','H5','H6','H7'].forEach(f=>{const g=L.filter(p=>p.fam===f);if(!g.length)return;
  const box=E('div','plfam');box.appendChild(E('span','plfh',FAMN[f]));
  g.forEach(p=>{const on=S.pls.includes(p.id);const b=E('button','plc'+(on?' on':''));b.type='button';b.setAttribute('aria-pressed',on?'true':'false');
   if(p.cat)b.appendChild(E('span','vcat c-'+p.cat,p.cat));b.appendChild(E('b',null,p.short||p.name));
   const sv=lsGet(PKEY(p.id));if(sv)b.appendChild(E('span','pill t-ok','chốt '+vn(sv.oids.length)));
   b.onclick=()=>{if(on)S.pls=S.pls.filter(x=>x!==p.id);else if(S.pls.length<5)S.pls=[...S.pls,p.id];else{S.plmsg='Tối đa 5 scheme cùng lúc.';}plDraw();};
   box.appendChild(b);});el.appendChild(box);});});
draw('pl_cfg',el=>{el.replaceChildren();if(!S.pls.length){el.appendChild(E('p','vempty','Chọn ít nhất 1 scheme ở bước 1.'));return;}const M=PM();
 S.pls.forEach(id=>{const p=M.get(id);const R=plEval(id);if(!p||!R)return;const f=plF(id);const k=pick(id);const c=E('div','plcard');
  const hd=E('div','plch');hd.append(E('b',null,p.short||p.name),E('span','muted',' '+FAMN[p.fam]));const x=E('button','plx','✕');x.type='button';x.setAttribute('aria-label','Bỏ scheme');x.onclick=()=>{S.pls=S.pls.filter(y=>y!==id);plDraw();};hd.appendChild(x);c.appendChild(hd);
  c.appendChild(E('p','note-red','Luật (giả định): '+FRULE[p.fam]));
  const row=E('div','plctl');const mkSel=(opts,val,on)=>{const s=E('select','dash-select');opts.forEach(([v,t])=>s.appendChild(new Option(t,v)));s.value=val;s.onchange=()=>on(s.value);return s;};
  const upd=(kk,v)=>{S.plf[id]=Object.assign(plF(id),{[kk]:v});plDraw();};
  const sm=SMALL(p);row.append(sm?mkSel([['0','Mọi sản lượng'],['5','≤5 thùng'],['10','≤10 thùng'],['20','≤20 thùng'],['30','≤30 thùng'],['50','≤50 thùng']],String(f.vol),v=>upd('vol',+v)):mkSel([['0','Mọi sản lượng'],['10','≥10 thùng'],['20','≥20 thùng'],['30','≥30 thùng'],['40','≥40 thùng'],['60','≥60 thùng'],['100','≥100 thùng']],String(f.vol),v=>upd('vol',+v)),
   sm?mkSel([['','Mọi tier'],['Silver','Tối đa Silver'],['Bronze','Chỉ Bronze']],f.tier,v=>upd('tier',v)):mkSel([['','Mọi tier'],['Silver','Silver+'],['Gold','Gold+'],['Platinum','Platinum']],f.tier,v=>upd('tier',v)),
   mkSel([['','Rural + Urban'],['Rural','Chỉ Rural']],f.rur,v=>upd('rur',v)));
  const q=E('input');q.type='number';q.min='1';q.placeholder='Quota';q.setAttribute('aria-label','Quota');q.value=S.plq[id]||'';q.onchange=()=>{S.plq[id]=q.value;};
  const tp=E('button','more','Chọn top N');tp.type='button';tp.onclick=()=>{const n=parseInt(q.value,10)||R.ok.length;S.plq[id]=q.value;k.clear();R.ok.slice(0,n).forEach(y=>k.add(y.o.oid));plDraw();};
  const cl=E('button','back','Bỏ chọn');cl.type='button';cl.onclick=()=>{k.clear();plDraw();};row.append(q,tp,cl);c.appendChild(row);
  const sel=[...k].filter(o=>R.okM.has(o)||R.exM.has(o));const by=d3.rollup(sel,v=>v.length,o=>(R.okM.get(o)||R.exM.get(o)).o.sr);
  const st=E('p','muted');st.append('Đề xuất ',E('b',null,vn(R.ok.length)),' · đang chạy ',E('b',null,vn(R.cur.length)),' · bị loại '+vn(R.ex.length)+' · đã chọn ',E('b',null,vn(sel.length)));c.appendChild(st);
  if(sel.length>=5&&[...by.values()].some(n=>n/sel.length>0.4))c.appendChild(E('p','note-red','1 SR chiếm hơn 40% pool (ngưỡng giả định): '+[...by].sort((a,b)=>b[1]-a[1]).map(([s,n])=>nm(s)+' '+n).join(', ')));
  el.appendChild(c);});});
draw('pl_mx',el=>{el.replaceChildren();if(!S.pls.length)return;const M=PM();const RS=S.pls.map(id=>[id,plEval(id)]).filter(x=>x[1]);
 const qv=((document.getElementById('pl_q')||{}).value||'').trim().toLowerCase();const only=!!(document.getElementById('pl_only')||{}).checked;
 const ids=new Map();RS.forEach(([id,R])=>{R.ok.forEach(x=>{const c=ids.get(x.o.oid);if(!c||x.sc>c.sc)ids.set(x.o.oid,{o:x.o,sc:x.sc});});pick(id).forEach(oid=>{if(!ids.has(oid)){const y=R.exM.get(oid);if(y)ids.set(oid,{o:y.o,sc:-1});}});});
 let L=[...ids.values()].filter(x=>(!qv||(x.o.outlet+' '+x.o.oid+' '+nm(x.o.sr)).toLowerCase().includes(qv))&&(!only||S.pls.some(id=>pick(id).has(x.o.oid))));
 L.sort((a,b)=>b.sc-a.sc);const tot=L.length;L=L.slice(0,300);
 const t=E('table');const th=E('thead');const hr=E('tr');['Outlet · SR','Tier','Vol TB 3T'].forEach((x,i)=>{const h=E('th',i===2?'n':null,x);hr.appendChild(h);});
 RS.forEach(([id])=>hr.appendChild(E('th','plcol',(M.get(id).short||M.get(id).name))));th.appendChild(hr);t.appendChild(th);
 const tb=E('tbody');L.forEach(x=>{const o=x.o;const tr=E('tr');const a=td(tr);a.append(E('b',null,o.outlet),E('span','muted',o.oid+' · '+nm(o.sr)));td(tr).appendChild(pill(o.tier||'—','s-mid'));td(tr,null,'n').appendChild(mk(vn(o.vol3m),'outlets','vol3m',{oid:o.oid}));
  RS.forEach(([id,R])=>{const c=td(tr,null,'plcell');const k=pick(id);
   if(R.curS.has(o.oid)){c.appendChild(pill('Đang chạy','t-ok'));return;}
   const ok=R.okM.get(o.oid);const ex=R.exM.get(o.oid);
   if(!ok&&!k.has(o.oid)){c.appendChild(E('span','plno',ex?ex.why[0]:'Ngoài phạm vi'));return;}
   const lb=E('label','plchk');const cb=E('input');cb.type='checkbox';cb.checked=k.has(o.oid);cb.setAttribute('aria-label','Chọn '+o.outlet+' cho '+M.get(id).name);
   cb.onchange=()=>{if(cb.checked)k.add(o.oid);else k.delete(o.oid);plDraw();};lb.appendChild(cb);
   if(ok){lb.appendChild(E('b','red',String(ok.sc)));const w=E('span','pltags',ok.tags.slice(2,5).join(' · '));lb.appendChild(w);}else lb.appendChild(E('span','plno','kéo lại: '+ex.why[0]));
   c.appendChild(lb);const cf=k.has(o.oid)?confl(o.oid,id):null;if(cf)c.appendChild(E('span','pill t-vslow','Trùng '+(M.get(cf).short||M.get(cf).name)));});
  tb.appendChild(tr);});t.appendChild(tb);el.appendChild(t);
 if(tot>300)el.appendChild(E('p','muted','Đang hiện 300 / '+vn(tot)+' outlet điểm cao nhất; dùng ô tìm để lọc.'));
 if(!tot)el.appendChild(E('p','vempty','Không có outlet nào khớp.'));});
draw('pl_lockv',el=>{el.replaceChildren();if(S.plmsg){el.appendChild(E('p','grn',S.plmsg));S.plmsg='';}if(!S.pls.length)return;const M=PM();
 const L=E('p','muted');S.pls.forEach((id,i)=>{const sv=lsGet(PKEY(id));const R=plEval(id);if(i)L.append(' · ');L.append((M.get(id).short||M.get(id).name)+': chọn ',E('b',null,vn(pick(id).size)),' + đang chạy '+vn(R?R.cur.length:0)+(sv?' (đã chốt '+new Date(sv.at).toLocaleDateString('vi-VN')+')':''));});
 el.appendChild(L);el.appendChild(E('p','muted','Pool chốt = outlet đã chọn + outlet đang chạy; hiện ở tab tracking khi bấm vào scheme đó. Pool lưu trên trình duyệt đang dùng.'));});
document.querySelectorAll('.pp #pl_q').forEach(i=>i.addEventListener('input',()=>dash.draw('pl_mx')));
document.querySelectorAll('.pp #pl_only').forEach(i=>i.addEventListener('change',()=>dash.draw('pl_mx')));
document.querySelectorAll('.pp #pl_save').forEach(b=>b.addEventListener('click',()=>{if(!S.pls.length)return;let ok=true;S.pls.forEach(id=>{const R=plEval(id);ok=lsSet(PKEY(id),{oids:[...new Set([...pick(id),...(R?R.cur.map(o=>o.oid):[])])],at:Date.now(),scope:scopeName()})&&ok;});
 S.plmsg=ok?'Đã chốt pool '+S.pls.length+' scheme ✓':'Không lưu được pool trên trình duyệt này';plDraw();dash.draw('trk_locked');}));
document.querySelectorAll('.pp #pl_copy').forEach(b=>b.addEventListener('click',()=>{const O=oMap();if(!O)return;const M=PM();const rows=[];S.pls.forEach(id=>pick(id).forEach(oid=>{const o=O.get(oid)||{};rows.push([M.get(id).name,oid,o.outlet,nm(o.sr)].join('\t'));}));
 const msg=x=>{S.plmsg=x;dash.draw('pl_lockv');};try{navigator.clipboard.writeText(rows.join('\n')).then(()=>msg('Đã sao chép '+vn(rows.length)+' dòng ✓'),()=>msg('Không sao chép được'));}catch(e){msg('Không sao chép được');}}));
draw('trk_locked',el=>{el.replaceChildren();const m=/^S:(.+)$/.exec(S.N||'');if(!m){el.hidden=true;return;}const sv=lsGet(PKEY(m[1]));if(!sv){el.hidden=true;return;}el.hidden=false;
 const T=tMap()||new Map();const inT=sv.oids.filter(id=>(T.get(id)||[]).some(r=>r.prog===m[1])).length;
 el.append('Pool đã chốt ',E('b',null,vn(sv.oids.length)),' outlet ('+new Date(sv.at).toLocaleDateString('vi-VN')+') · đã tham gia ',E('b',null,vn(inT)),' · chưa add ',E('b','red',vn(sv.oids.length-inT)));});

draw('pl_tbl',el=>{el.replaceChildren();const P=D('programs');if(!P){el.textContent='Đang tải…';return;}
 const L=P.filter(p=>p.active&&p.fam).sort((a,b)=>a.fam.localeCompare(b.fam)||(a.cat?0:1)-(b.cat?0:1)||(a.short||'').localeCompare(b.short||''));
 const t=E('table','pltab');const th=E('thead');const hr=E('tr');['','Scheme','Nhóm','Dự án','Thời hạn','Pool','Đang chạy','Đã chốt'].forEach((x,i)=>hr.appendChild(E('th',i>=5?'n':null,x)));th.appendChild(hr);t.appendChild(th);
 const tb=E('tbody');let g='';L.forEach(p=>{if(p.fam!==g){g=p.fam;const h=E('tr','plgrp');const c=td(h,FAMN[g]);c.colSpan=8;tb.appendChild(h);}
  const on=S.pls.includes(p.id);const tr=E('tr','plr'+(on?' on':''));const c=td(tr);const cb=E('input');cb.type='checkbox';cb.checked=on;cb.setAttribute('aria-label','Chọn '+(p.short||p.name));c.appendChild(cb);
  const n=td(tr);if(p.cat)n.appendChild(E('span','vcat c-'+p.cat,p.cat));n.appendChild(E('b',null,' '+(p.short||p.name)));td(tr,FAMN[p.fam]);td(tr,p.project==='LME'?'LME':'Winning Rural');td(tr,p.period||'—');td(tr,vn(p.pool),'n');td(tr,vn(p.outlets),'n');
  const sv=lsGet(PKEY(p.id));td(tr,sv?vn(sv.oids.length):'—','n');
  const tg=()=>{if(S.pls.includes(p.id))S.pls=S.pls.filter(x=>x!==p.id);else if(S.pls.length<5)S.pls=[...S.pls,p.id];else S.plmsg='Tối đa 5 scheme cùng lúc.';plDraw();};
  tr.onclick=e=>{if(e.target!==cb)tg();};cb.onchange=tg;tb.appendChild(tr);});
 t.appendChild(tb);el.appendChild(t);});
S.vsel=S.vsel||null;
const vRows=()=>{const B=dueBase();return B?B.filter(VF[S.vf||'']):null;};
draw('vlist',el=>{el.replaceChildren();const B=vRows();if(!B){el.textContent='Đang tải…';return;}const sr=pSR();
 if(!(D('visits')||[]).some(r=>r.sr===sr)){el.appendChild(E('p','vempty','Chưa có lịch visit của '+nm(sr)+' trong file All Visits (02/11–19/12).'));return;}
 if(!B.length){el.appendChild(E('p','vempty','Không có outlet nào khớp bộ lọc.'));return;}
 if(!S.vsel||!B.some(x=>x.o.oid===S.vsel))S.vsel=B[0].o.oid;
 B.forEach((x,i)=>{const o=x.o;const it=E('button','vit'+(S.vsel===o.oid?' on':'')+(x.v.st==='Đã ghé'?' done':''));it.type='button';
  it.append(E('span','vt',x.v.t),E('span','vi',String(i+1)));const m=E('span','vm2');m.append(E('b',null,o.outlet),E('span','muted',(o.tier||'—')+' · '+vn(o.vol3m)+' thùng/th'+(x.v.ah?' · đột xuất':'')));it.appendChild(m);
  const f=E('span','vflags');if(x.v.st==='Đã ghé')f.appendChild(E('span','fl ok','Đã ghé'));if(x.kd)f.appendChild(E('span','fl bad','Chưa đạt'));if(x.none)f.appendChild(E('span','fl na','Chưa có CT'));if(x.g)f.appendChild(E('span','fl pot','Nên mời CT'));it.appendChild(f);
  it.onclick=()=>{S.vsel=o.oid;dash.draw('vlist');dash.draw('vdet');};el.appendChild(it);});});
draw('vdet',el=>{el.replaceChildren();const B=vRows();if(!B||!B.length){el.appendChild(E('p','vempty','Chọn một outlet ở danh sách bên trái.'));return;}
 const x=B.find(y=>y.o.oid===S.vsel)||B[0];const o=x.o;const OV=vMap()||new Map();
 const h=E('div','vdh');const t=E('div');t.append(E('h3',null,o.outlet),E('p','muted',o.oid+' · '+(o.segment||'—')+' · '+nm(o.sr)));h.appendChild(t);
 const k=E('div','vdk');k.append(E('span','vt',x.v.t),pill(x.v.st,x.v.st==='Đã ghé'?'s-good':'s-na'),pill(o.tier||'—','s-mid'));const vv=E('span','vvol');vv.append(mk(vn(o.vol3m),'outlets','vol3m',{oid:o.oid}),' thùng/th');k.appendChild(vv);h.appendChild(k);el.appendChild(h);
 const sl=x.L.filter(r=>r.active!==false&&['Chậm','Rất chậm'].includes(r.status)&&r.gap>0).sort((p,q)=>(q.gap||0)-(p.gap||0))[0];const br=x.L.find(r=>r.prog==='BREWERY');let todo='';
 if(sl)todo='Chốt thêm '+vn(sl.gap)+' thùng · '+sl.prog_name;else if(br)todo='Nhắc lịch tham quan nhà máy 03/12';else if(x.g)todo='Mời chương trình: '+String(x.g.de_xuat||'').split(' | ')[0];else if(x.none)todo='Giới thiệu chương trình phù hợp';
 if(todo){const v=E('div','vtodo',todo);v.appendChild(E('small',null,'Việc hôm nay (gợi ý tự động, giả định)'));el.appendChild(v);}
 const act=x.L.filter(r=>r.active!==false&&r.status!=='Không có target'),oth=x.L.filter(r=>!act.includes(r));
 const sec=(title,L)=>{if(!L.length)return;el.appendChild(E('h4','vsec',title+' ('+L.length+')'));const tb=E('div','vtab');
  L.forEach(r=>{const row=E('div','vrow');row.appendChild(E('span','vcat c-'+(r.cat||'X'),r.cat||'LME'));row.appendChild(E('b',null,r.prog_name));
   const nmb=E('span','vnum');if(r.target!=null){nmb.append(mk(vn(r.actual),'tracking','actual',{oid:r.oid,prog:r.prog}),' / ',mk(vn(r.target),'tracking','target',{oid:r.oid,prog:r.prog}));}else nmb.textContent='—';row.appendChild(nmb);
   row.appendChild(E('span','vgap',r.gap>0&&r.actual!=null?'thiếu '+vn(r.gap)+(r.need_day!=null?' · '+nd(r.need_day)+'/ngày':''):''));
   row.appendChild(pill(r.active===false?'Đã kết thúc':r.status||'—',r.active===false?'t-na':TCLS[r.status]||'t-na'));tb.appendChild(row);});el.appendChild(tb);};
 if(!x.L.length)el.appendChild(E('div','vnone','Outlet chưa có chương trình nào.'));
 sec('Chương trình cần chốt số',act);sec('Không có target / đã kết thúc',oth);
 if(x.g){const s=E('div','vsug');s.appendChild(E('b',null,'Nên mời chương trình'));lines(s,x.g.de_xuat);el.appendChild(s);}
 (OV.get(o.oid)||[]).forEach(r=>el.appendChild(E('div','vwarn','Trùng '+r.logic+': '+r.prog_a+' × '+r.prog_b+' ('+r.skus+')')));});

// Khung khoá + 2 panel cuộn song song
const _lk=()=>{const pp=document.querySelector('.pp');const l=document.getElementById('top');const a=document.querySelector('.pp #wr>.ask');if(!pp||!l)return;pp.style.setProperty('--lockh',l.offsetHeight+'px');pp.style.setProperty('--askh',(a&&a.offsetParent?a.offsetHeight:0)+'px');};
window.addEventListener('resize',_lk);if('ResizeObserver' in window){const ro=new ResizeObserver(_lk);['.pp #top','.pp #wr>.ask'].forEach(s=>{const e=document.querySelector(s);if(e)ro.observe(e);});}setTimeout(_lk,0);
// Filters, tabs, links, print
document.querySelectorAll('.pp .flt').forEach(el=>{if(el.tagName==='SELECT'&&!el.dataset.draw&&F(el.dataset.t)[el.dataset.k])el.value=F(el.dataset.t)[el.dataset.k];
 el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{F(el.dataset.t)[el.dataset.k]=el.value;redraw();});});
document.querySelectorAll('.pp #tabs [data-tab]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));
const h=(location.hash||'').slice(1);showTab(document.getElementById(h)&&document.querySelector('.pp #tabs [data-tab="'+h+'"]')?h:S.tab);
const TABN={'wr':'Winning in Rural tracking','lme':'LME promotion','pool':'Chọn pool','plan':'Daily visit plan','issue':'Issue'};
draw('tl_where',el=>{el.replaceChildren();const add=x=>el.appendChild(x);const sep=()=>add(document.createTextNode(' › '));
 add(document.createTextNode('Đang xem: '));const sc=E('b');sc.textContent=scopeName();add(sc);sep();
 const tb=E('button');tb.type='button';tb.textContent=TABN[S.tab]||S.tab;tb.onclick=()=>{showTab(S.tab);const v=document.getElementById(S.tab);if(v)v.scrollIntoView({behavior:'smooth',block:'start'});};add(tb);
 if(S.tab==='tracking'){const path=pathOf(S.N);
  path.forEach((r,i)=>{sep();if(i<path.length-1){const b=E('button');b.type='button';b.textContent=r.name;b.onclick=()=>{goNode(r.node,'tracking');const k=document.getElementById('drill');if(k)k.scrollIntoView({behavior:'smooth',block:'start'});};add(b);}else{const s=E('b');s.textContent=r.name;add(s);}});}
 if(S.tab==='plan'){sep();const s=E('b');s.textContent=nm(pSR())+' · '+dayLabel(S.day||todayISO());add(s);}});
let _tlTab='';const syncTl=()=>{document.querySelectorAll('.pp .tl-sec').forEach(g=>{const h=g.dataset.for!==S.tab;if(g.hidden!==h)g.hidden=h;});
 if(_tlTab!==S.tab){_tlTab=S.tab;const f=document.querySelector('.pp .tl-sec[data-for="'+S.tab+'"] [data-go]'+(S.tab==='can-xu-ly'?'[data-sub="'+S.sub+'"]':''));if(f)tlMark(f.dataset.go);}
 dash.draw('tl_where');};
document.querySelectorAll('.pp .view,.pp [data-subpanel]').forEach(v=>new MutationObserver(syncTl).observe(v,{attributes:true,attributeFilter:['hidden']}));
const tlMark=id=>document.querySelectorAll('.pp .tl-sec [data-go]').forEach(x=>{const on=x.dataset.go===id;if(x.classList.contains('on')!==on)x.classList.toggle('on',on);});
document.querySelectorAll('.pp .tl-sec [data-go]').forEach(b=>b.addEventListener('click',()=>{
 tlMark(b.dataset.go);window.__tlLock=Date.now()+1200;
 if(b.dataset.sub)document.querySelectorAll('.pp #subs [data-sub="'+b.dataset.sub+'"]').forEach(x=>x.click());
 const t=document.getElementById(b.dataset.go);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});}));
document.querySelectorAll('.pp #tl_top').forEach(b=>b.addEventListener('click',()=>{const t=document.getElementById('top');if(t)t.scrollIntoView({behavior:'smooth',block:'start'});}));
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(Date.now()<(window.__tlLock||0))return;es.forEach(e=>{if(e.isIntersecting)tlMark(e.target.id);});},{rootMargin:'-300px 0px -50% 0px'});
 document.querySelectorAll('.pp .view .card[id]').forEach(c=>io.observe(c));}
syncTl();syncSw();dash.onData(syncSw);
/* v110 xuất bảng + file nguồn */
S.xmsg=S.xmsg||'';
draw('x_msg',el=>{el.textContent=S.xmsg||'';});
const xSay=t=>{S.xmsg=t;dash.draw('x_msg');};
const csvOf=(head,rows)=>'\ufeff'+[head,...rows].map(r=>r.map(v=>{const s=v==null?'':String(v);return /[",\n;]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}).join(',')).join('\r\n');
const xName=t=>(t+' · '+scopeName()+' · '+new Date().toLocaleDateString('vi-VN').replace(/\//g,'-')).replace(/[\\/:*?"<>|]+/g,'-');
const xSave=async(filename,data)=>{let dl=null;try{dl=await claude.use('downloads');}catch(e){}if(!dl){xSay('Trình xem này không cho tải file.');return;}
 try{await dl.save({filename,data});xSay('Đã xuất: '+filename);}catch(e){const c=e&&e.code;xSay(c==='declined'?'Đã huỷ tải.':c==='rate_limited'?'Đang có một lệnh tải chờ xác nhận.':'Không tải được ('+(c||'lỗi')+').');}};
const domRows=name=>{const tb=document.querySelector('.pp tbody[data-draw="'+name+'"]');if(!tb)return null;const t=tb.closest('table');
 const head=[...t.querySelectorAll('thead th')].map(th=>th.textContent.replace(/\s+/g,' ').trim());
 const rows=[...tb.querySelectorAll('tr')].filter(tr=>!tr.querySelector('td.msg')).map(tr=>[...tr.children].map(td=>td.textContent.replace(/\s+/g,' ').trim()));return {head,rows};};
const XT={
 trk:()=>{const L=trkRows()||[];return {t:'Tracking '+((cur()||{}).name||''),head:['Mã outlet','Outlet','SR/DSM','SS','Tier','Scheme','Bán','Target','% đạt','Thiếu','Cần/ngày','Trạng thái'],rows:L.map(r=>[r.oid,r.outlet,nm(r.sr),nm(r.ss),r.tier,r.prog_name,r.actual,r.target,r.pct,r.gap,r.need_day,r.status])};},
 wr4:()=>{const root=S.tab==='lme'?'LME':'WR';const out=[];const walk=(p,d)=>childRows(p,'').sort((x,y)=>d===1?x.node.localeCompare(y.node):0).forEach(r=>{out.push([d,r.name,r.total,r.tg,r.tg_pct,r.dat,r.n_measured,r.dat_pct,r.pot_none,r.pot_pct]);if(d<3)walk(r.node,d+1);});walk(root,1);
  return {t:(root==='LME'?'LME promotion':'Winning Rural')+' theo hạng mục',head:['Cấp','Hạng mục / scheme','Outlet phụ trách','Tham gia','% tham gia','Đạt','Có target','% đạt','Potential chưa TG','% potential'],rows:out};},
 ppl:()=>{const d=domRows('tb_ppl');return d&&{t:'Theo người phụ trách',...d};},
 plan:()=>{const d=domRows('tb_plan');return d&&{t:'Kế hoạch MK1 vs SIS',...d};},
 pot:()=>{const L=potRows();return {t:'Potential chưa có promotion',head:['Mã','Outlet','SR/DSM','SS','Tier','Kênh','Vol TB 3T','Đang có','Scheme đề xuất'],rows:L.map(r=>[r.oid,r.outlet,nm(r.sr),nm(r.ss),r.tier,r.kenh,r.vol3m,r.hien_co,r.de_xuat])};},
 ov:()=>{const L=ovRows();return {t:'Outlet trùng promotion',head:['Mã','Outlet','SR/DSM','SS','Loại trùng','Chương trình A','Chương trình B','SKU','Tháng'],rows:L.map(r=>[r.oid,r.outlet,nm(r.sr),nm(r.ss),r.logic,r.prog_a,r.prog_b,r.skus,r.months])};},
 visit:()=>{const B=vRows()||[];return {t:'Visit '+(S.day||'')+' '+nm(pSR()),head:['Giờ','Mã','Outlet','Tier','Vol TB 3T','Trạng thái visit','Scheme đang chạy','Scheme chưa đạt','Potential'],rows:B.map(x=>[x.v.t,x.o.oid,x.o.outlet,x.o.tier,x.o.vol3m,x.v.st,x.L.filter(r=>r.active!==false).map(r=>r.prog_name).join('; '),x.L.filter(r=>['Chậm','Rất chậm','Không đạt'].includes(r.status)).map(r=>r.prog_name).join('; '),x.g?'Có':''])};},
 pool:()=>{const O=oMap();const M=PM();const rows=[];S.pls.forEach(id=>pick(id).forEach(oid=>{const o=(O&&O.get(oid))||{};rows.push([(M.get(id)||{}).short||id,oid,o.outlet,nm(o.sr),o.tier,o.vol3m]);}));return {t:'Pool đã chọn',head:['Scheme','Mã','Outlet','SR/DSM','Tier','Vol TB 3T'],rows};}
};
document.querySelectorAll('.pp [data-x]').forEach(b=>b.addEventListener('click',()=>{const f=XT[b.dataset.x];const r=f&&f();if(!r||!r.rows.length){xSay('Bảng đang trống, không có gì để xuất.');return;}xSave(xName(r.t)+'.csv',csvOf(r.head,r.rows));}));
/* nguồn dữ liệu */
const SRCK=()=>{const R=D('sources');if(!R)return null;const m=new Map();R.forEach(r=>{if(!m.has(r.key))m.set(r.key,[]);m.get(r.key).push(r);});return m;};
const progsUnder=n=>{const out=new Set();const walk=x=>{if(/^S:/.test(x)){out.add(x.slice(2));return;}childRows(x,'').forEach(r=>walk(r.node));};walk(n||'ROOT');return [...out];};
const JA=v=>{if(Array.isArray(v))return v;if(typeof v!=='string'||!v)return [];try{const x=JSON.parse(v);return Array.isArray(x)?x:[];}catch(e){return [];}};
const ZIPB=files=>{const T=ZIPB.t||(ZIPB.t=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})());
 const crc=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=T[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0;};const enc=new TextEncoder();const parts=[],cent=[];let off=0;
 files.forEach(f=>{const nmb=enc.encode(f.name);const d=f.comp||f.data;const mt=f.comp?8:0;const c=crc(f.data);const h=new DataView(new ArrayBuffer(30));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,mt,true);h.setUint16(12,0x21,true);h.setUint32(14,c,true);h.setUint32(18,d.length,true);h.setUint32(22,f.data.length,true);h.setUint16(26,nmb.length,true);
  parts.push(new Uint8Array(h.buffer),nmb,d);const ch=new DataView(new ArrayBuffer(46));ch.setUint32(0,0x02014b50,true);ch.setUint16(4,20,true);ch.setUint16(6,20,true);ch.setUint16(8,0x0800,true);ch.setUint16(10,mt,true);ch.setUint16(14,0x21,true);ch.setUint32(16,c,true);ch.setUint32(20,d.length,true);ch.setUint32(24,f.data.length,true);ch.setUint16(28,nmb.length,true);ch.setUint32(42,off,true);
  cent.push(new Uint8Array(ch.buffer),nmb);off+=30+nmb.length+d.length;});
 const cs=cent.reduce((s,x)=>s+x.length,0);const e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cs,true);e.setUint32(16,off,true);
 return new Blob([...parts,...cent,new Uint8Array(e.buffer)]);};
const XE=s=>String(s).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFE\uFFFF]/g,'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const XC=i=>{let s='';i++;while(i>0){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=(i-1-m)/26;}return s;};
const xlsxOf=async sh=>{const enc=new TextEncoder();const used=new Set();
 const names=sh.map((s,i)=>{let n=String(s.n||'').replace(/[\[\]:*?\/\\]/g,'_').trim().slice(0,31)||('Sheet'+(i+1));const b=n;let k=2;while(used.has(n.toLowerCase()))n=b.slice(0,27)+'_'+(k++);used.add(n.toLowerCase());return n;});
 const H='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';const F=[];
 F.push({name:'[Content_Types].xml',data:enc.encode(H+'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+sh.map((s,i)=>'<Override PartName="/xl/worksheets/sheet'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>').join('')+'</Types>')});
 F.push({name:'_rels/.rels',data:enc.encode(H+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>')});
 F.push({name:'xl/workbook.xml',data:enc.encode(H+'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+names.map((n,i)=>'<sheet name="'+XE(n).replace(/"/g,'&quot;')+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>').join('')+'</sheets></workbook>')});
 F.push({name:'xl/_rels/workbook.xml.rels',data:enc.encode(H+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+sh.map((s,i)=>'<Relationship Id="rId'+(i+1)+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+(i+1)+'.xml"/>').join('')+'</Relationships>')});
 sh.forEach((s,i)=>{const P=[H+'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'];
  (s.r||[]).forEach((row,ri)=>{if(!row||!row.length)return;let x='<row r="'+(ri+1)+'">';row.forEach((v,ci)=>{if(v===null||v===undefined||v==='')return;const a=XC(ci)+(ri+1);
   if(typeof v==='number'&&isFinite(v))x+='<c r="'+a+'"><v>'+v+'</v></c>';else if(typeof v==='boolean')x+='<c r="'+a+'" t="b"><v>'+(v?1:0)+'</v></c>';else x+='<c r="'+a+'" t="inlineStr"><is><t xml:space="preserve">'+XE(v)+'</t></is></c>';});P.push(x+'</row>');});
  P.push('</sheetData></worksheet>');F.push({name:'xl/worksheets/sheet'+(i+1)+'.xml',data:enc.encode(P.join(''))});});
 if(typeof CompressionStream==='function'){for(const f of F){try{f.comp=new Uint8Array(await new Response(new Blob([f.data]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer());}catch(e){f.comp=null;}}}
 return new Uint8Array(await ZIPB(F).arrayBuffer());};
const srcGet=async r=>{const us=String(r.parts||r.url||'').split('|').filter(Boolean);const M=new Map();
 for(const u of us){const res=await fetch(u);if(!res.ok)throw new Error(res.status);const j=await res.json();(j.sheets||[]).forEach(s=>{if(M.has(s.n))M.get(s.n).r=M.get(s.n).r.concat(s.r);else M.set(s.n,{n:s.n,r:s.r});});}
 return xlsxOf([...M.values()]);};
const mDate=s=>{const m=/(\d+)\/(\d+)\/(\d+)\s*(\d+)?:?(\d+)?/.exec(s||'');return m?new Date(+m[3],+m[2]-1,+m[1],+(m[4]||0),+(m[5]||0)):new Date(0);};
const gist=b=>{const L=String(b||'').split('\n').map(x=>x.trim()).filter(x=>x.length>=20&&!/^(dear|hi |chào|thân|kính|from:|sent:|to:|cc:|subject:|<http)/i.test(x));return (L[0]||'').slice(0,180);};
const fnSafe=s=>String(s||'').replace(/[\\/:*?"<>|\r\n\t]+/g,'_').slice(0,90);
const srcPack=async(title,keys)=>{const M=SRCK()||new Map();const MP=D('mailpack')||[];const PR=new Map((D('programs')||[]).map(p=>[p.id,p]));const ks=new Set(keys);
 const files=[];const seen=new Set();keys.forEach(k=>(M.get(k)||[]).forEach(r=>{if(!seen.has(r.file)){seen.add(r.file);files.push(r);}}));
 const mails=MP.filter(m=>JA(m.keys).some(k=>ks.has(k))).sort((a,b)=>mDate(a.date)-mDate(b.date));
 const enc=new TextEncoder();const out=[];let sum='TÓM TẮT LUỒNG THÔNG TIN\n'+title+' · '+scopeName()+' · xuất '+new Date().toLocaleString('vi-VN')+'\n\n1) SCHEME LIÊN QUAN\n';
 keys.forEach(k=>{const p=PR.get(k);if(!p)return;sum+='- '+(p.short||p.name)+' · '+(p.period||'')+'\n';JA(p.codes).forEach(c=>{sum+='    Code '+c.code+' · '+c.name+' · '+c.time+'\n    '+c.desc+'\n    (nguồn: '+c.src+')\n';});if(p.quote)sum+='    Trích: '+p.quote+'\n    (nguồn: '+p.quote_src+')\n';});
 sum+='\n2) LUỒNG MAIL THEO THỜI GIAN ('+mails.length+' mail)\n';
 mails.forEach((m,i)=>{sum+=(i+1)+'. '+m.date+' · '+m.from+' → '+(m.to||'—')+(m.cc?' (CC: '+m.cc+')':'')+'\n   '+m.subject+'\n   '+gist(m.body)+(JA(m.atts).length?'\n   Đính kèm: '+JA(m.atts).join('; '):'')+'\n';
  out.push({name:'Mail/'+String(i+1).padStart(3,'0')+' '+fnSafe(m.date.slice(0,10).split('/').reverse().join('-')+' '+m.subject)+'.txt',data:enc.encode('﻿Tiêu đề: '+m.subject+'\r\nNgười gửi: '+m.from+'\r\nNgười nhận: '+(m.to||'—')+'\r\nCC: '+(m.cc||'—')+'\r\nThời gian: '+m.date+'\r\nĐính kèm: '+(JA(m.atts).join('; ')||'—')+'\r\n\r\n'+String(m.body||'').replace(/\n/g,'\r\n'))});});
 sum+='\n3) FILE GỐC KÈM THEO ('+files.length+' file, đã chèn hàng đầu: tiêu đề, người gửi, người nhận, CC, thời gian)\n';files.forEach(r=>{sum+='- '+r.file+' · '+r.subject+' · '+r.from+' · '+r.date+'\n';});
 for(let i=0;i<files.length;i++){const r=files[i];xSay('Đang gom file '+(i+1)+'/'+files.length+'…');try{out.push({name:'File/'+fnSafe(r.file.replace(/\.xlsx$/,''))+'.xlsx',data:await srcGet(r)});}catch(e){sum+='  (không lấy được: '+r.file+')\n';}}
 out.unshift({name:'00 Tom tat luong thong tin.txt',data:enc.encode('﻿'+sum.replace(/\n/g,'\r\n'))});
 await xSave(xName('Nguon '+title)+'.zip',ZIPB(out));};
const srcBox=(el,keys,extra,title)=>{el.replaceChildren();const M=SRCK();if(!M)return;const seen=new Set();const L=[];
 keys.forEach(k=>(M.get(k)||[]).forEach(r=>{if(!seen.has(r.file)){seen.add(r.file);L.push(r);}}));
 const ks=new Set(keys);const nm_=(D('mailpack')||[]).filter(m=>JA(m.keys).some(k=>ks.has(k))).length;
 const zb=E('button','xbtn','⤓ Truy xuất nguồn · '+nm_+' mail · '+L.length+' file');zb.type='button';zb.title='Tải 1 file zip: tóm tắt luồng thông tin, toàn bộ mail liên quan và file Excel gốc';zb.onclick=()=>srcPack(title||'Bang',keys);
 S.srcOpen=S.srcOpen||{};const dk=el.dataset.draw;const d=E('details');d.open=!!S.srcOpen[dk];d.ontoggle=()=>{S.srcOpen[dk]=d.open;};d.appendChild(E('summary',null,'Xem từng file ▾'));const box=E('div');
 L.forEach(r=>{const b=E('button',null);b.type='button';b.append(r.title||r.file,E('small',null,(r.from||'')+' · '+(r.date||'')));b.title='Tiêu đề: '+r.subject+'\nNgười gửi: '+r.from+'\nNgười nhận: '+r.to+'\nCC: '+r.cc+'\nThời gian: '+r.date;
  b.onclick=async()=>{xSay('Đang lấy file '+r.file+'…');try{await xSave(r.file,new Blob([await srcGet(r)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));}catch(e){xSay('Không lấy được file nguồn.');}};box.appendChild(b);});
 if(extra)box.appendChild(E('span','muted',extra));d.appendChild(box);const w=E('div','srcrow');w.append(zb,d);el.appendChild(w);};
draw('src_trk',el=>{const n=S.N||'WR';srcBox(el,[...progsUnder(n)],null,'Tracking '+((cur()||{}).name||''));});
draw('src_pool',el=>srcBox(el,['outlets',...S.pls],null,'Pool'));
draw('src_plan',el=>{const B=vRows()||[];const ks=new Set(['visits','outlets']);B.forEach(x=>x.L.forEach(r=>ks.add(r.prog)));srcBox(el,[...ks],null,'Visit '+(S.day||''));});
draw('src_pot',el=>{const P=(D('programs')||[]).filter(p=>p.active);srcBox(el,['outlets',...P.map(p=>p.id)],' · danh sách potential tính từ territory và toàn bộ scheme còn chạy','Potential');});
draw('src_ov',el=>{const ks=new Set();ovRows().forEach(r=>{const a=(D('programs')||[]).filter(p=>p.short===r.prog_a||p.short===r.prog_b);a.forEach(p=>ks.add(p.id));});srcBox(el,[...ks],null,'Trung promotion');});
draw('sch_tbl',el=>{el.replaceChildren();const m=/^S:(.+)$/.exec(S.N||'');const p=m&&(D('programs')||[]).find(x=>x.id===m[1]);if(!p)return;
 const t=E('table','scht');const th=E('thead');const h=E('tr');['Tên','Code promotion online','Thời gian','Yêu cầu (trích nguyên văn)'].forEach(x=>h.appendChild(E('th',null,x)));th.appendChild(h);t.appendChild(th);const tb=E('tbody');
 const rows=(JA(p.codes).length)?JA(p.codes).map(c=>[c.name,c.code,c.time,c.desc,c.src]):[[p.name,'Chưa có code',p.period||'—',p.quote||p.req||'—',p.quote_src||p.sources||'']];
 rows.forEach(r=>{const tr=E('tr');tr.appendChild(E('td',null,r[0]));const c=E('td');c.appendChild(E('b',r[1]==='Chưa có code'?'nocode':'code',r[1]));tr.appendChild(c);tr.appendChild(E('td',null,r[2]));const d=E('td');d.appendChild(E('span',null,r[3]));if(r[4])d.appendChild(E('small',null,'Nguồn: '+r[4]));tr.appendChild(d);tb.appendChild(tr);});
 t.appendChild(tb);el.appendChild(t);
 if(JA(p.codes).length&&p.quote)el.appendChild(E('p','schq','Trích: '+p.quote+' — '+p.quote_src));
 if(p.nolist)el.appendChild(E('p','schq','Chưa có danh sách outlet trong mail nên chưa theo dõi được tham gia / đạt.'));});
draw('src_plan2',el=>{el.replaceChildren();const d=E('details');d.appendChild(E('summary',null,'Nguồn dữ liệu ▾'));const b=E('div');b.appendChild(E('span','muted','Plan và re-submit: ảnh họp MK1 Update Winning Rural (re-submit 10/11), không có file Excel gốc. Thực tế: SIS export.'));d.appendChild(b);el.appendChild(d);});
window.addEventListener('beforeprint',()=>{document.querySelectorAll('.pp .view,.pp [data-subpanel]').forEach(v=>{v.hidden=false;});});
window.addEventListener('afterprint',()=>{showTab(S.tab);document.querySelectorAll('.pp [data-subpanel]').forEach(p=>{p.hidden=p.dataset.subpanel!==S.sub;});});
