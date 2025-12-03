# MenuVue v2 - 快速入门指南

## 🚀 5分钟快速启动

### 第一步: 下载项目
```bash
# 你已经有了这个文件夹
cd menuvue-v2
```

### 第二步: 准备图片资源
在 `assets/images/dishes/` 目录放置以下图片：

```
assets/images/dishes/
├── polo-main.png      (主菜品图，推荐 500×500px)
├── dish-left.png      (左侧图，推荐 200×200px)
└── dish-right.png     (右侧图，推荐 200×200px)
```

**图片要求**:
- 格式: PNG (透明背景) 或 JPG
- 内容: 食物居中，占据80%画面
- 背景: 纯色或透明

### 第三步: 启动本地服务器

#### 方法1: 使用Python (推荐)
```bash
# Python 3
python -m http.server 8000

# 访问: http://localhost:8000
```

#### 方法2: 使用Node.js
```bash
npx http-server -p 8000
```

#### 方法3: VS Code Live Server
1. 安装 "Live Server" 插件
2. 右键 `index.html`
3. 选择 "Open with Live Server"

### 第四步: 在手机上测试
1. 确保手机和电脑在同一WiFi
2. 找到电脑的IP地址:
   ```bash
   # Mac/Linux
   ifconfig | grep inet
   
   # Windows
   ipconfig
   ```
3. 在手机浏览器访问: `http://你的IP:8000`

---

## 📱 测试流程

### 预期效果:
1. **0-3秒**: 显示红色启动画面 (MenuVue logo)
2. **3秒后**: 淡入主界面
3. **看到**:
   - 透明Header (MenuVue logo + Burger菜单)
   - AR相机视图
   - 底部圆角卡片
   - 3张菜品图片
   - MY TABLE 和 ADD+ 按钮

### 如果出现问题:

#### 问题1: 图片不显示
```javascript
// 检查图片路径，确保文件存在
assets/images/dishes/polo-main.png
assets/images/dishes/dish-left.png
assets/images/dishes/dish-right.png
```

#### 问题2: AR场景不启动
```javascript
// 打开浏览器控制台 (F12)
// 查看是否有JavaScript错误
// 确认A-Frame和AR.js加载成功
```

#### 问题3: 相机权限被拒绝
- iOS: 设置 > Safari > 相机 > 允许
- Android: 设置 > 应用 > 浏览器 > 权限 > 相机

---

## 🎨 快速定制

### 修改启动画面背景色
```css
/* css/main.css - 第31行 */
#splash-screen {
    background: #CE1111;  /* 改成你想要的颜色 */
}
```

### 修改菜品信息
```javascript
/* js/app.js - 第3行 */
let dishes = [
    {
        name: "PoLo 新疆手抓饭",  // 改成你的菜品名
        price: "$ 21",             // 改成你的价格
        mainImage: "./assets/images/dishes/polo-main.png",
        model: "./assets/models/polo.glb"
    }
];
```

### 修改按钮颜色
```css
/* css/main.css - 第320行 */
.btn-add {
    background: #CE1111;  /* ADD+按钮背景色 */
    border: 2px solid #E93838;  /* 边框色 */
}
```

---

## 🔧 下一步开发

### 接下来你需要:

#### 1. 添加3D模型
```bash
# 创建模型目录
mkdir -p assets/models

# 放置.glb或.gltf文件
assets/models/polo.glb
```

#### 2. 实现Burger菜单
```javascript
// js/app.js - 第117行
function toggleMenu() {
    // TODO: 在这里添加菜单逻辑
    // 可以创建一个侧边栏，显示分类、搜索等
}
```

#### 3. 实现MY TABLE功能
```javascript
// js/app.js - 第122行
function openMyTable() {
    // TODO: 显示购物车/订单界面
    // 可以创建一个新的页面或弹窗
}
```

#### 4. 实现菜品切换
```javascript
// 给侧边小图添加点击事件
document.querySelector('.side-dish.left').addEventListener('click', () => {
    changeDish('prev');
});

document.querySelector('.side-dish.right').addEventListener('click', () => {
    changeDish('next');
});
```

---

## 📚 文件说明

### 核心文件:
- `index.html` - HTML结构，包含启动画面和主界面
- `css/main.css` - 所有样式，包含响应式设计
- `js/app.js` - JavaScript逻辑，处理页面切换和交互

### 文档文件:
- `README.md` - 完整项目说明
- `COMPARISON.md` - 新旧版本对比
- `QUICKSTART.md` - 本文件，快速入门

---

## 🐛 常见问题 FAQ

### Q: 为什么相机画面是黑屏？
A: 可能是HTTPS的问题。AR.js需要HTTPS或localhost才能访问相机。

### Q: 如何在HTTPS环境测试？
A: 
```bash
# 使用ngrok创建HTTPS隧道
ngrok http 8000
```

### Q: 手机上字体太小/太大？
A: 在CSS中调整响应式断点的字号大小。

### Q: 底部卡片位置不对？
A: 检查手机屏幕高度，可能需要调整 `.bottom-card` 的 `height` 属性。

### Q: 图片是圆形的，但我的图是方的？
A: 图片会被自动裁剪成圆形。确保主体内容在图片中心。

---

## 💡 开发技巧

### 调试AR功能
```javascript
// 在控制台查看AR状态
const scene = document.querySelector('a-scene');
console.log(scene.hasLoaded); // 场景是否加载
```

### 查看设备信息
```javascript
// 在app.js添加
console.log('Screen:', window.innerWidth, 'x', window.innerHeight);
console.log('User Agent:', navigator.userAgent);
```

### 性能优化
```javascript
// 压缩图片大小
// 使用WebP格式
// 延迟加载非关键资源
```

---

## 📞 需要帮助？

遇到问题？检查以下资源：
1. 浏览器控制台 (F12) 的错误信息
2. README.md 的详细说明
3. COMPARISON.md 了解变化
4. A-Frame文档: https://aframe.io/docs/
5. AR.js文档: https://ar-js-org.github.io/AR.js-Docs/

---

**祝你开发顺利！🎉**

有问题随时问我！
