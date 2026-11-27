// Regenerate swoosh trim data: node scripts/swoosh-analyze.js && node scripts/swoosh-gen.js (needs playwright)
const {chromium}=require('playwright');const fs=require('fs');
const dir='/home/user/astrocade/public/img/home/';
// placement on the 1440 stage (box = flex container, image centred), for visible-window calc
const SW={
 stats:{file:'swoosh-stats.svg',box:[-1379,0,2757,512],img:[2741,367],rot:-3.04,flip:false},
 whynow:{file:'swoosh-whynow.svg',box:[602,295,3398,631],img:[3379,452],rot:3.04,flip:true},
 violet:{file:'swoosh-violet.svg',box:[472,29,2032,805],img:[2032,805],rot:0,flip:false},
 blue:{file:'swoosh-blue.svg',box:[637,528,2465,342],img:[2465,342],rot:0,flip:false},
};
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const out={};
for(const [k,s] of Object.entries(SW)){
  const svg=fs.readFileSync(dir+s.file,'utf8');
  const vb=svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  const ds=[...svg.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]);
  const fill=svg.match(/fill="(#[0-9A-Fa-f]{6})"/)[1];
  const res=await p.evaluate(({ds})=>{
    const NS='http://www.w3.org/2000/svg';const svg=document.createElementNS(NS,'svg');document.body.appendChild(svg);
    return ds.map(d=>{const el=document.createElementNS(NS,'path');el.setAttribute('d',d);svg.appendChild(el);
      const L=el.getTotalLength();const N=3000;const pts=[];for(let i=0;i<N;i++){const q=el.getPointAtLength(L*i/N);pts.push([q.x,q.y]);}
      return {L,pts};});
  },{ds});
  out[k]={vb,fill,s,paths:res.map((r,pi)=>{
    const {L,pts}=r;const N=pts.length;
    // reversal score: angle between tangent before/after over delta
    const dl=Math.max(4,Math.round(N*30/L)); // ~30 units
    const tan=(i)=>{const a=pts[(i-2+N)%N],c=pts[(i+2)%N];const dx=c[0]-a[0],dy=c[1]-a[1];const m=Math.hypot(dx,dy)||1;return [dx/m,dy/m];};
    const score=[];for(let i=0;i<N;i++){const t1=tan((i-dl+N)%N),t2=tan((i+dl)%N);score.push(t1[0]*t2[0]+t1[1]*t2[1]);}
    // most negative = reversal
    let i0=0;for(let i=1;i<N;i++)if(score[i]<score[i0])i0=i;
    let i1=-1;for(let i=0;i<N;i++){const dd=Math.min(Math.abs(i-i0),N-Math.abs(i-i0));if(dd>N*0.3&&(i1<0||score[i]<score[i1]))i1=i;}
    // thickness: for points on the forward side i0→i1, nearest distance to other side
    const fwd=(a,b)=>((b-a)%N+N)%N;
    const H=fwd(i0,i1);let th=0;
    for(let t=Math.round(H*0.1);t<H*0.9;t+=Math.max(1,Math.round(H/150))){const pa=pts[(i0+t)%N];let m=1e9;
      for(let u=Math.round((N-H)*0.05);u<(N-H)*0.95;u+=2){const pb=pts[(i1+u)%N];m=Math.min(m,Math.hypot(pa[0]-pb[0],pa[1]-pb[1]));}
      th=Math.max(th,m);}
    // stage coords for forward-side samples
    const [bl,bt,bw,bh]=s.box;const cx=bl+bw/2,cy=bt+bh/2;const sx=s.img[0]/vb[2],sy=s.img[1]/vb[3];const rr=s.rot*Math.PI/180;
    const toStage=([x,y])=>{let X=(x*sx-s.img[0]/2)*(s.flip?-1:1),Y=y*sy-s.img[1]/2;return [cx+X*Math.cos(rr)-Y*Math.sin(rr),cy+X*Math.sin(rr)+Y*Math.cos(rr)];};
    const vis=[];for(let t=0;t<=H;t++){const q=toStage(pts[(i0+t)%N]);vis.push(q[0]>=-20&&q[0]<=1460);}
    const firstVis=vis.indexOf(true),lastVis=vis.lastIndexOf(true);
    const e0=toStage(pts[i0]),e1=toStage(pts[i1]);
    return {L,N,i0,i1,H,th:+th.toFixed(1),firstVis,lastVis,end0:e0.map(Math.round),end1:e1.map(Math.round),s0:score[i0].toFixed(2),s1:score[i1].toFixed(2),d:ds[pi]};
  })};
}
fs.writeFileSync(__dirname+'/swoosh-analysis.json',JSON.stringify(out));
for(const [k,v] of Object.entries(out)){console.log(k,v.fill);v.paths.forEach(q=>console.log('  L',q.L.toFixed(0),'i0',q.i0,'i1',q.i1,'H',q.H,'th',q.th,'vis',q.firstVis,q.lastVis,'ends',q.end0,q.end1,q.s0,q.s1));}
await b.close();})();
