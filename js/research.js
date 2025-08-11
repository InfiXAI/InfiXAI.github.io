// Research page JavaScript - Scoped to avoid Header conflicts
document.addEventListener("DOMContentLoaded", () => {
  // Only run if we're on the research page
  const researchContainer = document.querySelector(".research-container")
  if (!researchContainer) {
    console.log("No research container found, exiting...")
    return
  }

  console.log("Research container found:", researchContainer)

  // Get elements
  const filterTabs = researchContainer.querySelectorAll(".filter-tab")
  const researchItems = researchContainer.querySelectorAll(".research-item")
  const researchItemsContainer = researchContainer.querySelector(".research-items")
  const tabContents = researchContainer.querySelectorAll(".tab-content")

  console.log("Research elements found:", {
    filterTabs: filterTabs.length,
    researchItems: researchItems.length,
    researchItemsContainer: !!researchItemsContainer,
    tabContents: tabContents.length
  })

  // Filter tabs functionality
  if (filterTabs.length > 0) {
    console.log("Filter tabs found, initializing...")
    filterTabs.forEach((tab, index) => {
      const filter = tab.getAttribute("data-filter")
      console.log(`Tab ${index}:`, filter)
      
      tab.addEventListener("click", () => {
        // Update active tab
        filterTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
        console.log(`Filter set to: ${filter}`)
        
        // Hide all tab contents first
        tabContents.forEach((content) => {
          content.classList.remove("active")
          content.style.display = "none"
        })
        
        // Show/hide content based on filter
        if (filter === "models" || filter === "datasets") {
          console.log(`Showing ${filter} content...`)
          // Hide research items
          if (researchItemsContainer) {
            researchItemsContainer.style.display = "none"
            console.log("Hidden research items")
          }
          
          // Show specific tab content
          const targetContent = researchContainer.querySelector(`#${filter}`)
          if (targetContent) {
            targetContent.classList.add("active")
            targetContent.style.display = "block"
            console.log(`Shown ${filter} content`)
          } else {
            console.error(`${filter} content not found!`)
          }
        } else {
          console.log("Showing research items...")
          // Show research items and filter them
          if (researchItemsContainer) {
            researchItemsContainer.style.display = "flex"
            console.log("Shown research items")
          }

          // Filter research items
          researchItems.forEach((item) => {
            const category = item.getAttribute("data-category")

            if (filter === "all" || category === filter) {
              item.style.display = "grid"
              // Add fade-in animation
              item.style.opacity = "0"
              item.style.transform = "translateY(20px)"

              setTimeout(() => {
                item.style.transition = "all 0.3s ease"
                item.style.opacity = "1"
                item.style.transform = "translateY(0)"
              }, 50)
            } else {
              item.style.display = "none"
            }
          })
        }
      })
    })
  } else {
    console.log("No filter tabs found")
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe research items for animation
  researchItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "all 0.6s ease"
    observer.observe(item)
  })

  // Wait for DOM to be fully loaded before observing cards
  setTimeout(() => {
    const cards = document.querySelectorAll(".card")
    console.log("Cards found:", cards.length)
    cards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      card.style.transition = "all 0.6s ease"
      observer.observe(card)
    })
  }, 100)

  // Keyboard navigation for filter tabs
  filterTabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && index > 0) {
        filterTabs[index - 1].focus()
      } else if (e.key === "ArrowRight" && index < filterTabs.length - 1) {
        filterTabs[index + 1].focus()
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        tab.click()
      }
    })
  })
})