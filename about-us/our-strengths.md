mobile# Our Strengths 页面完整开发计划

## 📋 项目概览

为 Nova Health 创建"为何选择芯凝"页面，突出 5 大核心竞争优势，采用交互式动画的长页面设计，mobile-first 响应式布局。

---

## ✅ 已确认需求

### 1. Hero 区域

- **背景**: 蓝色渐变 + 几何图案动画 (参考 about-us.html 的 .about-hero)
- **动画**: 背景渐变流动动画
- **副标题**: "数据驱动复康 · 科技赋能护理 · 透明追踪进度"
- **CTA 按钮**: 在 Hero 区域即可

### 2. 核心优势展示

- **方案**: 方案 C - 交互式翻转/展开动画
- **内容**: 5 项优势（专科专配、透明化记录系统、目标导向复康、创新科技应用、个人化方案）
- **视觉**: 卡片点击翻转或展开详情

### 3. 透明化系统特色区

- **图片**: 使用 placeholder（2 张报告样本）
- **Gallery**: 复用 script.js 的切换功能
- **重点**: 数据化追踪好处、目标设定必要、芯凝强项

### 4. 服务流程

- **结构**: 1-3 步线性，4-6 步圆形循环
- **步骤**: 咨询 → Intake → 设立计划 → 服务 → 季度评估 → 更新目标
- **详细说明**: 见下方生成内容

### 5. 技术栈

- **CSS**: our-strengths.css (新建，自定义动画)
- **JS**: our-strengths.js (新建，自定义交互，不引用外部库)
- **图片**: 600x400 placeholder

---

## 🎯 服务流程详细说明（自动生成）

### 步骤 1: 咨询

**描述**: 致电或 WhatsApp 联系我们，个案经理了解您的需求、病情及家居环境，提供初步建议。

### 步骤 2: 护士/物理治疗师 Intake

**描述**: 专业治疗师上门进行全面评估，包括身体状况、活动能力、认知功能及家居安全检查。

### 步骤 3: 设立/更新计划

**描述**: 根据评估结果，制定个人化复康计划，设定三项长期目标（三个月），并配对最合适的专业人员。

### 步骤 4: 服务（循环）

**描述**: 专业团队定期上门提供物理治疗、护理或言语治疗服务，每次详细记录进度及维生指数。

### 步骤 5: 季度评估（循环）

**描述**: 每三个月进行全面复康评估，生成详细季度报告，对比肌力、平衡、日常活动能力等指标变化。

### 步骤 6: 更新目标（循环）

**描述**: 根据评估结果调整康复目标及训练计划，确保持续进步，适应不同康复阶段的需求。

---

## 📐 页面结构详细设计

### Section 1: Hero 区域（.about-hero）

#### HTML 结构

```html
<section class="about-hero">
  <div class="container">
    <span class="about-hero__tag">
      <i class="fas fa-award"></i> 您的信赖之选
    </span>
    <h1 class="about-hero__title">为何选择芯凝</h1>
    <p class="about-hero__subtitle">
      数据驱动复康 · 科技赋能护理 · 透明追踪进度
    </p>
    <div class="about-hero__cta">
      <a href="../contact.html" class="button button--primary">
        <i class="fas fa-calendar-check"></i> 立即预约免费评估
      </a>
      <a href="#strengths" class="button button--outline smooth-scroll">
        <i class="fas fa-arrow-down"></i> 了解我们的优势
      </a>
    </div>
  </div>
  <!-- 背景动画图案 -->
  <div class="about-hero__pattern">
    <div class="pattern-shape pattern-shape--1"></div>
    <div class="pattern-shape pattern-shape--2"></div>
    <div class="pattern-shape pattern-shape--3"></div>
  </div>
</section>
```

#### CSS 动画

```css
/* 背景渐变流动 */
.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 400% 400%;
  animation: gradient-flow 15s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 几何图案动画 */
.pattern-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s ease-in-out infinite;
}

.pattern-shape--1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.pattern-shape--2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: 10%;
  animation-delay: 5s;
}

.pattern-shape--3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: -75px;
  animation-delay: 10s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}
```

---

### Section 2: 核心优势区（交互式翻转卡片）

#### HTML 结构

