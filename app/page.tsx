import Image from "next/image";
import Link from "next/link";
import fs from "node:fs/promises";
import path from "node:path";

interface GalleryImage {
  filename: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryData {
  title: string;
  description: string;
  slug: string;
  images: GalleryImage[];
}

const GALLERIES_PATH = path.join(process.cwd(), "src/content/galleries");

async function getAllGalleries(): Promise<GalleryData[]> {
  try {
    const files = await fs.readdir(GALLERIES_PATH);
    const galleries = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(GALLERIES_PATH, file), "utf-8");
          return JSON.parse(content);
        })
    );
    return galleries;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const galleries = await getAllGalleries();

  // Flatten all images and take the first 6 for the teaser
  const teaserImages = galleries
    .flatMap(g => g.images.map(img => ({ ...img, slug: g.slug })))
    .slice(0, 6);

  return (
    <main>
      <section className="hero">
        <h1>Private Art Institute</h1>
        <p>Preserving and celebrating artistic excellence through curated collections.</p>
      </section>

      <section className="teaser-section">
        <h2>Featured Collections</h2>
        <div className="teaser-grid">
          {teaserImages.map((image, index) => (
            <Link
              key={`${image.slug}-${index}`}
              href={`/galleries/${image.slug}`}
              className="teaser-item"
            >
              <Image
                src={`/images/galleries/${image.slug}/${image.filename}`}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority={index < 2} // Priority for top images
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </Link>
          ))}
        </div>
        <div className="gallery-links">
          {galleries.map(g => (
            <Link key={g.slug} href={`/galleries/${g.slug}`} className="text-link">
              View {g.title} →
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
