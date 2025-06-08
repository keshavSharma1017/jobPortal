import { useState } from 'react';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ChevronUp, 
  ChevronDown,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowUp
} from 'lucide-react';
import { toast } from 'react-toastify';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = ['English', 'Spanish', 'French', 'German'];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setIsSubscribing(false);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
    toast.info(`Language changed to ${language}`);
  };

  return (
    <footer className="enhanced-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info Column */}
          <div className="footer-column">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Briefcase size={24} />
                </div>
                <span className="logo-text">Job Portal</span>
              </div>
              <p className="footer-tagline">
                Connecting talented professionals with amazing opportunities. 
                Your career journey starts here with our comprehensive job platform.
              </p>
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>contact@jobportal.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Business Ave, Suite 100<br />San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/sitemap">Sitemap</a></li>
            </ul>
          </div>

          {/* Social Media & Newsletter Column */}
          <div className="footer-column">
            <div className="social-section">
              <h3 className="footer-heading">Follow Us</h3>
              <p className="social-text">
                Stay connected and get the latest updates on job opportunities and career tips.
              </p>
              <div className="social-links">
                <a 
                  href="https://linkedin.com/company/jobportal" 
                  className="social-link linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://twitter.com/jobportal" 
                  className="social-link twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://facebook.com/jobportal" 
                  className="social-link facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://instagram.com/jobportal" 
                  className="social-link instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="newsletter-section">
              <h3 className="newsletter-heading">Stay Updated</h3>
              <p className="newsletter-text">
                Subscribe to our newsletter for the latest job alerts and career insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="newsletter-input-wrapper">
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className={`newsletter-button ${isSubscribing ? 'loading' : ''}`}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
            </div>
            
            <div className="footer-bottom-actions">
              {/* Language Selector */}
              <div className="language-selector">
                <button
                  className="language-button"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                >
                  <Globe size={16} />
                  <span>{selectedLanguage}</span>
                  <ChevronDown 
                    size={16} 
                    className={isLanguageDropdownOpen ? 'rotated' : ''} 
                  />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="language-dropdown">
                    {languages.map((language) => (
                      <button
                        key={language}
                        className={`language-option ${selectedLanguage === language ? 'active' : ''}`}
                        onClick={() => handleLanguageSelect(language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Back to Top Button */}
              <button className="back-to-top" onClick={scrollToTop}>
                <ArrowUp size={16} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;