// 更新时间的函数
function updateTime() {
    const now = new Date();
    
    // 更新时间
    const timeElement = document.querySelector('.time');
    const newTime = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // 只在时间真正改变时更新显示
    if (timeElement.textContent !== newTime) {
        timeElement.textContent = newTime;
    }
    
    // 更新日期
    const dateElement = document.querySelector('.date');
    const newDate = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    
    // 只在日期真正改变时更新显示
    if (dateElement.textContent !== newDate) {
        dateElement.textContent = newDate;
    }
}

// 初始更新
updateTime();

// 每秒更新一次
setInterval(updateTime, 1000);

// 记录已显示的诗歌索引
let displayedPoemIndices = [];

// 随机显示一首诗
function showRandomPoem() {
    // 如果所有诗歌都已显示过，重置记录
    if (displayedPoemIndices.length >= tangPoems.length) {
        displayedPoemIndices = [];
    }
    
    // 获取一个未显示过的随机索引
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * tangPoems.length);
    } while (displayedPoemIndices.includes(randomIndex));
    
    // 记录已显示的索引
    displayedPoemIndices.push(randomIndex);
    
    const poem = tangPoems[randomIndex];
    
    // 添加淡入淡出效果
    const titleElement = document.querySelector('.poem-title');
    const authorElement = document.querySelector('.poem-author');
    const contentElement = document.querySelector('.poem-content');
    
    titleElement.style.opacity = '0';
    authorElement.style.opacity = '0';
    contentElement.style.opacity = '0';
    
    setTimeout(() => {
        titleElement.textContent = poem.title;
        authorElement.textContent = `—— ${poem.author}`;
        contentElement.textContent = poem.content;
        
        titleElement.style.opacity = '1';
        authorElement.style.opacity = '1';
        contentElement.style.opacity = '1';
        
        // 检查自动朗读开关状态
        const autoReadToggle = document.getElementById('auto-read-toggle');
        if (autoReadToggle.checked) {
            readPoem();
        }
    }, 300);
}

// 页面加载时显示随机诗歌
showRandomPoem();

// 朗读诗歌
function readPoem() {
    const title = document.querySelector('.poem-title').textContent;
    const author = document.querySelector('.poem-author').textContent;
    const content = document.querySelector('.poem-content').textContent;
    
    // 创建语音合成实例
    const speech = new SpeechSynthesisUtterance();
    
    // 设置语音参数
    speech.lang = 'zh-CN';
    speech.rate = 0.8; // 语速稍慢
    speech.pitch = 1; // 音调
    speech.volume = 1; // 音量
    
    // 组合要朗读的文本
    const textToRead = `${title}，${author}。${content}`;
    speech.text = textToRead;
    
    // 开始朗读
    window.speechSynthesis.speak(speech);
    
    // 更新按钮状态
    const readBtn = document.querySelector('.read-btn');
    readBtn.disabled = true;
    readBtn.style.opacity = '0.5';
    
    // 朗读结束后恢复按钮状态
    speech.onend = () => {
        readBtn.disabled = false;
        readBtn.style.opacity = '1';
    };
}

// 添加鼠标悬停效果
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.time-container, .poem-container');
    
    containers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // 初始化自动朗读开关状态
    const autoReadToggle = document.getElementById('auto-read-toggle');
    autoReadToggle.checked = true;
});

// 自定义鼠标效果
document.addEventListener('DOMContentLoaded', () => {
    // 创建鼠标元素
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    // 更新鼠标位置
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    // 鼠标悬停效果
    const hoverElements = document.querySelectorAll('button, a, .time-container, .poem-container');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // 鼠标点击效果
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        cursorDot.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        cursorDot.classList.remove('clicking');
    });
}); 