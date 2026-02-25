'use client';

const skills = [
  {
    name: 'AI + Design',
    overlayName: <>AI + Desig<span className="random-indent">n</span></>,
    description:
      'I use AI as a creative partner, from ideation to prototyping to production. Prompt engineering, generative tools, and intelligent workflows are part of my everyday toolkit.',
    isLast: false,
  },
  {
    name: 'Vibe Coding',
    overlayName: <>Vibe Coding<span className="random-indent"></span></>,
    description:
      'I build what I design. With AI-assisted coding and a deep understanding of frontend systems, I ship real products, not just mockups.',
    isLast: false,
  },
  {
    name: 'Product',
    overlayName: <>Produc<span className="random-indent">t</span></>,
    description:
      'Research-driven and user-obsessed. I blend data, testing, and intuition to shape experiences that actually solve problems.',
    isLast: false,
  },
  {
    name: 'Motion',
    overlayName: <>Motion<span className="random-indent"></span></>,
    description:
      'I use motion to elevate user engagement, creating memorable experiences through micro interactions & captivating animations.',
    isLast: false,
  },
  {
    name: 'Visual',
    overlayName: <>Visual<span className="random-indent"></span></>,
    description:
      'Starting out as a graphic designer, I have a keen eye for visual design and an unwavering passion for aesthetics.',
    isLast: false,
  },
  {
    name: '3D',
    overlayName: <>3D<span className="random-indent"></span></>,
    description:
      'With 3D design skills, I add depth and dimension to my designs, creating visually immersive experiences.',
    isLast: true,
  },
];

const NOISE_IMG_SRC =
  '/images/6463410fc39e1f0141eedc15_decorative-background-black-stone%201.jpg';

export default function WhatIDoSection() {
  return (
    <section className="sc-whatido">
      <div className="sc-container whatido">
        <div className="text-style-subheading">What I do</div>
      </div>

      <div className="points_list-wrapper">
        {skills.map((skill) => (
          <div key={skill.name} linefade="link" className="point-wrapper">
            {skill.isLast && <div className="line-bottom"></div>}
            <div className="line-top"></div>

            <div className="sc-container mob-ver point">
              <div className="text-wrapper">
                <div className="text-overflow_hide">
                  <h2 className="text-style-h2 text-caps">{skill.name}</h2>
                </div>
              </div>
            </div>

            <div className="sc-container desk-ver point">
              <div className="text-wrapper">
                <div className="text-overflow_hide">
                  <h2 linefade="heading" className="text-style-h2 text-caps">
                    {skill.name}
                  </h2>
                </div>
                <div className="points-para-wrapper black">
                  <div linefade="text" className="text-style-normal opac-80">
                    {skill.description}
                  </div>
                </div>
              </div>
            </div>

            <div className="sc-container desk-ver point with-fill">
              <div className="text-wrapper blend-overlay">
                <div className="text-overflow_hide">
                  <h2
                    linefade="heading"
                    className="text-style-h2 text-caps text-abs"
                  >
                    {skill.overlayName}
                  </h2>
                </div>
              </div>
              <div className="fill">
                <div className="sc-highlightwrapper">
                  <div className="flx-center">
                    <div className="highlight-circle-1"></div>
                    <div className="highlight-circle-2"></div>
                    <div className="highlight-circle-3"></div>
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={NOISE_IMG_SRC} loading="lazy" alt="" className="noise-img" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={NOISE_IMG_SRC} loading="lazy" alt="" className="noise-img _2" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={NOISE_IMG_SRC} loading="lazy" alt="" className="noise-img _3" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={NOISE_IMG_SRC} loading="lazy" alt="" className="noise-img _4" />
              </div>
            </div>

            <div className="point-top"></div>
            <div className="point-bottom"></div>
          </div>
        ))}
      </div>

      <div className="crystal-5-wrapper no-click">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/5f154167ce6db755927b5f2c_Still%20Crystals_Camera_a_i1_i1_0052.png"
          loading="lazy"
          alt=""
          className="crystal-5 crystal-scroll"
        />
      </div>
    </section>
  );
}
