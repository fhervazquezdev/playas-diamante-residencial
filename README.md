# Playas Diamante Residencial

## Contact form and Cloudflare Email Sending

The contact form posts to `/api/contact`. The included Cloudflare Pages Function validates the request, includes a honeypot for basic bot protection, and sends the lead through [Cloudflare Email Sending](https://developers.cloudflare.com/email-service/). Secrets remain on the server.

1. Deploy this project with Cloudflare Pages using `npm run build` and `dist` as the output directory. Cloudflare automatically deploys `functions/api/contact.js` at `/api/contact`.
2. In **Compute > Email Service > Email Sending**, onboard `playasdiamanteresidencial.com`. This adds the DNS records needed to authorize the sending domain.
3. Create an account API token with **Email Sending: Edit** permission, then add the values from `.dev.vars.example` as encrypted secrets for the Preview and Production environments in **Pages > Settings > Variables and Secrets**.
4. Set `CONTACT_EMAIL_FROM` to an address on the onboarded domain and `CONTACT_EMAIL_TO` to the inbox that receives leads. On the Workers Free plan, the receiving inbox must be a verified destination address.
5. Submit a production test. The lead email's Reply-To is set to the visitor's email address.

Cloudflare Email Sending currently requires Cloudflare DNS for the sending domain.

## Analytics

GA4 measurement ID `G-N9QSJP0NGL` is included in `index.html`. A successful form submission also sends the GA4 `generate_lead` event.
