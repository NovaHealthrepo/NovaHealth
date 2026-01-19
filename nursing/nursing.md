# Nursing Pages Design & CSS Specification

## Overview

This document outlines the design system for nursing service pages. **Only the hero section and main content area will be redesigned.** All shared components remain unchanged.

---

## ⚠️ DO NOT MODIFY - Shared Components

The following components are **already correct** and must **NOT be changed**:

| Component                                    | Status        |
| -------------------------------------------- | ------------- |
| `<header>`                                   | ✅ Keep as-is |
| `<footer>`                                   | ✅ Keep as-is |
| `.quick-contact` section                     | ✅ Keep as-is |
| `.whatsapp-float` button                     | ✅ Keep as-is |
| `<script src="../script.js">`                | ✅ Keep as-is |
| `<link rel="stylesheet" href="../main.css">` | ✅ Keep as-is |

---

## ✅ WHAT TO CHANGE - Only These Parts

1. **Remove inline `<style>` blocks** (with `colour` typo)
2. **Add hero section** after header, before main
3. **Add CSS classes** to main content for styling
4. **Fix heading hierarchy** (h5 → h2)
5. **Remove `<strong>` from headings**

---

## Page Structure

```
┌─────────────────────────────────────┐
│  Header (DO NOT CHANGE)             │
├─────────────────────────────────────┤
│  ★ NEW: Hero Section                │
├─────────────────────────────────────┤
│  ★ RESTYLE: Main Content            │
├─────────────────────────────────────┤
│  Quick Contact (DO NOT CHANGE)      │
├─────────────────────────────────────┤
│  WhatsApp Button (DO NOT CHANGE)    │
├─────────────────────────────────────┤
│  Footer (DO NOT CHANGE)             │
└─────────────────────────────────────┘
```

---

## Pages in Nursing Folder

| File                      | Title              | Icon                   |
| ------------------------- | ------------------ | ---------------------- |
| chronic-disease.html      | 慢性疾病管理       | fa-heart-pulse         |
| dialysis.html             | 腹膜透析護理       | fa-droplet             |
| post-operation.html       | 術後護理           | fa-kit-medical         |
| catheter-care.html        | 導管護理           | fa-toilet              |
| medication-injection.html | 藥物管理及注射治療 | fa-prescription-bottle |
| nutrition-care.html       | 營養護理           | fa-utensils            |

---

## CSS Styles - Mobile First Design

Add to `main.css` or create `nursing/nursing.css`

