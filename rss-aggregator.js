const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');
const XMLBuilder = require('xmlbuilder');

const parser = new Parser();
const membersPath = path.join(__dirname, 'data/members.json');
const postsOutPath = path.join(__dirname, 'data/posts.json');
const rssOutPath = path.join(__dirname, 'feed.xml');

async function main() {
  const members = JSON.parse(fs.readFileSync(membersPath, 'utf8'));
  let allItems = [];

  for (const m of members) {
    try {
      const feed = await parser.parseURL(m.rssUrl);
      feed.items.forEach(item => {
        allItems.push({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || new Date().toUTCString(),
          summary: (item.contentSnippet || '').substring(0, 200),
          author: m.name
        });
      });
    } catch (e) {
      console.log(`抓取失败: ${m.blogName}`, e.message);
    }
  }

  // 按时间倒序
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  fs.writeFileSync(postsOutPath, JSON.stringify(allItems, null, 2), 'utf8');

  // 生成全站 RSS（已替换为你的站点地址）
  const rss = XMLBuilder.create('rss', { version: '1.0', encoding: 'UTF-8' })
    .att('version', '2.0')
    .ele('channel')
      .ele('title', '字里行间 - 博客聚合')
      .up()
      .ele('link', 'https://shimaoblog.github.io/Zilihangjian/')
      .up()
      .ele('description', '独立博客聚合站点')
      .up();

  allItems.slice(0, 50).forEach(item => {
    rss.ele('item')
      .ele('title', item.title).up()
      .ele('link', item.link).up()
      .ele('pubDate', item.pubDate).up()
      .ele('description', item.summary).up()
      .ele('author', item.author).up()
      .up();
  });

  fs.writeFileSync(rssOutPath, rss.end({ pretty: true }), 'utf8');
  console.log('RSS & posts 生成完成');
}

main().catch(console.error);

