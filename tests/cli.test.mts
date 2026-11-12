import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

test("linkup-mds CLI installs comprehensive SKILL.md and DESIGN.md into target workspace", () => {
  const tempProject = mkdtempSync(join(tmpdir(), "mds-cli-test-"));
  try {
    const cliPath = new URL("../bin/cli.mjs", import.meta.url).pathname;
    execFileSync("node", [cliPath, "install-skill"], {
      cwd: tempProject,
      env: { ...process.env, HOME: tempProject },
    });
    const skillDest = join(tempProject, ".claude/skills/linkup-mobile-design-system/SKILL.md");
    assert.ok(existsSync(skillDest));
    assert.ok(existsSync(join(tempProject, ".agents/skills/linkup-mobile-design-system/SKILL.md")));
    assert.ok(existsSync(join(tempProject, "DESIGN.md")));

    const skillText = readFileSync(skillDest, "utf8");
    assert.match(skillText, /github:Link-up-co\/mobile-design-system/);
    assert.match(skillText, /npx linkup-mds install-skill/);
    assert.match(skillText, /@source/);
  } finally {
    rmSync(tempProject, { recursive: true, force: true });
  }
});
