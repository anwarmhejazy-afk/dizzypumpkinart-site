import { client } from "./sanity.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const container = document.getElementById("artworkDetail");

if (!slug) {
  container.innerHTML = `<p>Artwork not found.</p>`;
} else {

  const query = `
    *[_type == "artwork" && slug.current == $slug][0]{
      title,
      description,
      year,
      category,
      "mainImage": image.asset->url,
      galleryImages[]{
        caption,
        "url": asset->url
      }
    }
  `;

  async function loadArtwork() {
    try {

      const artwork = await client.fetch(query, { slug });

      if (!artwork) {
        container.innerHTML = `<p>Artwork not found.</p>`;
        return;
      }

      const gallery =
        artwork.galleryImages?.map(
          (img) => `
            <div class="artwork-gallery-item">
              <img src="${img.url}" alt="${img.caption || artwork.title}" />

              ${
                img.caption
                  ? `<p class="gallery-caption">${img.caption}</p>`
                  : ""
              }
            </div>
          `
        ).join("") || "";

      container.innerHTML = `
        <div class="artwork-detail-layout">

          <div class="artwork-main-image">
            <img src="${artwork.mainImage}" alt="${artwork.title}" />
          </div>

          <div class="artwork-info">
            <p class="eyebrow">${artwork.category || "Artwork"}</p>

            <h1>${artwork.title}</h1>

            ${
              artwork.year
                ? `<p class="artwork-year">${artwork.year}</p>`
                : ""
            }

            ${
              artwork.description
                ? `<p class="artwork-description">${artwork.description}</p>`
                : ""
            }
          </div>

        </div>

        ${
          gallery
            ? `
            <div class="artwork-gallery-grid">
              ${gallery}
            </div>
          `
            : ""
        }
      `;

    } catch (error) {
      console.error("Artwork Detail Error:", error);

      container.innerHTML = `
        <p>Failed to load artwork.</p>
      `;
    }
  }

  loadArtwork();
}