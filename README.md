# Homework Workspace

This repository keeps coursework organized in one place.

## Structure

- `assignments/` — work grouped by course and assignment
- `notes/` — class and study notes
- `resources/` — reference material that can be stored in Git
- `archive/` — completed or inactive coursework
- `site/` — the web app published through GitHub Pages

## Suggested workflow

Create one folder per course, then one folder per assignment:

```text
assignments/
  course-name/
    assignment-01/
```

For larger assignments, create a Git branch before starting:

```text
git switch -c course-name/assignment-01
```

Commit small, meaningful milestones and open a pull request when you want a review.

## Getting started

1. Create your course folders under `assignments/` and `notes/`.
2. Copy `.assignment-template/` when starting a new assignment.
3. Update this README with course-specific commands or deadlines.

## Publishing

Every push to `main` runs `.github/workflows/deploy-pages.yml` and publishes the
contents of `site/` to GitHub Pages. Put the submission's HTML, CSS, JavaScript,
and static assets in that folder.
