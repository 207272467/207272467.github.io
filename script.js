// 更新时间的函数
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    // 格式化时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // 格式化日期
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    dateElement.textContent = `${year}年${month}月${day}日`;
}

// 获取新闻数据
async function getNews() {
    const newsListElement = document.getElementById('news-list');
    const refreshBtn = document.getElementById('refresh-btn');
    
    // 显示加载状态
    newsListElement.innerHTML = '<div class="loading">加载中...</div>';
    refreshBtn.disabled = true;
    refreshBtn.textContent = '刷新中...';
    
    try {
        // 使用支持跨域的新闻 API
        const response = await fetch('https://api.apiopen.top/api/getWangYiNews');
        const data = await response.json();
        
        if (data.code === 200 && data.result && data.result.list && data.result.list.length > 0) {
            // 清空加载提示
            newsListElement.innerHTML = '';
            
            // 随机选择5条新闻
            const shuffled = [...data.result.list].sort(() => 0.5 - Math.random());
            const selectedNews = shuffled.slice(0, 5);
            
            // 显示新闻列表
            selectedNews.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                    <div class="news-source">${article.source}</div>
                `;
                newsListElement.appendChild(newsItem);
            });
        } else {
            newsListElement.innerHTML = '<div class="loading">暂无新闻数据</div>';
        }
    } catch (error) {
        console.error('获取新闻失败:', error);
        newsListElement.innerHTML = '<div class="loading">获取新闻失败，请稍后重试</div>';
    } finally {
        // 恢复刷新按钮状态
        refreshBtn.disabled = false;
        refreshBtn.textContent = '刷新新闻';
    }
}

// 初始化
updateTime();
setInterval(updateTime, 1000);
getNews();

// 添加刷新按钮点击事件
document.getElementById('refresh-btn').addEventListener('click', getNews);

// 每5分钟更新一次新闻
setInterval(getNews, 5 * 60 * 1000); 