'use client';

const clients = [
  { name: 'Canon', desktopName: 'Canon', isLast: false },
  { name: 'Spyne.ai', desktopName: 'Spyne.ai', isLast: false },
  { name: 'Zealth', desktopName: 'Zealth AI (YC)', isLast: false },
  { name: 'GMT', desktopName: 'GiveMeTrees', isLast: false },
  { name: 'Swiggy', desktopName: 'Swiggy', isLast: false },
  { name: 'Samay Raina', desktopName: 'Samay Raina', isLast: true },
];

const NOISE_IMG_SRC =
  '/images/6463410fc39e1f0141eedc15_decorative-background-black-stone%201.jpg';

export default function ClientsSection() {
  return (
    <>
      <section className="sc-clients">
        {/* Desktop */}
        <div className="sc-container desk-ver clients">
          <div className="text-style-subheading">Clients</div>
          <div className="client-text-wrapper">
            <h3 className="text-style-h4-greybg split-lines hide-tab">
              I worked with some of the most{' '}
              <span className="text-style-h4-alt text-color-purple">
                innovative industry leaders
              </span>{' '}
              to help build their top-notch products
            </h3>
            <div className="text-style-h4-greybg split-lines show-tab">
              I worked with some of the{' '}
              <span className="text-style-h4-alt text-color-purple">
                most innovative
              </span>{' '}
              industry leaders to help build their top-notch products
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="sc-container mob-ver clients">
          <div className="text-style-subheading">Clients</div>
          <div className="client-text-wrapper">
            <div className="text-style-h4-greybg show-tab">
              I worked with some of the{' '}
              <span className="text-style-h4-alt text-color-purple">
                most innovative
              </span>{' '}
              industry leaders to help build their top-notch products
            </div>
          </div>
        </div>
      </section>

      <section className="sc-clients-list">
        <div className="points_list-wrapper clients">
          {clients.map((client) => (
            <div key={client.name} linefade="link" className="point-wrapper">
              {client.isLast && <div className="line-bottom"></div>}
              <div className="line-top"></div>

              {/* Mobile version */}
              <div className="sc-container mob-ver point">
                <div className="text-wrapper">
                  <div className="text-overflow_hide">
                    <h2 className="text-style-h2 text-caps">{client.name}</h2>
                  </div>
                </div>
              </div>

              {/* Desktop version */}
              <div className="sc-container desk-ver point">
                <div className="text-wrapper">
                  <div className="text-overflow_hide">
                    <h2 linefade="heading" className="text-style-h2 text-caps">
                      {client.desktopName}
                    </h2>
                  </div>
                  <div className="points-para-wrapper black"></div>
                </div>
              </div>

              {/* Desktop hover overlay version */}
              <div className="sc-container desk-ver point with-fill">
                <div className="text-wrapper blend-overlay">
                  <div className="text-overflow_hide">
                    <h2
                      linefade="heading"
                      className="text-style-h2 text-caps text-abs"
                    >
                      {client.desktopName}
                      <span className="random-indent"></span>
                    </h2>
                  </div>
                </div>
                <div className="fill grey">
                  <div className="sc-highlightwrapper">
                    <div className="flx-center">
                      <div className="highlight-circle-1"></div>
                      <div className="highlight-circle-2"></div>
                      <div className="highlight-circle-3"></div>
                    </div>
                  </div>
                  <img
                    src={NOISE_IMG_SRC}
                    loading="lazy"
                    alt=""
                    className="noise-img"
                  />
                  <img
                    src={NOISE_IMG_SRC}
                    loading="lazy"
                    alt=""
                    className="noise-img _2"
                  />
                  <img
                    src={NOISE_IMG_SRC}
                    loading="lazy"
                    alt=""
                    className="noise-img _3"
                  />
                  <img
                    src={NOISE_IMG_SRC}
                    loading="lazy"
                    alt=""
                    className="noise-img _4"
                  />
                </div>
              </div>

              <div className="point-top"></div>
              <div className="point-bottom"></div>
            </div>
          ))}
        </div>

        <div className="crystal-6_wrapper no-click">
          <img
            src="/images/5f1541686f7ca98df71faec4_Still%20Crystals_Camera_a0052.webp"
            loading="lazy"
            alt=""
            className="crystal-6 crystal-scroll"
          />
        </div>
      </section>
    </>
  );
}
