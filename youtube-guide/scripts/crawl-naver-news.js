import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

async function crawlNaverNews() {
  console.log('🚀 Starting news crawling with RSS...');

  try {
    // Google News RSS 사용 (한국어 유튜브 뉴스)
    const searchQuery = '유튜브';
    const googleNewsRss = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=ko&gl=KR&ceid=KR:ko`;

    console.log(`📡 Fetching RSS from Google News: ${googleNewsRss}`);

    let feed;
    try {
      feed = await parser.parseURL(googleNewsRss);
    } catch (error) {
      console.log('⚠️ Google News RSS failed, using fallback data...');
      throw error;
    }

    console.log(`✅ RSS feed loaded: ${feed.title || 'Naver News'}`);
    console.log(`📰 Total items in feed: ${feed.items.length}`);

    // 최신 6개 뉴스 추출
    const newsItems = [];
    let count = 0;

    for (const item of feed.items) {
      if (count >= 6) break;

      // 제목에 '유튜브' 관련 키워드가 있는지 확인
      const keywords = ['유튜브', 'youtube', 'Youtube', 'YOUTUBE', '유투브'];
      const hasKeyword = keywords.some(keyword =>
        item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description?.toLowerCase().includes(keyword.toLowerCase())
      );

      if (!hasKeyword) continue;

      // HTML 태그 제거
      const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
      };

      // 날짜 포맷팅
      const formatDate = (pubDate) => {
        if (!pubDate) return '';

        const date = new Date(pubDate);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
          return `${diffMins}분 전`;
        } else if (diffHours < 24) {
          return `${diffHours}시간 전`;
        } else if (diffDays < 7) {
          return `${diffDays}일 전`;
        } else {
          return date.toLocaleDateString('ko-KR');
        }
      };

      const title = stripHtml(item.title || '');
      const description = stripHtml(item.description || '').substring(0, 200);
      const link = item.link || '';
      const date = formatDate(item.pubDate);

      // 썸네일 추출 (RSS enclosure 또는 description에서)
      let thumbnail = '';

      // enclosure에서 이미지 찾기
      if (item.enclosure && item.enclosure.url) {
        thumbnail = item.enclosure.url;
      }

      // description HTML에서 이미지 찾기
      if (!thumbnail && item.description) {
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
          thumbnail = imgMatch[1];
        }
      }

      // 기본 썸네일 (유튜브 관련 이미지)
      if (!thumbnail) {
        const defaultThumbnails = [
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop',
          'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop',
          'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=250&fit=crop',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
          'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=250&fit=crop',
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop'
        ];
        thumbnail = defaultThumbnails[count % defaultThumbnails.length];
      }

      // 출처 추출
      let source = '네이버뉴스';
      if (item.author) {
        source = item.author;
      } else if (item.title) {
        const sourceMatch = item.title.match(/\[([^\]]+)\]/);
        if (sourceMatch) {
          source = sourceMatch[1];
        }
      }

      newsItems.push({
        title,
        link,
        description,
        source,
        date,
        thumbnail,
        crawledAt: new Date().toISOString()
      });

      console.log(`  ✓ [${count + 1}] ${title.substring(0, 50)}...`);
      count++;
    }

    console.log(`✅ Found ${newsItems.length} YouTube-related news articles`);

    // JSON 파일로 저장
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    const outputPath = path.join(dataDir, 'naver-news.json');
    await fs.writeFile(outputPath, JSON.stringify(newsItems, null, 2), 'utf-8');

    console.log(`💾 Saved to: ${outputPath}`);
    console.log('🎉 RSS crawling completed successfully!');

    return newsItems;
  } catch (error) {
    console.error('❌ Error during RSS crawling:', error);
    throw error;
  }
}

// 직접 실행 시
crawlNaverNews()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

export default crawlNaverNews;
