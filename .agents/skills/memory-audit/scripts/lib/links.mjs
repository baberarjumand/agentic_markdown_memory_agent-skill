import fs from "node:fs";
import path from "node:path";

const MD_LINK = /\[([^\]]*)\]\(([^)]+)\)/g;

export function extractRelativeLinks(text) {
  const links = [];
  let m;
  const src = text.replace(/\r/g, "");
  while ((m = MD_LINK.exec(src)) !== null) {
    const href = m[2].trim().split(/\s+/)[0];
    if (!href) continue;
    if (/^(https?:|mailto:|#)/i.test(href)) continue;
    const filePart = href.split("#")[0];
    if (!filePart) continue;
    links.push({ href: filePart, raw: href });
  }
  return links;
}

export function resolveLink(fromFile, href, root) {
  const absFrom = path.resolve(root, fromFile);
  const target = path.resolve(path.dirname(absFrom), href);
  return target;
}

export function linkExists(fromFile, href, root) {
  const target = resolveLink(fromFile, href, root);
  try {
    return fs.existsSync(target);
  } catch {
    return false;
  }
}
