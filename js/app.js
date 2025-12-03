// ==================== 全局变量 ====================
let currentDishIndex = 0;
let dishes = [
    {
        name: "PoLo 新疆手抓饭",
        price: "$ 21",
        mainImage: "./assets/images/dishes/polo-main.png",
        model: "./assets/models/polo.glb"
    }
    // 可以添加更多菜品
];

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('MenuVue v2 - Initialized');
    
    // 显示启动画面
    showSplashScreen();
});

// ==================== 启动画面逻辑 ====================
function showSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.classList.add('active');
    
    // 3秒后切换到AR界面
    setTimeout(() => {
        hideSplashScreen();
    }, 3000);
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.classList.remove('active');
    
    // 启动画面淡出后，初始化AR界面
    setTimeout(() => {
        initARInterface();
    }, 600); // 等待淡出动画完成
}

// ==================== 初始化AR界面 ====================
function initARInterface() {
    console.log('Initializing AR interface...');
    
    // 请求相机权限
    requestCameraPermission();
}

// ==================== 相机权限 ====================
function requestCameraPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment' 
            } 
        })
        .then(function(stream) {
            console.log('Camera permission granted');
            stream.getTracks().forEach(track => track.stop()); // 停止测试流
            startARExperience();
        })
        .catch(function(error) {
            console.error('Camera permission denied:', error);
            // 即使没有相机权限也显示界面（用于开发测试）
            startARExperience();
        });
    } else {
        console.warn('getUserMedia not supported');
        startARExperience();
    }
}

// ==================== 启动AR体验 ====================
function startARExperience() {
    console.log('Starting AR experience...');
    
    // 显示AR容器
    const arContainer = document.getElementById('ar-container');
    arContainer.style.display = 'block';
    
    // 显示UI覆盖层
    const uiOverlay = document.getElementById('ui-overlay');
    uiOverlay.classList.add('active');
    
    // 初始化AR场景
    initARScene();
    
    // 绑定UI事件
    bindUIEvents();
}

// ==================== 初始化AR场景 ====================
function initARScene() {
    const scene = document.querySelector('a-scene');
    
    if (!scene) {
        console.error('A-Frame scene not found');
        return;
    }
    
    // 等待场景加载完成
    scene.addEventListener('loaded', function() {
        console.log('AR scene loaded');
        loadDishModel(currentDishIndex);
    });
    
    // 监听marker检测
    const marker = document.getElementById('food-marker');
    if (marker) {
        marker.addEventListener('markerFound', function() {
            console.log('Marker detected!');
            showMarkerIndicator();
        });
        
        marker.addEventListener('markerLost', function() {
            console.log('Marker lost');
            hideMarkerIndicator();
        });
    }
}

// ==================== 加载3D模型 ====================
function loadDishModel(index) {
    if (index < 0 || index >= dishes.length) return;
    
    const dish = dishes[index];
    const marker = document.getElementById('food-marker');
    
    if (!marker) return;
    
    // 清除现有模型
    while (marker.firstChild) {
        marker.removeChild(marker.firstChild);
    }
    
    // 创建新模型实体
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', dish.model);
    model.setAttribute('scale', '1 1 1');
    model.setAttribute('position', '0 0.5 0');
    model.setAttribute('rotation', '0 0 0');
    
    marker.appendChild(model);
    console.log(`Loaded model for: ${dish.name}`);
}

// ==================== Marker检测指示器 ====================
function showMarkerIndicator() {
    // 可以添加一个视觉指示器显示marker被检测到
    console.log('Showing marker indicator');
}

function hideMarkerIndicator() {
    console.log('Hiding marker indicator');
}

// ==================== UI事件绑定 ====================
function bindUIEvents() {
    // Burger菜单按钮
    const burgerBtn = document.getElementById('burger-btn');
    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMenu);
    }
    
    // MY TABLE 按钮
    const myTableBtn = document.getElementById('my-table-btn');
    if (myTableBtn) {
        myTableBtn.addEventListener('click', openMyTable);
    }
    
    // ADD+ 按钮
    const addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', addToTable);
    }
    
    // 侧边菜品图片点击
    const sideDishes = document.querySelectorAll('.side-dish');
    sideDishes.forEach((dish, index) => {
        dish.addEventListener('click', function() {
            // 这里可以实现切换到相邻菜品的逻辑
            console.log('Side dish clicked:', index);
        });
    });
}

// ==================== 菜单功能 ====================
function toggleMenu() {
    console.log('Toggle menu');
    // TODO: 实现菜单展开/收起逻辑
}

function openMyTable() {
    console.log('Open My Table');
    // TODO: 打开"我的餐桌"界面
}

function addToTable() {
    console.log('Add to table:', dishes[currentDishIndex].name);
    // TODO: 添加菜品到购物车/餐桌
    
    // 简单的反馈动画
    const addBtn = document.getElementById('add-btn');
    addBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        addBtn.style.transform = '';
    }, 150);
}

// ==================== 切换菜品 ====================
function changeDish(direction) {
    // direction: 'next' 或 'prev'
    const totalDishes = dishes.length;
    
    if (direction === 'next') {
        currentDishIndex = (currentDishIndex + 1) % totalDishes;
    } else if (direction === 'prev') {
        currentDishIndex = (currentDishIndex - 1 + totalDishes) % totalDishes;
    }
    
    updateDishDisplay();
    loadDishModel(currentDishIndex);
}

function updateDishDisplay() {
    const dish = dishes[currentDishIndex];
    
    // 更新菜品名称和价格
    const dishName = document.querySelector('.dish-name');
    const dishPrice = document.querySelector('.dish-price');
    
    if (dishName) dishName.textContent = dish.name;
    if (dishPrice) dishPrice.textContent = dish.price;
    
    // 更新主图片
    const mainImg = document.querySelector('.main-dish img');
    if (mainImg) mainImg.src = dish.mainImage;
}

// ==================== 工具函数 ====================
function preventBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
}

// 在页面加载时阻止滚动
preventBodyScroll();

// ==================== 调试信息 ====================
console.log(`
╔═══════════════════════════════════╗
║     MenuVue v2.0 - Initialized    ║
║     AR Menu Experience Ready      ║
╚═══════════════════════════════════╝
`);
