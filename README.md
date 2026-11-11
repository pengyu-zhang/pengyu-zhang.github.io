# pengyu-zhang.github.io

Personal academic homepage of **Pengyu Zhang**, PhD candidate in Computer
Science at the University of Amsterdam.

**Live site: <https://pengyu-zhang.github.io/>**

## Stack

- [Jekyll](https://jekyllrb.com/) site, built natively by GitHub Pages
  (classic Pages build, `github-pages` gem).
- Started from the [acad-homepage](https://github.com/RayeRen/acad-homepage.github.io)
  template by Yi Ren, since rebuilt: card-based four-tab layout with PJAX
  navigation, light/dark theme, self-hosted IBM Plex fonts, inline SVG icons,
  vanilla-JS lightbox. No jQuery, no icon fonts.

## Local preview

```sh
bundle install            # ruby 3.3; Gemfile.lock pins github-pages 232,
bundle exec jekyll serve  # the same versions GitHub Pages builds with
```

Then open <http://localhost:4000>. Changes to `_config.yml` need a server
restart; everything else reloads on save.

## Layout

- `_pages/` the four pages (Home, Experience, Publications, Beyond)
- `_data/publications.yml` every paper, once: the Publications list, its
  structured data and the link rows on Experience are generated from it
- `_includes/` the content fragments (about, education, awards, skills,
  experience tiles, news) plus the layout partials
- `_sass/` design tokens and components (`_theme.scss`), font faces (`_fonts.scss`)
- `assets/` stylesheet entry, fonts, and `js/site.js`
- `images/` figures and photos; `sm/` holds the small copies the pages show,
  `hd/` the large copies the lightbox opens
- `pdf/` papers, slides, and CV

## License

Template and site code are MIT licensed (see [LICENSE](LICENSE)). Site
content is not: all text, images, and PDFs are copyright Pengyu Zhang or
their respective publishers.
