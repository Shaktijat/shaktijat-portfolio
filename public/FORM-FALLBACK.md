Form fallback (instructions)

This site can fall back to an external form endpoint (Formsubmit, Formspree, etc.) if Netlify Forms are not registering.

How to configure (local development / build):

1) Create a `.env` file in the project root (not committed to source control) with:

   VITE_FORM_ENDPOINT=https://formsubmit.co/ajax/youremail@example.com

   - For Formsubmit use the `/ajax/your-email` endpoint. Replace `youremail@example.com`.
   - For Formspree, sign up and get your endpoint URL and paste it here.

2) Rebuild the app: `npm run build` (or `npm run dev` for local dev)

3) The contact component will attempt the external endpoint if Netlify POST fails.

Notes:
- The fallback sends JSON to the external endpoint (most services accept JSON at their AJAX endpoints).
- If you prefer a pure native action without JS, you can replace the form action attribute with the external endpoint.
