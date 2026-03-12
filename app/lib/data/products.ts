import { Product } from "@/types/index";

export const products: Product[] = [
  {
    id: "1",
    name: "Marine Plywood",
    description: "High-quality marine-grade plywood designed for boat building and marine applications.",
    image: "/images/marine-plywood.png",
    category: "Marine",
    features: [
      "Water-resistant",
      "Durable construction",
      "Premium eucalyptus wood"
    ]
  },
  {
    id: "2",
    name: "Commercial Plywood",
    description: "Versatile plywood suitable for commercial and residential construction projects.",
    image: "/images/commercial-plywood.png",
    category: "Commercial",
    features: [
      "Cost-effective",
      "Multi-purpose",
      "Strong and reliable"
    ]
  },
  {
    id: "3",
    name: "Specialty Plywood",
    description: "Custom plywood solutions for unique applications and specific requirements.",
    image: "/images/specialty-plywood.png",
    category: "Specialty",
    features: [
      "Customizable",
      "Specialized applications",
      "Expert craftsmanship"
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
