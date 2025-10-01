import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { termsByCategory, categoryNames } from '@/data/terms';
import { NewsSection } from '@/components/NewsSection';

function App() {
  const [fontSize, setFontSize] = useState('normal');
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const fontSizeMultipliers = {
    normal: 1,
    large: 1.15,
    xlarge: 1.3
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ['hero', 'basic', 'production', 'revenue', 'advanced', 'community', 'analytics', 'news'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'xlarge') setFontSize('large');
    else if (fontSize === 'large') setFontSize('normal');
  };

  const handlePrint = () => {
    window.print();
  };

  const multiplier = fontSizeMultipliers[fontSize];

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontSize: `${multiplier}rem` }}
    >
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 print:hidden">
        <div className="glass-modern border-b border-gray-900/10">
          <div className="container-wide">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-4 magnetic"
              >
                <img
                  src="/sidondding logo.png"
                  alt="시돈띵 Logo"
                  className="h-16 w-auto object-contain"
                />
                <div className="hidden md:block">
                  <h1 className="font-black text-xl text-gradient-vivid leading-tight">
                    유튜브 용어 사전
                  </h1>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">쉽고 명확한 설명</p>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-10">
                {[
                  { id: 'basic', label: '기본' },
                  { id: 'production', label: '제작' },
                  { id: 'revenue', label: '수익' },
                  { id: 'advanced', label: '고급' },
                  { id: 'community', label: '소통' },
                  { id: 'analytics', label: '통계' },
                  { id: 'news', label: '뉴스' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-bold uppercase tracking-wider transition-all ${
                      activeSection === item.id
                        ? 'text-purple-600'
                        : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Font Controls */}
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1 bg-gray-100 rounded-full p-1">
                  <Button
                    onClick={decreaseFontSize}
                    disabled={fontSize === 'normal'}
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 rounded-full hover:bg-white disabled:opacity-30"
                  >
                    <span className="text-xs font-bold">A</span>
                  </Button>
                  <Button
                    onClick={increaseFontSize}
                    disabled={fontSize === 'xlarge'}
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 rounded-full hover:bg-white disabled:opacity-30"
                  >
                    <span className="text-base font-black">A</span>
                  </Button>
                </div>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden glass-modern border-b border-gray-900/10">
            <div className="container-wide px-4 py-4">
              <div className="flex flex-col gap-2">
                {[
                  { id: 'basic', label: '기본', emoji: '👋' },
                  { id: 'production', label: '제작', emoji: '🎬' },
                  { id: 'revenue', label: '수익', emoji: '💰' },
                  { id: 'advanced', label: '고급', emoji: '🚀' },
                  { id: 'community', label: '소통', emoji: '💬' },
                  { id: 'analytics', label: '통계', emoji: '📊' },
                  { id: 'news', label: '뉴스', emoji: '📰' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left py-3 px-4 rounded-lg font-bold transition-all ${
                      activeSection === item.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.emoji} {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bold Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center section-spacing px-4 overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
          >
            <source src="/randing_hero.mp4" type="video/mp4" />
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 md:left-20 w-48 h-48 md:w-96 md:h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-blue-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-standard relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 bg-black text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-wider mb-8 md:mb-10 animate-reveal">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            유튜브 완벽 가이드
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-6 md:mb-8 leading-tight tracking-wide animate-reveal px-4" style={{ animationDelay: '0.1s', letterSpacing: '0.05em' }}>
            유튜브 <span className="text-gradient-vivid">용어의</span>
            <br />
            모든 것
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-10 md:mb-12 max-w-2xl mx-auto font-semibold animate-reveal leading-relaxed px-4" style={{ animationDelay: '0.2s' }}>
            61개 핵심 용어를 쉽게 설명합니다
            <br />
            초보자부터 전문가까지
            <br />
            단 몇 분이면 충분합니다
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center animate-reveal px-4" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => scrollToSection('basic')}
              className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white font-bold px-8 py-6 md:px-10 md:py-7 text-base md:text-lg rounded-2xl transition-all magnetic group"
            >
              <span>바로 시작하기</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="hidden w-full sm:w-auto border-2 border-black hover:bg-black hover:text-white font-bold px-8 py-6 md:px-10 md:py-7 text-base md:text-lg rounded-2xl transition-all magnetic"
            >
              인쇄하기
            </Button>
          </div>

          {/* Stats - Brutal Style */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto mt-12 md:mt-20 animate-reveal px-4" style={{ animationDelay: '0.4s' }}>
            {[
              { number: '61개', label: '핵심 용어' },
              { number: '6개', label: '카테고리' },
              { number: '100%', label: '무료' }
            ].map((stat, i) => (
              <div
                key={i}
                className="card-brutal p-4 md:p-6 text-center magnetic"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gradient-electric mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Term Sections - Modern Grid */}
      {[
        { id: 'basic', category: 'basic', color: 'purple', emoji: '👋', bgColor: 'bg-purple-50/80' },
        { id: 'production', category: 'production', color: 'blue', emoji: '🎬', bgColor: 'bg-blue-50/80' },
        { id: 'revenue', category: 'revenue', color: 'green', emoji: '💰', bgColor: 'bg-emerald-50/80' },
        { id: 'advanced', category: 'advanced', color: 'pink', emoji: '🚀', bgColor: 'bg-pink-50/80' },
        { id: 'community', category: 'community', color: 'orange', emoji: '💬', bgColor: 'bg-orange-50/80' },
        { id: 'analytics', category: 'analytics', color: 'cyan', emoji: '📊', bgColor: 'bg-cyan-50/80' }
      ].map((section, idx) => (
        <section key={section.id} id={section.id} className={`section-spacing ${section.bgColor}`}>
          <div className="container-wide px-4">
            {/* Section Header */}
            <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
              <div className="text-4xl md:text-6xl">{section.emoji}</div>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tight">
                  {categoryNames[section.category]}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 font-semibold">
                  {section.category === 'basic' && '유튜브를 시작하기 위한 기본 용어'}
                  {section.category === 'production' && '영상 제작과 관련된 용어'}
                  {section.category === 'revenue' && '수익 창출과 관련된 용어'}
                  {section.category === 'advanced' && '더 나은 채널 운영을 위한 고급 기능'}
                  {section.category === 'community' && '구독자와 소통하는 기능'}
                  {section.category === 'analytics' && '채널 성과를 분석하는 통계'}
                </p>
              </div>
            </div>

            {/* Terms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-modern">
              {termsByCategory[section.category].map((term, index) => (
                <div
                  key={index}
                  className="card-brutal p-5 md:p-8 group"
                >
                  {/* Term Header */}
                  <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-xl flex items-center justify-center text-xl md:text-2xl font-black group-hover:scale-110 transition-transform">
                      {term.korean[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-1 break-words">{term.korean}</h3>
                      <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider break-words">{term.english}</p>
                    </div>
                  </div>

                  {/* Simple Explanation */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-5 mb-4 md:mb-5">
                    <div className="flex items-start gap-2 md:gap-3">
                      <span className="text-xl md:text-2xl font-black flex-shrink-0">=</span>
                      <p className="text-base md:text-lg font-bold text-gray-800 break-words">{term.simple}</p>
                    </div>
                  </div>

                  {/* Example */}
                  <div className="flex items-start gap-2 md:gap-3 text-gray-600">
                    <span className="text-lg md:text-xl flex-shrink-0">💡</span>
                    <p className="text-xs sm:text-sm leading-relaxed break-words">{term.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* News Section */}
      <NewsSection />

      {/* Footer - Minimalist */}
      <footer className="section-spacing bg-black text-white print:hidden">
        <div className="container-wide text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-3xl">📺</span>
          </div>
          <h3 className="text-3xl font-black mb-4">유튜브 용어 사전</h3>
          <p className="text-gray-400 mb-2 font-semibold">
            모든 분들이 유튜브를 쉽게 즐길 수 있도록
          </p>
          <p className="text-gray-500 mb-10 font-bold text-lg">
            시돈띵이 함께 합니다
          </p>
          <Button
            onClick={handlePrint}
            className="hidden bg-white hover:bg-gray-100 text-black font-bold px-8 py-4 rounded-2xl transition-all magnetic"
          >
            📄 인쇄하기
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default App;
