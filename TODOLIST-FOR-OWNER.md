# 需要人手處理的 SEO 任務

> 這些是 Claude 無法自動完成的任務，需要你醒來後處理。

## 緊急

### 0. Cloudflare 設定問題 (需盡快處理)

#### www 重定向故障
- [ ] **www.novahealth.com.hk 回傳 Error 522 (Connection timed out)**
- 原因：Cloudflare 的 www 子域未正確設定
- 修復方法：在 Cloudflare Dashboard → DNS 添加 CNAME record: `www` → `novahealth.com.hk`
- 或添加 Page Rule: `www.novahealth.com.hk/*` → 301 Redirect → `https://novahealth.com.hk/$1`

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

#### GSC 索引狀態 (2026-03-28):
- **107 頁已索引** / **179 頁未索引**
- 未索引原因：
  - 129 頁 redirect（正常 — .html → clean URL 的 Cloudflare 重定向）
  - 23 頁有 canonical tag（正常 — www → non-www 的標準化）
  - 4 頁 404（暫時性，頁面已存在）
  - 15 頁已爬取但未索引（需觀察）
  - 8 頁已發現但未爬取（需等待 Google 爬取）
- **建議動作：** 部署後 2-3 週觀察索引數據變化

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

### 5. 內容更新
- [ ] 定期更新健康資訊文章（建議每月至少 1-2 篇）
- [ ] 添加更多客戶案例分享（Case Studies）
- [ ] 考慮製作影片內容（YouTube 有助 SEO）
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
