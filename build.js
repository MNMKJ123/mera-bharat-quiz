/* Wraps src/app.html (written for the Artifact host, which supplies its own
   <head>) into a complete standalone HTML document that works as a PWA:
   offline, installable, and openable straight off the filesystem. */
const fs = require("fs");

const src = fs.readFileSync("src/app.html", "utf8");

const split = src.indexOf('<div id="app">');
if (split < 0) throw new Error('could not find <div id="app"> in src/app.html');
const head = src.slice(0, split).trim();   // <title>, font <link>, <style>
const body = src.slice(split).trim();      // markup + all the script

const INSTALL = `
<style>
  .a2hs{
    position:fixed; left:50%; bottom:calc(14px + env(safe-area-inset-bottom,0px));
    transform:translateX(-50%); z-index:80;
    font-family:"Baloo 2","Nunito",sans-serif; font-weight:800; font-size:15px;
    padding:11px 18px; border-radius:999px; cursor:pointer;
    background:#FFB423; color:#2A1B4D; border:3px solid #2A1B4D;
    box-shadow:0 5px 0 #2A1B4D;
  }
  .a2hs:active{ transform:translateX(-50%) translateY(4px); box-shadow:0 1px 0 #2A1B4D; }
</style>
<button class="a2hs" id="a2hs" hidden>📲 Install this app</button>
<script>
(function(){
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('sw.js').catch(function(){});
    });
  }
  var deferred = null, btn = document.getElementById('a2hs');
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault(); deferred = e; btn.hidden = false;
  });
  btn.addEventListener('click', function(){
    if(!deferred) return;
    btn.hidden = true; deferred.prompt();
    deferred.userChoice.finally(function(){ deferred = null; });
  });
  window.addEventListener('appinstalled', function(){ btn.hidden = true; });
})();
<\/script>`;

const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="568 India general knowledge questions for Class 1 - play, learn and practise for the GK Olympiad.">
<meta name="theme-color" content="#FFF3DC" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#150E2B" media="(prefers-color-scheme: dark)">
<link rel="manifest" href="manifest.webmanifest">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Bharat Quiz">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" type="image/png" href="icon-192.png">
<style>
  /* the bits the Artifact host normally injects for us */
  :root{
    color-scheme: light dark;
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  html{ -webkit-text-size-adjust:100%; }
  body{ margin:0; }
  img{ max-width:100%; }
  [hidden]{ display:none !important; }
</style>
${head}
</head>
<body>
${body}
${INSTALL}
</body>
</html>
`;

fs.writeFileSync("index.html", out, "utf8");
console.log("index.html written:", (Buffer.byteLength(out, "utf8") / 1024).toFixed(0) + " KB");
