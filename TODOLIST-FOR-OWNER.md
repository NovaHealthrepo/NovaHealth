# 需要人手處理的 SEO 任務

> 這些是 Claude 無法自動完成的任務，需要你醒來後處理。

---

## URL 標準（所有頁面必須遵守）

| 項目 | 標準格式 | 錯誤格式 |
|------|----------|----------|
| **域名** | `novahealth.com.hk` (non-www) | ~~www.novahealth.com.hk~~ |
| **協議** | `https://` | ~~http://~~ |
| **副檔名** | 無 `.html` | ~~pricing.html~~ |
| **結尾斜線** | 無（除首頁 `/`） | ~~/pricing/~~ |

**標準 URL 範例：**
```
https://novahealth.com.hk/                          ← 首頁
https://novahealth.com.hk/pricing                   ← 收費
https://novahealth.com.hk/physiotherapy/physiotherapy-stroke  ← 中風物理治療
```

**所有 canonical URL、sitemap URL、og:url、內部連結均已統一遵循此標準。**

---

## 緊急

### 0. Cloudflare 設定問題 (需盡快處理)

#### www 重定向 ✅ 已修復 (2026-03-28)
- [x] **已在 Cloudflare Redirect Rules 設定 www → non-www 301 重定向**
  - 規則名稱：Redirect from WWW to root [Template]
  - 匹配：`https://www.*` → `https://${1}` (301, preserve query string)
  - `www.novahealth.com.hk` 現在正確 301 重定向到 `novahealth.com.hk`
- [x] **已在 GSC 啟動驗證修復** (2026-03-28):
  - "Not found (404)" — 4 頁，驗證已啟動
  - "Page with redirect" — 129 頁，驗證已啟動（新驗證取代之前失敗的）
  - "Alternative page with proper canonical tag" — 23 頁，驗證已啟動
- [ ] 等 2-3 週後到 GSC 驗證以上三項數字改善

#### 安全標頭 (Security Headers)
- [ ] 在 Cloudflare → Rules → Transform Rules 添加以下 response headers:
  - `X-Frame-Options: SAMEORIGIN`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- 注意：`X-Content-Type-Options` 和 `Referrer-Policy` 已正確設定

#### IndexNow 驗證
- [ ] 已建立 IndexNow key 檔案（9adbc1a999994651978be94e0bf5da1e.txt）
- [ ] 部署後到 https://www.bing.com/indexnow 提交首頁 URL 驗證
- IndexNow 用途：通知 Bing、Yandex 即時更新索引

## 高優先級

### 1. Google Search Console 驗證 ✅ 已完成
- [x] 登入 Google Search Console — 已登入 (info@novahealth.com.hk)
- [x] 網站已通過 DNS 驗證 (sc-domain:novahealth.com.hk)
- [x] 已提交 sitemap：`https://novahealth.com.hk/sitemap.xml`

#### GSC 索引狀態 (2026-03-28 檢查):
- **107 頁已索引** / **179 頁未索引**（實際只有 92 個頁面）
- 179 個「未索引」並非真正問題 — 大部分是重複 URL 的正常行為：

| 原因 | 數量 | 說明 | 需要處理？ |
|------|------|------|-----------|
| Page with redirect | 129 | `.html` 結尾的 URL 被 redirect 到乾淨 URL；部分 `www` URL | 修復 www 後會減少 |
| Alternative page with canonical | 23 | Google 發現了 www 版本，canonical 正確指向 non-www | 修復 www 後自動解決 |
| Not found (404) | 4 | 全部是 `www.novahealth.com.hk` 的 URL（522 錯誤） | 修復 www 後解決 |
| Crawled - not indexed | 15 | Google 已爬取但選擇不索引（可能是內容薄的頁面） | 觀察，考慮擴充內容 |
| Discovered - not indexed | 8 | Google 已發現但尚未爬取 | 等待，無需操作 |

- **www 問題已修復** — Cloudflare redirect rule 已設定 (2026-03-28)
- **相對 URL 問題已修復** — 4,428 個相對連結（`./`、`../`、裸相對路徑）已轉換為根相對路徑（`/`），防止 Google 在錯誤目錄深度爬取時產生巢狀 URL
- `.html` redirect 是 GitHub Pages 正常行為，無法避免，不影響 SEO
- **建議：** 等 2-3 週後到 GSC 驗證改善

#### PageSpeed Insights (2026-03-28):
- 效能: **92/100** | 無障礙: **97/100** | 最佳做法: **100/100** | SEO: **100/100**
- LCP: 3.0s（可改善）| CLS: 0（完美）| TBT: 0ms（完美）

