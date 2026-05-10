import { client } from "./sanity.js";

async function loadSketchbookArtwork() {
  try {
    const artworks = await client.fetch(`
      *[_type == "artwork" && category == "sketchbook"] | order(displayOrder asc){
        title,
        category,
        year,
        "imageUrl": image.asset->url
      }
    `);

    console.log("Sketchbook Loaded:", artworks);

    const sketchbookGrid = document.getElementById("sketchbookGrid");

    if (!sketchbookGrid) return;

    if (!artworks || artworks.length === 0) return;

    const sanityCards = artworks.map((art) => `
      <div class="sketch-card reveal">
        <img src="${art.imageUrl}" alt="${art.title}" />
      </div>
    `).join("");

    sketchbookGrid.insertAdjacentHTML("beforeend", sanityCards);

  } catch (error) {
    console.error("Sketchbook Sanity Error:", error);
  }
}

loadSketchbookArtwork();