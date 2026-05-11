import { client } from "./sanity.js";

async function loadPortfolioFromSanity() {
  try {
    const artworks = await client.fetch(`
      *[_type == "artwork" && featured == true] | order(displayOrder asc){
        title,
        category,
        year,
        "imageUrl": image.asset->url
      }
    `);

    console.log("Portfolio Loaded:", artworks);

    const portfolioGrid =
      document.getElementById("portfolioGrid") ||
      document.querySelector(".art-grid");

if (!portfolioGrid || !artworks || artworks.length === 0) return;

    const sanityCards = artworks.map((art) => `
      <a href="work.html" class="art-card show sanity-card">
        <img src="${art.imageUrl}" alt="${art.title}" />
      </a>
    `).join("");

    portfolioGrid.insertAdjacentHTML("beforeend", sanityCards);
    portfolioGrid.classList.add("show");

  } catch (error) {
    console.error("Sanity Portfolio Error:", error);
  }
}

loadPortfolioFromSanity();