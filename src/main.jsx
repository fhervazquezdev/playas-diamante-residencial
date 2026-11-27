import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const homes = [
  { slug: 'master-suite', name: 'Master Suite', image: '/assets/master-suite.jpg', tag: 'Amplia y luminosa', price: '$865 USD / mes', type: 'Departamento · 1 recámara · 1 baño', intro: 'Un departamento amplio y luminoso, con una vista al mar que acompaña cada momento.', ideal: 'Ideal para una persona o pareja.', features: ['1 recámara con clóset y 1 baño', 'Cocina integral, cuarto de lavar y sala / comedor', 'Vista al mar y estacionamiento', 'Agua, luz y gas incluidos en la renta'], highlights: ['Seguridad 24 horas', 'Lavandería y tiendita', 'Equipo de mantenimiento'] },
  { slug: 'amatista', name: 'Amatista', image: '/assets/amatista.jpg', tag: 'Un refugio para ti', price: '$995 USD / mes', fee: '$1,300 MXN de mantenimiento', type: 'Casa · 3 recámaras · 2.5 baños', intro: 'Una casa con vista al mar, espacios generosos y el ritmo tranquilo de Playas de Tijuana.', ideal: 'Pensada para una vida familiar, cómoda y conectada.', features: ['3 recámaras y 2 baños completos + medio baño', 'Sala, cocina, comedor y cuarto de lavar', '2 balcones, azotea y clóset adicional', 'Estacionamiento privado para 3 vehículos'], highlights: ['Casa club y áreas verdes', 'Asador y juegos para niños', 'Seguridad y registro de visitas'] },
  { slug: 'turquesa', name: 'Turquesa', image: '/assets/turquesa.jpg', tag: 'Vive con estilo', price: '$1,075 USD / mes', fee: '$1,300 MXN de mantenimiento', type: 'Casa · 3 recámaras · 3 baños', intro: 'Una casa distribuida en cuatro niveles para disfrutar el espacio, la privacidad y una gran vista al mar.', ideal: 'Ideal para quien busca una casa amplia en una comunidad segura.', features: ['3 recámaras y 3 baños completos', 'Cocina integral y cuarto de lavar', '3 espacios de estacionamiento', 'Tanque de gas estacionario y boiler de paso'], highlights: ['Vista panorámica al mar', 'Seguridad 24 horas', 'Ambiente familiar'] },
  { slug: 'suite', name: 'Suite', image: '/assets/suite.jpg', tag: 'Comodidad diaria', price: '$500 USD / mes', type: 'Estudio · 1 baño', intro: 'Un estudio práctico y sereno para hacer de la vista al mar parte de tu día a día.', ideal: 'Ideal para una persona o pareja. Se permite una mascota pequeña.', features: ['Estudio independiente con cocina, estufa y clóset', 'Un baño completo y vista al mar', 'Estacionamiento', 'Agua y luz incluidos en la renta'], highlights: ['Acceso controlado', 'Seguridad 24 horas', 'Atardeceres desde tu ventana'] },
  { slug: 'penthouse', name: 'Penthouse', image: '/assets/penthouse.jpg', tag: 'Tu espacio en las alturas', price: '$1,475 USD / mes', type: 'Penthouse · 2 recámaras · 2.5 baños', intro: 'Un penthouse espacioso para descansar, recibir y disfrutar una perspectiva privilegiada de Playas.', ideal: 'Ideal para una persona o pareja. Contrato de arrendamiento de un año.', features: ['Recámara principal con walk-in clóset, baño y jacuzzi', 'Segundo dormitorio, oficina o estudio', 'Balcón privado con vista al mar', 'Cocina equipada y área de lavado con lavadora y secadora'], highlights: ['Aire acondicionado', 'Estacionamiento', 'Comunidad cerrada y seguridad 24 horas'] },
  { slug: 'nuevas-suites', name: 'Nuevas Suites', image: '/assets/nuevas-suites.jpg', tag: 'Una nueva forma de habitar', price: 'Consulta disponibilidad', type: 'Estudio nuevo · 1 baño', intro: 'Un estudio nuevo con balcón y vista al mar, creado para una forma de vivir más ligera y conectada.', ideal: 'Ideal para una persona, estudiantes o una pareja. Mascotas pequeñas con costo extra.', features: ['Cocina integral, parrilla eléctrica y refrigerador', 'Clóset, baño completo y balcón con vista al mar', 'Estacionamiento asignado', 'Agua y luz incluidos en la renta'], highlights: ['Edificio nuevo', 'Lavandería y tiendita', 'Seguridad 24 horas'] },
]

