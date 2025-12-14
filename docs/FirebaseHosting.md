# Firebase Hosting Setup ("fire host")

Use this guide to publish a static export of Recovered Treasures TX to Firebase Hosting.

## Prerequisites
- Firebase CLI (`npm i -g firebase-tools`)
- Firebase project with Hosting enabled
- Node 18+

## Steps
1. **Login & init**
   ```bash
   firebase login
   firebase init hosting
   ```
   - Choose **Use an existing project**.
   - Set **public directory** to `out`.
   - Answer **Single-page app** with **Yes** to rewrite to `/index.html`.

2. **Build static output**
   ```bash
   NEXT_PUBLIC_USE_STATIC_DATA=true npm run build
   npx next export
   ```

3. **Add minimal config**
   ```json
   // firebase.json
   {
     "hosting": {
       "public": "out",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [{ "source": "**", "destination": "/index.html" }]
     }
   }
   ```

4. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

## Notes
- Static mode avoids database and AI key requirements, perfect for demos.
- Keep `CNAME` out of the Firebase deploy unless you map a custom domain via Firebase Console.
- For CI, add a GitHub Action with `firebase-actions/firebase-hosting-deploy@v1` and the `FIREBASE_SERVICE_ACCOUNT` secret.
