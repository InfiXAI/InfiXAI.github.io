// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navMenu = document.getElementById("navMenu")
  const navLinks = navMenu.querySelector(".nav-links")
  const header = document.querySelector(".site-header")
  const navbar = document.querySelector(".navbar")

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    const navLinkElements = navLinks.querySelectorAll(".nav-link")
    navLinkElements.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target)) {
        mobileMenuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  }

  // Header scroll effect
  let lastScrollTop = 0
  const scrollThreshold = 100
  
  // 检查是否为首页 - 可以通过多种方式判断
  const isHomePage = document.body.classList.contains("home-page") || 
                     window.location.pathname === "/" || 
                     window.location.pathname === "/index.html"

  // 如果不是首页，默认添加 scrolled 类
  if (!isHomePage && navbar) {
    navbar.classList.add("scrolled")
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // 只在首页应用滚动效果
    if (isHomePage && navbar) {
      // Add/remove scrolled class based on scroll position
      if (scrollTop > scrollThreshold) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
    // 非首页保持 scrolled 状态，不做任何改变

    lastScrollTop = scrollTop
  })

  // Smooth scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerHeight = (header || navbar).offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Research Items 点击跳转功能
  const researchItems = document.querySelectorAll('.research-item')
  
  researchItems.forEach(item => {
    // 为每个 research-item 添加点击事件
    item.addEventListener('click', function(e) {
      // 如果点击的是链接，让链接正常工作
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      // 查找 item 内的第一个链接
      const link = this.querySelector('.item-title a');
      if (link) {
        // 如果是外部链接（arxiv），在新窗口打开
        if (link.hasAttribute('target')) {
          window.open(link.href, '_blank');
        } else {
          // 内部链接直接跳转
          window.location.href = link.href;
        }
      }
    });
    
    // 添加鼠标悬停样式提示
    item.style.cursor = 'pointer';
  });

  // 过滤标签功能
  const filterTabs = document.querySelectorAll('.filter-tab');
  const allResearchItems = document.querySelectorAll('.research-item');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // 移除所有活动状态
      filterTabs.forEach(t => t.classList.remove('active'));
      // 添加当前活动状态
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // 显示/隐藏研究项目
      allResearchItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})