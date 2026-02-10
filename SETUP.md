# Setup Instructions

## Contact Form Setup (Formspree)

1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form
4. Copy your form ID
5. Replace `YOUR_FORM_ID` in `src/components/Contact.tsx` with your actual form ID

Example: If your form endpoint is `https://formspree.io/f/xyzabc123`, replace `YOUR_FORM_ID` with `xyzabc123`

## Update Your Domain

Replace `https://yourportfolio.com` in the following files with your actual domain:
- `index.html` (canonical URL, Open Graph, Twitter meta tags)
- `public/sitemap.xml`

## GitHub Repository Links

Update the `githubRepo` links in `src/components/Projects.tsx` with your actual repository URLs.
