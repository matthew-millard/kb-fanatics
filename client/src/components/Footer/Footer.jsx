import { useState } from 'react';
import { links } from './footerLinks';
import socialIcons from '../Header/SocialIcons/socialIcons';
import styles from './Footer.module.css';
import payments from './paymentOptions';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear(); // Get current year for copyright

  const handleNewsletterSignUp = e => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <footer>
      <div className={styles.newsletter}>
        <h2 className={styles.logo}>KYBDS</h2>
        <h4>Sign up for news stories and personal offers</h4>
        <form onSubmit={handleNewsletterSignUp} className={styles.newsletterForm}>
          <input
            type="email"
            name="newsletter"
            id="newsletter"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </form>
      </div>
      <nav className={styles.links}>
        <h4>Useful Pages</h4>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.about}>
        <h4>About</h4>
        <p>
          We are an online store dedicated to mechanical keyboard enthusiasts. We stock components at reasonable prices
          and ensure they're always in stock.
        </p>
      </div>
      <div className={styles.contact}>
        <h4>Contact Us</h4>
        <p>
          Visit our <a href={links.find(link => link.title === 'Contact Us').url}>Contact Page</a> or email us directly
          at <a href="mailto:support@kybds.com">support@kybds.com</a>
        </p>
      </div>
      <div className={styles.socialIcons}>
        {socialIcons.map((iconObj, index) => {
          return (
            <a key={iconObj.id} href={iconObj.url} className={iconObj.className}>
              <FontAwesomeIcon icon={iconObj.icon} />
            </a>
          );
        })}
      </div>
      <div className={styles.payments}>
        {payments.map(paymentObj => (
          <paymentObj.brand key={paymentObj.id} aria-label={paymentObj.label} icon={paymentObj.brand} size={30} />
        ))}
      </div>
      <div className={styles.copyright}>
        <p>© {currentYear} KYBDS. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
