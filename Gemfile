source "https://rubygems.org"

# github-pages pins every dependency to the versions GitHub Pages builds with;
# Gemfile.lock resolves it to github-pages 232 / jekyll 3.10.
gem "github-pages", group: :jekyll_plugins

# Windows file watcher for a native (non-Docker) jekyll serve
gem "wdm", "~> 0.1.0" if Gem.win_platform?

group :jekyll_plugins do
  gem "jekyll-sitemap"
end