```css
/* ===========================================
   NURSING PAGES STYLES
   Mobile First Design Pattern
   =========================================== */

/* ----------------------------------------
   HERO SECTION - Mobile Base (< 768px)
   ---------------------------------------- */
.nursing-hero {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-color-dark) 100%
  );
  color: var(--pure-white);
  padding: 80px 16px 48px;
  text-align: center;
}

.nursing-hero__content {
  max-width: 100%;
  margin: 0 auto;
}

.nursing-hero__icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--accent-color);
}

.nursing-hero__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--pure-white);
  line-height: 1.3;
}

.nursing-hero__tagline {
  font-size: 1rem;
  opacity: 0.9;
  max-width: 100%;
  margin: 0 auto;
  line-height: 1.6;
}

/* ----------------------------------------
   MAIN CONTENT - Mobile Base (< 768px)
   ---------------------------------------- */
.nursing-main {
  padding: 32px 16px;
  max-width: 100%;
  margin: 0 auto;
}

.nursing-section {
  margin-bottom: 36px;
}

.nursing-section__title {
  font-size: 1.25rem;
  color: var(--primary-color);
  border-left: 3px solid var(--secondary-color);
  padding-left: 12px;
  margin-bottom: 16px;
  font-weight: 700;
  text-align: left;
  line-height: 1.3;
}

.nursing-section__intro {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-body);
  margin-bottom: 20px;
}

/* Service Details Cards - Mobile */
.nursing-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nursing-details__item {
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  padding: 16px;
  border-left: 3px solid var(--secondary-color);
  transition: all var(--transition-base);
}

.nursing-details__item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nursing-details__item strong {
  color: var(--primary-color);
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
}

.nursing-details__item p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-gray);
}

/* Target Audience Tags - Mobile */
.nursing-audience {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nursing-audience__item {
  background: var(--bg-light);
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  color: var(--text-body);
  border: 1px solid rgba(0, 95, 115, 0.1);
  transition: all var(--transition-base);
  line-height: 1.5;
}

.nursing-audience__item:hover {
  background: var(--primary-color);
  color: var(--pure-white);
  border-color: var(--primary-color);
}

/* Team Badges - Mobile */
.nursing-team {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nursing-team__member {
  background: var(--primary-color);
  color: var(--pure-white);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Pricing Box - Mobile */
.nursing-pricing {
  background: var(--bg-light);
  border: 2px solid var(--secondary-color);
  border-radius: var(--radius-md);
  padding: 20px 16px;
}

.nursing-pricing__list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.nursing-pricing__item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 95, 115, 0.1);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-body);
}

.nursing-pricing__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* CTA Button - Mobile */
.nursing-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: var(--accent-color);
  color: var(--text-dark);
  padding: 14px 24px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.nursing-cta:hover {
  background: var(--accent-color-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ----------------------------------------
   TABLET BREAKPOINT (min-width: 768px)
   ---------------------------------------- */
@media (min-width: 768px) {
  /* Hero - Tablet */
  .nursing-hero {
    padding: 100px 36px 64px;
  }

  .nursing-hero__content {
    max-width: 700px;
  }

  .nursing-hero__icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  .nursing-hero__title {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }

  .nursing-hero__tagline {
    font-size: 1.125rem;
    max-width: 600px;
  }

  /* Main Content - Tablet */
  .nursing-main {
    padding: 48px 36px;
    max-width: 800px;
  }

  .nursing-section {
    margin-bottom: 48px;
  }

  .nursing-section__title {
    font-size: 1.5rem;
    border-left-width: 4px;
    padding-left: 16px;
    margin-bottom: 20px;
  }

  .nursing-section__intro {
    font-size: 1.0625rem;
    margin-bottom: 24px;
  }

  /* Details - Tablet */
  .nursing-details {
    gap: 16px;
  }

  .nursing-details__item {
    padding: 20px;
    border-radius: var(--radius-md);
    border-left-width: 4px;
  }

  .nursing-details__item strong {
    font-size: 1.0625rem;
    margin-bottom: 8px;
  }

  .nursing-details__item p {
    font-size: 1rem;
  }

  /* Audience Tags - Tablet */
  .nursing-audience {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }

  .nursing-audience__item {
    padding: 12px 20px;
    border-radius: var(--radius-pill);
    font-size: 0.95rem;
  }

  /* Team - Tablet */
  .nursing-team {
    gap: 12px;
  }

  .nursing-team__member {
    padding: 10px 20px;
    font-size: 0.9375rem;
  }

  /* Pricing - Tablet */
  .nursing-pricing {
    padding: 28px 24px;
    border-radius: var(--radius-lg);
  }

  .nursing-pricing__item {
    padding: 14px 0;
    font-size: 1rem;
  }

  /* CTA - Tablet */
  .nursing-cta {
    width: auto;
    padding: 14px 36px;
  }
}

/* ----------------------------------------
   DESKTOP BREAKPOINT (min-width: 1200px)
   ---------------------------------------- */
@media (min-width: 1200px) {
  /* Hero - Desktop */
  .nursing-hero {
    padding: 120px 48px 80px;
  }

  .nursing-hero__content {
    max-width: 800px;
  }

  .nursing-hero__icon {
    font-size: 4rem;
  }

  .nursing-hero__title {
    font-size: 2.5rem;
  }

  .nursing-hero__tagline {
    font-size: 1.25rem;
  }

  /* Main Content - Desktop */
  .nursing-main {
    padding: 64px 48px;
    max-width: 1000px;
  }

  .nursing-section {
    margin-bottom: 56px;
  }

  .nursing-section__title {
    font-size: 1.75rem;
  }

  .nursing-section__intro {
    font-size: 1.125rem;
  }

  /* Details - Desktop */
  .nursing-details {
    gap: 20px;
  }

  .nursing-details__item {
    padding: 24px;
  }

  .nursing-details__item strong {
    font-size: 1.125rem;
  }

  .nursing-details__item p {
    font-size: 1.0625rem;
  }

  /* Pricing - Desktop */
  .nursing-pricing {
    padding: 32px;
  }

  .nursing-pricing__item {
    padding: 16px 0;
    font-size: 1.0625rem;
  }

  /* CTA - Desktop */
  .nursing-cta {
    padding: 16px 40px;
    font-size: 1.0625rem;
  }
}
```

