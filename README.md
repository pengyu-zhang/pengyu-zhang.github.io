# pengyu-zhang.github.io

Personal academic homepage of **Pengyu Zhang**, Ph.D. candidate in Computer
Science at the University of Amsterdam.

**Live site: <https://pengyu-zhang.github.io/>**

## Stack

- [Jekyll](https://jekyllrb.com/) site, built natively by GitHub Pages
  (classic Pages build, `github-pages` gem).
- Started from the [acad-homepage](https://github.com/RayeRen/acad-homepage.github.io)
  template by Yi Ren, since rebuilt: card-based four-tab layout with PJAX
  navigation, light/dark theme, self-hosted Inter font, inline SVG icons,
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
- `_includes/` their content fragments (about, education, awards, skills,
  experience tiles, publications, news) plus the layout partials
- `_sass/` design tokens and components (`_theme.scss`), Inter faces (`_fonts.scss`)
- `assets/` stylesheet entry, fonts, and `js/site.js`
- `images/`, `pdf/` figures, photos, papers, and CV

## License

Template and site code are MIT licensed (see [LICENSE](LICENSE)). Site
content is not: all text, images, and PDFs are copyright Pengyu Zhang or
their respective publishers.
