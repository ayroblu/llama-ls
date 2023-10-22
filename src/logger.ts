import fs from "fs";
import path from "path";
import util from "util";

const rootDir = path.resolve(process.env.HOME ?? "/", ".llama_ls");
const logFile = path.join(rootDir, "out.log");
fs.mkdirSync(rootDir, { recursive: true });

export function log(...args: Array<unknown>) {
  const textArr = args.map((arg) =>
    util.inspect(arg, { showHidden: false, depth: null, colors: false }),
  );
  const date = new Date().toISOString();
  fs.appendFileSync(logFile, `${date}: ${textArr.join(" ")}\n`);
}
