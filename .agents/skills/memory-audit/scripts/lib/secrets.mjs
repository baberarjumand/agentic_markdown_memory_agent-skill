const INJECTION = [
  /ignore\s+(?:all\s+)?previous\s+instructions/i,
  /ignore\s+all\s+prior/i,
  /disregard\s+the\s+above/i,
  /system\s+prompt/i,
  /you\s+must\s+always/i,
];

const SECRET = [
  /-----BEGIN/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bsk-[A-Za-z0-9]{20,}\b/,
  /\bghp_[A-Za-z0-9]{20,}\b/,
  /(?:key|token|secret)\s*[:=]\s*['"]?[A-Za-z0-9+/=]{32,}/i,
];

export function findInjectionLines(text) {
  const hits = [];
  const lines = text.replace(/\r/g, "").split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const re of INJECTION) {
      if (re.test(lines[i])) {
        hits.push({ line: i + 1 });
        break;
      }
    }
  }
  return hits;
}

export function findSecretLines(text) {
  const hits = [];
  const lines = text.replace(/\r/g, "").split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const re of SECRET) {
      if (re.test(lines[i])) {
        hits.push({ line: i + 1 });
        break;
      }
    }
  }
  return hits;
}
