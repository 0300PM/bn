import { PlaceHolderImages } from './placeholder-images';
import type { Product, Review } from './types';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    return { id: 'not-found', url: 'https://placehold.co/800x800', alt: 'Placeholder image', hint: 'placeholder' };
  }
  return {
    id: image.id,
    url: image.imageUrl,
    alt: image.description,
    hint: image.imageHint,
  };
};

export const products: Product[] = [
  {
    id: 'prod_1',
    slug: 'minimalist-lounge-sofa',
    name: 'Minimalist Lounge Sofa',
    price: 899.99,
    rating: 4.5,
    reviewCount: 120,
    category: 'sofas',
    images: [getImage('sofa-1'), getImage('sofa-2'), getImage('sofa-3')],
    description: 'Experience unparalleled comfort with this minimalist lounge sofa, perfect for modern living spaces. Upholstered in premium, durable fabric.',
    availability: 'in-stock',
    details: 'Dimensions: 220cm x 95cm x 80cm. Frame: Solid pine. Fabric: 100% Polyester.',
    shippingReturns: 'Free shipping within 5 business days. 30-day return policy.'
  },
  {
    id: 'prod_2',
    slug: 'scandinavian-armchair',
    name: 'Scandinavian Armchair',
    price: 349.00,
    rating: 4.8,
    reviewCount: 250,
    category: 'chairs',
    images: [getImage('chair-1'), getImage('chair-2'), getImage('chair-3')],
    description: 'A touch of Scandinavian design. This armchair combines style and comfort with its ergonomic design and solid oak legs.',
    availability: 'in-stock',
    details: 'Dimensions: 80cm x 75cm x 90cm. Frame: Solid oak. Fabric: Wool blend.',
    shippingReturns: 'Ships in 3-5 business days. 30-day return policy.'
  },
  {
    id: 'prod_3',
    slug: 'modern-dining-table',
    name: 'Modern Dining Table',
    price: 650.00,
    rating: 4.7,
    reviewCount: 85,
    category: 'tables',
    images: [getImage('table-1'), getImage('table-2'), getImage('table-3')],
    description: 'Gather your family around this sleek, modern dining table. Seats up to 6 people comfortably. Features a scratch-resistant top.',
    availability: 'in-stock',
    details: 'Dimensions: 180cm x 90cm x 75cm. Top: Lacquered MDF. Legs: Powder-coated steel.',
    shippingReturns: 'Free shipping. Assembly required. 30-day return policy.'
  },
  {
    id: 'prod_4',
    slug: 'industrial-floor-lamp',
    name: 'Industrial Floor Lamp',
    price: 180.50,
    rating: 4.3,
    reviewCount: 95,
    category: 'lamps',
    images: [getImage('lamp-1'), getImage('lamp-2')],
    description: 'Illuminate your space with this industrial-style floor lamp. Adjustable head and sturdy base make it both functional and stylish.',
    availability: 'out-of-stock',
    details: 'Height: 160cm. Material: Black-painted metal. Bulb: E27 (not included).',
    shippingReturns: 'Ships in 2-3 business days. 14-day return policy.'
  },
  {
    id: 'prod_5',
    slug: 'velvet-cushion-sofa',
    name: 'Velvet Cushion Sofa',
    price: 1250.00,
    rating: 4.9,
    reviewCount: 150,
    category: 'sofas',
    images: [getImage('sofa-4'), getImage('sofa-5'), getImage('sofa-1')],
    description: 'Indulge in luxury with this plush velvet sofa. Deep cushions and a sturdy frame ensure lasting comfort and support.',
    availability: 'in-stock',
    details: 'Dimensions: 200cm x 90cm x 78cm. Frame: Hardwood. Fabric: 100% Velvet Polyester.',
    shippingReturns: 'White glove delivery available. 30-day return policy.'
  },
  {
    id: 'prod_6',
    slug: 'eames-style-lounge-chair',
    name: 'Eames-Style Lounge Chair',
    price: 799.00,
    rating: 4.9,
    reviewCount: 310,
    category: 'chairs',
    images: [getImage('chair-2'), getImage('chair-3'), getImage('chair-4')],
    description: 'A timeless classic. This iconic lounge chair and ottoman set offers supreme comfort and sophisticated style.',
    availability: 'in-stock',
    details: 'Materials: Bent plywood, genuine leather, aluminum base.',
    shippingReturns: 'Free shipping. 30-day return policy.'
  },
  {
    id: 'prod_7',
    slug: 'marble-coffee-table',
    name: 'Marble Coffee Table',
    price: 450.00,
    rating: 4.6,
    reviewCount: 60,
    category: 'tables',
    images: [getImage('table-2'), getImage('table-3'), getImage('table-1')],
    description: 'An elegant centerpiece for your living room. Features a genuine marble top and a sleek geometric metal base.',
    availability: 'in-stock',
    details: 'Dimensions: 90cm (diameter) x 40cm (height). Top: Carrara Marble. Base: Gold-plated steel.',
    shippingReturns: 'Ships in 5-7 business days. 30-day return policy.'
  },
  {
    id: 'prod_8',
    slug: 'arc-floor-lamp',
    name: 'Arc Floor Lamp',
    price: 220.00,
    rating: 4.5,
    reviewCount: 110,
    category: 'lamps',
    images: [getImage('lamp-2'), getImage('lamp-1')],
    description: 'A statement piece for any room. This large arc floor lamp provides overhead lighting without requiring ceiling installation.',
    availability: 'in-stock',
    details: 'Height: 210cm. Base: Marble. Shade: Fabric. Bulb: E27 (not included).',
    shippingReturns: 'Free shipping. 30-day return policy.'
  },
  {
    id: 'prod_9',
    slug: 'wooden-accent-chair',
    name: 'Wooden Accent Chair',
    price: 280.00,
    rating: 4.7,
    reviewCount: 180,
    category: 'chairs',
    images: [getImage('chair-4'), getImage('chair-1'), getImage('chair-2')],
    description: 'Solid wood accent chair with woven details. A perfect blend of rustic and modern design for any corner of your home.',
    availability: 'out-of-stock',
    details: 'Dimensions: 70cm x 80cm x 75cm. Frame: Teak wood. Seat: Woven rattan.',
    shippingReturns: 'Ships in 3-5 business days. 30-day return policy.'
  },
  {
    id: 'prod_10',
    slug: 'modular-sectional-sofa',
    name: 'Modular Sectional Sofa',
    price: 1499.00,
    rating: 4.7,
    reviewCount: 95,
    category: 'sofas',
    images: [getImage('sofa-5'), getImage('sofa-6'), getImage('sofa-1')],
    description: 'Versatile and spacious, this modular sectional can be configured to fit your space. Upholstered in a family-friendly, stain-resistant fabric.',
    availability: 'in-stock',
    details: 'Configuration: 3-piece sectional. Frame: Eucalyptus wood. Fabric: Performance Weave.',
    shippingReturns: 'Free shipping. 30-day return policy.'
  },
  {
    id: 'prod_11',
    slug: 'mid-century-dining-chair',
    name: 'Mid-Century Dining Chair',
    price: 150.00,
    rating: 4.6,
    reviewCount: 130,
    category: 'chairs',
    images: [getImage('chair-5'), getImage('chair-6'), getImage('chair-1')],
    description: 'Iconic mid-century design meets modern comfort. This dining chair features a curved backrest and a comfortable upholstered seat.',
    availability: 'in-stock',
    details: 'Frame: Walnut-finished solid wood. Seat: Padded with high-density foam.',
    shippingReturns: 'Sold in sets of two. Ships in 3-5 business days.'
  },
  {
    id: 'prod_12',
    slug: 'extendable-oak-table',
    name: 'Extendable Oak Table',
    price: 950.00,
    rating: 4.8,
    reviewCount: 110,
    category: 'tables',
    images: [getImage('table-4'), getImage('table-5'), getImage('table-1')],
    description: 'Perfect for hosting, this solid oak dining table easily extends to accommodate more guests. A timeless piece for any dining room.',
    availability: 'in-stock',
    details: 'Dimensions: 160cm (extends to 210cm) x 90cm x 76cm. Material: Solid American Oak.',
    shippingReturns: 'Free shipping. 30-day return policy.'
  },
  {
    id: 'prod_13',
    slug: 'tripod-table-lamp',
    name: 'Tripod Table Lamp',
    price: 85.00,
    rating: 4.4,
    reviewCount: 75,
    category: 'lamps',
    images: [getImage('lamp-3'), getImage('lamp-4')],
    description: 'A stylish and compact table lamp with a tripod base. Adds a warm, ambient glow to your bedroom or living room.',
    availability: 'in-stock',
    details: 'Height: 45cm. Legs: Natural wood. Shade: Linen fabric.',
    shippingReturns: 'Ships in 2-3 business days. 30-day return policy.'
  }
];

