import { client } from "./sanity.js";

const query = `*[_type == "artwork" && featured == true] | order(displayOrder asc){
  title,
  category,
  year,
  "imageUrl": image.asset->url
}`;

async function loadHomepageArtwork() {
  const artworks = await client.fetch(query);

  console.log("SANITY DATA:", artworks);

  const portfolioGrid = document.getElementById("portfolioGrid");

  if (!portfolioGrid) return;

  portfolioGrid.innerHTML = artworks
    .map(
      (art) => `
        <a href="work.html" class="art-card reveal">
          <img src="${art.imageUrl}" alt="${art.title}" />
        </a>
      `
    )
    .join("");
}

loadHomepageArtwork();