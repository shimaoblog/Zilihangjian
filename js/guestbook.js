document.addEventListener('DOMContentLoaded', loadGuestBook);

// 已替换为你的仓库信息
const GH_OWNER = "shimaoblog";
const GH_REPO = "Zilihangjian";

async function loadGuestBook() {
  const container = document.getElementById('msg-list');
  try {
    const apiUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/issues?labels=留言&per_page=20&sort=created&direction=desc`;
    const res = await fetch(apiUrl);
    const issues = await res.json();

    if (!Array.isArray(issues) || issues.length === 0) {
      container.innerHTML = '<div class="text-center py-10">还没有留言，快来抢沙发吧~</div>';
      return;
    }

    let html = '';
    issues.forEach(issue => {
      const name = issue.user?.login || "匿名";
      const time = new Date(issue.created_at).toLocaleString();
      const content = issue.body || "无内容";

      html += `
        <div class="card msg-item">
          <div class="msg-author">${name}</div>
          <div class="msg-time">${time}</div>
          <div class="msg-content">${content}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<div class="text-center py-10">留言加载失败，网络或仓库配置异常</div>';
  }
}