export const reviews: Review[] = [
    { id: 'rev_1', author: 'Anna K.', rating: 5, text: 'Niesamowicie wygodna sofa! Materiał jest bardzo przyjemny w dotyku. Wygląda jeszcze lepiej niż na zdjęciach.', date: '2023-05-15' },
    { id: 'rev_2', author: 'Piotr Z.', rating: 4, text: 'Solidny stół, łatwy w montażu. Jedna gwiazdka mniej za małe zarysowanie na nodze.', date: '2023-04-20' },
    { id: 'rev_3', author: 'Ewa M.', rating: 5, text: 'Fotel jest przepiękny i idealnie pasuje do mojego salonu. Bardzo szybka dostawa.', date: '2023-06-01' },
    { id: 'rev_4', author: 'Jan Kowalski', rating: 3, text: 'Lampa jest ok, ale myślałem, że będzie dawać więcej światła. Design w porządku.', date: '2023-05-28' },
    { id: 'rev_5', author: 'Katarzyna Nowak', rating: 5, text: 'Zakochana w tym fotelu! Jakość wykonania na najwyższym poziomie. Polecam!', date: '2024-01-10' },
];

export const categories = [
    { id: 'sofas', name: 'Sofy', description: 'Wygodne i stylowe sofy do każdego salonu.', image: getImage('cat-sofas').url, hint: 'sofa collection' },
    { id: 'chairs', name: 'Fotele', description: 'Fotele, które łączą komfort i wyjątkowy design.', image: getImage('cat-chairs').url, hint: 'armchair collection' },
    { id: 'tables', name: 'Stoły', description: 'Stoły do jadalni i salonu, które staną się centrum Twojego domu.', image: getImage('cat-tables').url, hint: 'table collection' },
    { id: 'lamps', name: 'Lampy', description: 'Oświetlenie, które nada Twojemu wnętrzu niepowtarzalny klimat.', image: getImage('cat-lamps').url, hint: 'lamp collection' },
];
