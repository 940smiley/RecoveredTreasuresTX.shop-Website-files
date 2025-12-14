# Google Vertex AI & Google Sites

Guidance for connecting Recovered Treasures TX to Google Cloud Vertex AI and embedding experiences into Google Sites.

## Vertex AI (Generative & Vision)
- **Use cases:** description generation, quality scoring, visual similarity, and OCR for provenance.
- **Environment variables:**
  - `GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json`
  - `PROJECT_ID`, `LOCATION` (e.g., `us-central1`)
- **Client setup (TypeScript example):**
  ```ts
  import { VertexAI } from '@google-cloud/vertexai';

  const vertex = new VertexAI({ project: process.env.PROJECT_ID!, location: process.env.LOCATION! });
  const model = vertex.preview.getGenerativeModel({ model: 'gemini-1.5-pro' });
  ```
- **Integration tips:**
  - Keep Vertex calls server-side in API routes under `app/api/**` to protect credentials.
  - Reuse the existing `useStaticData` flag to bypass Vertex when building for GitHub Pages or demos.
  - For image tasks, pair with Cloud Storage or signed upload URLs; avoid sending raw files from the client.

## Google Sites Embeds
- **Goal:** expose a lightweight browse or upload preview inside Google Sites.
- **Approach:**
  1. Export static pages (`next export`) and host on GitHub Pages/Firebase.
  2. In Google Sites, add **Embed → URL** pointing to the hosted static page (e.g., `https://<user>.github.io/RecoveredTreasuresTX.shop-Website-files/docs/`).
  3. Keep the page responsive and self-contained (no external scripts requiring auth).
- **Hardening:**
  - Avoid client-side secrets; rely on mock/static data.
  - Serve over HTTPS and test in incognito to confirm public access.

## Minimum Access Controls
- Use separate service accounts for Vertex with least privilege (only `aiplatform.*` as needed).
- Store service account JSON as a GitHub Actions secret and load via `GOOGLE_APPLICATION_CREDENTIALS` when deploying to compute targets.
