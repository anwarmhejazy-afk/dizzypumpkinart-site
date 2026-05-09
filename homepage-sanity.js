import { client } from './sanity.js'

async function loadPortfolioFromSanity() {
  try {
    const artworks = await client.fetch(`
      *[_type == "artwork"] | order(displayOrder asc){
        title,
        category,
        year,
        "imageUrl": image.asset->url
      }
    `)

    console.log("Portfolio Loaded:", artworks)

    const portfolioGrid = document.getElementById("portfolioGrid")

    if (!portfolioGrid) return

    portfolioGrid.innerHTML = artworks.map((art) => `
      <a href="work.html" class="art-card reveal">
        <img src="${art.imageUrl}" alt="${art.title}" />
      </a>
    `).join("")

  } catch (error) {
    console.error("Sanity Portfolio Error:", error)
  }
}

loadPortfolioFromSanity()