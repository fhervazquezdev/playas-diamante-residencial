import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const homes = [
  { name: 'Master Suite', image: '/assets/master-suite.jpg', tag: 'Amplia y luminosa' },
  { name: 'Amatista', image: '/assets/amatista.jpg', tag: 'Un refugio para ti' },
  { name: 'Turquesa', image: '/assets/turquesa.jpg', tag: 'Vive con estilo' },
  { name: 'Suite', image: '/assets/suite.jpg', tag: 'Comodidad diaria' },
  { name: 'Penthouse', image: '/assets/penthouse.jpg', tag: 'Tu espacio en las alturas' },
  { name: 'Nuevas Suites', image: '/assets/nuevas-suites.jpg', tag: 'Una nueva forma de habitar' },
]

const benefits = [
  ['24/7', 'Seguridad', 'Acceso controlado y vigilancia para tu tranquilidad.'],
  ['↗', 'Vista al mar', 'Un horizonte abierto que acompaña tus días.'],
  ['☀', 'Clima ideal', 'Disfruta el estilo de vida de Playas de Tijuana.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHome, setActiveHome] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.body.style.overflow = activeHome ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeHome])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const submitForm = (event) => {
    event.preventDefault()
    setNotice('Gracias. Recibimos tu solicitud y nos pondremos en contacto contigo pronto.')
    event.currentTarget.reset()
  }

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
        <div className="hero-photo"><img src="/assets/about.jpg" alt="Vista de Playas Diamante Residencial" /></div>
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
          {homes.map((home, i) => <article className="home-card" key={home.name} onClick={() => setActiveHome(home)}>
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

      <section id="contacto" className="contact-section">
        <div className="contact-copy"><p className="eyebrow light">Conoce tu próximo hogar</p><h2>Da el primer paso<br /><em>hacia tu nueva vista.</em></h2><p>Cuéntanos qué estás buscando. Nuestro equipo te ayudará a conocer las opciones que tenemos para ti.</p><a href="tel:+526646096749" className="phone">(664) 609 6749 <span>↗</span></a></div>
        <form onSubmit={submitForm}><label>Nombre<input required name="name" placeholder="¿Cómo te llamas?" /></label><label>Correo electrónico<input required type="email" name="email" placeholder="tu@correo.com" /></label><label>Teléfono<input required type="tel" name="phone" placeholder="(664) 000 0000" /></label><label>Mensaje<textarea name="message" rows="3" placeholder="Cuéntanos qué tipo de residencia buscas" /></label><button className="button button-light" type="submit">Enviar solicitud <span>→</span></button>{notice && <p className="form-notice" role="status">{notice}</p>}</form>
      </section>

      <footer><img src="/assets/logo-playas.png" alt="Playas Diamante Residencial" /><div><p>Playas de Tijuana, Baja California</p><p>© {new Date().getFullYear()} Playas Diamante Residencial</p></div><button onClick={() => scrollTo('inicio')}>Volver arriba ↑</button></footer>

      {activeHome && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={activeHome.name} onClick={() => setActiveHome(null)}><div className="home-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveHome(null)} aria-label="Cerrar">×</button><img src={activeHome.image} alt={activeHome.name} /><div><p className="eyebrow">Residencia</p><h2>{activeHome.name}</h2><p>{activeHome.tag}. Solicita información y nuestro equipo te compartirá disponibilidad y detalles.</p><button className="button button-dark" onClick={() => { setActiveHome(null); scrollTo('contacto') }}>Solicitar información <span>→</span></button></div></div></div>}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
