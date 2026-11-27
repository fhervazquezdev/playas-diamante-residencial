const MAX_MESSAGE_LENGTH = 2000

const asText = (value, maxLength) => typeof value === 'string'
  ? value.trim().replace(/[\r\n]+/g, ' ').slice(0, maxLength)
  : ''

const json = (payload, status) => Response.json(payload, { status })

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido.' }), {
      status: 405,
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await context.request.json()
  } catch {
    return json({ error: 'Solicitud no válida.' }, 400)
  }

  const name = asText(body.name, 120)
  const email = asText(body.email, 254).toLowerCase()
  const phone = asText(body.phone, 50)
  const message = asText(body.message, MAX_MESSAGE_LENGTH)
  const source = asText(body.source, 80) || 'Sitio web'

  // Silently accept bot submissions caught by the hidden field.
  if (asText(body.website, 200)) return json({ ok: true }, 200)

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, '').length < 7) {
    return json({ error: 'Revisa tu nombre, correo electrónico y teléfono.' }, 400)
  }

  const { MAILGUN_API_KEY: apiKey, MAILGUN_DOMAIN: domain, MAILGUN_TO: to, MAILGUN_FROM: from, MAILGUN_API_BASE: apiBase = 'https://api.mailgun.net' } = context.env
  if (!apiKey || !domain || !to || !from) {
    console.error('Mailgun contact form is missing required environment variables.')
    return json({ error: 'El formulario no está disponible por el momento. Llámanos al (664) 609 6749.' }, 503)
  }

  const emailBody = [
    'Nueva solicitud desde Playas Diamante Residencial',
    '',
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Teléfono: ${phone}`,
    `Origen: ${source}`,
    '',
    'Mensaje:',
    message || '(Sin mensaje)',
  ].join('\n')

  const payload = new URLSearchParams({
    from,
    to,
    subject: `Nueva solicitud web — ${name}`,
    text: emailBody,
    'h:Reply-To': email,
  })

  try {
    const mailgunResponse = await fetch(`${apiBase.replace(/\/$/, '')}/v3/${encodeURIComponent(domain)}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`api:${apiKey}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    })

    if (!mailgunResponse.ok) {
      console.error('Mailgun rejected contact form submission:', mailgunResponse.status)
      return json({ error: 'No fue posible enviar tu solicitud. Inténtalo de nuevo o llámanos.' }, 502)
    }

    return json({ ok: true }, 200)
  } catch (error) {
    console.error('Mailgun contact form request failed:', error instanceof Error ? error.name : 'Unknown error')
    return json({ error: 'No fue posible enviar tu solicitud. Inténtalo de nuevo o llámanos.' }, 502)
  }
}
