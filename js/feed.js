document.addEventListener('DOMContentLoaded', loadAllArticles);

async function loadAllArticles() {
  const container = document.getElementById('article-list');
  try {
    const res = await fetch('data/posts.json');
    const posts = await res.json();

    if (!posts.length) {
      container.innerHTML = '<div class="text-center py-10">暂未抓取到文章</div>';
      return;
    }

    let html = '';
    posts.forEach(item => {
      html += `
        <div class="card article-item">
          <a href="${item.link}" target="_blank" class="article-title" style="color:var(--text-dark)">${item.title}</a>
          <div class="article-meta">
            <span><i class="fas fa-user mr-1"></i> ${item.author}</span>
            <span class="ml-3"><i class="fas fa-calendar mr-1"></i> ${item.pubDate}</span>
          </div>
          <div class="msg-content">${item.summary || '暂无摘要'}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<div class="text-center py-10">文章加载失败，请稍后刷新</div>';
  }
}

