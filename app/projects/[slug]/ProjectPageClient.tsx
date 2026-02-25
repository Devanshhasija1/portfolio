'use client';

import Link from 'next/link';
import type { Project } from '@/lib/projects';
import LoaderAnimation from '@/components/LoaderAnimation';

export default function ProjectPageClient({ project }: { project: Project }) {
  return (
    <>
      <style jsx global>{`
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
                <a key={ch.id} href={`#${project.slug}-${ch.id}`} className="chapter w-inline-block">
                  <div>{ch.label}</div>
                </a>
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
    </>
  );
}