```html
<section class="strengths" id="strengths">
  <div class="container">
    <h2 class="section-title">芯凝五大核心优势</h2>
    <p class="section-subtitle">点击卡片了解详情</p>

    <div class="strengths__grid">
      <!-- 优势1: 专科专配 -->
      <article class="strength-card" data-strength="1">
        <div class="strength-card__inner">
          <!-- 正面 -->
          <div class="strength-card__front">
            <div class="strength-card__icon">
              <i class="fas fa-user-md"></i>
            </div>
            <h3 class="strength-card__title">专科专配</h3>
            <p class="strength-card__desc">专业对口，非一般派员</p>
            <button class="strength-card__toggle" aria-label="展开详情">
              <i class="fas fa-plus"></i>
            </button>
          </div>

          <!-- 背面/详情 -->
          <div class="strength-card__back">
            <button class="strength-card__close" aria-label="关闭详情">
              <i class="fas fa-times"></i>
            </button>
            <h4>专科专配 · 专业对口</h4>
            <ul class="strength-card__details">
              <li>由理工大学物理治疗师或注册护士担任个案经理</li>
              <li>根据病情配对具备相关专业背景的治疗师</li>
              <li>罕见病或复杂病例安排特殊学校经验人员</li>
              <li>认知障碍患者参考学前教育概念，使复康游戏化</li>
            </ul>
          </div>
        </div>
      </article>

      <!-- 优势2: 透明化记录系统 -->
      <article class="strength-card" data-strength="2">
        <div class="strength-card__inner">
          <div class="strength-card__front">
            <div class="strength-card__icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3 class="strength-card__title">透明化记录系统</h3>
            <p class="strength-card__desc">进度一目了然</p>
            <button class="strength-card__toggle" aria-label="展开详情">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="strength-card__back">
            <button class="strength-card__close" aria-label="关闭详情">
              <i class="fas fa-times"></i>
            </button>
            <h4>透明化记录 · 数据可视</h4>
            <ul class="strength-card__details">
              <li>系统化记录每日进度、运动次数及维生指数</li>
              <li>月度、季度报告自动生成，图表化呈现</li>
              <li>康复轨迹清晰可见，家属随时了解情况</li>
              <li>专业报告可供医生参考，促进医疗协作</li>
            </ul>
          </div>
        </div>
      </article>

      <!-- 优势3: 目标导向复康 -->
      <article class="strength-card" data-strength="3">
        <div class="strength-card__inner">
          <div class="strength-card__front">
            <div class="strength-card__icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3 class="strength-card__title">目标导向复康</h3>
            <p class="strength-card__desc">明确方向，持续进步</p>
            <button class="strength-card__toggle" aria-label="展开详情">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="strength-card__back">
            <button class="strength-card__close" aria-label="关闭详情">
              <i class="fas fa-times"></i>
            </button>
            <h4>目标导向 · 可量化评估</h4>
            <ul class="strength-card__details">
              <li>为每位客户制定三项专属长期目标（三个月）</li>
              <li>每季度评估进度，调整康复方向</li>
              <li>目标可量化，进步看得见</li>
              <li>提升康复动力，增强信心</li>
            </ul>
          </div>
        </div>
      </article>

      <!-- 优势4: 创新科技应用 -->
      <article class="strength-card" data-strength="4">
        <div class="strength-card__inner">
          <div class="strength-card__front">
            <div class="strength-card__icon">
              <i class="fas fa-laptop-medical"></i>
            </div>
            <h3 class="strength-card__title">创新科技应用</h3>
            <p class="strength-card__desc">科技赋能康复</p>
            <button class="strength-card__toggle" aria-label="展开详情">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="strength-card__back">
            <button class="strength-card__close" aria-label="关闭详情">
              <i class="fas fa-times"></i>
            </button>
            <h4>科技应用 · 智能康复</h4>
            <ul class="strength-card__details">
              <li>遥距视像护理咨询服务，随时解答疑问</li>
              <li>智能复康仪器租借，居家训练更有效</li>
              <li>居家监测设备，实时追踪健康指标</li>
              <li>紧密联繫供应商，协助选购先进设备</li>
            </ul>
          </div>
        </div>
      </article>

      <!-- 优势5: 个人化方案 -->
      <article class="strength-card" data-strength="5">
        <div class="strength-card__inner">
          <div class="strength-card__front">
            <div class="strength-card__icon">
              <i class="fas fa-users-cog"></i>
            </div>
            <h3 class="strength-card__title">个人化方案</h3>
            <p class="strength-card__desc">量身打造，贴心服务</p>
            <button class="strength-card__toggle" aria-label="展开详情">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="strength-card__back">
            <button class="strength-card__close" aria-label="关闭详情">
              <i class="fas fa-times"></i>
            </button>
            <h4>个人化方案 · 全方位关怀</h4>
            <ul class="strength-card__details">
              <li>1对1定制复康计划，非标准化套餐</li>
              <li>根据病情、生活习惯、家居环境量身打造</li>
              <li>灵活调整服务时间及频率</li>
              <li>全程专属个案经理跟进，确保服务品质</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
```

