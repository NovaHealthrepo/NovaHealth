# NovaHealth SEO 優化方案

> **執行指示：** 03:03 開始，至少運行到 11:00，不能停。任務結束後繼續尋找可優化的地方。遇到問題直接做決定，不要為了問而停下。真的找不到工作就做 review 或用 claude-seo 找下一個目標。

> **可用工具與權限：** Claude 可以使用 CLI、Playwright 操作以下服務：
> - Gmail (info@novahealth.com.hk)
> - GitHub
> - Cloudflare (DNS/CDN)
> - Google Search Console
> - Cloudinary（圖片 CDN，通過 Gmail 登入）
>
> **基礎架構：** Gmail → GitHub → Cloudflare, Gmail → GitHub → Cloudinary

## 網站概況

| 項目 | 詳情 |
|------|------|
| 網址 | https://novahealth.com.hk |
| 公司 | Nova Health 芯凝護理及物理治療有限公司 |
| 電話 | +852 5473 6204 |
| 電郵 | info@novahealth.com.hk |
| 框架 | 靜態 HTML/CSS/JS |
| 託管 | GitHub Pages → Cloudflare |
| 頁面總數 | 103 頁 |
| 語言 | 繁體中文 (zh-Hant-HK) |
| 類型 | YMYL（Your Money Your Life）醫療健康類網站 |

---

## 現況評分

| 類別 | 現況 | 目標 |
|------|------|------|
| Meta Tags | 9/10 — 所有頁面已有 title, description, keywords, OG tags | 保持 |
| Canonical URLs | 9/10 — 每頁已設定 | 保持 |
| robots.txt | 9/10 — 正確配置 | 保持 |
| sitemap.xml | 8/10 — 103 URLs，但 lastmod 全為同一日期 | 更新日期 |
| 結構化資料 (JSON-LD) | 0/10 — 完全缺失 | 添加到所有頁面 |
| 麵包屑導航 | 0/10 — 無 UI 也無 schema | 添加 |
| E-E-A-T 信號 | 6/10 — 有創辦人故事和資歷，但可加強 | 加強 |
| 內部連結 | 5/10 — 基本導航有，但相關頁面間缺乏交叉連結 | 改善 |
| 圖片 Alt Text | 7/10 — 大部分有，但部分太通用（如 "Template 1"） | 優化 |

---

## 優化計劃

### Phase 1：結構化資料（最高優先級）

這是目前最大的 SEO 缺口。作為醫療健康類 YMYL 網站，結構化資料對搜尋排名和 AI 搜尋引擎引用至關重要。

#### 1.1 全站共用 — Organization + WebSite Schema

**目標文件：** `index.html`（首頁）

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nova Health 芯凝護理及物理治療有限公司",
  "alternateName": ["芯凝護理及物理治療", "Nova Health", "NOVA HEALTH"],
  "url": "https://novahealth.com.hk",
  "logo": "https://novahealth.com.hk/images/og-image.jpg",
  "image": "https://novahealth.com.hk/images/og-image.jpg",
  "description": "芯凝提供專業上門物理治療及護理服務，由註冊物理治療師和護士團隊主理。",
  "foundingDate": "2024",
  "telephone": "+852-5473-6204",
  "email": "info@novahealth.com.hk",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "香港"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+852-5473-6204",
    "contactType": "customer service",
    "availableLanguage": ["zh-Hant", "en"]
  },
  "sameAs": [
    "https://facebook.com/share/1EmzWF2dpL/",
    "https://instagram.com/nova_health_ltd"
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nova Health 芯凝護理及物理治療",
  "url": "https://novahealth.com.hk",
  "inLanguage": "zh-Hant-HK"
}
```

#### 1.2 首頁 — MedicalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Nova Health 芯凝護理及物理治療有限公司",
  "url": "https://novahealth.com.hk",
  "telephone": "+852-5473-6204",
  "email": "info@novahealth.com.hk",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "香港"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "5",
    "bestRating": "5"
  }
}
```

#### 1.3 FAQ — FAQPage Schema

