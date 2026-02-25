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
                      data-poster-url=""
                      data-video-urls="/media/animation-reel.webm,/media/animation-reel.mp4"
                      data-autoplay="true"
                      data-loop="true"
                      data-wf-ignore="true"
                      style={{ width: '100%', height: '100%' }}
                      className="w-background-video w-background-video-atom"
                    >
                      <video
                        playsInline
                        loop
                        muted
                        autoPlay
                        preload="none"
                        style={{ backgroundImage: "url('')" }}
                        data-wf-ignore="true"
                        data-object-fit="cover"
                      >
                        <source src="/media/animation-reel.webm" type="video/webm" data-wf-ignore="true" />
                        <source src="/media/animation-reel.mp4" type="video/mp4" data-wf-ignore="true" />
                      </video>
                    </div>
                  </div>
                  <div className="showreel-text-wrapper">
                    <a
                      className="showreel-playlottie only-icon"
                      data-w-id="dcf0555f-9acb-8e04-97a7-dd0530a0af53"
                      data-animation-type="lottie"
                      data-src="https://uploads-ssl.webflow.com/5e56d5303779dac51cf15391/64707656de20455aa6404553_play%20button.json"
                      data-loop="1"
                      data-direction="1"
                      data-autoplay="1"
                      data-is-ix2-target="0"
                      data-renderer="svg"
                      data-default-duration="1.334667946972529"
                      data-duration="0"
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
                  data-poster-url=""
                  data-video-urls="/media/animation-reel.webm,/media/animation-reel.mp4"
                  data-autoplay="true"
                  data-loop="true"
                  data-wf-ignore="true"
                  style={{ width: '100%', height: '100%' }}
                  className="w-background-video w-background-video-atom"
                >
                  <video
                    playsInline
                    loop
                    muted
                    autoPlay
                    preload="none"
                    style={{ backgroundImage: "url('')" }}
                    data-wf-ignore="true"
                    data-object-fit="cover"
                  >
                    <source src="/media/animation-reel.webm" type="video/webm" data-wf-ignore="true" />
                    <source src="/media/animation-reel.mp4" type="video/mp4" data-wf-ignore="true" />
                  </video>
                </div>
              </div>
              <div className="showreel-text-wrapper-fromtab">
                <div
                  className="showreel-playlottie only-icon"
                  data-w-id="d7f85d61-8d38-5c11-8760-fc2aa3881cc5"
                  data-animation-type="lottie"
                  data-src="https://uploads-ssl.webflow.com/5e56d5303779dac51cf15391/64707656de20455aa6404553_play%20button.json"
                  data-loop="1"
                  data-direction="1"
                  data-autoplay="1"
                  data-is-ix2-target="0"
                  data-renderer="svg"
                  data-default-duration="1.334667946972529"
                  data-duration="0"
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
