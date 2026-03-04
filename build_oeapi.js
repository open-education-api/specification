import { spawnSync } from "node:child_process";

function run(cmd, args, env = {}) {
  const r = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...env },
  });
  if (r.status !== 0) process.exit(r.status);
}

const [spec, json, yaml, zudokujson, webpad] = process.argv.slice(2);

if (!spec || !json || !yaml || !zudokujson || !webpad) {
  console.error(
    "Usage: node build_oeapi.js <spec:source/spec.yaml> <json:oeapi.json> <yaml:oeapi.yaml> <zudokujson:oeapi.zudoku.json> <webpad:/specification/unreleased>"
  );
  process.exit(1);
}

// bundle specification
run("npm", ["i", "-g", "@redocly/cli@latest"]);
run("redocly", ["bundle", spec, "-o", json]);
run("redocly", ["bundle", spec, "-o", yaml]);

// preprocess specification for zudoku
run("node", ["preprocess_zudoku.js", json, zudokujson]);

// build zudoku static website
run("npm", ["i", "zudoku", "react", "react-dom"]);
run("npx", ["zudoku", "build"], { ZUDOKU_BASEPATH: webpad });