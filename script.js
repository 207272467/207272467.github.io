// 更新时间和日期
function updateTime() {
    const now = new Date();
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');
    
    // 使用中文格式
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    
    timeElement.textContent = now.toLocaleTimeString('zh-CN', timeOptions);
    dateElement.textContent = now.toLocaleDateString('zh-CN', dateOptions);
}

// 显示随机诗歌
function showRandomPoem() {
    const poemTitle = document.querySelector('.poem-title');
    const poemAuthor = document.querySelector('.poem-author');
    const poemContent = document.querySelector('.poem-content');
    
    // 获取随机索引
    const randomIndex = Math.floor(Math.random() * tangPoems.length);
    const poem = tangPoems[randomIndex];
    
    // 淡出效果
    poemTitle.style.opacity = '0';
    poemAuthor.style.opacity = '0';
    poemContent.style.opacity = '0';
    
    setTimeout(() => {
        // 更新内容
        poemTitle.textContent = poem.title;
        poemAuthor.textContent = poem.author;
        poemContent.textContent = poem.content;
        
        // 淡入效果
        poemTitle.style.opacity = '1';
        poemAuthor.style.opacity = '1';
        poemContent.style.opacity = '1';
    }, 500);
}

// 朗读诗歌
function readPoem() {
    const poemTitle = document.querySelector('.poem-title');
    const poemAuthor = document.querySelector('.poem-author');
    const poemContent = document.querySelector('.poem-content');
    
    const text = `${poemTitle.textContent}，作者${poemAuthor.textContent}。${poemContent.textContent}`;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// 搜索诗歌
function searchPoems() {
    const searchInput = document.querySelector('#search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const resultsContainer = document.querySelector('#search-results');
    
    if (searchTerm.length < 1) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const results = tangPoems.filter(poem => 
        poem.title.toLowerCase().includes(searchTerm) ||
        poem.author.toLowerCase().includes(searchTerm) ||
        poem.content.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(results);
}

// 显示搜索结果
function displaySearchResults(results) {
    const resultsContainer = document.querySelector('#search-results');
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">未找到相关诗歌</div>';
        return;
    }
    
    results.forEach(poem => {
        const poemElement = document.createElement('div');
        poemElement.className = 'search-result-item';
        poemElement.innerHTML = `
            <h3>${poem.title}</h3>
            <p class="author">${poem.author}</p>
            <p class="content">${poem.content}</p>
        `;
        poemElement.onclick = () => displaySelectedPoem(poem);
        resultsContainer.appendChild(poemElement);
    });
}

// 显示选中的诗歌
function displaySelectedPoem(poem) {
    const poemTitle = document.querySelector('.poem-title');
    const poemAuthor = document.querySelector('.poem-author');
    const poemContent = document.querySelector('.poem-content');
    
    poemTitle.style.opacity = '0';
    poemAuthor.style.opacity = '0';
    poemContent.style.opacity = '0';
    
    setTimeout(() => {
        poemTitle.textContent = poem.title;
        poemAuthor.textContent = poem.author;
        poemContent.textContent = poem.content;
        
        poemTitle.style.opacity = '1';
        poemAuthor.style.opacity = '1';
        poemContent.style.opacity = '1';
    }, 500);
    
    // 隐藏搜索结果
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-input').value = '';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 创建自定义鼠标元素
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    // 更新鼠标位置
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // 鼠标悬停效果
    document.querySelectorAll('a, button, .poem-container').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // 点击效果
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        cursorDot.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
        cursorDot.classList.remove('click');
    });
    
    // 初始化时间和诗歌
    updateTime();
    showRandomPoem();
    
    // 设置定时器
    setInterval(updateTime, 1000);
    
    // 添加事件监听器
    document.querySelector('#read-btn').addEventListener('click', readPoem);
    document.querySelector('#refresh-btn').addEventListener('click', showRandomPoem);
    document.querySelector('#search-input').addEventListener('input', searchPoems);
}); 