import cron from 'node-cron';
import crawlNaverNews from './crawl-naver-news.js';

console.log('🕐 Starting news crawler scheduler...');
console.log('⏰ Schedule: Every hour (0 * * * *)');

// 초기 실행
console.log('\n📰 Running initial crawl...');
crawlNaverNews()
  .then(() => {
    console.log('✅ Initial crawl completed\n');
  })
  .catch((error) => {
    console.error('❌ Initial crawl failed:', error);
  });

// 1시간마다 실행 (매 시각 정각)
cron.schedule('0 * * * *', async () => {
  console.log(`\n🔄 [${new Date().toISOString()}] Running scheduled crawl...`);

  try {
    await crawlNaverNews();
    console.log('✅ Scheduled crawl completed\n');
  } catch (error) {
    console.error('❌ Scheduled crawl failed:', error, '\n');
  }
});

console.log('✨ Scheduler is running. Press Ctrl+C to stop.\n');

// 프로세스 종료 시 정리
process.on('SIGINT', () => {
  console.log('\n👋 Stopping scheduler...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Stopping scheduler...');
  process.exit(0);
});
