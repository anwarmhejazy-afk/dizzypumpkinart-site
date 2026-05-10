import { client } from "./sanity.js";

const query = `*[_type == "artwork" && featured == true] | order(displayOrder asc){
  title,
  category,
  year,
  "imageUrl": image.asset->url
}`;

async function loadHomepageArtwork() {
  try {
    const artworks = await client.fetch(query);

    console.log("SANITY DATA:", artworks);

    const portfolioGrid = document.getElementById("portfolioGrid");
    if (!portfolioGrid) return;

    if (!artworks || artworks.length === 0) {
      console.warn("No featured Sanity artworks found. Keeping static images.");
      portfolioGrid.classList.add("show");
      return;
    }

    const sanityCards = artworks
      .map(
        (art) => `
          <a href="work.html" class="art-card show">
            <img src="${art.imageUrl}" alt="${art.title}" />
          </a>
        `
      )
      .join("");

    portfolioGrid.insertAdjacentHTML("beforeend", sanityCards);
    portfolioGrid.classList.add("show");

  } catch (error) {
    console.error("Sanity Portfolio Error:", error);
  }
}

loadHomepageArtwork();