import { client } from "./sanity.js";

const query = `*[_type == "artwork" && featured == true && hidden != true] | order(displayOrder asc){
  title,
  category,
  year,
  "imageUrl": image.asset->url
}`;

async function loadWorkArtwork() {
  try {
    const artworks = await client.fetch(query);

    console.log("WORK SANITY DATA:", artworks);

    const workGrid = document.getElementById("workGrid");
    if (!workGrid) return;

    if (!artworks || artworks.length === 0) {
      console.warn("No Sanity artworks found. Keeping static work images.");
      workGrid.classList.add("show");
      return;
    }

    const sanityCards = artworks
      .map(
        (art) => `
          <a href="${art.imageUrl}" class="gallery-card show" target="_blank" rel="noopener">
            <img src="${art.imageUrl}" alt="${art.title}" />
          </a>
        `
      )
      .join("");

    workGrid.insertAdjacentHTML("beforeend", sanityCards);
    workGrid.classList.add("show");

  } catch (error) {
    console.error("Sanity Work Gallery Error:", error);
  }
}

loadWorkArtwork();