'use client';

import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { trackClick, trackDownload, trackModalClose } from '@/lib/gtag';
import { copyEmail } from '@/lib/copyEmail';
import PdfViewer from './PdfViewer';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function ProjectModal({ isOpen, onClose, pdfUrl, title, onPrev, onNext }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    },
    [onClose, onPrev, onNext],
  );

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

  return createPortal(
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="project-modal-layout" onClick={(e) => e.stopPropagation()}>
        {onPrev ? (
          <button className="project-modal-nav" onClick={() => { onPrev!(); trackClick('project_nav', 'previous'); }} aria-label="Previous project">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="project-modal-nav-label">Prev Project</span>
          </button>
        ) : (
          <div className="project-modal-nav-placeholder" />
        )}

        <div className="project-modal-content">
          <div className="project-modal-header">
            <div className="project-modal-actions">
              <span className="project-modal-title">{title}</span>
              <span className="modal-header-divider" />
              <a
                href={pdfUrl}
                download
                className="resume-modal-download"
                onClick={() => trackDownload(pdfUrl)}
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
                onClick={() => { copyEmail(); trackClick('project_contact', `copy_email_${title}`); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Contact Me
              </button>
              <a
                href={pdfUrl}
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
              <button className="resume-modal-close" onClick={() => { onClose(); trackModalClose(`project_${title}`); }} aria-label="Close">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="project-modal-iframe-wrapper">
            <PdfViewer url={pdfUrl} />
          </div>
        </div>

        {onNext ? (
          <button className="project-modal-nav" onClick={() => { onNext!(); trackClick('project_nav', 'next'); }} aria-label="Next project">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="project-modal-nav-label">Next Project</span>
          </button>
        ) : (
          <div className="project-modal-nav-placeholder" />
        )}
      </div>
    </div>,
    document.body,
  );
}
