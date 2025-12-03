# MenuVue v2.0 - 重构说明

## 📋 主要变化

### 设计理念转变
- **之前**: 为每个餐厅定制独立设计（Jahunger主题）
- **现在**: MenuVue统一品牌，标准化SaaS产品

---

## 🎨 UI/UX 重大变化

### 1. 启动画面 (Splash Screen)
**变化**:
- ❌ 旧版: 橙色背景 (#FF800B) + 餐厅logo + "by MenuVue"
- ✅ 新版: 红色背景 (#CE1111) + MenuVue品牌logo

**规格**:
```css
背景: #CE1111
Logo颜色: #F7F7F7
字体: Noto Sans, 32px, 500
样式: small-caps
```

### 2. 主界面 Header
**变化**:
- ❌ 删除: 中间下拉菜单 (Chef's Recommend)
- ❌ 删除: 搜索图标
- ❌ 删除: 橙红色渐变背景
- ✅ 新增: 完全透明背景
- ✅ 简化: 左侧MenuVue Logo + 右侧Burger菜单

**规格**:
```css
背景: transparent
Logo: Noto Sans, 28px, 500, #F7F7F7
Burger菜单: 37px × 37px
```

### 3. 底部卡片 (最大变化)
**变化**:
- ❌ 旧版: 椭圆形 (border-radius: 50%)
- ✅ 新版: 圆角矩形 (border-radius: 50px 50px 0 0)

**规格**:
```css
尺寸: 402px × 238px
边框: 3px solid #FFF
背景: rgba(148, 148, 148, 0.49)
毛玻璃: backdrop-filter: blur(4.5px)
```

**内容布局**:
- 顶部: 3张菜品图片 (中间主图175×175px + 左右小图50×50px)
- 中间: 菜品名称和价格
- 底部: MY TABLE按钮 + ADD+按钮

**按钮规格**:
```css
MY TABLE:
- 尺寸: 166px × 50px
- 背景: #F7F7F7
- 边框: 2px solid #FFF

ADD+:
- 尺寸: 172px × 50px
- 背景: #CE1111
- 边框: 2px solid #E93838
```

---

## 📂 文件结构

```
menuvue-v2/
├── index.html          # 主HTML文件
├── css/
│   └── main.css        # 样式表（完全重写）
├── js/
│   └── app.js          # JavaScript逻辑
└── assets/
    └── images/
        └── dishes/
            ├── polo-main.png      # 主菜品图片
            ├── dish-left.png      # 左侧小图
            └── dish-right.png     # 右侧小图
```

---

## 🚀 使用方法

### 1. 准备图片资源
将你的菜品图片放入 `assets/images/dishes/` 目录：
- `polo-main.png` - 主菜品展示图
- `dish-left.png` - 左侧预览图
- `dish-right.png` - 右侧预览图

### 2. 配置3D模型
在 `js/app.js` 中更新 `dishes` 数组：
```javascript
let dishes = [
    {
        name: "PoLo 新疆手抓饭",
        price: "$ 21",
        mainImage: "./assets/images/dishes/polo-main.png",
        model: "./assets/models/polo.glb"
    },
    // 添加更多菜品...
];
```

### 3. 启动项目
使用本地服务器运行（推荐）:
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx http-server

# 或使用VS Code Live Server插件
```

---

## ⚠️ 待实现功能

### AR.js 相关
- [ ] 3D模型加载优化
- [ ] Marker检测优化
- [ ] 竖屏模式适配

### UI交互
- [ ] Burger菜单展开内容
- [ ] MY TABLE页面实现
- [ ] 左右滑动切换菜品
- [ ] 添加菜品动画反馈

### 数据管理
- [ ] 菜品数据结构设计
- [ ] 购物车/餐桌状态管理
- [ ] 后端API对接（Firebase）

---

## 🎯 下一步计划

1. **完成AR.js适配** - 解决竖屏模式下的模型显示问题
2. **实现菜品切换** - 左右滑动或点击侧边图片切换
3. **开发Burger菜单** - 分类筛选、搜索等功能
4. **MY TABLE功能** - 购物车/订单管理界面
5. **多餐厅适配** - 配置文件系统，支持主题切换

---

## 📝 开发笔记

### 响应式断点
- 手机: < 480px
- 平板: 480px - 768px
- 桌面: > 768px
- 矮屏设备: < 700px height

### 字体使用
- 品牌Logo: Noto Sans (small-caps)
- 界面文字: SF Pro / 系统默认
- 后备字体: -apple-system, BlinkMacSystemFont

### 颜色主题
- 主红色: #CE1111
- 次红色: #E93838
- 白色: #F7F7F7
- 边框白: #FFFFFF

---

## 🐛 已知问题

1. AR.js在iOS Safari中的兼容性需要测试
2. 毛玻璃效果在某些浏览器中可能不支持
3. 3D模型路径需要根据实际项目调整

---

**版本**: v2.0  
**更新日期**: 2024-12  
**项目**: MenuVue AR Menu Experience