#### CSS 样式（翻转动画）

```css
/* 核心优势网格 */
.strengths__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
}

@media (min-width: 768px) {
  .strengths__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .strengths__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .strengths__grid .strength-card:nth-child(4),
  .strengths__grid .strength-card:nth-child(5) {
    /* 第二行居中 */
  }
}

/* 卡片容器 */
.strength-card {
  perspective: 1000px;
  height: 300px;
  cursor: pointer;
}

.strength-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.strength-card.is-flipped .strength-card__inner {
  transform: rotateY(180deg);
}

/* 卡片正面和背面 */
.strength-card__front,
.strength-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
}

.strength-card__back {
  transform: rotateY(180deg);
  overflow-y: auto;
}

/* 图标动画 */
.strength-card__icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
  transition: transform 0.3s;
}

.strength-card:hover .strength-card__icon {
  transform: scale(1.1) rotate(5deg);
}

/* 展开按钮 */
.strength-card__toggle {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s;
}

.strength-card__toggle:hover {
  background: #667eea;
  color: white;
  transform: rotate(90deg);
}

/* 关闭按钮 */
.strength-card__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
}

/* 详情列表 */
.strength-card__details {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.strength-card__details li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
}

.strength-card__details li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}
```

#### JavaScript 交互

```javascript
// 卡片翻转交互
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".strength-card");

  cards.forEach((card) => {
    const toggleBtn = card.querySelector(".strength-card__toggle");
    const closeBtn = card.querySelector(".strength-card__close");

    // 点击展开按钮翻转
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.add("is-flipped");
    });

    // 点击关闭按钮翻转回来
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.remove("is-flipped");
    });

    // 点击卡片本身也可翻转
    card.addEventListener("click", () => {
      if (!card.classList.contains("is-flipped")) {
        card.classList.add("is-flipped");
      }
    });
  });

  // Smooth scroll for CTA button
  document.querySelectorAll(".smooth-scroll").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });
});
```

---

### Section 3: 透明化系统特色区

#### HTML 结构

```html
<section class="transparent-system">
  <div class="container">
    <div class="transparent-system__grid">
      <!-- 左侧 Gallery -->
      <div class="transparent-system__gallery">
        <div class="gallery-slider">
          <!-- Placeholder 1: 月度报告 -->
          <div class="gallery-slide active">
            <div class="placeholder-image" data-size="600x400">
              <i class="fas fa-file-medical-alt"></i>
              <p>月度复康报告示例</p>
            </div>
          </div>

          <!-- Placeholder 2: 目标追踪图表 -->
          <div class="gallery-slide">
            <div class="placeholder-image" data-size="600x400">
              <i class="fas fa-chart-bar"></i>
              <p>目标追踪图表</p>
            </div>
          </div>
        </div>

        <div class="gallery-controls">
          <button class="gallery-control active" data-slide="0">
            <i class="fas fa-file-medical-alt"></i> 月度报告
          </button>
          <button class="gallery-control" data-slide="1">
            <i class="fas fa-chart-bar"></i> 目标追踪
          </button>
        </div>
      </div>

      <!-- 右侧说明 -->
      <div class="transparent-system__content">
        <h2>透明化记录系统</h2>
        <h3>数据化追踪，让康复进度清晰可见</h3>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-item__icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="feature-item__content">
              <h4>数据化追踪的好处</h4>
              <p>
                每月自动生成图表化报告，肌力、平衡、日常活动能力一目了然。家属可随时了解康复情况，医生也能参考数据调整治疗方案，实现多方协作。
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <div class="feature-item__content">
              <h4>目标设定的必要</h4>
              <p>
                明确的康复目标提供前进方向，增强患者动力与信心。可量化的目标让进步看得见，每次达成都是对努力的肯定，激励持续改善。
              </p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-item__icon">
              <i class="fas fa-award"></i>
            </div>
            <div class="feature-item__content">
              <h4>芯凝的强项</h4>
              <p>
                我们拥有成熟的系统化记录机制，专业的报告格式符合医疗标准。定期更新确保数据时效性，透明化流程建立医患互信。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### CSS 样式（Gallery）

```css
/* Placeholder 图片样式 */
.placeholder-image {
  width: 600px;
  height: 400px;
  max-width: 100%;
  background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 1rem;
}

