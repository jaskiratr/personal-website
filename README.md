# jaskirat.org

Personal portfolio and blog for Jaskirat, built with [Astro](https://astro.build).

## Stack

- **Framework:** Astro 6 (static output)
- **Styling:** Global CSS with dark mode support
- **Content:** Markdown collections for blog posts and projects
- **Feeds:** RSS (`/rss.xml`), sitemap, `llms.txt`
- **Deployment:** Static build to GitHub Pages

## Getting Started

Requires Node >= 22.12.

```sh
npm install
npm run dev       # http://localhost:4321
```

## Commands

| Command             | Description                          |
| :------------------ | :----------------------------------- |
| `npm run dev`       | Start dev server                     |
| `npm run build`     | Build static site to `./dist/`       |
| `npm run preview`   | Preview production build locally     |

## Project Structure

```text
src/
  components/   # Astro components (Nav, Footer, DarkModeToggle, etc.)
  content/      # Markdown collections (blog/, projects/)
  layouts/      # Page layouts
  pages/        # File-based routing
    blog/       # Blog listing and post pages
    projects/   # Project detail pages
    rss.xml.ts  # RSS feed
    llms.txt.ts # LLM-readable site summary
  styles/       # Global stylesheets
  utils/        # Shared helpers
public/         # Static assets (fonts, images, CNAME)
```
