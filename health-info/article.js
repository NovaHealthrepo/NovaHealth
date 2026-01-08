/**
 * Health Article Page JavaScript
 * Handles article filtering, loading, and interactions
 */

// Article data - hardcoded as requested
const ARTICLES_DATA = [
  {
    id: 1,
    title: "中風後復康的重要性與物理治療的角色",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    category: "physiotherapy",
    author: "陳醫生",
    date: "2026-01-05",
    readTime: "5 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 2,
    title: "家居護理中的傷口管理技巧",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes.",
    category: "nursing",
    author: "護士長李",
    date: "2026-01-03",
    readTime: "4 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 3,
    title: "長者日常運動與預防跌倒",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum.",
    category: "health-tips",
    author: "物理治療師王",
    date: "2026-01-01",
    readTime: "6 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 4,
    title: "認知障礙症患者的復康訓練",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare.",
    category: "rehabilitation",
    author: "職業治療師張",
    date: "2025-12-28",
    readTime: "7 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 5,
    title: "慢性疾病管理的居家護理要點",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.",
    category: "nursing",
    author: "護士長黃",
    date: "2025-12-25",
    readTime: "5 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 6,
    title: "術後康復期的物理治療計劃",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.",
    category: "physiotherapy",
    author: "物理治療師林",
    date: "2025-12-22",
    readTime: "8 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 7,
    title: "營養護理對康復的影響",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.",
    category: "health-tips",
    author: "營養師劉",
    date: "2025-12-20",
    readTime: "4 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 8,
    title: "柏金遜症患者的運動治療",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Donec sed odio dui. Cras justo odio, dapibus ac facilisis.",
    category: "rehabilitation",
    author: "物理治療師吳",
    date: "2025-12-18",
    readTime: "6 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 9,
    title: "導管護理的安全守則",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
    category: "nursing",
    author: "護士長趙",
    date: "2025-12-15",
    readTime: "5 分鐘",
    image: "../images/article-placeholder.jpg"
  },
  {
    id: 10,
    title: "居家環境改善與安全評估",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes.",
    category: "health-tips",
    author: "職業治療師馬",
    date: "2025-12-12",
    readTime: "7 分鐘",
    image: "../images/article-placeholder.jpg"
  }
];

// Category mapping for Chinese display
const CATEGORY_NAMES = {
  all: "全部文章",
  physiotherapy: "物理治療",
  nursing: "護理",
  "health-tips": "健康貼士",
  rehabilitation: "復康資訊"
};

class ArticleManager {
  constructor() {
    this.articles = [...ARTICLES_DATA];
    this.filteredArticles = [...ARTICLES_DATA];
    this.currentCategory = 'all';
    this.articlesPerPage = 6;
    this.currentPage = 1;
    this.isLoading = false;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderArticles();
    this.updateLoadMoreButton();
  }

  bindEvents() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.article-filter__btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterArticles(category);
      });
    });

    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreArticles();
      });
    }
  }

  filterArticles(category) {
    if (this.isLoading) return;

    // Update active filter button
    const filterButtons = document.querySelectorAll('.article-filter__btn');
    filterButtons.forEach(btn => btn.classList.remove('article-filter__btn--active'));
    
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
      activeBtn.classList.add('article-filter__btn--active');
    }

    this.currentCategory = category;
    this.currentPage = 1;

    // Filter articles
    if (category === 'all') {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter(article => article.category === category);
    }

    // Animate out current articles
    this.animateArticlesOut(() => {
      this.renderArticles();
      this.updateLoadMoreButton();
    });
  }

  loadMoreArticles() {
    if (this.isLoading) return;

    this.isLoading = true;
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
      loadMoreBtn.textContent = '載入中...';
      loadMoreBtn.disabled = true;
    }

    // Simulate loading delay
    setTimeout(() => {
      this.currentPage++;
      this.renderArticles(true);
      this.updateLoadMoreButton();
      this.isLoading = false;
      
      if (loadMoreBtn) {
        loadMoreBtn.textContent = '載入更多文章';
        loadMoreBtn.disabled = false;
      }
    }, 800);
  }

  animateArticlesOut(callback) {
    const articleCards = document.querySelectorAll('.article-card');
    const grid = document.getElementById('articles-grid');
    
    grid.classList.add('loading');
    
    articleCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-out');
      }, index * 50);
    });

    setTimeout(() => {
      callback();
      grid.classList.remove('loading');
    }, 500);
  }

  renderArticles(append = false) {
    const grid = document.getElementById('articles-grid');
    const startIndex = append ? (this.currentPage - 1) * this.articlesPerPage : 0;
    const endIndex = this.currentPage * this.articlesPerPage;
    const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);

    if (!append) {
      grid.innerHTML = '';
    }

    if (articlesToShow.length === 0 && !append) {
      this.renderEmptyState();
      return;
    }

    articlesToShow.forEach((article, index) => {
      const articleCard = this.createArticleCard(article);
      grid.appendChild(articleCard);
      
      // Animate in
      setTimeout(() => {
        articleCard.classList.add('fade-in');
      }, index * 100);
    });
  }

  createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.dataset.category = article.category;

    const formattedDate = this.formatDate(article.date);
    const categoryName = CATEGORY_NAMES[article.category] || article.category;

    card.innerHTML = `
      <div class="article-card__image">
        <img src="${article.image}" alt="${article.title}" loading="lazy" 
             onerror="this.style.display='none'">
        <div class="article-card__badge">${categoryName}</div>
      </div>
      <div class="article-card__content">
        <div class="article-card__meta">
          <div class="article-card__date">
            <i class="fas fa-calendar-alt"></i>
            <span>${formattedDate}</span>
          </div>
          <div class="article-card__author">
            <i class="fas fa-user-md"></i>
            <span>${article.author}</span>
          </div>
        </div>
        <h2 class="article-card__title">${article.title}</h2>
        <p class="article-card__excerpt">${article.excerpt}</p>
        <div class="article-card__footer">
          <a href="#" class="article-card__read-more" onclick="return false;">
            閱讀全文 <i class="fas fa-arrow-right"></i>
          </a>
          <div class="article-card__read-time">
            <i class="fas fa-clock"></i>
            <span>${article.readTime}</span>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  renderEmptyState() {
    const grid = document.getElementById('articles-grid');
    grid.innerHTML = `
      <div class="articles__empty">
        <div class="articles__empty-icon">
          <i class="fas fa-newspaper"></i>
        </div>
        <h3 class="articles__empty-title">沒有找到相關文章</h3>
        <p class="articles__empty-text">
          目前沒有符合篩選條件的文章。請嘗試選擇其他分類或稍後再回來查看。
        </p>
      </div>
    `;
  }

  updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const totalShown = this.currentPage * this.articlesPerPage;
    
    if (loadMoreBtn) {
      if (totalShown >= this.filteredArticles.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
      }
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }
}

// Initialize the article manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.articleManager = new ArticleManager();
});

// Smooth scrolling for article navigation
function scrollToArticles() {
  const articlesSection = document.querySelector('.articles');
  if (articlesSection) {
    articlesSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Performance optimization: Intersection Observer for lazy loading
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  // Observe images when they are added to the DOM
  const observeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
  };

  // Initial observation
  document.addEventListener('DOMContentLoaded', observeImages);
}