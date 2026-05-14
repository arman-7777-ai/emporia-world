export const SITE_CONFIG = {
  name: "Emporia World",
  tagline: "Redefining Luxury Living",
  description:
    "Mumbai's most prestigious luxury real estate experience. Discover curated residences that transcend ordinary living.",
  contact: {
    phone: "+91 22 6789 0000",
    email: "concierge@emporiaworld.com",
    address: "Level 42, World Trade Centre, Cuffe Parade, Mumbai 400005",
  },
  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
};

export const NAV_LINKS = [
  { label: "Residences", href: "#residences" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Collection", href: "#collection" },
  { label: "Contact", href: "#contact" },
];

export const PROPERTIES = [
  {
    id: 1,
    name: "The Imperial Residences",
    location: "Worli Sea Face, Mumbai",
    price: "₹45 Cr",
    specs: { beds: 5, baths: 6, area: "8,500 sq ft" },
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    tag: "Ultra Luxury",
  },
  {
    id: 2,
    name: "Azure Heights",
    location: "Bandra West, Mumbai",
    price: "₹32 Cr",
    specs: { beds: 4, baths: 5, area: "6,200 sq ft" },
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    tag: "Penthouse",
  },
  {
    id: 3,
    name: "The Meridian",
    location: "Lower Parel, Mumbai",
    price: "₹28 Cr",
    specs: { beds: 4, baths: 4, area: "5,800 sq ft" },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    tag: "Sky Villa",
  },
  {
    id: 4,
    name: "Celestia Tower",
    location: "Juhu, Mumbai",
    price: "₹38 Cr",
    specs: { beds: 5, baths: 5, area: "7,200 sq ft" },
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    tag: "Exclusive",
  },
];

export const STATS = [
  { value: 45, suffix: "+", label: "Luxury Projects" },
  { value: 1200, suffix: "+", label: "Residences Delivered" },
  { value: 8500, prefix: "₹", suffix: " Cr", label: "Portfolio Value" },
  { value: 15, suffix: "+", label: "Years of Excellence" },
];