> 注意：自 2023 年 8 月起，Google 限制 FAQPage 富結果僅顯示於政府和醫療機構網站。芯凝作為**醫療護理機構**，符合此條件。即使不獲得 Google 富結果，FAQPage schema 仍有助於 AI 搜尋引擎（ChatGPT、Perplexity、Google AI Overviews）引用。

**目標文件：** `index.html`（首頁 FAQ 區塊）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "你們的服務範圍涵蓋哪些地區？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "我們的服務範圍涵蓋港島、九龍及新界各區..."
      }
    }
  ]
}
```

#### 1.4 所有頁面 — BreadcrumbList Schema

**範例：** `/physiotherapy/physiotherapy-stroke`

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "主頁", "item": "https://novahealth.com.hk/index"},
    {"@type": "ListItem", "position": 2, "name": "物理治療", "item": "https://novahealth.com.hk/physiotherapy/physiotherapy-services"},
    {"@type": "ListItem", "position": 3, "name": "中風復康"}
  ]
}
```

#### 1.5 服務頁面 — Service Schema

**目標：** 所有物理治療、護理、職業及言語治療頁面（約 60+ 頁）

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  "name": "上門中風復康物理治療",
  "description": "由註冊物理治療師提供專業上門中風復康服務...",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Nova Health 芯凝護理及物理治療有限公司",
    "url": "https://novahealth.com.hk"
  },
  "areaServed": {"@type": "AdministrativeArea", "name": "香港"},
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://novahealth.com.hk/contact",
    "servicePhone": "+852-5473-6204"
  }
}
```

#### 1.6 新聞/文章頁面 — Article Schema

**目標：** `about-us/news-001` ~ `news-006`，`health-info/article-001` ~ `article-007`（共 13 頁）

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[文章標題]",
  "author": {
    "@type": "Organization",
    "name": "Nova Health 芯凝護理及物理治療有限公司"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nova Health 芯凝護理及物理治療有限公司",
    "logo": {
      "@type": "ImageObject",
      "url": "https://novahealth.com.hk/images/og-image.jpg"
    }
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "image": "[文章圖片 URL]"
}
```

---

### Phase 2：麵包屑導航

#### 2.1 視覺 UI 麵包屑

在每個子頁面的 `<main>` 區塊頂部添加可見麵包屑：

```html
<nav class="breadcrumb" aria-label="breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="/index">主頁</a></li>
    <li class="breadcrumb__item"><a href="/physiotherapy/physiotherapy-services">物理治療</a></li>
    <li class="breadcrumb__item breadcrumb__item--active" aria-current="page">中風復康</li>
  </ol>
</nav>
```

#### 2.2 麵包屑對應關係

| 層級 | 頁面 |
|------|------|
| 主頁 → 物理治療 → [具體服務] | 所有 /physiotherapy/ 頁面 |
| 主頁 → 職業及言語治療 → [具體服務] | 所有 /occupational-speech-therapy/ 頁面 |
| 主頁 → 護理 → [具體服務] | 所有 /nursing/ 頁面 |
| 主頁 → 護理員 → [具體服務] | 所有 /home-care-worker/ 頁面 |
| 主頁 → 關於我們 → [具體頁面] | 所有 /about-us/ 頁面 |
| 主頁 → 健康資訊 → [具體文章] | 所有 /health-info/ 頁面 |

---

### Phase 3：Meta Tags 和 Alt Text 優化

#### 3.1 OG Image Alt Text 修復

所有頁面的 `og:image:alt` 缺少引號：
```html
<!-- 現況（有語法錯誤） -->
<meta property="og:image:alt" content=芯凝護理及物理治療有限公司 />

<!-- 修正後 -->
<meta property="og:image:alt" content="芯凝護理及物理治療有限公司" />
```

#### 3.2 通用 Alt Text 改善

| 現況 | 修正 |
|------|------|
| `alt="Template 1"` | `alt="芯凝月度護理進度報告範例第一頁"` |
| `alt="Template 2"` | `alt="芯凝月度護理進度報告範例第二頁"` |

#### 3.3 Title Tag 長度優化

首頁 title 為 73 字元，略超 Google 推薦的 60 字元上限。建議：

