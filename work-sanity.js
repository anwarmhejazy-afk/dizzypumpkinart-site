import { client } from "./sanity.js";

const query = `*[
  _type == "artwork" &&
  hidden != true &&
  (category == "Illustration" || category == "illustration")
] | order(displayOrder asc){
  title,
  category,
  year,
  "slug": slug.current,
  "imageUrl": image.asset->url
}`;

async function loadWorkArtwork() {
  try {
    const artworks = await client.fetch(query);

    console.log("WORK SANITY DATA:", artworks);

    const workGrid = document.getElementById("workGrid");
    if (!workGrid) return;

    if (!artworks || artworks.length === 0) {
      console.warn("No Sanity illustration artworks found. Keeping static work images.");
      workGrid.classList.add("show");
      return;
    }

    const sanityCards = artworks
      .filter((art) => art.imageUrl)
      .map(
        (art) => `
          <a href="artwork.html?slug=${art.slug}" class="art-card sanity-card">
            <img src="${art.imageUrl}" alt="${art.title || "Artwork"}" />
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