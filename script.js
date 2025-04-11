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
    
    try {
        // 使用聚合数据的中国新闻 API
        const response = await fetch('https://v.juhe.cn/toutiao/index?type=top&key=ecf73331e4de4e9b9ee3586ca89171fd');
        const data = await response.json();
        
        if (data.error_code === 0 && data.result && data.result.data && data.result.data.length > 0) {
            // 清空加载提示
            newsListElement.innerHTML = '';
            
            // 显示新闻列表
            data.result.data.slice(0, 5).forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                    <div class="news-source">${article.author_name}</div>
                `;
                newsListElement.appendChild(newsItem);
            });
        } else {
            newsListElement.innerHTML = '<div class="loading">暂无新闻数据</div>';
        }
    } catch (error) {
        console.error('获取新闻失败:', error);
        newsListElement.innerHTML = '<div class="loading">获取新闻失败，请稍后重试</div>';
    }
}

// 初始化
updateTime();
setInterval(updateTime, 1000);
getNews();
// 每5分钟更新一次新闻
setInterval(getNews, 5 * 60 * 1000); 