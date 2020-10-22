const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const cluster = require("cluster");
const os = require("os");
const helmet = require("helmet");
const logger = require("morgan");
app.use(logger("combined"));
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    console.info(" worker %dを起動します。", i);
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.error(
      " worker %d が停止しました。 (%s).",
      worker.process.pid,
      signal || code
    );
    cluster.fork();
  });
} else {
  // Middlewareの設定
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(port);
  console.info("Server is UP");
}
