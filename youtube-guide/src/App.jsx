import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { termsByCategory, categoryNames } from '@/data/terms';

function App() {
  const [fontSize, setFontSize] = useState('normal');
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fontSizeMultipliers = {
    normal: 1,
    large: 1.15,
    xlarge: 1.3
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'basic', 'production', 'revenue', 'advanced', 'community', 'analytics'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
      style={{ fontSize: `${multiplier}rem` }}
    >
      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-xl lg:text-2xl">📺</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-lg lg:text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  유튜브 용어 사전
                </span>
                <p className="text-xs text-gray-500">쉽고 명확한 설명</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('basic')}
                className={`text-xs font-bold transition-all ${
                  activeSection === 'basic'
                    ? 'text-violet-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                기본
              </button>
              <button
                onClick={() => scrollToSection('production')}
                className={`text-xs font-bold transition-all ${
                  activeSection === 'production'
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                제작
              </button>
              <button
                onClick={() => scrollToSection('revenue')}
                className={`text-xs font-bold transition-all ${
                  activeSection === 'revenue'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                수익
              </button>
              <button
                onClick={() => scrollToSection('advanced')}
                className={`text-xs font-bold transition-all ${
                  activeSection === 'advanced'
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                고급
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className={`text-xs font-bold transition-all ${
                  activeSection === 'community'
                    ? 'text-pink-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                소통
              </button>
              <button
                onClick={() => scrollToSection('analytics')}
                className={`text-xs font-bold transition-all ${
                  activeSection === 'analytics'
                    ? 'text-cyan-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                통계
              </button>
            </div>

            {/* Font Size Controls + Mobile Menu */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full p-1">
                <Button
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'normal'}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-white disabled:opacity-40"
                >
                  <span className="text-sm">A</span>
                </Button>
                <Button
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xlarge'}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-white disabled:opacity-40"
                >
                  <span className="text-lg font-bold">A</span>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => scrollToSection('basic')}
                className="px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
              >
                기본 용어
              </button>
              <button
                onClick={() => scrollToSection('production')}
                className="px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                제작 용어
              </button>
              <button
                onClick={() => scrollToSection('revenue')}
                className="px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                수익 용어
              </button>
              <button
                onClick={() => scrollToSection('advanced')}
                className="px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                고급 기능
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                소통 기능
              </button>
              <button
                onClick={() => scrollToSection('analytics')}
                className="px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
              >
                통계 분석
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-gray-700">초보자를 위한 완벽 가이드</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 lg:mb-8 leading-tight">
              유튜브 용어를
              <br />
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  쉽고 재미있게
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-violet-200 via-indigo-200 to-blue-200 -z-10 blur-sm" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 lg:mb-12 leading-relaxed">
              복잡한 유튜브 용어, 이제 초등학생도 이해할 수 있어요
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => scrollToSection('basic')}
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold px-8 py-6 text-base lg:text-lg rounded-2xl shadow-2xl shadow-violet-500/30 hover:shadow-3xl hover:-translate-y-1 transition-all"
              >
                <span>바로 시작하기</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 hover:border-violet-600 hover:bg-violet-50 font-bold px-8 py-6 text-base lg:text-lg rounded-2xl transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>인쇄하기</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mt-16 lg:mt-20">
            {[
              { number: '60+', label: '핵심 용어', icon: '📚', color: 'violet' },
              { number: '6개', label: '카테고리', icon: '🎯', color: 'indigo' },
              { number: '100%', label: '쉬운 설명', icon: '✨', color: 'blue' }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl lg:text-5xl mb-3">{stat.icon}</div>
                <div className={`text-3xl lg:text-4xl font-black bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Term Sections */}
      {[
        { id: 'basic', category: 'basic', gradient: 'from-violet-500 to-purple-600', bg: 'bg-white', icon: '👋' },
        { id: 'production', category: 'production', gradient: 'from-indigo-500 to-blue-600', bg: 'bg-gradient-to-br from-indigo-50 to-blue-50', icon: '🎬' },
        { id: 'revenue', category: 'revenue', gradient: 'from-blue-500 to-cyan-600', bg: 'bg-white', icon: '💰' },
        { id: 'advanced', category: 'advanced', gradient: 'from-purple-500 to-pink-600', bg: 'bg-gradient-to-br from-purple-50 to-pink-50', icon: '🚀' },
        { id: 'community', category: 'community', gradient: 'from-pink-500 to-rose-600', bg: 'bg-white', icon: '💬' },
        { id: 'analytics', category: 'analytics', gradient: 'from-cyan-500 to-teal-600', bg: 'bg-gradient-to-br from-cyan-50 to-teal-50', icon: '📊' }
      ].map((section) => (
        <section key={section.id} id={section.id} className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 ${section.bg}`}>
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 mb-12 lg:mb-16">
              <div className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${section.gradient} rounded-3xl flex items-center justify-center text-3xl lg:text-4xl shadow-2xl`}>
                {section.icon}
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                  {categoryNames[section.category]}
                </h2>
                <p className="text-base lg:text-lg text-gray-600">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {termsByCategory[section.category].map((term, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${section.gradient}`} />

                  <CardContent className="p-6 lg:p-8">
                    {/* Term Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="text-2xl lg:text-3xl font-black text-white">
                          {term.korean[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-1 truncate">
                          {term.korean}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-500 font-medium">
                          {term.english}
                        </p>
                      </div>
                    </div>

                    {/* Simple Explanation */}
                    <div className={`bg-gradient-to-br ${section.gradient} bg-opacity-10 rounded-2xl p-4 lg:p-5 mb-4 lg:mb-5`}>
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xl lg:text-2xl font-black bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent flex-shrink-0">
                          =
                        </span>
                        <p className="text-base lg:text-lg font-bold text-gray-800 leading-snug">
                          {term.simple}
                        </p>
                      </div>
                    </div>

                    {/* Example */}
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                      <span className="text-xl lg:text-2xl flex-shrink-0">💡</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs lg:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                          실생활 예시
                        </p>
                        <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                          {term.example}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white print:hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center text-3xl lg:text-4xl mx-auto mb-6 lg:mb-8 shadow-2xl">
            📺
          </div>
          <h3 className="text-2xl lg:text-3xl font-black mb-3">유튜브 용어 사전</h3>
          <p className="text-base lg:text-lg text-gray-400 mb-8 lg:mb-10">
            모든 분들이 유튜브를 쉽게 즐길 수 있도록
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handlePrint}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all"
            >
              📄 인쇄하기
            </Button>
          </div>
        </div>
      </footer>

      <style>{`
        @media print {
          nav, footer {
            display: none !important;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default App;