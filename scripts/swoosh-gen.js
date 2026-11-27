// Re-analyse each swoosh piece on its first sub-path, then emit src/components/home/swooshes.ts
const {chromium}=require('playwright');const fs=require('fs');
const a=JSON.parse(fs.readFileSync(__dirname+'/swoosh-analysis.json','utf8'));
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const out={};
for(const [k,v] of Object.entries(a)){
  const s=v.s,vb=v.vb;const pieces=[];
  for(const P of v.paths){
    const first=P.d.slice(0,P.d.indexOf('Z')+1);
    const {pts}=await p.evaluate((d)=>{const NS='http://www.w3.org/2000/svg';const svg=document.createElementNS(NS,'svg');document.body.appendChild(svg);
      const el=document.createElementNS(NS,'path');el.setAttribute('d',d);svg.appendChild(el);const L=el.getTotalLength();const N=3000;const pts=[];
      for(let i=0;i<N;i++){const q=el.getPointAtLength(L*i/N);pts.push([q.x,q.y]);}return {L,pts};},first);
    const N=3000;const L=(await p.evaluate((d)=>{const el=document.querySelector('path');el.setAttribute('d',d);return el.getTotalLength();},first));
    const dl=Math.max(4,Math.round(N*30/L));
    const tan=(i)=>{const A=pts[((i-2)%N+N)%N],C=pts[(i+2)%N];const dx=C[0]-A[0],dy=C[1]-A[1];const m=Math.hypot(dx,dy)||1;return [dx/m,dy/m];};
    const score=[];for(let i=0;i<N;i++){const t1=tan(((i-dl)%N+N)%N),t2=tan((i+dl)%N);score.push(t1[0]*t2[0]+t1[1]*t2[1]);}
    let i0=0;for(let i=1;i<N;i++)if(score[i]<score[i0])i0=i;
    let i1=-1;for(let i=0;i<N;i++){const dd=Math.min(Math.abs(i-i0),N-Math.abs(i-i0));if(dd>N*0.3&&(i1<0||score[i]<score[i1]))i1=i;}
    const fwd=(x,y)=>((y-x)%N+N)%N;let H=fwd(i0,i1);
    let th=0;for(let t=Math.round(H*0.05);t<H*0.95;t+=3){const pa=pts[(i0+t)%N];let m=1e9;for(let u=Math.round((N-H)*0.03);u<(N-H)*0.97;u+=2){const pb=pts[(i1+u)%N];m=Math.min(m,Math.hypot(pa[0]-pb[0],pa[1]-pb[1]));}th=Math.max(th,m);}
    const [bl,bt,bw,bh]=s.box;const cx=bl+bw/2,cy=bt+bh/2;const sx=s.img[0]/vb[2],sy=s.img[1]/vb[3];const rr=s.rot*Math.PI/180;
    const toStage=([x,y])=>{let X=(x*sx-s.img[0]/2)*(s.flip?-1:1),Y=y*sy-s.img[1]/2;return [cx+X*Math.cos(rr)-Y*Math.sin(rr),cy+X*Math.sin(rr)+Y*Math.cos(rr)];};
    const inScr=(t)=>{const q=toStage(pts[(i0+t)%N]);return q[0]>=-30&&q[0]<=1470&&q[1]>-200;};
    let A=0;while(A<H&&!inScr(A))A++;let B=H;while(B>A&&!inScr(B))B--;
    const end0Off=!inScr(0),end1Off=!inScr(H);
    // draw from the end that hangs off-screen (enter at the screen edge); else from end1
    const back=end1Off||!end0Off; // grow from B toward A
    const len=B-A;const o=(t)=>-(i0+t);
    pieces.push({full:P.d,w:+(th*2.3+6).toFixed(1),len,gap:N-len,
      o0:back?o(B):o(A),o1:o(A),o2:back?o(A):o(B)});
    console.log(k,'i0',i0,'i1',i1,'H',H,'A',A,'B',B,'th',th.toFixed(1),'off',end0Off,end1Off,'back',back);
  }
  out[k]={w:vb[2],h:vb[3],fill:v.fill,pieces};
}
let ts='/* Generated from public/img/home/swoosh-*.svg — outline paths plus the trim-path\n   mask (on the first sub-path) parameters (path units, pathLength 3000) used by <Swoosh>. */\n\n';
ts+='export type SwooshPiece = { full: string; w: number; len: number; gap: number; o0: number; o1: number; o2: number };\n';
ts+='export type SwooshData = { w: number; h: number; fill: string; pieces: SwooshPiece[] };\n\n';
ts+='export const SWOOSHES = '+JSON.stringify(out,null,1)+' satisfies Record<string, SwooshData>;\n';
fs.writeFileSync('/home/user/astrocade/src/components/home/swooshes.ts',ts);
await b.close();})();
