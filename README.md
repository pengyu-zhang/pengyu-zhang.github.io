# pengyu-zhang.github.io

Personal academic homepage of **Pengyu Zhang**, Ph.D. candidate in Computer
Science at the University of Amsterdam.

**Live site: <https://pengyu-zhang.github.io/>**

## Stack

- [Jekyll](https://jekyllrb.com/) site, built natively by GitHub Pages
  (classic Pages build, `github-pages` gem).
- Started from the [acad-homepage](https://github.com/RayeRen/acad-homepage.github.io)
  template by Yi Ren, since heavily reworked: card-based four-tab layout with
  PJAX navigation, light/dark theme, self-hosted Inter font, inline SVG icons,
  vanilla-JS lightbox. No jQuery, no icon fonts.
- A scheduled GitHub Action (`.github/workflows/google-scholar-stats.yml`)
  refreshes Google Scholar citation counts daily into the
  `google-scholar-stats` branch; the site fills them in client-side.

## Local preview

```sh
bundle install          # ruby 3.3; Gemfile.lock pins github-pages 232,
bundle exec jekyll serve  # the same versions GitHub Pages builds with
```

Then open <http://localhost:4000>. Changes to `_config.yml` need a server
restart; `_pages/includes/*.md` fragments are not watched as dependencies,
so touch the parent page in `_pages/` to trigger a rebuild.

## Layout

- `_pages/` the four pages (Home, Experience, Publications, Beyond);
  `_pages/includes/` holds their content fragments
- `_sass/`, `assets/` styles, fonts, and JS
- `images/`, `pdf/` figures, photos, papers, and CV
- `google_scholar_crawler/` the citation crawler run by the scheduled workflow

## License

Template and site code are MIT licensed (see [LICENSE](LICENSE)). Site
content is not: all text, images, and PDFs are copyright Pengyu Zhang or
their respective publishers.
