import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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

async function getGalleryData(slug: string): Promise<GalleryData | null> {
  try {
    const filePath = path.join(GALLERIES_PATH, `${slug}.json`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(GALLERIES_PATH);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({
        slug: file.replace(".json", ""),
      }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getGalleryData(slug);

  if (!gallery) {
    return {
      title: "Gallery Not Found",
    };
  }

  return {
    title: gallery.title,
    description: gallery.description,
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = await getGalleryData(slug);

  if (!gallery) {
    notFound();
  }

  // Limit to max 12 images
  const imagesToShow = gallery.images.slice(0, 12);

  return (
    <main>
      <h1>{gallery.title}</h1>
      <p>{gallery.description}</p>
      <div className="gallery-grid">
        {imagesToShow.map((image) => (
          <div key={image.filename} className="gallery-item">
            <Image
              src={`/images/galleries/${slug}/${image.filename}`}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