const modelFromPath = () => homes.find((home) => window.location.pathname.replace(/\/$/, '').endsWith(`/${home.slug}`)) || null

function ModelLeadForm({ home }) {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'No fue posible enviar tu solicitud.')
      form.reset()
      setStatus({ type: 'success', message: 'Gracias. Recibimos tu solicitud y nos pondremos en contacto contigo pronto.' })
      window.gtag?.('event', 'generate_lead', { form_id: `model-${home.slug}`, lead_source: home.name })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'No fue posible enviar tu solicitud. Inténtalo de nuevo o llámanos.' })
    } finally { setIsSubmitting(false) }
  }

  return <form className="model-form" onSubmit={submit} noValidate>
    <label>Nombre<input required name="name" autoComplete="name" minLength="2" placeholder="¿Cómo te llamas?" /></label>
    <label>Correo electrónico<input required type="email" name="email" autoComplete="email" placeholder="tu@correo.com" /></label>
    <label>Teléfono<input required type="tel" name="phone" autoComplete="tel" minLength="7" placeholder="(664) 000 0000" /></label>
    <label>Mensaje<textarea name="message" rows="3" maxLength="2000" placeholder={`Me interesa conocer ${home.name}`} /></label>
    <label className="form-honeypot" aria-hidden="true">No llenar<input name="website" tabIndex="-1" autoComplete="off" /></label>
    <input type="hidden" name="source" value={`Landing ${home.name}`} />
    <button className="button button-dark" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando…' : <>Solicitar información <span>→</span></>}</button>
    {status.message && <p className={`model-form-notice model-form-notice-${status.type}`} role="status">{status.message}</p>}
  </form>
}

