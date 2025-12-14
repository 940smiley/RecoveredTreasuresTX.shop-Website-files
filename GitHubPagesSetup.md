# GitHub Pages Setup

This guide keeps the project always Pages-ready, including the existing `CNAME` and `.nojekyll` files.

## Activation
1. Open **Settings → Pages** in GitHub.
2. Set **Source** to **GitHub Actions** (recommended) or choose the **`main`** branch with `/docs` if publishing static exports manually.
3. Confirm the custom domain `recoveredtreasurestx.shop` and ensure HTTPS is enforced.

## Branch & Build Options
- **Actions pipeline (preferred):** Uses `.github/workflows/deploy.yml` to build Next.js with `NEXT_PUBLIC_USE_STATIC_DATA=true`, upload `out/`, and deploy to Pages.
- **Docs branch/folder:** Export locally with `NEXT_PUBLIC_USE_STATIC_DATA=true next export` so that `out/` can be copied into `/docs` and served directly.
- Keep `.nojekyll` in the published folder to prevent Jekyll processing.

## Optional `/docs` Structure
```
/docs
  index.html        # Static demo landing page for GitHub Pages
  assets/           # (Optional) screenshots or static images
  data/             # (Optional) JSON mocks for static mode
```

## Theme Configuration
- Keep the project unthemed (raw HTML/CSS) for fastest loads, or use **minimal** theme if enabling Pages with `/docs`.
- For custom themes, ensure Tailwind output is pre-built or inline like the current `docs/index.html` page.

## Custom Domain & DNS
1. Point a CNAME record from `recoveredtreasurestx.shop` to `<username>.github.io`.
2. Add/keep the `CNAME` file at the repo root (and inside `out/` during deployments).
3. Enable **Enforce HTTPS** once the certificate is issued.

## Recommended CI/CD
- **Static build:**
  ```bash
  NEXT_PUBLIC_USE_STATIC_DATA=true npm run build
  npx next export
  ```
- **Action triggers:** `push` to `main` or manual `workflow_dispatch`.
- **Artifacts:** Upload `out/` via `actions/upload-pages-artifact@v3` then deploy with `actions/deploy-pages@v4` (already configured).

## Demo & Validation
- Preview locally with `npx serve out` after exporting.
- Validate links and images before publishing.

## Troubleshooting
- If env validation fails, set dummy values matching `.env.example` for build-only contexts.
- Clear the Pages cache by re-running the workflow on `main` when assets change.
- When using a `/docs` branch/folder, ensure `docs/` stays committed and up to date with `next export` output.