.placeholder-image i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Gallery 样式 */
.gallery-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.gallery-slide {
  display: none;
}

.gallery-slide.active {
  display: block;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.gallery-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.gallery-control {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.gallery-control.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

.gallery-control:hover:not(.active) {
  border-color: #667eea;
}

/* 响应式 */
.transparent-system__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .transparent-system__grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Feature List */
.feature-list {
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateX(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-item__icon {
  font-size: 2rem;
  color: #667eea;
  flex-shrink: 0;
}
```

#### JavaScript（Gallery 切换）

```javascript
// Gallery 切换功能
function initGallery() {
  const controls = document.querySelectorAll(".gallery-control");
  const slides = document.querySelectorAll(".gallery-slide");

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const slideIndex = parseInt(control.dataset.slide);

      // 移除所有 active
      controls.forEach((c) => c.classList.remove("active"));
      slides.forEach((s) => s.classList.remove("active"));

      // 添加 active 到当前
      control.classList.add("active");
      slides[slideIndex].classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", initGallery);
```

---

### Section 4: 服务流程说明区

#### HTML 结构

```html
<section class="service-process">
  <div class="container">
    <h2 class="section-title">服务流程</h2>
    <p class="section-subtitle">从咨询到持续跟进，每一步专业用心</p>

    <!-- 初始流程 1-3 (线性) -->
    <div class="process-linear">
      <div class="process-step">
        <div class="process-step__number">1</div>
        <h3 class="process-step__name">咨询</h3>
      </div>
      <div class="process-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
      <div class="process-step">
        <div class="process-step__number">2</div>
        <h3 class="process-step__name">Intake</h3>
      </div>
      <div class="process-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
      <div class="process-step">
        <div class="process-step__number">3</div>
        <h3 class="process-step__name">设立计划</h3>
      </div>
    </div>

    <!-- 循环流程 4-6 (圆形) -->
    <div class="process-cycle">
      <div class="cycle-container">
        <svg class="cycle-svg" viewBox="0 0 400 400">
          <!-- 圆形路径 -->
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="#e5e7eb"
            stroke-width="3"
            fill="none"
            stroke-dasharray="10 5"
          />

          <!-- 动画箭头路径 -->
          <path
            d="M 200,80 A 120,120 0 1,1 199.9,80"
            stroke="#667eea"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
            class="cycle-path"
          />

          <!-- 步骤4: 服务 (顶部) -->
          <g class="cycle-step" data-step="4">
            <circle cx="200" cy="80" r="35" fill="#667eea" />
            <text
              x="200"
              y="88"
              text-anchor="middle"
              fill="white"
              font-size="24"
              font-weight="bold"
            >
              4
            </text>
          </g>

          <!-- 步骤5: 季度评估 (右下) -->
          <g class="cycle-step" data-step="5">
            <circle cx="304" cy="260" r="35" fill="#667eea" />
            <text
              x="304"
              y="268"
              text-anchor="middle"
              fill="white"
              font-size="24"
              font-weight="bold"
            >
              5
            </text>
          </g>

          <!-- 步骤6: 更新目标 (左下) -->
          <g class="cycle-step" data-step="6">
            <circle cx="96" cy="260" r="35" fill="#667eea" />
            <text
              x="96"
              y="268"
              text-anchor="middle"
              fill="white"
              font-size="24"
              font-weight="bold"
            >
              6
            </text>
          </g>
        </svg>

        <!-- 标签 -->
        <div class="cycle-label cycle-label--top">服务</div>
        <div class="cycle-label cycle-label--right">季度评估</div>
        <div class="cycle-label cycle-label--left">更新目标</div>

        <!-- 中心文字 -->
        <div class="cycle-center">
          <i class="fas fa-sync-alt"></i>
          <p>持续循环</p>
        </div>
      </div>
    </div>

    <!-- 详细说明 -->
    <div class="process-details">
      <div class="process-detail" data-step="1">
        <div class="process-detail__badge">1</div>
        <div class="process-detail__content">
          <h4>咨询</h4>
          <p>
            致电或 WhatsApp
            联系我们，个案经理了解您的需求、病情及家居环境，提供初步建议。
          </p>
        </div>
      </div>

      <div class="process-detail" data-step="2">
        <div class="process-detail__badge">2</div>
        <div class="process-detail__content">
          <h4>护士/物理治疗师 Intake</h4>
          <p>
            专业治疗师上门进行全面评估，包括身体状况、活动能力、认知功能及家居安全检查。
          </p>
        </div>
      </div>

      <div class="process-detail" data-step="3">
        <div class="process-detail__badge">3</div>
        <div class="process-detail__content">
          <h4>设立/更新计划</h4>
          <p>
            根据评估结果，制定个人化复康计划，设定三项长期目标（三个月），并配对最合适的专业人员。
          </p>
        </div>
      </div>

      <div class="process-detail" data-step="4">
        <div class="process-detail__badge">4</div>
        <div class="process-detail__content">
          <h4>服务</h4>
          <p>
            专业团队定期上门提供物理治疗、护理或言语治疗服务，每次详细记录进度及维生指数。
          </p>
        </div>
      </div>

      <div class="process-detail" data-step="5">
        <div class="process-detail__badge">5</div>
        <div class="process-detail__content">
          <h4>季度评估</h4>
          <p>
            每三个月进行全面复康评估，生成详细季度报告，对比肌力、平衡、日常活动能力等指标变化。
          </p>
        </div>
      </div>

      <div class="process-detail" data-step="6">
        <div class="process-detail__badge">6</div>
        <div class="process-detail__content">
          <h4>更新目标</h4>
          <p>
            根据评估结果调整康复目标及训练计划，确保持续进步，适应不同康复阶段的需求。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### CSS 样式（流程图）

```css
/* 线性流程 1-3 */
.process-linear {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.process-step {
  text-align: center;
}

.process-step__number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.process-step__name {
  font-size: 1.1rem;
  color: #333;
}

.process-arrow {
  font-size: 2rem;
  color: #667eea;
}

@media (max-width: 768px) {
  .process-arrow {
    display: none;
  }
}

/* 圆形循环流程 */
.process-cycle {
  margin: 4rem 0;
  display: flex;
  justify-content: center;
}

.cycle-container {
  position: relative;
  width: 400px;
  height: 400px;
  max-width: 100%;
}

.cycle-svg {
  width: 100%;
  height: 100%;
}

/* SVG 路径动画 */
.cycle-path {
  stroke-dasharray: 753;
  stroke-dashoffset: 753;
  animation: drawPath 3s ease forwards;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

/* 圆形步骤点动画 */
.cycle-step {
  animation: fadeInScale 0.5s ease backwards;
}

.cycle-step[data-step="4"] {
  animation-delay: 1s;
}
.cycle-step[data-step="5"] {
  animation-delay: 1.5s;
}
.cycle-step[data-step="6"] {
  animation-delay: 2s;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 标签定位 */
.cycle-label {
  position: absolute;
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

.cycle-label--top {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.cycle-label--right {
  bottom: 60px;
  right: 20px;
}

.cycle-label--left {
  bottom: 60px;
  left: 20px;
}

/* 中心文字 */
.cycle-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.cycle-center i {
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 0.5rem;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 详细说明 */
.process-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}

@media (min-width: 768px) {
  .process-details {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .process-details {
    grid-template-columns: repeat(3, 1fr);
  }
}

.process-detail {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  transition: all 0.3s;
}

.process-detail:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  transform: translateY(-5px);
}

.process-detail__badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.process-detail__content h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.process-detail__content p {
  color: #666;
  line-height: 1.6;
}
```

---

## 📦 完整文件清单

### 需要创建/修改的文件

1. ✅ **our-strengths.html** - 主页面 HTML
2. ✅ **our-strengths.css** - 页面专属样式
3. ✅ **our-strengths.js** - 页面交互脚本

### 需要的图片（Placeholder）

1. **Hero 背景图** (可选，使用 CSS 渐变)
2. **月度报告样本** - `placeholder-image` (600x400)
3. **目标追踪图表** - `placeholder-image` (600x400)

---

## ⚡ 性能优化建议

### 1. CSS 优化

- 使用 `transform` 和 `opacity` 做动画（GPU 加速）
- 避免频繁重绘的属性（如 `width`, `height`）
- 使用 `will-change` 提示浏览器优化

### 2. JavaScript 优化

- 使用事件委托减少监听器数量
- 防抖/节流处理滚动事件
- 懒加载非首屏内容

### 3. 图片优化

- 使用 WebP 格式（保留 PNG/JPG fallback）
- 实现图片懒加载
- 响应式图片 `srcset`

---

## ♿ 无障碍优化

### ARIA 标签

- 所有交互按钮添加 `aria-label`
- 卡片翻转状态使用 `aria-expanded`
- 表单元素关联 `aria-describedby`

### 键盘导航

- 卡片支持 Tab 键聚焦
- Enter/Space 触发翻转
- Esc 关闭翻转卡片

### 颜色对比

- 确保文字与背景对比度 ≥ 4.5:1
- 不仅依赖颜色传达信息

---

## 🧪 测试清单

### 功能测试

- [ ] Hero 渐变动画流畅播放
- [ ] 5 个优势卡片点击翻转正常
- [ ] Gallery 切换按钮功能正常
- [ ] 圆形流程 SVG 动画正确绘制
- [ ] 所有链接跳转正确
- [ ] Smooth scroll 平滑滚动

### 响应式测试

- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)

### 浏览器兼容

- [ ] Chrome (最新)
- [ ] Firefox (最新)
- [ ] Safari (最新)
- [ ] Edge (最新)

### 性能测试

- [ ] Lighthouse 性能分数 > 90
- [ ] 首次内容绘制 (FCP) < 1.5s
- [ ] 最大内容绘制 (LCP) < 2.5s

---

## 📝 实施步骤

### Step 1: 基础结构 (1-2 小时)

1. 复制 `our-strengths.html` 框架
2. 添加 Hero 区域 HTML
3. 添加 5 项优势区域 HTML
4. 添加透明化系统区域 HTML
5. 添加服务流程区域 HTML

### Step 2: 样式开发 (3-4 小时)

1. 创建 `our-strengths.css`
2. 实现 Hero 渐变动画
3. 实现卡片翻转样式
4. 实现 Gallery 样式
5. 实现圆形流程 SVG 样式
6. 响应式媒体查询

### Step 3: 交互开发 (2-3 小时)

1. 创建 `our-strengths.js`
2. 实现卡片翻转逻辑
3. 实现 Gallery 切换逻辑
4. 实现 Smooth scroll
5. 添加键盘导航支持

### Step 4: 测试与优化 (2 小时)

1. 功能测试
2. 响应式测试
3. 性能优化
4. 无障碍检查
5. 浏览器兼容测试

---

## 🎯 预期效果

### 用户体验

- **视觉吸引**: 渐变动画 Hero 立即抓住注意力
- **互动性强**: 翻转卡片增加参与感
- **信息清晰**: 透明化系统展示建立信任
- **流程明确**: 圆形循环图直观展示服务流程

### 技术优势

- **性能优化**: 纯 CSS 动画，流畅 60fps
- **响应式设计**: 完美适配所有设备
- **无障碍友好**: 符合 WCAG 2.1 AA 标准
- **易于维护**: 模块化代码结构

---

## 📞 下一步行动

准备好开始实施了吗？我会：

1. 完整编写 `our-strengths.html`
2. 完整编写 `our-strengths.css`
3. 完整编写 `our-strengths.js`

请确认是否立即开始实施，或有任何需要调整的细节？
