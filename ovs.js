"use strict";window.addEventListener("load",()=>{const e=makeFunctionGraph("axiscanvas","funccanvas");e.ylim(-130,0),Promise.all([setupAudio("ovsproc.js","ovs-processor"),window.fetch("audio/unfinite_function.mp3")]).then(function([t,n]){t.proc.w=16,t.proc.dithertype="rect",t.proc.noiseshapingfilter=1,t.proc.oversamplingfactor=4,setupPlayerControls(t,void 0,n.arrayBuffer());const o=new Float32Array(t.getFrequencyDomainData());for(let e=0;e<o.length;e++)o[e]=22050*e/(o.length-1);const c=new Float32Array(t.getTimeDomainData());for(let e=0;e<c.length;e++)c[e]=e;let a=!1;!function n(){setTimeout(()=>requestAnimationFrame(n),40),a?e.drawData(c,t.getTimeDomainData()):e.drawData(o,t.getFrequencyDomainData())}();const d=document.getElementById("linear");d.checked=!1,e.logx(!0),d.onchange=function(t){document.getElementById("wave").checked||e.logx(!t.target.checked)};const i=document.getElementById("wave");function m(){document.getElementById("dither").checked?document.getElementById("noiseshaping").checked?document.getElementById("diagram").src="images/ovs/ns5.png":document.getElementById("diagram").src="images/ovs/ns5b.png":document.getElementById("noiseshaping").checked?document.getElementById("diagram").src="images/ovs/ns5c.png":document.getElementById("diagram").src="images/ovs/ns5d.png"}function g(e){document.getElementById("dither").checked?t.proc.dithertype=document.getElementById("dithertype").value:t.proc.dithertype="none",m()}function r(e){document.getElementById("noiseshaping").checked?t.proc.noiseshapingfilter=document.getElementById("noiseshapingfilter").value:t.proc.noiseshapingfilter=0,m()}i.checked=!1,i.onchange=function(t){(a=t.target.checked)?(e.logx(!1),e.ylim(-1,1),e.xlim(0,c.length-1)):(e.xlim(50,2e4),e.logx(!d.checked),e.ylim(-130,0))},document.getElementById("wordlength").value=16,document.getElementById("wordlength").onchange=function(e){t.proc.w=e.target.value},document.getElementById("dither").checked=!0,document.getElementById("dither").onchange=g,document.getElementById("noiseshaping").checked=!0,document.getElementById("noiseshaping").onchange=r,document.getElementById("dithertype").value="rect",document.getElementById("dithertype").onchange=g,document.getElementById("noiseshapingfilter").value=1,document.getElementById("noiseshapingfilter").onchange=r,document.getElementById("oversamplingfactor").value=4,document.getElementById("oversamplingfactor").onchange=function(e){t.proc.oversamplingfactor=e.target.value}}).catch(e=>console.log(e))});