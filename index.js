const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const cluster = require("cluster");
const os = require("os");
const helmet = require("helmet");
const logger = require("morgan");
app.use(logger("combined"));
const numCPUs = os.cpus().length;

// nodeのクラスター化処理
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

  // APIルーティング
  const router = require("./api/routes/index");
  app.use("/api/v1/", router);
  app.listen(port);
  console.info("Server is UP");
}
