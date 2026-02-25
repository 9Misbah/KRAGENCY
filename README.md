# KR Agency Website

Static marketing website for KR Agency (water distribution service), built with plain HTML, CSS, and JavaScript.

## Tech Stack

- HTML5 (`index.html`)
- CSS3 (`style.css`)
- Vanilla JavaScript (`script.js`)
- External assets:
  - Google Fonts
  - Font Awesome CDN

## Project Structure

```text
kr-water-agency/
|- index.html   # Main page markup and all sections
|- style.css    # Site styling and responsive rules
|- script.js    # Navbar, animations, smooth scroll, contact form submit
```

## Local Setup

No build tools or package installation are required.

### Option 1: Open directly

1. Open `index.html` in your browser.

### Option 2: Run a local server (recommended)

From this folder:

```powershell
python -m http.server 5500
```

Then open:

`http://localhost:5500`

This option is better for testing form/network requests and browser console logs.

## Contact Form Setup

The contact form is submitted from `script.js` using `fetch` and `FormData`.

- Form ID: `contactForm`
- Endpoint configured in `script.js`:
  - `const scriptUrl = 'https://script.google.com/macros/s/AKfycbwAc7aDq83CbLXqbblk6giE0DSCZl518N28MIAhfA2IwN62-XuKQrRtXeihEpkTZmZm/exec';`

### Required form field names

Make sure these input names remain unchanged if your Apps Script expects them:

- `name`
- `phone`
- `email`
- `message`

## Google Apps Script Checklist

If submissions are not appearing in the Google Sheet:

1. Verify Web App deployment uses the correct `/exec` URL.
2. Re-deploy after script changes (`Deploy` -> `Manage deployments` -> `Edit` -> `Deploy`).
3. Confirm access settings:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone` (or suitable public setting for your use case)
4. Confirm Spreadsheet ID and sheet name in `doPost(e)` are correct.
5. Check Apps Script logs:
   - Open Apps Script project -> `Executions` -> select latest run -> inspect logs/errors.
6. Check browser console for frontend logs:
   - `Apps Script response: ...`
   - `Form submission error: ...`

## Editing Content

- Update text, sections, links, and contact details in `index.html`.
- Update colors/layout/responsive behavior in `style.css`.
- Update interactivity and form submission logic in `script.js`.

## Deployment

You can host this site on any static hosting provider:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

Upload `index.html`, `style.css`, and `script.js` together in the same directory.
