'use client';

import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    category: 'UX Design',
    title:
      'Exploring How Artificial Intelligence Is Reshaping UX Design Workflows and Enabling Designers to Build More Intuitive Digital Experiences',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 2,
    category: 'Development',
    title:
      'The Art of Building Scalable Design Systems That Bridge the Gap Between Creative Vision and Technical Implementation Across Large Organizations',
    date: 'Feb 8, 2026',
    readTime: '12 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    category: 'Psychology',
    title:
      'Why Understanding Human Psychology Is the Key to Creating Digital Products That People Genuinely Love to Use Every Single Day',
    date: 'Jan 28, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop&q=80',
  },
];

export default function BlogSection() {
  return (
    <section className="sc-blog">
      <div className="sc-container projects">
        <div className="heading-wrapper">
          <div className="rel-wrapper desk-ver">
            <h2
              letter-fade=""
              text-split=""
              className="text-style-h2 section-heading"
            >
              Latest{' '}
              <span className="text-style-h2-alt text-color-purple">B</span>
              logs
            </h2>
          </div>
          <div
            letter-fade=""
            text-split=""
            className="text-style-big project-no desk-ver"
          ></div>
          <div className="rel-wrapper">
            <h2 className="text-style-h2 section-heading mob-ver">
              Latest{' '}
              <span className="text-style-h2-alt text-color-purple">B</span>
              logs
            </h2>
          </div>
          <div className="text-style-big project-no mob-ver"></div>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card" role="article">
              <div className="blog-card-img-wrapper">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="blog-card-img"
                  width={800}
                  height={500}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="blog-card-img-overlay" />
                <span className="blog-card-category">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <h3 className="blog-card-title">{post.title}</h3>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{post.date}</span>
                  <span className="blog-card-dot">·</span>
                  <span className="blog-card-read-time">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-view-all-wrapper">
          <span className="blog-view-all" style={{ opacity: 0.5, cursor: 'default' }}>
            <span className="blog-view-all-text">Blog coming soon</span>
          </span>
        </div>
      </div>
    </section>
  );
}
