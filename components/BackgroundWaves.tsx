'use client';

export default function BackgroundWaves() {
  return (
    <div className="background-waves-wrapper no-click bwaves">
      <div className="bg-color"></div>
      <div className="bg-blur"></div>
      <div className="video-waves-embed w-embed">
        <div
          style={{ width: '100%', height: '100%' }}
          className="w-background-video w-background-video-atom"
        >
          <video
            id="bg_video"
            playsInline
            loop
            muted
            autoPlay
            preload="none"
            style={{ backgroundImage: "url('')" }}
            data-object-fit="cover"
          >
            <source src="/media/waves.webm" type="video/webm" />
            <source src="/media/waves.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
