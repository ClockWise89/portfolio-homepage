# Portfolio Homepage

Static Hugo site for `christophervikner.se`.

## Build

```sh
hugo --minify
```

The GitHub Pages workflow builds with Hugo Extended `0.113.0` and deploys the generated `public/` directory.

## Theme

The active theme is the vendored `themes/toha-3.8.0` theme configured in `config.yaml`.

The older `hugo-creative-portfolio-theme` fork was removed from this repository because it was no longer referenced by the active Hugo config and the fork had not been updated since 2017. Keeping inactive vendored theme code made dependency and security auditing noisier without changing the generated site.

Toha upstream is now maintained under `hugo-themes/toha`, with newer major releases available. This repository keeps the current Toha 3.8 theme and Hugo `0.113.0` for now because Hugo `0.162.1` does not complete a build with this vendored theme. Upgrade Toha and Hugo together as a separate visual regression-tested task.