function ModelPage({ home }) {
  const goHome = () => { window.location.href = '/' }
  const scrollToForm = () => document.getElementById('informacion')?.scrollIntoView({ behavior: 'smooth' })
  const otherHomes = homes.filter((item) => item.slug !== home.slug).slice(0, 3)

  return <main className="model-page">
    <header className="site-header model-header">
      <button className="brand" onClick={goHome} aria-label="Ir al inicio"><img src="/assets/logo-playas.png" alt="Playas Diamante Residencial" /></button>
      <nav className="model-nav"><button onClick={goHome}>Residencias</button><a href="tel:+526646096749">(664) 609 6749</a><button className="nav-cta" onClick={scrollToForm}>Agenda una visita <span>→</span></button></nav>
    </header>
    <section className="model-hero">
      <img src={home.image} alt={home.name} />
      <div className="model-hero-overlay"></div>
      <div className="model-hero-copy"><p className="eyebrow light">Playas Diamante · Modelo residencial</p><h1>{home.name}</h1><p>{home.intro}</p><button className="button button-light" onClick={scrollToForm}>Consultar disponibilidad <span>↓</span></button></div>
      <p className="model-hero-count">{String(homes.indexOf(home) + 1).padStart(2, '0')} / 06</p>
    </section>
    <section className="model-summary">
      <div><p className="eyebrow">Tu próximo espacio</p><h2>{home.type}</h2><p className="model-ideal">{home.ideal}</p></div>
      <div className="model-price"><p>Renta mensual</p><strong>{home.price}</strong>{home.fee && <span>{home.fee}</span>}</div>
    </section>
    <section className="model-details"><div><p className="eyebrow">Una vida bien pensada</p><h2>Todo lo que necesitas,<br /><em>cerca del mar.</em></h2></div><ul>{home.features.map((feature) => <li key={feature}><span>✦</span>{feature}</li>)}</ul></section>
    <section className="model-living"><div className="model-living-image"><img src="/assets/about.jpg" alt="Vista de Playas Diamante Residencial" /></div><div className="model-living-copy"><p className="eyebrow light">Vivir en Playas Diamante</p><h2>Más que un hogar,<br /><em>una manera de vivir.</em></h2><p>Disfruta un residencial privado con vista panorámica al mar y espacios pensados para tu tranquilidad.</p><div className="model-highlight-list">{home.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div></div></section>
    <section id="informacion" className="model-inquiry"><div><p className="eyebrow">Conoce {home.name}</p><h2>Agenda una visita<br /><em>sin compromiso.</em></h2><p>Déjanos tus datos y te compartiremos disponibilidad, requisitos y todos los detalles que necesitas.</p><a className="phone model-phone" href="tel:+526646096749">(664) 609 6749 <span>↗</span></a></div><ModelLeadForm home={home} /></section>
    <section className="model-more"><div className="section-heading"><div><p className="eyebrow">Explora otros modelos</p><h2>Un espacio para<br /><em>cada momento.</em></h2></div><button className="text-link" onClick={goHome}>Ver todas las residencias <span>→</span></button></div><div className="model-more-grid">{otherHomes.map((item) => <a href={`/${item.slug}/`} key={item.slug}><img src={item.image} alt={item.name} /><div><p>{item.tag}</p><h3>{item.name}</h3><span>Conocer modelo ↗</span></div></a>)}</div></section>
    <footer><img src="/assets/logo-playas.png" alt="Playas Diamante Residencial" /><div><p>Playas de Tijuana, Baja California</p><p>© {new Date().getFullYear()} Playas Diamante Residencial</p></div><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Volver arriba ↑</button></footer>
  </main>
}

const benefits = [
  ['24/7', 'Seguridad', 'Acceso controlado y vigilancia para tu tranquilidad.'],
  ['↗', 'Vista al mar', 'Un horizonte abierto que acompaña tus días.'],
  ['☀', 'Clima ideal', 'Disfruta el estilo de vida de Playas de Tijuana.'],
]

const posts = [
  {
    slug: 'una-manana-frente-al-mar', category: 'Estilo de vida', readTime: '4 min de lectura', image: '/assets/about.jpg',
    title: 'Una mañana frente al mar cambia todo el día.',
    intro: 'Hay lugares que te invitan a bajar el ritmo. En Playas, una mañana puede empezar con luz suave, aire fresco y el horizonte como parte de tu rutina.',
    sections: [['Un ritmo diferente', 'No hace falta tener un itinerario perfecto para disfrutar una mañana tranquila. Abrir las ventanas, preparar tu bebida favorita y regalarte unos minutos sin prisa puede cambiar el tono del día.'], ['Haz espacio para lo esencial', 'Los espacios que eliges también acompañan tus hábitos. Busca pequeños rituales que te hagan sentir bien: una mesa junto a la luz, una caminata corta o una pausa para mirar el mar.'], ['Tu hogar como punto de partida', 'La vida junto al mar no se trata de hacer más. Se trata de tener un lugar al que quieres volver y desde el que cada día puede comenzar con intención.']],
  },
  {
    slug: 'fin-de-semana-en-playas-de-tijuana', category: 'Guía local', readTime: '3 min de lectura', image: '/assets/turquesa.jpg',
    title: 'Cómo aprovechar un fin de semana en Playas de Tijuana.',
    intro: 'Un fin de semana en Playas puede ser tan activo o tranquilo como tú quieras. La clave está en dejar espacio para descubrir tus rincones favoritos.',
    sections: [['Empieza sin prisa', 'Reserva la primera parte de tu día para caminar, tomar un café y observar cómo cambia la luz sobre el océano. No necesitas ir lejos para sentir que saliste de la rutina.'], ['Elige un plan que se adapte a ti', 'Un buen fin de semana no tiene que parecerse al de nadie más. Puedes alternar un momento al aire libre con una tarde tranquila en casa.'], ['Cierra el día con calma', 'A veces el mejor plan es volver a casa, abrir la ventana y dejar que la vista haga el resto.']],
  },
  {
    slug: 'elige-la-residencia-que-se-siente-como-casa', category: 'Consejos', readTime: '2 min de lectura', image: '/assets/master-suite.jpg',
    title: 'Claves para elegir la residencia que se siente como casa.',
    intro: 'Elegir dónde vivir comienza con los detalles que hacen más agradable tu día a día: luz, tranquilidad, seguridad y un espacio que funcione para ti.',
    sections: [['Piensa en tu rutina', 'Imagina una mañana común, una tarde de descanso y una visita de amigos. Las mejores decisiones nacen de entender cómo quieres habitar el espacio.'], ['Mira más allá de los metros cuadrados', 'La sensación de hogar también vive en el entorno: las vistas, el clima, la seguridad y la facilidad para disfrutar tus momentos cotidianos.'], ['Haz las preguntas correctas', 'Cuando visites una residencia, date tiempo para recorrerla y preguntar por los detalles que son importantes para ti. Así encontrarás un lugar que se sienta bien desde el primer día.']],
  },
]

const postFromHash = () => posts.find((post) => window.location.hash === `#/diario/${post.slug}`) || null

function PostView({ post, onBack }) {
  return <main className="post-page">
    <header className="site-header"><button className="brand" onClick={onBack} aria-label="Volver al inicio"><img src="/assets/logo-playas.png" alt="Playas Diamante Residencial" /></button><button className="post-back" onClick={onBack}>← Volver al diario</button></header>
    <section className="post-hero"><div><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p>{post.intro}</p></div><img src={post.image} alt="" /></section>
    <article className="post-body">{post.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<div className="post-cta"><p className="eyebrow">Conoce Playas Diamante</p><h2>Encuentra un espacio<br /><em>que se sienta tuyo.</em></h2><button className="button button-dark" onClick={onBack}>Ver residencias <span>→</span></button></div></article>
  </main>
}

function App() {
  const model = modelFromPath()
  if (model) return <ModelPage home={model} />

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHome, setActiveHome] = useState(null)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activePost, setActivePost] = useState(postFromHash)

  useEffect(() => {
    document.body.style.overflow = activeHome ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeHome])

  useEffect(() => {
    const handleHashChange = () => setActivePost(postFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (activePost) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePost])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.error || 'No fue posible enviar tu solicitud.')

      form.reset()
      setFormStatus({ type: 'success', message: 'Gracias. Recibimos tu solicitud y nos pondremos en contacto contigo pronto.' })
      window.gtag?.('event', 'generate_lead', { form_id: 'contact-form', lead_source: 'website' })
    } catch (error) {
      setFormStatus({ type: 'error', message: error.message || 'No fue posible enviar tu solicitud. Inténtalo de nuevo o llámanos.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openPost = (post) => { window.location.hash = `/diario/${post.slug}` }
  const closePost = () => { window.location.hash = '' }

  if (activePost) return <PostView post={activePost} onBack={closePost} />

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('inicio')} aria-label="Ir al inicio">
          <img src="/assets/logo-playas.png" alt="Playas Diamante Residencial" />
        </button>
        <button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <button onClick={() => scrollTo('modelos')}>Residencias</button>
          <button onClick={() => scrollTo('nosotros')}>El residencial</button>
          <button onClick={() => scrollTo('blog')}>Blog</button>
          <button onClick={() => scrollTo('ubicacion')}>Cómo llegar</button>
          <button onClick={() => scrollTo('contacto')}>Contacto</button>
          <button className="nav-cta" onClick={() => scrollTo('contacto')}>Agenda una visita <span>→</span></button>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-orb hero-orb-one"></div><div className="hero-orb hero-orb-two"></div>
        <div className="hero-content">
          <p className="eyebrow light">Playas de Tijuana · Baja California</p>
          <h1>Vive donde el<br /><em>mar</em> se siente cerca.</h1>
          <p className="hero-copy">Residencias en renta para hacer de cada día una experiencia más tranquila, luminosa y tuya.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => scrollTo('modelos')}>Explora residencias <span>↓</span></button>
            <a className="text-link light" href="tel:+526646096749">Llamar ahora <span>↗</span></a>
          </div>
        </div>
        <div className="hero-video" aria-label="Video de Playas Diamante Residencial">
          <img src="/assets/about.jpg" alt="" aria-hidden="true" />
          <iframe
            src="https://www.youtube-nocookie.com/embed/KqPjbF-ZnXA?autoplay=1&mute=1&loop=1&playlist=KqPjbF-ZnXA&controls=0&playsinline=1&modestbranding=1&rel=0"
            title="Video de Playas Diamante Residencial"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="hero-note"><span>01</span><div></div><p>Un hogar con otra perspectiva.</p></div>
      </section>

      <section className="intro-section">
        <p className="eyebrow">Bienvenido a Playas Diamante</p>
        <div className="intro-grid">
          <h2>Más que una dirección,<br />un <em>lugar para llegar.</em></h2>
          <div className="intro-copy"><p>Encontrar el lugar correcto cambia la forma en que vives. Aquí, la vista panorámica, la calma y una comunidad segura se encuentran para que disfrutes estar en casa.</p><button className="text-link" onClick={() => scrollTo('nosotros')}>Conoce el residencial <span>→</span></button></div>
        </div>
      </section>

      <section id="modelos" className="homes-section">
        <div className="section-heading"><div><p className="eyebrow">Encuentra tu espacio</p><h2>Residencias que<br /><em>se adaptan a ti.</em></h2></div><p className="section-intro">Conoce nuestras opciones disponibles y encuentra el espacio que mejor acompaña tu momento.</p></div>
        <div className="home-grid">
          {homes.map((home, i) => <article className="home-card" key={home.name} onClick={() => { window.location.href = `/${home.slug}/` }}>
            <div className="home-image"><img src={home.image} alt={home.name} /><span className="image-index">0{i + 1}</span></div>
            <div className="home-card-info"><div><p>{home.tag}</p><h3>{home.name}</h3></div><button aria-label={`Ver ${home.name}`}>↗</button></div>
          </article>)}
        </div>
      </section>

      <section id="nosotros" className="lifestyle-section">
        <div className="lifestyle-photo"><img src="/assets/about.jpg" alt="Espacios de Playas Diamante" /></div>
        <div className="lifestyle-copy"><p className="eyebrow light">Tu tranquilidad, primero</p><h2>La vida que quieres,<br /><em>con la calma que necesitas.</em></h2><p>En Playas Diamante Residencial encuentras inventario de casas y departamentos en renta, áreas verdes y una vista panorámica del mar. Con seguridad las 24 horas, aquí puedes sentirte en casa desde el primer día.</p><button className="button button-outline" onClick={() => scrollTo('contacto')}>Solicita información <span>→</span></button></div>
      </section>

      <section className="benefits-section">
        <p className="eyebrow">Por qué elegirnos</p><h2>Lo esencial, <em>bien cuidado.</em></h2>
        <div className="benefits-grid">{benefits.map(([icon, title, text]) => <article key={title}><span className="benefit-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="blog" className="blog-section">
        <div className="section-heading"><div><p className="eyebrow">Diario Diamante</p><h2>Ideas para vivir<br /><em>mejor en Playas.</em></h2></div><p className="section-intro">Consejos e inspiración para disfrutar cada rincón de tu nueva vida junto al mar.</p></div>
        <div className="blog-grid">
          <article className="blog-feature"><img src={posts[0].image} alt="Vista al mar desde Playas de Tijuana" /><div><p className="eyebrow">{posts[0].category} · {posts[0].readTime}</p><h3>{posts[0].title}</h3><button className="text-link" onClick={() => openPost(posts[0])}>Leer artículo <span>→</span></button></div></article>
          <div className="blog-list">
            {posts.slice(1).map((post) => <article key={post.slug}><p className="eyebrow">{post.category} · {post.readTime}</p><h3>{post.title}</h3><button className="text-link" onClick={() => openPost(post)}>Leer más <span>→</span></button></article>)}
          </div>
        </div>
      </section>

      <section id="ubicacion" className="map-section">
        <div className="map-copy"><p className="eyebrow">Visítanos</p><h2>Tu próxima vista<br /><em>está más cerca.</em></h2><p>Conoce Playas Diamante Residencial en Playas de Tijuana. Agenda una visita y déjanos mostrarte las opciones que tenemos para ti.</p><a className="button button-dark" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Playas+Diamante+Residencial+Tijuana">Abrir indicaciones <span>↗</span></a></div>
        <div className="map-frame"><iframe title="Mapa de Playas Diamante Residencial" src="https://www.google.com/maps?q=Playas+Diamante+Residencial+Tijuana&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>

      <section id="contacto" className="contact-section">
        <div className="contact-copy"><p className="eyebrow light">Conoce tu próximo hogar</p><h2>Da el primer paso<br /><em>hacia tu nueva vista.</em></h2><p>Cuéntanos qué estás buscando. Nuestro equipo te ayudará a conocer las opciones que tenemos para ti.</p><a href="tel:+526646096749" className="phone">(664) 609 6749 <span>↗</span></a></div>
        <form id="contact-form" onSubmit={submitForm}>
          <label>Nombre<input required name="name" autoComplete="name" minLength="2" placeholder="¿Cómo te llamas?" /></label>
          <label>Correo electrónico<input required type="email" name="email" autoComplete="email" placeholder="tu@correo.com" /></label>
          <label>Teléfono<input required type="tel" name="phone" autoComplete="tel" minLength="7" placeholder="(664) 000 0000" /></label>
          <label>Mensaje<textarea name="message" rows="3" maxLength="2000" placeholder="Cuéntanos qué tipo de residencia buscas" /></label>
          <label className="form-honeypot" aria-hidden="true">No llenar<input name="website" tabIndex="-1" autoComplete="off" /></label>
          <input type="hidden" name="source" value="Sitio web" />
          <button className="button button-light" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando…' : <>Enviar solicitud <span>→</span></>}</button>
          {formStatus.message && <p className={`form-notice form-notice-${formStatus.type}`} role="status" aria-live="polite">{formStatus.message}</p>}
        </form>
      </section>

      <footer><img src="/assets/logo-playas.png" alt="Playas Diamante Residencial" /><div><p>Playas de Tijuana, Baja California</p><p>© {new Date().getFullYear()} Playas Diamante Residencial</p></div><button onClick={() => scrollTo('inicio')}>Volver arriba ↑</button></footer>

      {activeHome && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={activeHome.name} onClick={() => setActiveHome(null)}><div className="home-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveHome(null)} aria-label="Cerrar">×</button><img src={activeHome.image} alt={activeHome.name} /><div><p className="eyebrow">Residencia</p><h2>{activeHome.name}</h2><p>{activeHome.tag}. Solicita información y nuestro equipo te compartirá disponibilidad y detalles.</p><button className="button button-dark" onClick={() => { setActiveHome(null); scrollTo('contacto') }}>Solicitar información <span>→</span></button></div></div></div>}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
