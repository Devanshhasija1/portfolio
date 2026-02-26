'use client';

import React from 'react';

function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-inner-wrapper">
        <div className="track-horizontal">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <h2 className="text-style-h5 text-color-purple">
                Product <span className="text-style-h5-alt">Designer</span>‍
              </h2>
              <div className="text-style-h5 text-color-purple idk">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <h2 className="text-style-h5 text-color-purple">
                ‍<span className="text-style-h5-alt">V</span>ibe Coder
              </h2>
              <div className="text-style-h5 text-color-purple idk">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <>
      {/* Desktop version */}
      <section className="sc-header c-header hide-tab">
        <div className="sc-container c-header">
          <div className="sc-container c-header-inner">
            <div className="hola-wrapper">
              <div className="text-anim-wrapper">
                <div className="text-style-h1">Hi, I&apos;m</div>
              </div>
              <div
                js-scrollflip-element="zone"
                className="profile_pic-wrapper rel-2-sc"
              >
                <div className="video-embed-wrapper">
                  <div className="video-embed w-embed">
                    <div
                      style={{ width: '100%', height: '100%' }}
                      className="w-background-video w-background-video-atom"
                    >
                      <video
                        playsInline
                        loop
                        muted
                        autoPlay
                        preload="none"
                        style={{ objectFit: 'cover' }}
                      >
                        <source src="/media/animation-reel.webm" type="video/webm" />
                        <source src="/media/animation-reel.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <div className="showreel-text-wrapper">
                    <a
                      className="showreel-playlottie only-icon"
                      data-animation-type="lottie"
                      data-src="/lottie/play-button.json"
                      data-loop="1"
                      data-direction="1"
                      data-autoplay="1"
                      data-renderer="svg"
                      href="https://vimeo.com/917930097?share=copy"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Watch showreel on Vimeo"
                    />
                    <div className="text-style-h5-alt showreel hide">Showreel.mp4</div>
                    <div className="gradient-bg hide"></div>
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/devansh_img.jpeg"
                  loading="lazy"
                  alt="Devansh Hasija - Designer from India"
                  className="profile_pic-header"
                />
              </div>
            </div>
            <div className="text-anim-wrapper">
              <h1 className="text-style-h1-alt text-color-purple">
                Devansh Hasija
              </h1>
              <h1 className="text-style-h1-alt-moretext text-color-purple moretext">
                <br />
                <span className="fake-text-span">
                  a Product Designer and Vibe Coder from India
                </span>
              </h1>
            </div>
          </div>
          <Marquee />
        </div>
      </section>

      {/* Tablet/Mobile version */}
      <section className="sc-header tab-header show-tab">
        <div className="sc-container c-header fromtab">
          <div className="sc-container c-header-inner fromtab">
            <div id="hola-wrapper_tab" className="hola-wrapper_fromtab">
              <div className="text-anim-wrapper">
                <div className="text-style-h1">Hi, I&apos;m</div>
              </div>
            </div>
            <div className="text-anim-wrapper">
              <div className="text-style-h1-alt text-color-purple line-height-0-9">
                Devansh Hasija
              </div>
            </div>
          </div>
          <Marquee />
        </div>
        <div className="sc-container new_vid c-header fromtab-sticky no-click">
          <div
            id="profile-pic-wrapper_tab"
            js-scrollflip-element="zone"
            className="profile_pic-wrapper_fromtab rel-2-sc"
          >
            <div className="video-embed-wrapper_fromtab">
              <div className="video-embed w-embed">
                <div
                  style={{ width: '100%', height: '100%' }}
                  className="w-background-video w-background-video-atom"
                >
                  <video
                    playsInline
                    loop
                    muted
                    autoPlay
                    preload="none"
                    style={{ objectFit: 'cover' }}
                  >
                    <source src="/media/animation-reel.webm" type="video/webm" />
                    <source src="/media/animation-reel.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="showreel-text-wrapper-fromtab">
                <div
                  className="showreel-playlottie only-icon"
                  data-animation-type="lottie"
                  data-src="/lottie/play-button.json"
                  data-loop="1"
                  data-direction="1"
                  data-autoplay="1"
                  data-renderer="svg"
                />
                <div className="text-style-h5-alt showreel hide">Showreel.mp4</div>
                <div className="gradient-bg hide"></div>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/devansh_img.jpeg"
              loading="lazy"
              alt="Devansh Hasija - Designer from India"
              className="profile_pic-header"
            />
          </div>
        </div>
      </section>
    </>
  );
}
