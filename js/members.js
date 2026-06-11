document.addEventListener('DOMContentLoaded', async () => {
    await loadMembers();
});

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        const membersList = document.getElementById('members-list');
        
        members.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'card member-card';
            
            if (index % 2 === 0) {
                // 奇数项 - 左对齐
                memberCard.innerHTML = `
                    <div class="flex items-start space-x-6">
                        <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                        <div>
                            <h3 class="member-name">${member.name}</h3>
                            <a href="${member.blogUrl}" target="_blank" style="color: var(--primary);">
                                ${member.blogName}
                            </a>
                            <p class="member-bio">${member.bio || '这位博主很神秘，什么都没留下'}</p>
                            <div class="flex space-x-4">
                                <a href="${member.blogUrl}" target="_blank" class="text-sm" style="color: var(--accent);">
                                    <i class="fas fa-external-link-alt mr-1"></i> 访问博客
                                </a>
                                <a href="${member.rssUrl}" target="_blank" class="text-sm" style="color: var(--accent);">
                                    <i class="fas fa-rss mr-1"></i> 订阅
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // 偶数项 - 右对齐
                memberCard.innerHTML = `
                    <div class="flex items-start justify-end space-x-reverse space-x-6">
                        <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                        <div>
                            <h3 class="member-name">${member.name}</h3>
                            <a href="${member.blogUrl}" target="_blank" style="color: var(--primary);">
                                ${member.blogName}
                            </a>
                            <p class="member-bio">${member.bio || '这位博主很神秘，什么都没留下'}</p>
                            <div class="flex justify-end space-x-4">
                                <a href="${member.blogUrl}" target="_blank" class="text-sm" style="color: var(--accent);">
                                    <i class="fas fa-external-link-alt mr-1"></i> 访问博客
                                </a>
                                <a href="${member.rssUrl}" target="_blank" class="text-sm" style="color: var(--accent);">
                                    <i class="fas fa-rss mr-1"></i> 订阅
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            membersList.appendChild(memberCard);
        });
    } catch (error) {
        console.error('加载成员列表失败:', error);
        document.getElementById('members-list').innerHTML = 
            '<div class="text-center text-gray-500 py-8">加载失败了，刷新试试吧～</div>';
    }
}
