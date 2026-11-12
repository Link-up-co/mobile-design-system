#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillSrc = resolve(__dirname, "../skills/linkup-mobile-design-system/SKILL.md");
const designSrc = resolve(__dirname, "../DESIGN.md");

const cmd = process.argv[2] || "install-skill";

if (cmd !== "install-skill" && cmd !== "init") {
  console.log("Usage: npx linkup-mds install-skill");
  process.exit(0);
}

const home = homedir();
const targets = [
  resolve(process.cwd(), ".claude/skills/linkup-mobile-design-system/SKILL.md"),
  resolve(process.cwd(), ".agents/skills/linkup-mobile-design-system/SKILL.md"),
  join(home, ".claude/skills/linkup-mobile-design-system/SKILL.md"),
  join(home, ".agents/skills/linkup-mobile-design-system/SKILL.md"),
  join(home, ".hermes/skills/web-design-guidelines/linkup-mobile-design-system/SKILL.md"),
];

const installed = [];
for (const dest of targets) {
  try {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(skillSrc, dest);
    installed.push(dest);
  } catch {
    // ignore permission errors on non-existent agent dirs
  }
}

if (existsSync(designSrc) && !existsSync(resolve(process.cwd(), "DESIGN.md"))) {
  try {
    copyFileSync(designSrc, resolve(process.cwd(), "DESIGN.md"));
    installed.push(resolve(process.cwd(), "DESIGN.md"));
  } catch {}
}

console.log("✅ @linkup/mobile-design-system 스킬 설치 완료:");
for (const p of installed) console.log(`  - ${p}`);
