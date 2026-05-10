import { client } from "./sanity.js";

async function loadCommissionArtwork() {
  try {
    const artworks = await client.fetch(`
      *[_type == "artwork" && category == "Commission"] | order(displayOrder asc){
        title,
        category,
        year,
        "imageUrl": image.asset->url
      }
    `);

    console.log("Commission Loaded:", artworks);

    const commissionsGrid = document.getElementById("commissionsGrid");

    if (!commissionsGrid) return;

    if (!artworks || artworks.length === 0) return;

    const sanityCards = artworks.map((art) => `
      <div class="art-card show sanity-card">
        <img src="${art.imageUrl}" alt="${art.title}" />
      </div>
    `).join("");

    commissionsGrid.insertAdjacentHTML("beforeend", sanityCards);
    commissionsGrid.classList.add("show");

  } catch (error) {
    console.error("Commission Sanity Error:", error);
  }
}

loadCommissionArtwork();