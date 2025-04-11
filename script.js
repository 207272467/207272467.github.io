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

// 静态新闻数据
const staticNews = [
    {
        title: "中国成功发射神舟十六号载人飞船",
        url: "https://news.sina.com.cn/china/",
        source: "新华社"
    },
    {
        title: "2023年全国两会即将召开",
        url: "https://news.sina.com.cn/china/",
        source: "人民日报"
    },
    {
        title: "中国科技创新取得重大突破",
        url: "https://news.sina.com.cn/china/",
        source: "科技日报"
    },
    {
        title: "中国经济发展稳中向好",
        url: "https://news.sina.com.cn/china/",
        source: "经济日报"
    },
    {
        title: "中国传统文化焕发新活力",
        url: "https://news.sina.com.cn/china/",
        source: "文化报"
    }
];

// 获取新闻数据
async function getNews() {
    const newsListElement = document.getElementById('news-list');
    
    try {
        // 尝试从 API 获取新闻
        const response = await fetch('https://api.apiopen.top/api/getWangYiNews');
        const data = await response.json();
        
        if (data.code === 200 && data.result && data.result.list && data.result.list.length > 0) {
            // 清空加载提示
            newsListElement.innerHTML = '';
            
            // 显示新闻列表
            data.result.list.slice(0, 5).forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                    <div class="news-source">${article.source}</div>
                `;
                newsListElement.appendChild(newsItem);
            });
        } else {
            // 如果 API 返回空数据，使用静态新闻
            displayStaticNews(newsListElement);
        }
    } catch (error) {
        console.error('获取新闻失败:', error);
        // 如果 API 请求失败，使用静态新闻
        displayStaticNews(newsListElement);
    }
}

// 显示静态新闻
function displayStaticNews(newsListElement) {
    // 清空加载提示
    newsListElement.innerHTML = '';
    
    // 显示静态新闻列表
    staticNews.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
            <div class="news-source">${article.source}</div>
        `;
        newsListElement.appendChild(newsItem);
    });
}

// 初始化
updateTime();
setInterval(updateTime, 1000);
getNews();
// 每5分钟更新一次新闻
setInterval(getNews, 5 * 60 * 1000); 