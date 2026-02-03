# Hero Section Styles (about-us)

## HTML Structure

```html
<section class="hero">
  <div class="container about-hero__content">
    <span class="about-hero__tag">
      <i class="fas fa-heart"></i>
      源於守護
    </span>
    <h1 class="about-hero__title">關於芯凝</h1>
    <p class="about-hero__subtitle">
      源於守護，始於對「家」的執著<br />
      致力為長者提供優質上門復康護理服務
    </p>
    <div class="about-hero__actions">
      <a href="../contact" class="button button--hero-primary">
        <i class="fas fa-phone-alt"></i>
        聯絡我們
      </a>
      <a href="../pricing" class="button button--hero-outline">
        <i class="fas fa-tags"></i>
        收費詳情
      </a>
    </div>
  </div>
</section>
```

## CSS Styles

```css
/* #region hero*/
.hero {
  background: linear-gradient(145deg, #004d47 0%, #00847d 50%, #006d66 100%);
  color: white;
}

.about-hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(45, 203, 189, 0.25);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  border: 2px solid rgba(45, 203, 189, 0.5);
  box-shadow: 0 4px 15px rgba(45, 203, 189, 0.2);
}

@media (min-width: 768px) {
  .about-hero__tag {
    font-size: 16px;
    padding: 10px 24px;
  }
}

.about-hero__tag i {
  color: #2dcbbd;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
}

.about-hero__title {
  color: #ffffff;
  text-shadow:
    0 4px 30px rgba(0, 0, 0, 0.4),
    0 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  font-size: 2.1rem;
}

@media (min-width: 768px) {
  .about-hero__title {
    font-size: 3rem;
  }
}

@media (min-width: 1200px) {
  .about-hero__title {
    font-size: 3.5rem;
  }
}

.about-hero__subtitle {
  color: #fff;
  margin-bottom: 0;
  text-align: center;
}

.about-hero__actions {
  display: flex;
  flex-direction: column;
  width: 95%;
  gap: 12px;
  margin-top: 32px;
}

@media (min-width: 768px) {
  .about-hero__actions {
    flex-direction: row;
    width: auto;
    gap: 16px;
  }
}

/* Hero Buttons - Extend base .button class */
.button--hero-primary,
.button--hero-outline {
  gap: 10px;
  width: 100%;
}

@media (min-width: 768px) {
  .button--hero-primary,
  .button--hero-outline {
    width: auto;
  }
}

.button--hero-primary {
  background: #2dcbbd;
  color: #00423d;
  border: 2px solid #2dcbbd;
  box-shadow: 0 4px 20px rgba(45, 203, 189, 0.4);
}

.button--hero-primary:hover {
  transform: translateY(-2px);
  background: #3dd4c6;
  border-color: #3dd4c6;
  box-shadow: 0 6px 25px rgba(45, 203, 189, 0.5);
}

.button--hero-outline {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.button--hero-outline:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ffffff;
  transform: translateY(-2px);
}
/* #endregion */
```
