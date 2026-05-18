import { chmod, mkdir, access, readdir } from "fs/promises";
import { createWriteStream } from "fs";
import { execFile } from "child_process";
import { promisify } from "util";
import os from "os";
import path from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const execFileAsync = promisify(execFile);

const TECTONIC_VERSION = "0.15.0";
const TECTONIC_RELEASE_BASE = `https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%40${TECTONIC_VERSION}`;

function tectonicDir(): string {
  return path.join(os.tmpdir(), "bevilacqua-tectonic");
}

function resolveBinaryTarget(): { url: string; binName: string; archiveType: "zip" | "tar" } {
  if (process.platform === "win32") {
    return {
      url: `${TECTONIC_RELEASE_BASE}/tectonic-${TECTONIC_VERSION}-x86_64-pc-windows-msvc.zip`,
      binName: "tectonic.exe",
      archiveType: "zip",
    };
  }
  return {
    url: `${TECTONIC_RELEASE_BASE}/tectonic-${TECTONIC_VERSION}-x86_64-unknown-linux-gnu.tar.gz`,
    binName: "tectonic",
    archiveType: "tar",
  };
}

async function downloadFile(url: string, destination: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`Falha ao baixar Tectonic (${response.status}).`);
  }
  await pipeline(Readable.fromWeb(response.body as never), createWriteStream(destination));
}

async function localizarBinario(dir: string, binName: string): Promise<string | null> {
  async function walk(current: string): Promise<string | null> {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isFile() && entry.name === binName) return full;
      if (entry.isDirectory()) {
        const found = await walk(full);
        if (found) return found;
      }
    }
    return null;
  }
  return walk(dir);
}

async function extractArchive(archivePath: string, destDir: string, archiveType: "zip" | "tar"): Promise<void> {
  await mkdir(destDir, { recursive: true });
  if (archiveType === "zip") {
    const { default: AdmZip } = await import("adm-zip");
    const zip = new AdmZip(archivePath);
    zip.extractAllTo(destDir, true);
    return;
  }
  await execFileAsync("tar", ["-xzf", archivePath, "-C", destDir]);
}

export async function obterTectonic(): Promise<string> {
  const { url, binName, archiveType } = resolveBinaryTarget();
  const dir = tectonicDir();
  const binPath = path.join(dir, binName);

  try {
    await access(binPath);
    return binPath;
  } catch {
    // continua para download
  }

  await mkdir(dir, { recursive: true });
  const archivePath = path.join(dir, archiveType === "zip" ? "tectonic.zip" : "tectonic.tar.gz");
  await downloadFile(url, archivePath);
  await extractArchive(archivePath, dir, archiveType);

  const resolved = (await localizarBinario(dir, binName)) ?? binPath;

  try {
    await access(resolved);
  } catch {
    throw new Error("Falha ao preparar o compilador LaTeX automático (Tectonic).");
  }

  if (process.platform !== "win32") {
    await chmod(resolved, 0o755);
  }

  return resolved;
}

export async function compilarLatex(texPath: string, outDir: string): Promise<void> {
  const tectonic = await obterTectonic();
  await execFileAsync(tectonic, [texPath, "--outdir", outDir], {
    timeout: 120_000,
    maxBuffer: 10 * 1024 * 1024,
  });
}
