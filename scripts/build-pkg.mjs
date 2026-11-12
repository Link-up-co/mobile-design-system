import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

rmSync("dist", { recursive: true, force: true });
execSync("npx tsc -p tsconfig.pkg.json", { stdio: "inherit" });

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith(".js") || full.endsWith(".d.ts")) out.push(full);
  }
  return out;
}

function rewriteSpecifier(fromFile, spec) {
  if (!spec.startsWith("./") && !spec.startsWith("../")) return spec;
  if (/\.(js|mjs|cjs|json)$/.test(spec)) return spec;
  const baseDir = dirname(fromFile);
  const candidateFile = resolve(baseDir, `${spec}.js`);
  const candidateIndex = resolve(baseDir, spec, "index.js");
  if (existsSync(candidateFile)) return `${spec}.js`;
  if (existsSync(candidateIndex)) return `${spec.replace(/\/$/, "")}/index.js`;
  return spec;
}

for (const file of walk("dist")) {
  const src = readFileSync(file, "utf8");
  const next = src.replace(
    /((?:import|export)\s+(?:[^"']*?\s+from\s+)?["'])(\.\.?\/[^"']+)(["'])/g,
    (_, pre, spec, post) => `${pre}${rewriteSpecifier(file, spec)}${post}`,
  );
  if (next !== src) writeFileSync(file, next);
}
