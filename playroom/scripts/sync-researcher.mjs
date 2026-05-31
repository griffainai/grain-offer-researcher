import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAYROOM = path.resolve(__dirname, "..");
const SRC = path.resolve(PLAYROOM, "..");
const DEST = path.join(PLAYROOM, ".researcher");
const FILES = ["CLAUDE.md", "identity.md", "rules.md", "anti-examples.md", "examples.md"];
const DIRS = ["reference"];

async function sourcePresent() {
  try { await fs.access(path.join(SRC, "rules.md")); return true; } catch { return false; }
}
async function copyFile(rel) {
  try {
    const data = await fs.readFile(path.join(SRC, rel));
    await fs.mkdir(path.dirname(path.join(DEST, rel)), { recursive: true });
    await fs.writeFile(path.join(DEST, rel), data);
    return true;
  } catch { return false; }
}
async function copyDir(rel) {
  let n = 0;
  try {
    for (const e of await fs.readdir(path.join(SRC, rel))) {
      if (e.endsWith(".md")) if (await copyFile(path.join(rel, e))) n++;
    }
  } catch {}
  return n;
}
async function main() {
  if (!(await sourcePresent())) { console.log("[sync] source not present — keeping committed mirror."); return; }
  await fs.rm(DEST, { recursive: true, force: true }).catch(() => {});
  await fs.mkdir(DEST, { recursive: true });
  let n = 0;
  for (const f of FILES) if (await copyFile(f)) n++;
  for (const d of DIRS) n += await copyDir(d);
  console.log(`[sync] mirrored ${n} files → .researcher/`);
}
main();