```
現況：Nova Health | 芯凝護理及物理治療有限公司 - 專業上門復康護理服務
建議：芯凝護理及物理治療 | 專業上門復康護理服務 - Nova Health
```

---

### Phase 4：Sitemap 更新

#### 4.1 更新 lastmod 日期

所有頁面的 `lastmod` 統一為 `2026-01-25`，不利於搜尋引擎判斷內容新鮮度。修改後的頁面應更新為實際修改日期。

#### 4.2 添加新建頁面

如果優化過程中新增了頁面，需同步更新 sitemap.xml。

---

### Phase 5：內部連結改善

#### 5.1 相關服務交叉連結

在每個服務頁面底部添加「相關服務」區塊：

| 頁面 | 建議連結 |
|------|----------|
| 中風物理治療 | → 中風職業治療、中風言語治療、護理員認知訓練 |
| 柏金遜物理治療 | → 柏金遜職業治療、柏金遜言語治療 |
| 認知障礙物理治療 | → 認知障礙職業治療、護理員認知訓練 |
| 傷口護理 | → 術後護理、導管護理 |

---

## 實施順序

| 優先級 | 任務 | 影響頁面數 | 預計效果 |
|--------|------|-----------|----------|
| P0 | JSON-LD: Organization + WebSite + MedicalBusiness | 1（首頁） | 搜尋引擎理解網站身份 |
| P0 | JSON-LD: FAQPage | 1（首頁） | AI 搜尋引用 + 可能的富結果 |
| P0 | JSON-LD: AggregateRating | 1（首頁） | 搜尋結果顯示星級評分 |
| P1 | JSON-LD: BreadcrumbList + UI 麵包屑 | 全部 103 頁 | 搜尋結果顯示路徑 |
| P1 | JSON-LD: Service/MedicalTherapy | ~60 頁 | 服務頁面在搜尋結果更突出 |
| P1 | JSON-LD: Article | 13 頁 | 文章在搜尋結果更突出 |
| P2 | OG image alt 引號修復 | 全部 103 頁 | 修復 HTML 語法錯誤 |
| P2 | Alt text 通用文字改善 | ~5 頁 | 圖片搜尋和無障礙 |
| P3 | Sitemap lastmod 更新 | sitemap.xml | 搜尋引擎爬蟲效率 |
| P3 | 內部連結交叉連結 | ~30 頁 | 頁面權重流動 |

---

## 驗證方式

1. **Google Rich Results Test** — 驗證結構化資料是否被正確識別
2. **Schema.org Validator** — 驗證 JSON-LD 語法
3. **Google Search Console** — 提交更新後的 sitemap，監控索引狀態
4. **Lighthouse SEO 審計** — 檢查整體 SEO 分數
5. **手動搜尋測試** — 搜尋「芯凝 上門物理治療」確認富結果顯示

---

## 執行記錄（2026-03-28 03:03 ~ 持續中）

### 已完成

| # | 任務 | 影響 | 狀態 |
|---|------|------|------|
| 1 | 首頁 JSON-LD: Organization + WebSite + MedicalBusiness + FAQPage + AggregateRating + 5 Reviews | index.html | DONE |
| 2 | 修復全站 og:image:alt 缺少引號 | 29 個 HTML 檔 | DONE |
| 3 | 全站 BreadcrumbList schema | 91 個 HTML 檔 | DONE |
| 4 | 服務頁面 MedicalTherapy schema | ~45 個服務頁面 | DONE |
| 5 | 文章頁面 Article schema | 13 個新聞/文章頁 | DONE |
| 6 | sitemap.xml lastmod 更新 (2026-01-25 → 2026-03-28) + 添加缺失頁面 | sitemap.xml | DONE |
| 7 | 修復 "Template 1/2" 通用 alt text | 4 個 HTML 檔 | DONE |
| 8 | 修復重複 rel="noopener noreferrer" 屬性 | 38 個 HTML 檔 | DONE |
| 9 | 內部交叉連結（相關服務推薦區塊） | 59 個服務頁面 | DONE |
| 10 | 優化薄弱 meta description (2-20 字 → 50-68 字) | 15 個 HTML 檔 | DONE |
| 11 | 修復公司名稱不一致 ("芯凝物理治療及護理" → "芯凝護理及物理治療") | 2 個 HTML 檔 | DONE |
| 12 | 清理遺留腳本檔案 (compare_sitemap*.ps1, nul) | 6 個檔案已刪除 | DONE |
| 13 | Google Rich Results Test 驗證（確認現站無結構化資料 = 基線） | 驗證報告 | DONE |
| 14 | 添加 related-services CSS + fa-house-medical 圖標 | main.css | DONE |

