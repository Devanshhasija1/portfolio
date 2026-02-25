'use client';

export default function AboutSection() {
  return (
    <section className="sc-about">
      {/* Desktop version */}
      <div className="sc-container about desk-ver">
        <div className="text-style-subheading">About me</div>
        <div className="about-text-wrapper">
          <div className="text-style-h4 split-lines show-tab">
            I&apos;m a Designer from India. With my{' '}
            <span className="text-style-h4-alt text-color-purple">deep passion</span> for
            Experiences, AI &amp; Design. I solve product problems and build appealing and usable
            digital experiences.
          </div>
          <h3 className="text-style-h4 split-lines hide-tab">
            I&apos;m a Designer from India.
            <br />
            With my deep passion for{' '}
            <span className="text-style-h4-alt text-color-purple">
              Experiences, AI &amp; Design.
            </span>
            <br />
            I solve product problems and build appealing and usable digital experiences.
          </h3>
        </div>
        <div className="circ-light no-click"></div>
      </div>

      {/* Mobile version */}
      <div className="sc-container about mob-ver">
        <div className="text-style-subheading">About me</div>
        <div className="about-text-wrapper">
          <div className="text-style-h4 show-tab">
            I&apos;m a Designer from India. With my{' '}
            <span className="text-style-h4-alt text-color-purple">deep passion</span> for
            Experiences, AI &amp; Design. I solve product problems and build appealing and usable
            digital experiences.
          </div>
        </div>
        <div className="circ-light no-click"></div>
      </div>

      {/* Decorative light ray overlay */}
      <div className="light-ray-abs-1 ray-1 no-click" />
      <img
        src="/images/5f154168911bc76101bba3b5_bottom%20right0052_0052.webp"
        loading="lazy"
        alt=""
        className="crystal-4 hide"
      />
    </section>
  );
}
