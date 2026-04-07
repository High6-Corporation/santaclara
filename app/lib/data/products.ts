import { Product } from "@/types/index";

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "marine-plywood",
    title: "Santa Clara Marine Plywood",
    description:
      "Premium-grade marine plywood trusted by professionals for its strength, durability, and consistent quality. Manufactured using carefully selected wood veneers and a stringent quality control process, it is built to withstand demanding marine and structural applications.",
    image: "/images/marine-plywood-category.jpg",
    href: "/products/marine-plywood",
  },
  {
    id: "ordinary-plywood",
    title: "Santa Clara Ordinary Plywood",
    description:
      "Dependable, high-quality plywood designed for general construction and interior applications. Manufactured using carefully selected wood veneers and consistent production standards, it delivers strength, stability, and value for everyday projects.",
    image: "/images/ordinary-plywood-category.jpg",
    href: "/products/ordinary-plywood",
  },
  {
    id: "ordinary-plyboard",
    title: "Santa Clara Ordinary Plyboard",
    description:
      "Cost-effective, reliable panel designed for general construction, interior applications, and furniture components. Manufactured under SMWPI's established production standards, it offers consistent quality, stability, and ease of use for everyday projects.",
    image: "/images/ordinary-plyboard-category.jpg",
    href: "/products/ordinary-plyboard",
  },
  {
    id: "sm-ply",
    title: "SM Ply",
    description:
      "Dependable plywood solution designed for a wide range of construction and interior applications. Manufactured using SMWPI's established production process, it delivers consistent quality, strength, and workability for everyday building needs.",
    image: "/images/sm-ply-category.jpg",
    href: "/products/sm-ply",
  },
];

export const marineProducts: Product[] = [
  {
    id: "marine-5mm",
    name: "Santa Clara Marine Plywood – 5mm x 1220mm x 2440mm",
    description: "Lightweight yet durable, Santa Clara 5mm Marine Plywood is manufactured using a 3-ply veneer that ensures flexibility without compromising strength. Its smooth surface makes it ideal for lamination and finishing applications. Designed for light-duty use, this thickness is perfect for interior boat linings, furniture's, ceiling panels, and decorative wall cladding. It offers reliable moisture resistance, making it suitable for areas exposed to humidity.",
    image: "/images/marine-5mm-main.png",
    category: "Marine",
    thickness: "5mm",
    dimensions: "1220mm x 2440mm",
    plyCount: "3-ply veneer",
    weight: "6.7 kgs more or less (per piece)",
    boilTested: "Boil-tested for 72 hours",
    applications: ["Furnitures", "Ceiling", "Wall Paneling"],
    gallery: [
      "/images/marine-5mm-1.png",
      "/images/marine-5mm-2.png",
      "/images/marine-5mm-3.png",
      "/images/marine-5mm-4.png"
    ]
  },
  {
    id: "marine-9mm",
    name: "Santa Clara Marine Plywood – 9mm x 1220mm x 2440mm",
    description: "Santa Clara 9mm Marine Plywood provides enhanced strength and stability for medium-duty applications. It offers a balanced combination of durability and workability, making it easy to cut, shape, and install. Engineered for moisture-prone environments, it performs well in both marine and residential settings where reliable water resistance is essential.",
    image: "/images/marine-9mm-main.png",
    category: "Marine",
    thickness: "9mm",
    dimensions: "1220mm x 2440mm",
    plyCount: "5-ply veneer",
    weight: "12.0 kgs more or less (per piece)",
    boilTested: "Boil-tested for 72 hours",
    applications: ["Wall Partitions", "Boat Interior", "Furniture Framing"],
    gallery: [
      "/images/marine-9mm-1.png",
      "/images/marine-9mm-2.png",
      "/images/marine-9mm-3.png",
      "/images/marine-9mm-4.png"
    ]
  },
  {
    id: "marine-10mm",
    name: "Santa Clara Marine Plywood – 10mm x 1220mm x 2440mm",
    description: "Built for improved load-bearing performance, the 10mm thickness delivers superior rigidity while maintaining a smooth and uniform finish. It is designed to withstand humid and wet conditions without warping easily. This thickness is a preferred choice for projects that require additional durability while keeping the material manageable and versatile.",
    image: "/images/marine-10mm-main.png",
    category: "Marine",
    thickness: "10mm",
    dimensions: "1220mm x 2440mm",
    plyCount: "5-ply veneer",
    weight: "13.4 kgs more or less (per piece)",
    boilTested: "Boil-tested for 72 hours",
    applications: ["Wall Partition", "Built-in Furniture", "Boat Flooring", "Decorative Wall Panels"],
    gallery: [
      "/images/marine-10mm-1.png",
      "/images/marine-10mm-2.png",
      "/images/marine-10mm-3.png",
      "/images/marine-10mm-4.png"
    ]
  },
  {
    id: "marine-11mm",
    name: "Santa Clara Marine Plywood – 11mm x 1220mm x 2440mm",
    description: "Santa Clara 11mm Marine Plywood offers increased structural strength for heavier applications. Its solid core construction ensures dependable performance even under continuous exposure to moisture. This thickness is ideal for projects that demand stability, durability, and long-term reliability.",
    image: "/images/marine-11mm-main.png",
    category: "Marine",
    thickness: "11mm",
    dimensions: "1220mm x 2440mm",
    plyCount: "5-ply veneer",
    weight: "14.7 kgs more or less (per piece)",
    boilTested: "Boil-tested for 72 hours",
    applications: ["Furniture Framing or Structure", "Wall Cladding", "Boat Interiors", "Subflooring"],
    gallery: [
      "/images/marine-11mm-1.png",
      "/images/marine-11mm-2.png",
      "/images/marine-11mm-3.png",
      "/images/marine-11mm-4.png"
    ]
  },
  {
    id: "marine-18mm",
    name: "Santa Clara Marine Plywood – 18mm x 1220mm x 2440mm",
    description: "For maximum strength and durability, Santa Clara 18mm Marine Plywood is engineered to handle heavy loads and demanding environments. It delivers outstanding stability, impact resistance, and long-lasting performance. Highly recommended for structural and heavy-duty applications, this thickness ensures dependable performance in marine, residential, and commercial projects.",
    image: "/images/marine-18mm-main.png",
    category: "Marine",
    thickness: "18mm",
    dimensions: "1220mm x 2440mm",
    plyCount: "7-ply veneer",
    weight: "24.0 kgs more or less (per piece)",
    boilTested: "Boil-tested for 72 hours",
    applications: ["Flooring", "Subflooring", "Stair Treads and Platforms", "Boat Decking", "Furniture", "Counter tops"],
    gallery: [
      "/images/marine-18mm-1.png",
      "/images/marine-18mm-2.png",
      "/images/marine-18mm-3.png",
      "/images/marine-18mm-4.png"
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return marineProducts.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return marineProducts.filter((product) => product.category === category);
}
