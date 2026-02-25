'use client';

import { useState } from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import ResumeModal from '@/components/ResumeModal';
import ContactModal from '@/components/ContactModal';
import { trackClick, trackModalOpen } from '@/lib/gtag';

export default function Navbar() {
  const pathname = usePathname();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/snapshots', label: 'Snapshots' },
  ];

  return (
    <>
      <nav aria-label="Main navigation" data-w-id="04942b5e-8f75-69d6-06cb-ee6d04d863b1" className="navbar-wrapper">
        <div className="nav-left">
          <Link href="/" aria-label="Devansh Hasija - Home" aria-current={pathname === '/' ? 'page' : undefined} className="nav_logo-link w-inline-block">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-logo" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="20" fill="url(#logo-gradient)" />
              <rect x="8.5"  y="16" width="4.5" height="12" rx="0.5" fill="white" />
              <rect x="14.5" y="11" width="4.5" height="17" rx="0.5" fill="white" />
              <rect x="20.5" y="11" width="4.5" height="17" rx="0.5" fill="white" />
              <rect x="26.5" y="16" width="4.5" height="12" rx="0.5" fill="white" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => { setContactOpen(true); trackModalOpen('contact'); }}
            className="nav_contact-link w-inline-block"
            style={{ cursor: 'pointer' }}
          >
            <div className="default-wrapper">
              <div className="status-dot"></div>
              <div className="nav-text">Open for collaborations and offers</div>
            </div>
          </button>
        </div>
        <div className="nav-right">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-text-link w-inline-block${isActive ? ' w--current is-active' : ''}`}
                onClick={() => trackClick('navigation', link.label)}
              >
                <div className="activedot"></div>
                <div className="currenttext">{link.label}</div>
                <div className="normaltext">{link.label}</div>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => { setResumeOpen(true); trackModalOpen('resume'); }}
            className="nav-text-link w-inline-block resume-nav-button"
          >
            <div className="activedot"></div>
            <div className="currenttext">Resume</div>
            <div className="normaltext">Resume</div>
          </button>
        </div>
      </nav>
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
