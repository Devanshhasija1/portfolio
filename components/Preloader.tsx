'use client';

import LoaderAnimation from './LoaderAnimation';

export default function Preloader() {
  return (
    <>
      <div className="preloader-page-wrapper">
        <div className="pl-bg-container">
          <div className="pl-name-wrapper"></div>
        </div>
        <div className="main-prel-wrapper">
          <section className="sc-header-prel prel-head">
            <div className="sc-container-prel prel-c-header">
              <div className="sc-container c-header-inner-prel">
                <div className="hola-wrapper-prel">
                  <div className="text-anim-wrapper-prel">
                    <div className="prel-h1 preloader-name">Hi, I&apos;m</div>
                  </div>
                  <div className="profile_pic-wrapper-prel rel-2-sc-prel">
                    <img
                      src="/images/devansh_img.jpeg"
                      loading="lazy"
                      alt="Devansh Hasija - Designer from India"
                      className="profile_pic-header-prel"
                    />
                  </div>
                </div>
                <div className="text-anim-wrapperprel">
                  <div className="prel-h1-alt text-color-purple preloader-name prel">
                    Devansh Hasija
                  </div>
                </div>
              </div>
              <div className="marquee-wrapper-prel">
                <div className="marquee-inner-wrapper-prel">
                  <div className="track-horizontal prel">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} aria-hidden="true">
                        <span className="text-style-h5 text-color-purple" role="presentation">
                          Product <span className="text-style-h5-alt">Designer</span>‍
                        </span>
                        <span className="text-style-h5 text-color-purple idk" role="presentation">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="text-style-h5 text-color-purple" role="presentation">
                          <span className="text-style-h5-alt">V</span>ibe Coder
                        </span>
                        <span className="text-style-h5 text-color-purple idk" role="presentation">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div
        id="preloader_cover"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 5,
          background: '#000',
          pointerEvents: 'none',
        }}
      />
      <LoaderAnimation id="preloader_image" />

      <div className="preloader-wrapper">
        <div className="status">
          <div className="dhlogo_overlay"></div>
          <div className="center-dot-wrapper">
            <div className="dh-logo-placeholder w-embed">
              <svg
                width="210"
                height="126"
                viewBox="0 0 210 126"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* D - left vertical */}
                <rect x="0" y="0" width="7" height="126" fill="#fff" />
                <rect x="10" y="16" width="7" height="94" fill="#fff" />
                <rect x="20" y="31" width="7" height="64" fill="#fff" />
                {/* D - top horizontal */}
                <rect x="0" y="0" width="76" height="8" fill="#fff" />
                <rect x="14" y="11" width="55" height="8" fill="#fff" />
                <rect x="27" y="22" width="36" height="8" fill="#fff" />
                {/* D - right vertical */}
                <rect x="69" y="8" width="7" height="110" fill="#fff" />
                <rect x="59" y="19" width="7" height="88" fill="#fff" />
                <rect x="49" y="30" width="7" height="66" fill="#fff" />
                {/* D - bottom horizontal */}
                <rect x="0" y="118" width="76" height="8" fill="#fff" />
                <rect x="14" y="107" width="55" height="8" fill="#fff" />
                <rect x="27" y="96" width="36" height="8" fill="#fff" />
                {/* H - left vertical */}
                <rect x="96" y="0" width="7" height="126" fill="#fff" />
                <rect x="106" y="16" width="7" height="94" fill="#fff" />
                <rect x="116" y="31" width="7" height="64" fill="#fff" />
                {/* H - crossbar */}
                <rect x="96" y="55" width="90" height="8" fill="#fff" />
                <rect x="110" y="66" width="62" height="8" fill="#fff" />
                <rect x="120" y="77" width="42" height="8" fill="#fff" />
                {/* H - right vertical */}
                <rect x="179" y="0" width="7" height="126" fill="#fff" />
                <rect x="169" y="16" width="7" height="94" fill="#fff" />
                <rect x="159" y="31" width="7" height="64" fill="#fff" />
              </svg>
            </div>
            <div className="center-dot"></div>
          </div>
        </div>
      </div>
    </>
  );
}
