'use client';

import { useState, lazy, Suspense } from 'react';
import { trackModalOpen } from '@/lib/gtag';

const ProjectModal = lazy(() => import('./ProjectModal'));

const projects = [
  {
    pdf: '/media/Devansh_Hasija_UI.pdf',
    image: '/snapshot-images/mockup-1.jpeg',
    title: 'Crypto',
    titleAlt: 'Case',
    year: '2023',
    containerClass: '_1',
    imageContainerClass: '_1',
  },
  {
    pdf: '/media/Chair_Wala_Brandbook.pdf',
    image: '/snapshot-images/mockup-3.jpeg',
    title: 'Chair',
    titleAlt: 'Wala',
    year: '2022',
    containerClass: '',
    imageContainerClass: '_3',
    imageClass: '_2',
  },
  {
    pdf: '/media/Devansh_Hasija_LIP.pdf',
    image: '/snapshot-images/mockup-10.jpeg',
    title: 'Child Rights',
    titleAlt: '& You',
    year: '2023',
    containerClass: '_2',
    imageContainerClass: '_2',
    imageClass: '_3',
  },
  {
    pdf: '/media/Alie_Presentation.pdf',
    image: '/snapshot-images/mockup-11.jpeg',
    title: 'A.L.',
    titleAlt: 'I.E.',
    year: '2023',
    containerClass: '',
    imageContainerClass: '_4',
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <>
      <section className="sc-projects">
        <div className="sc-container projects">
          <div className="heading-wrapper">
            <div className="rel-wrapper desk-ver">
              <h2 letter-fade="" text-split="" className="text-style-h2 section-heading">
                Pro<span className="text-style-h2-alt text-color-purple">j</span>ects
              </h2>
            </div>
            <div letter-fade="" text-split="" className="text-style-big project-no desk-ver">
              (04)
            </div>
            <div className="rel-wrapper mob-ver">
              <h2 className="text-style-h2 section-heading">
                Pro<span className="text-style-h2-alt text-color-purple">j</span>ects
              </h2>
            </div>
            <div className="text-style-big project-no mob-ver">(04)</div>
          </div>

          <div className="projects-wrapper">
            {projects.map((project, index) => (
              <button
                key={index}
                hoverstagger="link"
                onClick={() => { setActiveProject(index); trackModalOpen(`project_${project.title}_${project.titleAlt}`); }}
                className={`project-container ${project.containerClass} w-inline-block`}
                style={{ cursor: 'pointer', background: 'none', border: 'none', textAlign: 'inherit', padding: 0 }}
              >
                <div className={`pr-image-container ${project.imageContainerClass}`}>
                  <img
                    src={project.image}
                    loading="lazy"
                    alt={`${project.title} ${project.titleAlt} - Product Design project`}
                    className={`pr-image${project.imageClass ? ' ' + project.imageClass : ''}`}
                  />
                  <div className="projects-hover_images-wrapper no-click">
                    <div className="project-images"></div>
                  </div>
                  <div className="img-black-overlay no-click"></div>
                </div>
                <div className="project-info-wrapper">
                  <div className="proj-title-wrapper desk-ver">
                    <div hoverstagger="text" className="text-style-big project-title abs">
                      {project.title} <span className="text-style-big-alt">{project.titleAlt}</span>
                    </div>
                    <div hoverstagger="text" className="text-style-big project-title">
                      {project.title} <span className="text-style-big-alt">{project.titleAlt}</span>
                    </div>
                  </div>
                  <div className="proj-title-wrapper mob-ver">
                    <div className="text-style-big project-title">
                      {project.title}{' '}
                      <span className="text-style-big-alt">{project.titleAlt}</span>
                    </div>
                  </div>
                  <div className="text-style-normal project-desc">{project.year}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeProject !== null && (
        <Suspense fallback={null}>
          <ProjectModal
            isOpen
            onClose={() => setActiveProject(null)}
            pdfUrl={projects[activeProject].pdf}
            title={`${projects[activeProject].title} ${projects[activeProject].titleAlt}`}
            onPrev={activeProject > 0 ? () => setActiveProject(activeProject - 1) : undefined}
            onNext={activeProject < projects.length - 1 ? () => setActiveProject(activeProject + 1) : undefined}
          />
        </Suspense>
      )}
    </>
  );
}
