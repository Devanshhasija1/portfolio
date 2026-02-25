'use client';

const carouselImages = [
  { src: '/snapshot-images/mockup-0.jpg', alt: 'Spyne.ai Brand Book' },
  { src: '/snapshot-images/mockup-1.jpeg', alt: 'CryptoCase' },
  { src: '/snapshot-images/mockup-2.jpeg', alt: 'Shuttl' },
  { src: '/snapshot-images/mockup-3.jpeg', alt: 'Chair Wala Brand' },
  { src: '/snapshot-images/mockup-5.jpeg', alt: 'NFTapparel' },
  { src: '/snapshot-images/mockup-6.jpeg', alt: 'Incepthink' },
  { src: '/snapshot-images/mockup-7.jpeg', alt: 'PearMó' },
  { src: '/snapshot-images/mockup-13.jpeg', alt: 'HexBIS' },
];

export default function ImageCarousel() {
  const doubled = [...carouselImages, ...carouselImages];

  return (
    <section className="sc-image-carousel">
      <div className="carousel-track">
        {doubled.map((img, i) => (
          <div key={i} className="carousel-slide">
            <div className="carousel-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" className="carousel-img" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
