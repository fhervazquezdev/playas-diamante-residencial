# Playas Diamante Residencial

## Contact form and Mailgun

The contact form posts to `/api/contact`. The included Cloudflare Pages Function validates the request, includes a honeypot for basic bot protection, and sends the lead through Mailgun. Secrets remain on the server.

1. Deploy this project with Cloudflare Pages using `npm run build` and `dist` as the output directory. Cloudflare automatically deploys `functions/api/contact.js` at `/api/contact`.
2. In **Pages > Settings > Variables and Secrets**, add the values from `.dev.vars.example` as encrypted secrets for the Preview and Production environments.
3. Verify the sender address/domain in Mailgun. `MAILGUN_FROM` must be a sender Mailgun allows, and `MAILGUN_TO` is the inbox that receives leads.
4. Submit a production test. The lead email's Reply-To is set to the visitor's email address.

For an EU Mailgun account, set `MAILGUN_API_BASE` to `https://api.eu.mailgun.net`.

## Analytics

GA4 measurement ID `G-N9QSJP0NGL` is included in `index.html`. A successful form submission also sends the GA4 `generate_lead` event.
