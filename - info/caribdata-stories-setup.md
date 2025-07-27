# CaribData Stories Blog Setup Instructions

This document describes how to set up the CaribData Stories blog using MkDocs Material with blog and RSS support, hosted in the folder:

```
C:\yasuki\Sync\output\analyse-python\caribdata-stories
```

---

## 1. Create Python Virtual Environment

Open a terminal in VSCode and run:

```bash
cd "C:\yasuki\Sync\output\analyse-python\caribdata-stories"
python -m venv venv-cd-stories
```

### Activate the virtual environment:

- PowerShell:
  ```bash
  .\venv-cd-stories\Scripts\Activate.ps1
  ```
- CMD:
  ```bash
  venv-cd-stories\Scripts\activate.bat
  ```

---

## 2. Create `requirements.txt`

Create a file named `requirements.txt` and add:

```txt
mkdocs-material~=9.5
mkdocs-blog-plugin~=0.27
mkdocs-git-revision-date-localized-plugin~=1.2
mkdocs-rss-plugin~=1.7
pymdown-extensions~=10.7
```

Then install:

```bash
pip install -r requirements.txt
```

---

## 3. Create Project Folder Structure

Inside the project folder:

```
caribdata-stories/
├── venv-cd-stories/                # Python virtual environment
├── docs/
│   ├── index.md                    # Homepage
│   ├── about.md                    # About page
│   └── blog/
│       ├── 2025-07-18-first-post.md
├── mkdocs.yml                      # Site configuration
├── .gitignore
├── requirements.txt
```

---

## 4. Example Blog Post

Create: `docs/blog/2025-07-18-first-post.md`

```markdown
---
title: Welcome to CaribData Stories
date: 2025-07-18
authors:
  - CaribData Team
tags:
  - intro
  - data sharing
---

This is the beginning of our Caribbean data storytelling journey. We'll use this space to share insights, tools, and experiences from the CaribData project.
```

---

## 5. Create `.gitignore`

```gitignore
# Virtual environment
venv-cd-stories/

# MkDocs build folder
site/

# Python cache
__pycache__/
*.py[cod]

# VSCode files
.vscode/
```

---

## 6. Create `mkdocs.yml`

```yaml
site_name: CaribData Stories
site_url: https://caribdata.org/stories

theme:
  name: material
  features:
    - navigation.tabs
    - navigation.top
    - content.action.edit
    - content.code.annotate
    - content.tabs.link
    - navigation.instant
    - blog
  language: en
  icon:
    logo: material/library
    repo: fontawesome/brands/github
  palette:
    scheme: default
    primary: blue
    accent: teal

plugins:
  - search
  - blog:
      blog_dir: blog
  - git-revision-date-localized:
      enable_creation_date: true
  - rss:
      match_path: blog/.*
      date_from_meta:
        as_datetime: true
      categories:
        from: tags

markdown_extensions:
  - admonition
  - toc:
      permalink: true
  - pymdownx.extra
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.emoji:
      emoji_index: !!python/name:materialx.emoji.twemoji
      emoji_generator: !!python/name:materialx.emoji.to_svg

nav:
  - Home: index.md
  - About: about.md
  - Blog:
      - blog/index.md

extra:
  social:
    - icon: fontawesome/brands/rss
      link: /rss.xml
```

---

## 7. GitHub Setup

### a. Create a GitHub Repo

Go to: https://github.com/new  
Create a new repo called `caribdata-stories`  
**Do not add** a README, .gitignore, or license

### b. Initialize Git Locally

```bash
cd "C:\yasuki\Sync\output\analyse-python\caribdata-stories"
git init
git remote add origin https://github.com/YOUR_USERNAME/caribdata-stories.git
```

### c. Commit and Push

```bash
git add .
git commit -m "Initial commit of CaribData Stories blog"
git branch -M main
git push -u origin main
```

---

## 8. Serve the Site Locally

```bash
mkdocs serve
```

Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 9. Deploy to GitHub Pages (optional)

```bash
pip install mkdocs-material[gh]
mkdocs gh-deploy
```

This builds the site and publishes it to the `gh-pages` branch of your GitHub repo.

---

## Notes

- `-r` in `pip install -r requirements.txt` means "install from requirement file".
- The `git-revision-date-localized` plugin uses your local Git history, so make sure you’ve committed files for dates to show.
