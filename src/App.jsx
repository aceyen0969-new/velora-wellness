import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Leaf, Menu, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'The Daily Dew',
    type: 'Hydrating face serum',
    price: 34,
    size: '30 ml / 1.0 fl oz',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
    tag: 'BEST LOVED',
    tone: 'sand'
  },
  {
    id: 2,
    name: 'Cloud Cream',
    type: 'Comforting daily moisturiser',
    price: 42,
    size: '50 ml / 1.7 fl oz',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85',
    tag: 'EVERYDAY RITUAL',
    tone: 'sage'
  },
  {
    id: 3,
    name: 'Soft Reset',
    type: 'Gentle botanical cleanser',
    price: 28,
    size: '150 ml / 5.0 fl oz',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85',
    tag: 'START HERE',
    tone: 'clay'
  }
];

const faqs = [
  {
    question: 'Where should I start?',
    answer: 'Keep it simple. Start with Soft Reset to cleanse, then Cloud Cream to moisturise. Add The Daily Dew when you want an extra layer of hydration.'
  },
  {
    question: 'Are the products suitable for sensitive skin?',
    answer: 'Every skin is different. Our formulas are designed with a gentle approach, but we recommend checking the full ingredient list and patch testing before first use.'
  },
  {
    question: 'How do I use my products?',
    answer: 'Apply skincare to clean skin, moving from the lightest texture to the richest. In the morning, finish with a broad-spectrum sunscreen.'
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToBag = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added to your bag`);
    window.setTimeout(() => setToast(''), 2600);
  };

  const changeQuantity = (id, amount) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <span>Small rituals. Softer days.</span>
        <span className="announcement-right">Complimentary shipping on orders over $65 <ArrowRight size={12} /></span>
      </div>

      <header className="site-header">
        <button className="icon-button mobile-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} aria-label="Main navigation">
          <a href="#shop" onClick={closeMenu}>Shop all</a>
          <a href="#philosophy" onClick={closeMenu}>Our philosophy</a>
          <a href="#ritual" onClick={closeMenu}>The ritual</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="Velora home">VELORA<span>®</span></a>
        <div className="header-actions">
          <a className="account-link" href="#newsletter">The journal</a>
          <button className="bag-button" onClick={() => document.getElementById('bag-panel')?.showModal()} aria-label={`Open shopping bag, ${cartCount} items`}>
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span>Bag</span>
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy reveal-up">
            <p className="eyebrow"><span className="eyebrow-dot" /> BOTANICAL SKINCARE, MADE GENTLE</p>
            <h1>A softer kind<br />of <em>skincare.</em></h1>
            <p className="hero-description">Thoughtful formulas. Familiar rituals. A little more room to feel at home in your own skin.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#shop">Explore the collection <ArrowRight size={16} /></a>
              <a className="text-link" href="#philosophy">Our point of view <ArrowUpRight size={15} /></a>
            </div>
            <div className="hero-note"><span className="note-line" />Made for real life, and all the skin days in between.</div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img className="hero-image" src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1500&q=90" alt="Minimal skincare bottle arranged in soft natural light" />
              <div className="hero-image-shade" />
              <div className="hero-image-label"><span>01 / DAILY HYDRATION</span><span>FORMULATED WITH CARE</span></div>
            </div>
            <div className="floating-stamp"><Sparkles size={16} strokeWidth={1.3} /><span>LESS, BUT<br />BETTER</span></div>
            <div className="hero-side-note">ROOTED IN NATURE <span>·</span> MADE FOR YOU</div>
          </div>
          <a className="scroll-cue" href="#philosophy"><span>SCROLL TO FEEL GOOD</span><ArrowDown size={14} /></a>
        </section>

        <section className="values-strip" aria-label="Our values">
          <div><Leaf size={16} /><span>Botanical by nature</span></div>
          <span className="strip-separator">✳</span>
          <div><Sparkles size={16} /><span>Thoughtfully formulated</span></div>
          <span className="strip-separator">✳</span>
          <div><Check size={16} /><span>Everyday essentials</span></div>
          <span className="strip-separator">✳</span>
          <div><span className="recycle-mark">↻</span><span>Less, more considered</span></div>
        </section>

        <section className="philosophy-section section-pad" id="philosophy">
          <div className="philosophy-image image-reveal">
            <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85" alt="Botanical skincare ingredients and natural textures" loading="lazy" />
            <div className="image-caption"><span>THE BEAUTY OF ENOUGH</span><span>EST. 2024</span></div>
          </div>
          <div className="philosophy-copy">
            <p className="eyebrow">A NOTE FROM VELORA</p>
            <h2>Your skin doesn't<br />need a <em>new rule.</em></h2>
            <p className="body-copy">It needs care that makes sense. We make considered skincare for the everyday, with ingredients chosen for a reason and routines that leave room for life to happen.</p>
            <p className="body-copy body-copy-small">No twelve-step pressure. No impossible promises. Just the good stuff, made to feel good.</p>
            <a className="underlined-link" href="#ritual">A little more about us <ArrowUpRight size={15} /></a>
            <div className="signature"><span className="signature-mark">v.</span><span>With care, always.<br /><em>The Velora team</em></span></div>
          </div>
          <span className="philosophy-number">01 — OUR PHILOSOPHY</span>
        </section>

        <section className="shop-section section-pad" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR ROUTINE, REIMAGINED</p>
              <h2>The everyday <em>edit.</em></h2>
            </div>
            <div className="section-heading-aside"><p>Three considered essentials.<br />A little less noise.</p><span>01—03</span></div>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className={`product-card product-${product.tone}`} key={product.id} style={{ '--card-index': index }}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="product-tag">{product.tag}</span>
                  <button className="quick-add" onClick={() => addToBag(product)} aria-label={`Add ${product.name} to bag`}><Plus size={19} strokeWidth={1.5} /></button>
                  <span className="product-index">0{index + 1}</span>
                </div>
                <div className="product-info">
                  <div><h3>{product.name}</h3><p>{product.type}</p></div>
                  <span className="product-price">${product.price}</span>
                </div>
                <div className="product-bottom"><span>{product.size}</span><button onClick={() => addToBag(product)}>Add to bag <ArrowRight size={14} /></button></div>
              </article>
            ))}
          </div>
          <div className="shop-footnote"><span>GOOD SKIN DAYS START SMALL.</span><a href="#ritual">Find your rhythm <ArrowRight size={14} /></a></div>
        </section>

        <section className="quote-section" id="ritual">
          <div className="quote-image"><img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1300&q=85" alt="Skincare bottles on a sunlit stone surface" loading="lazy" /></div>
          <div className="quote-content">
            <p className="eyebrow">A SMALL DAILY RETURN</p>
            <span className="quote-mark">“</span>
            <blockquote>Make a little space<br />for <em>yourself.</em></blockquote>
            <p className="quote-support">A few quiet minutes can change the shape of a day. Let your routine be a place to land, not another thing to get right.</p>
            <a className="button button-light" href="#shop">Build your ritual <ArrowRight size={16} /></a>
            <span className="quote-number">02 / THE RITUAL</span>
          </div>
        </section>

        <section className="ingredients-section section-pad">
          <div className="ingredients-heading">
            <p className="eyebrow">GOOD THINGS, CHOSEN WELL</p>
            <h2>Nothing extra.<br /><em>Nothing missing.</em></h2>
            <p>We believe in knowing what goes into your routine, and why it's there.</p>
          </div>
          <div className="ingredient-list">
            <div className="ingredient-item"><span className="ingredient-number">01</span><div><h3>Plant-minded</h3><p>Botanical ingredients selected with purpose, not just a pretty story.</p></div><Leaf size={22} strokeWidth={1.2} /></div>
            <div className="ingredient-item"><span className="ingredient-number">02</span><div><h3>Skin-first thinking</h3><p>Comfortable, considered formulas that fit into real routines.</p></div><Sparkles size={22} strokeWidth={1.2} /></div>
            <div className="ingredient-item"><span className="ingredient-number">03</span><div><h3>Less, more meaningful</h3><p>A focused collection designed to work together without the clutter.</p></div><Check size={22} strokeWidth={1.2} /></div>
            <p className="ingredient-disclaimer">Ingredient descriptions are illustrative for this concept website. Always review the full product label before use.</p>
          </div>
        </section>

        <section className="faq-section section-pad">
          <div className="faq-intro"><p className="eyebrow">A FEW THINGS YOU MIGHT WONDER</p><h2>Good to <em>know.</em></h2><p>Skincare should feel simple. Here are a few helpful places to begin.</p></div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={faq.question}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{faq.question}</span>{openFaq === index ? <Minus size={17} /> : <Plus size={17} />}</button>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div className="newsletter-flower">✳</div>
          <p className="eyebrow">A LETTER, NOT A LOUDSPEAKER</p>
          <h2>A little more <em>goodness.</em></h2>
          <p>Notes on skin, small rituals, and finding your own pace. Occasionally, in your inbox.</p>
          <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setToast('You’re on the list. Thanks for being here.'); event.currentTarget.reset(); window.setTimeout(() => setToast(''), 3000); }}>
            <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe to the newsletter"><ArrowRight size={19} /></button>
          </form>
          <span className="newsletter-privacy">A thoughtful note, now and then. Unsubscribe whenever.</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><a className="wordmark footer-wordmark" href="#top">VELORA<span>®</span></a><p>Care for your skin.<br />Room for yourself.</p></div>
          <div className="footer-column"><span>EXPLORE</span><a href="#shop">Shop all</a><a href="#philosophy">Our philosophy</a><a href="#ritual">The ritual</a></div>
          <div className="footer-column"><span>HERE TO HELP</span><a href="#faq" onClick={(event) => { event.preventDefault(); document.querySelector('.faq-section')?.scrollIntoView({ behavior: 'smooth' }); }}>FAQs</a><a href="mailto:hello@velora.example">Get in touch</a><a href="#newsletter">The journal</a></div>
          <div className="footer-note"><span>TAKE WHAT YOU NEED.</span><p>Slow down. Take a breath.<br />You’re doing just fine.</p><a href="#top">Back to the top ↑</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 VELORA STUDIO. CONCEPT BRAND.</span><span>MADE WITH CARE, NOT URGENCY.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div>
      </footer>

      <dialog className="bag-dialog" id="bag-panel">
        <div className="bag-header"><div><p className="eyebrow">YOUR LITTLE COLLECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close shopping bag" onClick={() => document.getElementById('bag-panel')?.close()}><X size={21} /></button></div>
        {cart.length === 0 ? (
          <div className="empty-bag"><ShoppingBag size={30} strokeWidth={1.2} /><p>Your bag is taking a quiet moment.</p><span>Find something that feels good.</span><button className="button button-dark" onClick={() => document.getElementById('bag-panel')?.close()}>Explore the collection <ArrowRight size={15} /></button></div>
        ) : (
          <div className="bag-body"><div className="bag-items">{cart.map((item) => <div className="bag-item" key={item.id}><img src={item.image} alt="" /><div className="bag-item-info"><h3>{item.name}</h3><p>{item.type}</p><div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item.id, 1)}><Plus size={13} /></button></div></div><strong>${item.price * item.quantity}</strong></div>)}</div><div className="bag-total"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><p className="bag-shipping">{total >= 65 ? 'You’ve unlocked complimentary shipping.' : `You’re $${(65 - total).toFixed(2)} away from complimentary shipping.`}</p><button className="button button-dark checkout-button" onClick={() => setToast('This is a portfolio demo. Checkout is not connected yet.')}>Continue to checkout <ArrowRight size={15} /></button></div>
        )}
      </dialog>

      {toast && <div className="toast-message" role="status"><Check size={17} />{toast}</div>}
    </div>
  );
}

export default App;
