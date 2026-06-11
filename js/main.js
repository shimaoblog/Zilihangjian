// 全局工具 & 首页统计
async function loadStats() {
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();
    document.getElementById('member-count').innerText = members.length;

    const postRes = await fetch('data/posts.json');
    const posts = await postRes.json();
    document.getElementById('post-count').innerText = posts.length;

    const now = new Date();
    document.getElementById('update-time').innerText = now.toLocaleDateString();
  } catch (e) {
    console.log('统计数据加载失败', e);
  }
}

async function loadLatestPosts() {
  try {
    const res = await fetch('data/posts.json');
    const posts = await res.json();
    const container = document.getElementById('latest-posts');
    const list = posts.slice(0, 6);

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card post-card p-6';
      card.innerHTML = `
        <h4 class="article-title"><a href="${item.link}" target="_blank" style="color:var(--text-dark)">${item.title}</a></h4>
        <div class="article-meta">
          <span><i class="fas fa-user mr-1"></i> ${item.author}</span>
          <span class="ml-3"><i class="fas fa-calendar mr-1"></i> ${item.pubDate}</span>
        </div>
        <p style="margin-top:0.8rem;">${item.summary || '暂无摘要'}</p>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    document.getElementById('latest-posts').innerHTML = '<div class="col-span-full text-center">暂无文章</div>';
  }
}

// 移动端菜单切换
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
});
