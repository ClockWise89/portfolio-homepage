import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

const output = pathToFileURL(resolve(process.env.SITE_OUTPUT_DIR ?? "public") + sep);
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
    "css/layouts/main.css", "css/style.css", "css/bootstrap.min.css", "css/portfolio.css",
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
  const index = JSON.parse(read("index.json"));
  assert.ok(Array.isArray(index));
  assert.equal(index.find((page) => page.permalink.endsWith("/portfolio/cybm/")).date, "Feb 2017 - Mar 2018");
  const sleepCycle = index.find((page) => page.permalink.endsWith("/portfolio/sleepcycle/"));
  assert.ok(sleepCycle.summary.includes("iOS & Android"));
  assert.ok(!sleepCycle.summary.includes("<p>"));
});

test("sitemap targets the HTTPS production domain", () => {
  assert.ok(read("sitemap.xml").includes("https://christophervikner.se/"));
});

test("fallback page is published", () => {
  assert.ok(read("404.html").includes("<html"));
});

test("homepage reflects the current CV and concurrent work history", () => {
  const html = read("index.html");
  for (const text of [
    "Senior iOS Developer (Contract)", "Sep 2023", "Aug 2023",
    "CYBM", "New Minds", "after-work", "unfinished",
    "SwiftUI", "GDScript", "OpenAPI", "Codex", "MCP",
  ]) {
    assert.ok(html.includes(text), text);
  }
  assert.ok(!html.includes("9 years of working experience"));
  assert.ok(html.includes("/portfolio/"));
  assert.ok(html.includes("/contact/"));
  assert.ok(!html.includes("mailto:mailto:"));
});

test("legacy profile pages render meaningful current content", () => {
  for (const [path, text] of [
    ["about/index.html", "New Minds"],
    ["expertise/index.html", "GDScript"],
    ["contact/index.html", "mailto:christopher.vikner@gmail.com"],
  ]) {
    const html = read(path);
    assert.ok(html.includes("<h1"), path);
    assert.ok(html.includes(text), `${path}: ${text}`);
  }
});

test("portfolio exposes current work and assignment periods", () => {
  const index = read("portfolio/index.html");
  for (const project of ["hiq-current", "sleepcycle", "cybm", "hiq", "mjolnir"]) {
    assert.ok(index.includes(`/portfolio/${project}/`), project);
    const article = read(`portfolio/${project}/index.html`);
    assert.ok(article.includes("Back to Portfolio"), project);
    assert.ok(!article.includes('href="/posts/"'), project);
    assert.ok(!article.includes("Thursday, November 5, 2015"), project);
  }
  assert.ok(read("portfolio/hiq-current/index.html").includes("Godot"));
  assert.ok(read("portfolio/cybm/index.html").includes("after-work"));
  assert.ok(read("portfolio/cybm/index.html").includes("Feb 2017 - Mar 2018"));
});

test("unused archives redirect to the portfolio instead of rendering empty pages", () => {
  for (const route of ["posts", "notes", "categories", "tags"]) {
    const html = read(`${route}/index.html`);
    assert.ok(/http-equiv=["']?refresh/.test(html), route);
    assert.ok(html.includes("https://christophervikner.se/portfolio/"), route);
  }
});

test("known spelling errors do not reappear in published portfolio copy", () => {
  const paths = ["index.html", "about/index.html", "expertise/index.html",
    "contact/index.html", "portfolio/sleepcycle/index.html", "portfolio/cybm/index.html",
    "portfolio/hiq/index.html", "portfolio/mjolnir/index.html"];
  for (const path of paths) {
    const html = read(path);
    for (const typo of ["studing", "an consultant", "Blekinges", "others where moving", "Testflight", "Okt 2015"]) {
      assert.ok(!html.includes(typo), `${path}: ${typo}`);
    }
  }
});
