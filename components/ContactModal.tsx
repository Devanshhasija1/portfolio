'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { trackClick, trackModalClose } from '@/lib/gtag';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL = 'hdevansh@gmail.com';
const SUBJECT = 'Collaboration Inquiry';
const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const composeLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const link = composeLinkRef.current;
    if (!link) return;
    const handler = () => trackClick('contact', 'compose_email');
    link.addEventListener('mousedown', handler);
    return () => link.removeEventListener('mousedown', handler);
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !mounted) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    trackClick('contact', 'copy_email');
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div className="resume-modal-overlay" onClick={onClose}>
      <div
        className="contact-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="resume-modal-close"
          onClick={() => { onClose(); trackModalClose('contact'); }}
          aria-label="Close"
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="contact-modal-body">
          <p className="contact-modal-label">Get in touch</p>
          <p className="contact-modal-email">{EMAIL}</p>

          <div className="contact-modal-actions">
            <a
              ref={composeLinkRef}
              href={MAILTO_URL}
              className="contact-modal-btn primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Compose Email
            </a>
            <button
              onClick={handleCopy}
              className="contact-modal-btn secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
