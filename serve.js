/* Serves this folder on your Wi-Fi so the phone can open and install the app.
   No dependencies - just: node serve.js
   Stop it with Ctrl+C. */
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const zlib = require("zlib");

const PORT = Number(process.argv[2]) || 8080;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".css": "text/css; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split("?")[0]);
  if (rel === "/" || rel === "") rel = "/index.html";

  // keep the request inside this folder
  const file = path.join(ROOT, path.normalize(rel).replace(/^([/\\])+/, ""));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found: " + rel);
      return;
    }
    const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
    const head = { "Content-Type": type, "Cache-Control": "no-cache", "Service-Worker-Allowed": "/" };
    /* text compresses about four times over, so send it gzipped */
    const wants = String(req.headers["accept-encoding"] || "");
    if (/text|javascript|json|manifest/.test(type) && wants.indexOf("gzip") >= 0) {
      head["Content-Encoding"] = "gzip";
      res.writeHead(200, head);
      res.end(zlib.gzipSync(data));
      return;
    }
    res.writeHead(200, head);
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  const addrs = [];
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const n of nets[name]) {
      if (n.family === "IPv4" && !n.internal) addrs.push({ name, ip: n.address });
    }
  }

  console.log("");
  console.log("  Mera Bharat Quiz is being served.");
  console.log("  " + "-".repeat(46));
  console.log("  On this PC : http://localhost:" + PORT);
  if (addrs.length) {
    console.log("");
    console.log("  On the phone (same Wi-Fi), open:");
    addrs.forEach((a) => console.log("     http://" + a.ip + ":" + PORT + "   (" + a.name + ")"));
  } else {
    console.log("\n  No Wi-Fi address found - connect this PC to Wi-Fi and restart.");
  }
  console.log("");
  console.log("  Android: Chrome menu -> Install app / Add to Home screen");
  console.log("  iPhone : Safari Share button -> Add to Home Screen");
  console.log("");
  console.log("  Press Ctrl+C to stop.");
  console.log("");
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error("\n  Port " + PORT + " is busy. Try:  node serve.js 8081\n");
  } else {
    console.error(e);
  }
  process.exit(1);
});
