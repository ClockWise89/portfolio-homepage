import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { test } from "node:test";

const output = new URL("../public/", import.meta.url);
const read = (path) => readFileSync(new URL(path, output), "utf8");

test("production domain is preserved in the published artifact", () => {
  assert.equal(read("CNAME").trim(), "christophervikner.se");
});

test("homepage contains the portfolio and section navigation", () => {
  const html = read("index.html");
  assert.ok(html.includes("Code and Crayons"));
  for (const section of ["home", "about", "skills", "experiences", "education"]) {
    assert.ok(html.includes(`id=${section}`) || html.includes(`id="${section}"`), section);
  }
});

test("critical styles, scripts, and icons are published", () => {
  for (const path of [
    "css/layouts/main.css", "css/style.css", "css/bootstrap.min.css",
    "js/main.js", "js/home.js", "js/bootstrap.min.js", "js/darkreader.js",
    "icons/moon-svgrepo-com.svg", "icons/sun-svgrepo-com.svg",
    "fontawesome/css/all.min.css", "google-fonts/Mulish/mulish.css",
  ]) {
    assert.ok(statSync(new URL(path, output)).size > 0, path);
  }
});

test("linked resume is published unchanged", () => {
  assert.deepEqual(
    readFileSync(new URL("files/resume.pdf", output)),
    readFileSync(new URL("../files/resume.pdf", import.meta.url)),
  );
});

test("search index is valid generated JSON", () => {
  assert.ok(Array.isArray(JSON.parse(read("index.json"))));
});

test("sitemap targets the HTTPS production domain", () => {
  assert.ok(read("sitemap.xml").includes("https://christophervikner.se/"));
});

test("fallback page is published", () => {
  assert.ok(read("404.html").includes("<html"));
});
