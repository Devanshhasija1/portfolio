'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { trackSocialClick, trackClick } from '@/lib/gtag';

function SocialLink({
  href,
  label,
  hoverLabel,
  onClick,
}: {
  href: string;
  label: string;
  hoverLabel: string;
  onClick?: () => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    const el = linkRef.current;
    if (!el) return;
    el.querySelector('.text_link-line')?.classList.add('opac-100');
    el.querySelector('.text_link-line-wrapper')?.classList.add('opac-100');
    setTimeout(() => {
      el.querySelector('.text_link-line-wrapper')?.classList.add('expand');
    }, 20);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = linkRef.current;
    if (!el) return;
    el.querySelector('.text_link-line')?.classList.add('collapse');
    setTimeout(() => {
      el.querySelector('.text_link-line')?.classList.remove('opac-100');
      el.querySelector('.text_link-line-wrapper')?.classList.remove('opac-100');
      el.querySelector('.text_link-line-wrapper')?.classList.remove('expand');
      el.querySelector('.text_link-line')?.classList.remove('collapse');
    }, 500);
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={`${label} profile`}
      className="text_link-block w-inline-block"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="rel-footer-wrapper">
        <div className="text-style-big style-footer abs">{label}</div>
        <div className="text-style-big style-footer">
          <span className="text-style-big-alt style-footer">{hoverLabel}</span>
        </div>
      </div>
      <div className="text_link-line-wrapper">
        <div className="text_link-line"></div>
      </div>
    </a>
  );
}

export default function Footer() {
  const [time, setTime] = useState('');
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function updateClock() {
      const t = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
      });
      setTime(t);
    }
    updateClock();
    const interval = setInterval(updateClock, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonEnter = useCallback(() => {
    buttonRef.current
      ?.closest('.footer-button-wrapper')
      ?.querySelector('.circ-purple')
      ?.classList.add('expand');
  }, []);

  const handleButtonLeave = useCallback(() => {
    buttonRef.current
      ?.closest('.footer-button-wrapper')
      ?.querySelector('.circ-purple')
      ?.classList.remove('expand');
  }, []);

  return (
    <footer className="footer-wrapper" role="contentinfo">
      <div className="spacer-div"></div>
      <div className="footer-container">
        <div className="sc-container footer">
          <div className="bg-waves-wrapper no-click bwaves">
            <div className="bg-color"></div>
            <div className="bg-blur"></div>
            <div className="video-waves-embed w-embed">
              <div
                style={{ width: '100%', height: '100%' }}
                className="w-background-video w-background-video-atom"
              >
                <video
                  playsInline
                  loop
                  muted
                  autoPlay
                  preload="none"
                  style={{ backgroundImage: "url('')" }}
                  data-object-fit="cover"
                >
                  <source src="/media/waves.webm" type="video/webm" />
                  <source src="/media/waves.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="ft-row-1 no-click">
            <div className="footer-pic-wrapper">
              <img
                src="/images/devansh_img.jpeg"
                loading="lazy"
                alt="Devansh Hasija - Designer from India"
                className="profile_pic-header"
              />
            </div>
            <h2 className="text-style-h2 section-heading">
              Let&apos;s{' '}
              <span className="text-style-h2-alt text-style-overlay">work</span>
            </h2>
            <div className="footer-arrow hide-mob w-embed">
              <svg width="4em" height="4em" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M62.541 3.46094L5.38672 60.6149" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                <path d="M56.0021 60.6155H5.38672V11.3848" stroke="white" strokeWidth="3" strokeLinecap="square" />
              </svg>
            </div>
            <div className="footer-arrow show-mob w-embed">
              <svg width="2em" height="2em" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M62.541 3.46094L5.38672 60.6149" stroke="white" strokeWidth="4" strokeLinejoin="round" />
                <path d="M56.0021 60.6155H5.38672V11.3848" stroke="white" strokeWidth="4" strokeLinecap="square" />
              </svg>
            </div>
          </div>

          <div className="ft-row-2 no-click">
            <h2 className="text-style-h2 section-heading">together</h2>
          </div>
          <div className="ft-row-3"><div className="ft-underline"></div></div>

          <div className="ft-row-button">
            <div className="footer-button-area">
              <a
                ref={buttonRef}
                href="mailto:hdevansh@gmail.com"
                className="footer-button-wrapper w-inline-block"
                onClick={() => trackClick('footer', 'get_in_touch')}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
              >
                <div className="circ-purple"></div>
                <div className="footer-button-text">
                  <div className="rel-wrapper ft-button">
                    <h2 className="text-style-h5 style-footer">Get in touch</h2>
                    <h2 className="text-style-h5 style-footer abs">Yass hit it!</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="ft-row-4">
            <div className="text-style-normal social-footer">Socials</div>
            <div className="sc-links-horizontal">
              <div className="sc-links-vertical">
                <SocialLink href="https://www.behance.net/devanshhasija" label="Behance" hoverLabel="devanshhasija" onClick={() => trackSocialClick('Behance')} />
                <SocialLink href="https://www.instagram.com/hdevansh/" label="Instagram" hoverLabel="ig/hdevansh" onClick={() => trackSocialClick('Instagram')} />
              </div>
              <div className="sc-links-vertical">
                <SocialLink href="https://www.linkedin.com/in/hdevansh/" label="LinkedIn" hoverLabel="in/hdevansh" onClick={() => trackSocialClick('LinkedIn')} />
              </div>
            </div>
          </div>
          <div className="footer-abs-content no-click">
            <div className="time-container">
              <div className="time-wrapper">
                <div className="text-style-normal time-footer">Local Time: </div>
                <div id="clock" fs-hacks-element="time-version-1" className="text-style-normal time-footer">{time}</div>
                <div className="text-style-normal time-footer"> IST</div>
              </div>
            </div>
            <div className="copyright-wrapper">
              <div className="copyright-text">© {new Date().getFullYear()} Devansh Hasija</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
