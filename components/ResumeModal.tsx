'use client';

import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { trackClick, trackDownload, trackModalClose } from '@/lib/gtag';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_URL = '/media/Resume-devansh.pdf';
const EMAIL = 'hdevansh@gmail.com';
const SUBJECT = 'Collaboration Inquiry';

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [pdfLoading, setPdfLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showContact) {
          setShowContact(false);
        } else {
          onClose();
        }
      }
    },
    [onClose, showContact]
  );

  useEffect(() => {
    if (isOpen) {
      setShowContact(false);
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
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
    trackClick('resume_contact', 'copy_email');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCompose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackClick('resume_contact', 'compose_email');
    window.open(
      `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`,
      '_self',
    );
  };

  return createPortal(
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <div className="project-modal-actions">
            <span className="project-modal-title">Resume</span>
            <span className="modal-header-divider" />
            <a
              href={RESUME_URL}
              download
              className="resume-modal-download"
              onClick={() => trackDownload('Resume-devansh.pdf')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
          <div className="project-modal-actions">
            <button
              className="project-modal-contact-btn"
              onClick={() => setShowContact((v) => !v)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Contact Me
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-modal-close"
              aria-label="Open in new tab"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button className="resume-modal-close" onClick={() => { onClose(); trackModalClose('resume'); }} aria-label="Close resume">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="project-modal-iframe-wrapper">
          {showContact && (
            <div className="project-modal-contact-dropdown">
              <p className="contact-modal-label">Get in touch</p>
              <p className="contact-modal-email">{EMAIL}</p>
              <div className="contact-modal-actions">
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`}
                  className="contact-modal-btn primary"
                  onClick={handleCompose}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Compose Email
                </a>
                <button onClick={handleCopy} className="contact-modal-btn secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>
          )}
          {pdfLoading && (
            <div className="pdf-loading-indicator">
              <div className="pdf-loading-spinner" />
              <span>Loading PDF…</span>
            </div>
          )}
          <iframe
            src={`${RESUME_URL}#toolbar=0&navpanes=0`}
            className="resume-modal-iframe"
            title="Resume – Devansh Hasija"
            loading="lazy"
            onLoad={() => setPdfLoading(false)}
            style={pdfLoading ? { opacity: 0 } : undefined}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
