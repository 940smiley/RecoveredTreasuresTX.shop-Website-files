# Available GitHub Actions

A quick reference for automation commonly used with this Next.js + Prisma project.

## CI/CD
- **Node build & lint**
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    lint:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 18
            cache: npm
        - run: npm ci
        - run: npm run lint
  ```

- **GitHub Pages (existing)** — see `.github/workflows/deploy.yml` for the configured Next.js static export pipeline.

## Quality & Security
- **ESLint with problem matchers**
  ```yaml
  - name: Lint
    run: npm run lint
  ```
- **Dependency review** (pull requests)
  ```yaml
  - uses: actions/dependency-review-action@v4
  ```
- **CodeQL (optional)**
  ```yaml
  - uses: github/codeql-action/init@v3
    with:
      languages: javascript
  - uses: github/codeql-action/analyze@v3
  ```

## Deployment
- **Vercel deploy** (if desired)
  ```yaml
  - uses: amondnet/vercel-action@v25
    with:
      vercel-token: ${{ secrets.VERCEL_TOKEN }}
      vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
  ```
- **Firebase Hosting preview** (see `docs/FirebaseHosting.md`)

## Triggers & Tips
- Use `workflow_dispatch` for manual Pages rebuilds.
- Add `paths-ignore` to skip workflows when only docs change, if desired.
- Cache `~/.npm` via `actions/setup-node` for faster installs.
