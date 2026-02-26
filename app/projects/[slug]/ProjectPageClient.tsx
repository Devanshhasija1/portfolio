'use client';

import { lazy, Suspense, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import LoaderAnimation from '@/components/LoaderAnimation';

const contentMap: Record<string, React.ComponentType<{ slug: string }>> = {
  'spyne-connect': lazy(() => import('@/components/projects/SpyneContent')),
};

export default function ProjectPageClient({ project }: { project: Project }) {
  const ContentComponent = contentMap[project.slug] ?? null;
  const chapterRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${sectionId}`);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const sectionId = entry.target.id;
          const chapterId = sectionId.replace(`${project.slug}-`, '');
          chapterRefs.current.forEach((btn, id) => {
            btn.classList.toggle('w--current', id === chapterId);
          });
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    project.chapters.forEach((ch) => {
      const el = document.getElementById(`${project.slug}-${ch.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [project.slug, project.chapters]);

  return (
    <>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .section-nav { pointer-events: none; }
        .nav-pill { pointer-events: auto; }
        .chip-socials { pointer-events: auto; }
        .section-back { pointer-events: none; }
        .button-project-back { pointer-events: auto; }
        .sidebar-structure { pointer-events: none; }
        .sidebar-content { pointer-events: auto; }
        .section-nav-desktop { pointer-events: none; }
        .logo-block { pointer-events: auto; }
        .chip-socials-wrapper { pointer-events: auto; }
        .project-loading-overlay { pointer-events: none; }
        .nav-menu-button { pointer-events: auto; }
        .next-project-fade { pointer-events: none; }
      `}</style>

      <div className="loading-overlay" style={{ display: 'flex', opacity: 1 }}>
        <div className="status">
          <LoaderAnimation id="preloader_image" />
        </div>
      </div>

      <div className="section-back" style={{ opacity: 1 }}>
        <Link href="/" className="button-project-back w-inline-block" aria-label="Back to home page">
          <img
            src="/images/645b5e5d57552962d27c0020_icon-back-2.svg"
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="icon-back-to-home"
          />
          <div className="text-button">Back</div>
        </Link>
      </div>

      <div className="sidebar-structure">
        <div className="sidebar-structure-sides"></div>
        <div className="sidebar-structure-middle"></div>
        <div className="sidebar-structure-sides">
          <div className="sidebar-content">
            <div className="text-projectpage-overline sidebar">CONTENTS</div>
            <div className="sidebar-chapters-wrapper">
              {project.chapters.map((ch) => (
                <button
                  key={ch.id}
                  ref={(el) => { if (el) chapterRefs.current.set(ch.id, el); }}
                  onClick={() => scrollToSection(`${project.slug}-${ch.id}`)}
                  className="chapter w-inline-block"
                  type="button"
                >
                  <div>{ch.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`section-banner ${project.slug}`}>
        <div className="container-banner">
          <div className="project-title-hero-wrapper">
            <div className="title-wrapper">
              <div className="project-title-date-wrapper">
                <div className="text-hero project-title">{project.title}</div>
                <div className="text-projectpage-year">{project.subtitle}</div>
              </div>
            </div>
            <div className="project-banner-image-wrapper" style={{ opacity: 1 }}>
              <img
                src={project.bannerImage}
                loading="eager"
                alt={project.title}
                className="image-project-banner"
              />
            </div>
          </div>
        </div>
        <div className="project-overview-noise"></div>
        <div className="project-fade"></div>
      </div>

      <section id={`${project.slug}-overview`} className="section-overview">
        <div className="container-overview">
          <div className="overview-left">
            <div className="overview-text-wrapper role-right-indent">
              <div className="text-overview-overline">My Role</div>
              <div className="text-projectpage-body">
                <span className="text-highlighted-body">{project.role}</span> - {project.roleDetails}
              </div>
            </div>
            {project.team.length > 0 && (
              <div className="overview-text-wrapper">
                <div className="text-overview-overline">Team</div>
                <div className="text-projectpage-body team">
                  {project.team.map((member, i) => (
                    <span key={i}>
                      {member}
                      {i < project.team.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="overview-text-wrapper">
              <div className="text-overview-overline">Timeline &amp; Status</div>
              <div className="text-projectpage-body">
                {project.timeline}
              </div>
            </div>
          </div>
          <div className="overview-right">
            <div className="overview-text-wrapper">
              <div className="text-overview-overline">Overview</div>
              <div className="text-projectpage-body">{project.overview}</div>
            </div>
          </div>
        </div>
      </section>

      {ContentComponent && (
        <Suspense fallback={null}>
          <ContentComponent slug={project.slug} />
        </Suspense>
      )}
    </>
  );
}