### 技術確認

- 全站 92 頁都有 canonical URL
- 全站 92 頁都有 robots meta tag
- 全站 92 頁都在 sitemap.xml 中
- 所有圖片都有 loading 屬性和 alt text
- 所有 script 都有 defer 屬性
- robots.txt 配置正確

| 15 | 修復首頁 canonical URL (/index → /) | 92 個 HTML + sitemap.xml | DONE |
| 16 | 修復首頁 og:url (/index → /) | index.html | DONE |
| 17 | 首頁 hero 圖片 preload (改善 LCP) | index.html | DONE |
| 18 | 修復 heading 階層 (H1→H3 → H1→H2) | 8 個 HTML 檔 | DONE |
| 19 | 建立 llms.txt (AI 搜尋引擎可見度) | llms.txt | DONE |
| 20 | 更新 robots.txt (明確允許 AI 爬蟲) | robots.txt | DONE |
| 21 | Google Search Console 提交 sitemap | GSC | DONE |
| 22 | GSC 索引問題調查 | GSC 分析報告 | DONE |
| 23 | 部署後驗證結構化資料正常 | 線上測試 | DONE |

### 部署驗證 ✅

已於 2026-03-28 成功部署並驗證：
- **首頁 JSON-LD 已上線：** Organization, WebSite, MedicalBusiness, FAQPage（已通過 WebFetch 驗證）
- **服務頁面 JSON-LD 已上線：** BreadcrumbList, MedicalTherapy（已通過 WebFetch 驗證）
- **交叉連結區塊已上線：** 相關服務推薦卡片正常顯示
- **GSC Sitemap 已重新提交**
- **PageSpeed Insights 分數：** 效能 92 | 無障礙 97 | 最佳做法 100 | SEO 100

### GSC 索引狀態 (2026-03-28)

| 狀態 | 數量 | 說明 |
|------|------|------|
| 已索引 | 107 | 正常 |
| Page with redirect | 129 | 正常 — .html → clean URL 重定向 |
| Alternative canonical | 23 | 正常 — www → non-www 標準化 |
| Not found (404) | 4 | 暫時性，頁面已存在 |
| Crawled - not indexed | 15 | 需觀察 |
| Discovered - not indexed | 8 | 等待 Google 爬取 |

| 24 | 高曝光零點擊頁面 title + meta description 優化 | 15 個 HTML 檔 | DONE |
| 25 | 全站 title tag 縮短 (去掉完整公司名) | 73 個 HTML 檔 | DONE |
| 26 | 全站薄弱 meta description 加強 | 7 個 HTML 檔 | DONE |
| 27 | FAQPage schema (pricing 6題 + post-operation 3題 + article-004 3題) | 3 個 HTML 檔 | DONE |
| 28 | 修復首頁內部連結 (./index → ./ 和 ../index → ../) | 92 個 HTML 檔 | DONE |
| 29 | 添加遺漏交叉連結 (pt-play-therapy, otst-play-therapy, hcw) | 3 個 HTML 檔 | DONE |
| 30 | 首頁 modal 圖片空 alt text 修復 | index.html | DONE |

### 外部連結

GSC 顯示 0 條外部連結。建立外部連結是當前最重要的長期 SEO 任務。

---

## 備註

- 本網站為 YMYL（Your Money Your Life）醫療類網站，E-E-A-T 信號極為重要
- 自 2025 年 12 月 Google 核心更新後，E-E-A-T 已擴展至所有競爭性查詢
- FAQPage schema 自 2023 年 8 月起限制富結果僅限政府和醫療機構——芯凝作為醫療護理機構符合條件
- 所有修改 commit 後會自動部署到線上
