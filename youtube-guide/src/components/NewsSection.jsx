import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import newsData from '@/data/naver-news.json';

export function NewsSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      // JSON 파일을 직접 import하여 사용
      setNewsItems(newsData);
      setError(null);
    } catch (err) {
      console.error('Failed to load news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-spacing bg-slate-50/80">
        <div className="container-wide">
          <div className="flex items-center gap-6 mb-16">
            <div className="text-6xl">📰</div>
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
                최신 유튜브 뉴스
              </h2>
              <p className="text-lg text-gray-600 font-semibold">
                네이버에서 선별한 최신 유튜브 관련 뉴스
              </p>
            </div>
          </div>
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
            <p className="mt-4 text-gray-600 font-semibold">뉴스를 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-spacing bg-slate-50/80">
        <div className="container-wide">
          <div className="flex items-center gap-6 mb-16">
            <div className="text-6xl">📰</div>
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
                최신 유튜브 뉴스
              </h2>
              <p className="text-lg text-gray-600 font-semibold">
                네이버에서 선별한 최신 유튜브 관련 뉴스
              </p>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">⚠️ {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="section-spacing bg-slate-50/80">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-16">
          <div className="text-6xl">📰</div>
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
              최신 유튜브 뉴스
            </h2>
            <p className="text-lg text-gray-600 font-semibold">
              네이버에서 선별한 최신 유튜브 관련 뉴스 • 1시간마다 업데이트
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-modern">
          {newsItems.map((news, index) => (
            <a
              key={index}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-brutal p-6 group hover:shadow-2xl transition-all"
            >
              {/* Thumbnail */}
              {news.thumbnail && (
                <div className="mb-4 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-black mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {news.title}
              </h3>

              {/* Description */}
              {news.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {news.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span className="flex items-center gap-1">
                  📰 {news.source}
                </span>
                <span className="flex items-center gap-1">
                  🕐 {news.date}
                </span>
              </div>

              {/* External Link Icon */}
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600">
                <span>기사 읽기</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Update Time */}
        {newsItems.length > 0 && newsItems[0].crawledAt && (
          <div className="mt-8 text-center text-sm text-gray-500 font-semibold">
            마지막 업데이트: {new Date(newsItems[0].crawledAt).toLocaleString('ko-KR')}
          </div>
        )}
      </div>
    </section>
  );
}
