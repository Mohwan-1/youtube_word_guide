import { useEffect } from 'react';

export function AdSense() {
  useEffect(() => {
    try {
      // AdSense 광고 로드
      if (window.adsbygoogle && window.adsbygoogle.loaded !== true) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <section className="section-spacing bg-white">
      <div className="container-wide px-4">
        <div className="max-w-4xl mx-auto">
          {/* Google AdSense 인아티클 광고 */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-8057197445850296"
            data-ad-slot="5964488484"
          ></ins>
        </div>
      </div>
    </section>
  );
}