---

## HTML Template - Hero Section

Add after `</header>`, before `<main>`:

```html
<!-- Hero Section -->
<section class="nursing-hero">
  <div class="container nursing-hero__content">
    <i class="fas fa-heart-pulse nursing-hero__icon"></i>
    <h1 class="nursing-hero__title">頁面標題</h1>
    <p class="nursing-hero__tagline">服務簡介文字</p>
  </div>
</section>
```

---

## HTML Template - Main Content

```html
<main class="nursing-main">
  <!-- Service Introduction -->
  <section class="nursing-section">
    <h2 class="nursing-section__title">服務簡介</h2>
    <p class="nursing-section__intro">服務簡介內容...</p>
  </section>

  <!-- Service Details -->
  <section class="nursing-section">
    <h2 class="nursing-section__title">服務詳情</h2>
    <div class="nursing-details">
      <div class="nursing-details__item">
        <strong>服務項目標題</strong>
        <p>服務項目描述內容。</p>
      </div>
      <!-- More items... -->
    </div>
  </section>

  <!-- Target Audience -->
  <section class="nursing-section">
    <h2 class="nursing-section__title">適合對象</h2>
    <ul class="nursing-audience">
      <li class="nursing-audience__item">對象描述</li>
      <!-- More items... -->
    </ul>
  </section>

  <!-- Professional Team -->
  <section class="nursing-section">
    <h2 class="nursing-section__title">專業團隊</h2>
    <ul class="nursing-team">
      <li class="nursing-team__member">註冊護士 (RN)</li>
      <!-- More items... -->
    </ul>
  </section>

  <!-- Pricing -->
  <section class="nursing-section">
    <h2 class="nursing-section__title">服務收費</h2>
    <div class="nursing-pricing">
      <ul class="nursing-pricing__list">
        <li class="nursing-pricing__item">收費詳情</li>
      </ul>
      <a href="../contact.html" class="nursing-cta">立即查詢</a>
    </div>
  </section>
</main>
```

---

## What to DELETE from each file

```html
<!-- DELETE this inline style block -->
<style>
  main {
    colour: rgba(11, 113, 171, 0);
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
```

---

## ⚠️ Issues to Fix

| Issue                               | Files                                                         | Action                     |
| ----------------------------------- | ------------------------------------------------------------- | -------------------------- |
| Inline `<style>` with `colour` typo | medication-injection, nutrition-care, catheter-care, dialysis | DELETE the `<style>` block |
| `<h5>` for pricing                  | chronic-disease.html                                          | Change to `<h2>`           |
| `<strong>` in headings              | All files                                                     | Remove `<strong>` tags     |
| Git conflict markers                | chronic-disease.html                                          | Remove `<<<<<<< HEAD` etc. |
| Wrong phone in quick-contact        | chronic-disease.html                                          | Use `5473 6204`            |
| Wrong WhatsApp href                 | catheter-care.html                                            | Fix to `wa.me/85254736204` |

---

## 🚫 REMINDER: Do NOT Touch These

- ❌ Header navigation
- ❌ Footer content
- ❌ Quick contact section
- ❌ WhatsApp floating button
- ❌ Script imports
- ❌ Main CSS link

---

## Mobile First Design Summary

| Breakpoint | Target           | Key Changes                                                 |
| ---------- | ---------------- | ----------------------------------------------------------- |
| Base       | < 768px (Mobile) | Full-width elements, stacked layout, larger touch targets   |
| 768px      | Tablet           | Wider containers, horizontal audience tags, refined spacing |
| 1200px     | Desktop          | Maximum widths, enhanced padding, polished typography       |
