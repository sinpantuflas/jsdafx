"use strict";void 0===Math.log10&&(Math.log10=function(e){return Math.LOG10E*Math.log(e)}),void 0===AnalyserNode.prototype.getFloatTimeDomainData&&(AnalyserNode.prototype.getFloatTimeDomainData=function(e){var t=new Uint8Array(e.length);this.getByteTimeDomainData(t);for(var n=0;n<e.length;n++)e[n]=(t[n]-128)/128}),function(){var e,t=[];function n(e){var n=this,r={},i=-1;this.parameters.forEach(function(e,o){var a=t[++i]||(t[i]=new Float32Array(n.bufferSize));a.fill(e.value),r[o]=a}),this.processor.realm.exec("self.sampleRate=sampleRate="+this.context.sampleRate+";self.currentTime=currentTime="+this.context.currentTime);var a=o(e.inputBuffer),c=o(e.outputBuffer);this.instance.process([a],[c],r)}function o(e){for(var t=[],n=0;n<e.numberOfChannels;n++)t[n]=e.getChannelData(n);return t}function r(e){return e.$$processors||(e.$$processors={})}"function"!=typeof AudioWorkletNode&&(self.AudioWorkletNode=function(t,o,i){var a=r(t)[o],c=t.createScriptProcessor(void 0,2,i&&i.outputChannelCount?i.outputChannelCount[0]:2);if(c.parameters=new Map,a.properties)for(var u=0;u<a.properties.length;u++){var s=a.properties[u],l=t.createGain().gain;l.value=s.defaultValue,c.parameters.set(s.name,l)}var d=new MessageChannel;e=d.port2;var f=new a.Processor(i||{});return e=null,c.port=d.port1,c.processor=a,c.instance=f,c.onaudioprocess=n,c},Object.defineProperty((self.AudioContext||self.webkitAudioContext).prototype,"audioWorklet",{get:function(){return this.$$audioWorklet||(this.$$audioWorklet=new self.AudioWorklet(this))}}),self.AudioWorklet=function(){function t(e){this.$$context=e}return t.prototype.addModule=function(t,n){var o=this;return fetch(t).then(function(e){if(!e.ok)throw Error(e.status);return e.text()}).then(function(t){var i={sampleRate:0,currentTime:0,AudioWorkletProcessor:function(){this.port=e},registerProcessor:function(e,t){r(o.$$context)[e]={realm:a,context:i,Processor:t,properties:t.parameterDescriptors||[]}}};i.self=i;var a=new function(e,t){var n=document.createElement("iframe");n.style.cssText="position:absolute;left:0;top:-999px;width:1px;height:1px;",t.appendChild(n);var o=n.contentWindow,r=o.document,i="var window,$hook";for(var a in o)a in e||"eval"===a||(i+=",",i+=a);for(var c in e)i+=",",i+=c,i+="=self.",i+=c;var u=r.createElement("script");u.appendChild(r.createTextNode('function $hook(self,console) {"use strict";\n        '+i+";return function() {return eval(arguments[0])}}")),r.body.appendChild(u),this.exec=o.$hook(e,console)}(i,document.documentElement);return a.exec((n&&n.transpile||String)(t)),null})},t}())}();var setupAudio=function(e,t){var n,o,r=new(window.AudioContext||window.webkitAudioContext)({latencyHint:"playback"}),i=r.createAnalyser();i.smoothingTimeConstant=.3,i.minDecibels=-130,i.fftSize=1024;var a=new Float32Array(i.fftSize),c=new Float32Array(i.frequencyBinCount);i.connect(r.destination);var u=function(){};return r.audioWorklet.addModule(e).then(()=>{var e=new AudioWorkletNode(r,t);return e.port.postMessage({action:"list-properties"}),(e=>new Promise(t=>{var n=e.onmessage;e.onmessage=(o=>{e.onmessage=n,t(o.data)})}))(e.port).then(t=>{if("list-properties"==t.response)for(var n of t.properties)!function(t){Object.defineProperty(e,t,{set:function(n){e.port.postMessage({action:"set-property",param:t,value:n})}})}(n);return e})}).then(e=>{var t=function(){void 0!==n&&(n.disconnect(),n=void 0),void 0!==o&&(o.disconnect(),o=void 0),e.disconnect(),r.suspend()};return{start:function(a){void 0!==n&&(n.disconnect(),n=void 0),void 0!==o&&(o.disconnect(),o=void 0),r.resume(),a instanceof AudioBuffer?((n=r.createBufferSource()).buffer=a,n.onended=function(){t(),u()},n.start(),n.connect(e)):((n=r.createOscillator()).type="sine",n.start(),(o=r.createGain()).gain.value=.5,n.connect(o),o.connect(e)),e.connect(i)},stop:t,isPlaying:function(){return void 0!==n},createBuffer:function(e,t){r.decodeAudioData(e,t)},set onended(e){u=e},getTimeDomainData:function(){return i.getFloatTimeDomainData(a),a},getFrequencyDomainData:function(){return i.getFloatFrequencyData(c),c},proc:e}})};function setupPlayerControls(e,t,n){function o(){e.isPlaying()?(document.getElementById("audio1").disabled=!0,document.getElementById("audio2").disabled=!0,document.getElementById("start").disabled=!0,document.getElementById("file-input").disabled=!0,document.getElementById("stop").disabled=!1):(document.getElementById("audio1").disabled=void 0!==t&&void 0===r,document.getElementById("audio2").disabled=void 0!==n&&void 0===i,document.getElementById("start").disabled=void 0===a,document.getElementById("file-input").disabled=!1,document.getElementById("stop").disabled=!0)}var r,i,a;t&&t.then(t=>{e.createBuffer(t,function(e){r=e,o()})}),n&&n.then(t=>{e.createBuffer(t,function(e){i=e,o()})}),e.onended=o,document.getElementById("audio1").onclick=function(t){e.start(),o()},document.getElementById("audio2").onclick=function(t){e.start(i),o()},document.getElementById("start").onclick=function(t){e.start(a),o()},document.getElementById("stop").onclick=function(t){e.stop(),o()},document.getElementById("file-input").addEventListener("change",function(t){var n=t.target.files[0];if(n){var r=new FileReader;r.onload=function(t){var n=t.target.result;e.createBuffer(n,function(t){a=t,e.start(a),o()})},r.readAsArrayBuffer(n)}},!1),o()}var makeFunctionGraph=function(e,t){var n=document.getElementById(t),o=n.width,r=n.height,i=n.getContext("2d"),a=!0,c=2e4,u=50,s=0,l=-80,d=function(e){return(c-u)*(e-25)/(o-25)+u},f=function(e){return u*Math.pow(10,Math.log10(c/u)*(e-25)/(o-25))},p=function(e){return(e-u)*(o-25)/c+25},m=function(e){return Math.log10(e/u)/Math.log10(c/u)*(o-25)+25},g=m,h=function(e){return 10+(r-10-25)/(l-s)*(e-s)},v=function(e){var t=Math.pow(10,Math.floor(Math.log10(e)));return(e/=t)>5?e=10:e>2?e=5:e>1&&(e=2),e*t},y=function(){var t=document.getElementById(e).getContext("2d");t.clearRect(0,0,o,r),t.textBaseline="middle",t.textAlign="end";for(var n=v((c-u)/(o-25)*30),i=v((s-l)/(r-25-10)*20),d=Math.floor(s/i)*i;d>=l;d-=i)t.strokeStyle="rgb(0, 0, 0)",t.strokeText(d,23,h(d)),t.strokeStyle="rgb(100, 100, 100)";if(t.textBaseline="top",t.textAlign="center",a){t.strokeStyle="rgb(0, 0, 0)";for(var f=Math.pow(10,Math.ceil(Math.log10(u)));f<=c;f*=10)t.strokeText(f,g(f),r-25+2)}else{t.strokeStyle="rgb(0, 0, 0)";for(f=Math.ceil(u/n)*n;f<=c;f+=n)t.strokeText(f,g(f),r-25+2)}for(d=Math.floor(s/i)*i;d>=l;d-=i)t.strokeStyle="rgb(100, 100, 100)",t.beginPath(),t.moveTo(g(u),h(d)),t.lineTo(g(c),h(d)),t.stroke();if(a){var p=Math.pow(10,Math.floor(Math.log10(u)));f=Math.ceil(u/p)*p;for(t.strokeStyle="rgb(100, 100, 100)";f<=c;){t.beginPath();var m=g(f);t.moveTo(m,h(s)),t.lineTo(m,h(l)),t.stroke(),(f+=p)>=9.99*p&&(p*=10)}}else for(f=Math.ceil(u/n)*n;f<=c;f+=n){t.beginPath();m=g(f);t.moveTo(m,h(s)),t.lineTo(m,h(l)),t.stroke()}t.rect(g(u),h(l),g(c)-g(u),h(s)-h(l)),t.stroke()};i.rect(25,10,o-25,r-25-10),i.clip();return{drawData:function(e,t){i.clearRect(0,0,o,r),i.strokeStyle="rgb(0, 0, 0)",i.beginPath(),i.moveTo(g(e[0]),h(t[0]));for(var n=1;n<t.length;n++)i.lineTo(g(e[n]),h(t[n]));i.stroke()},xlim:function(e,t){u=e,c=t,y()},ylim:function(e,t){l=e,s=t,y()},logx:function(e){!function(e){(a=e)?(f,g=m):(d,g=p),y()}(e)}}};