#### 外部連結:
- **GSC 顯示 0 條外部連結** — 建立外部連結是當前最重要的 SEO 優化方向（見任務 3）

### 2. Google Business Profile (GBP)
- [ ] 如果還沒有，到 https://business.google.com 建立商家檔案
- [ ] 填寫完整公司資料（名稱、地址、電話、營業時間）
- [ ] 上傳公司照片和服務環境照片
- [ ] 請客戶撰寫 Google 評價（目標：至少 10 條五星評價）
- [ ] 設定服務範圍（港島、九龍、新界）

### 3. Backlinks 外部連結建設
- [ ] 在香港醫療相關目錄網站註冊（如 OpenRice 醫療版、HK01 健康版）
- [ ] 在 Facebook 和 Instagram 頁面添加網站連結
- [ ] 考慮在本地社區論壇（如 Baby Kingdom、親子王國）分享健康資訊
- [ ] 向合作醫院/診所請求互相連結
- [ ] 在 LinkedIn 建立公司頁面

### 4. 圖片資源
- [ ] 為 OG 分享圖片考慮製作更多專業變體（不同服務的 OG 圖）
- [ ] 考慮為每個服務類別製作專屬 hero 圖片
- [ ] 確保所有圖片已壓縮至最佳大小（WebP 格式）

## 中優先級

### 5. 內容更新 (對排名影響最大)
- [ ] **服務導航頁內容擴充** — 以下頁面只有導航鏈接，缺乏實質內容（建議各加 500+ 字介紹）：
  - `physiotherapy-stroke.html` (目前 ~850 字，大部分是導航)
  - `occupational-therapy.html` (目前 ~650 字)
  - `hcw.html` (目前 ~580 字)
  - 參考 `catheter-care.html` (~3,200 字) 的結構作為範本
- [ ] **添加治療師個人檔案** — 顯示註冊號碼、資歷、專長（AI 搜尋引擎重視 E-E-A-T）
- [ ] **文章添加研究數據** — 引用醫學期刊/臨床指南數據（提高 AI 引用可能性）
- [ ] 定期更新健康資訊文章（建議每月至少 1-2 篇）
- [ ] 添加更多客戶案例分享（Case Studies）
- [ ] **建立 YouTube 頻道** — 製作物理治療示範影片（YouTube 品牌信號對 AI 搜尋影響最大，相關性 0.737）
- [ ] 為創辦人頁面添加更多專業資歷和證書資訊

### 6. 社交媒體一致性
- [ ] 確保 Facebook、Instagram 的公司名稱、描述與網站一致
- [ ] 定期在社交媒體分享網站內容

### 7. 監控與維護
- [ ] 每月檢查 Google Search Console 數據
- [ ] 追蹤關鍵搜尋詞排名（如「上門物理治療」、「到戶護理 香港」）
- [ ] 檢查是否有爬蟲錯誤或索引問題

### 8. CSS 性能優化（技術任務）
- [ ] **CSS 壓縮（minify）**— 目前所有 CSS 未壓縮，共 506KB。壓縮後可節省 ~40%。建議使用 cssnano 或線上工具。
- [ ] **考慮建立 build process** — 用 Gulp/Vite 自動壓縮 CSS 和 JS
- [ ] **Critical CSS 內嵌** — 將首屏 CSS 內嵌到 `<style>` 中，延遲載入其餘 CSS
- 目前 PageSpeed 效能分數 92，這些優化可提升至 95+

## 低優先級

### 9. 進階 SEO
- [ ] 考慮建立 Google Ads 廣告（搜尋廣告）
- [ ] 考慮在 Google Maps 上投放本地廣告
- [ ] 長期考慮建立英文版本（hreflang 國際化 SEO）

### 10. GSC 高曝光搜尋詞追蹤
以下搜尋詞已有曝光但點擊率偏低，已優化 title 和 meta description，請持續監控：

| 搜尋詞 | 曝光 | 點擊 | 目標頁面 | 優化後 title |
|--------|------|------|----------|-------------|
| dti 壓瘡 醫學 | 109 | 1 | article-003 | 壓瘡與深部組織損傷(DTI)：醫學解析及預防方法 |
| 認知訓練 | 99 | 0 | ot-cognitive | 上門認知訓練 &#124; 認知訓練方法及工具 |
| 上門職業治療 | 75 | 0 | occupational-therapy | 上門職業治療服務 &#124; 香港註冊職業治療師 |
| 語言障礙治療 | 55 | 0 | speech-therapy-language | 語言障礙治療 &#124; 上門言語治療服務 |
| 中風康復治療 | 22 | 0 | physiotherapy-stroke | 中風康復物理治療 &#124; 上門復康訓練 |
