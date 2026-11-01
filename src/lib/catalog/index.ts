import models from './models.json';
import images from './images.json';
import type {
  Availability,
  Badge,
  Category,
  CategoryId,
  ColorVariant,
  Product,
  Review,
} from '../types';

type ModelColor = { name: string; hex: string; family: string; priceDelta: number };

type Model = {
  id: string;
  shape: string;
  category: CategoryId;
  subcategory: string;
  subcategoryLabel: string;
  name: string;
  tagline: string;
  basePrice: number;
  dimensions: { width: number; depth: number; height: number; seatHeight?: number };
  materials: string[];
  features: string[];
  style: string;
  colors: ModelColor[];
};

type ImageEntry = {
  model: string;
  colorIndex: number;
  slug: string;
  files: { main: string; detail: string; styled: string };
};

const modelList = models.models as Model[];
const categoryList = models.categories as Omit<Category, 'count'>[];
const imageList = images as ImageEntry[];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replaceAll('ą', 'a')
    .replaceAll('ć', 'c')
    .replaceAll('ę', 'e')
    .replaceAll('ł', 'l')
    .replaceAll('ń', 'n')
    .replaceAll('ó', 'o')
    .replaceAll('ś', 's')
    .replaceAll('ź', 'z')
    .replaceAll('ż', 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return Math.abs(result);
};

const seeded = (seed: string) => {
  const value = hash(seed);
  return (offset: number) => ((value >> (offset * 3)) % 1000) / 1000;
};

const roundPrice = (value: number) => Math.round(value / 10) * 10 - 1;

const TYPE_LABELS: Record<string, string> = {
  trzyosobowe: 'Sofa',
  dwuosobowe: 'Sofa',
  narozne: 'Narożnik',
  modularne: 'Sofa modułowa',
  rozkładane: 'Sofa rozkładana',
  fotele: 'Fotel',
  biurowe: 'Krzesło biurowe',
  krzesla: 'Krzesło',
  pufy: 'Pufa',
  jadalniane: 'Stół',
  kawowe: 'Stolik kawowy',
  biurka: 'Biurko',
  konsolowe: 'Konsola',
  podlogowe: 'Lampa podłogowa',
  stolowe: 'Lampa stołowa',
  wiszace: 'Lampa wisząca',
  kinkiety: 'Kinkiet',
  plafony: 'Plafon',
};

const reviewsPool = {
  authors: [
    'Anna K.',
    'Piotr Z.',
    'Ewa M.',
    'Michał R.',
    'Katarzyna N.',
    'Tomasz W.',
    'Agnieszka L.',
    'Marek S.',
    'Julia P.',
    'Bartosz D.',
  ],
  titles: [
    'Dokładnie taka, jak na zdjęciach',
    'Warto było czekać',
    'Świetna jakość wykonania',
    'Idealnie pasuje do salonu',
    'Solidne i wygodne',
    'Polecam bez wahania',
    'Bardzo dobra relacja jakości do ceny',
  ],
  bodies: [
    'Paczka dotarła szybciej niż zakładał termin. Materiał jest przyjemny w dotyku, a montaż zajął dosłownie kilka minut.',
    'Zamawiałam po obejrzeniu zdjęć u klientów i nie zawiodłam się. Kolor zgadza się z opisem, a wykonanie jest naprawdę porządne.',
    'Konstrukcja jest stabilna i nie skrzypi. Po kilku tygodniach użytkowania nic się nie odkształciło.',
    'Obsługa pomogła dobrać wariant kolorystyczny, dostawa wniesiona pod drzwi. Sam produkt wygląda znacznie drożej, niż kosztował.',
    'Minimalistyczny design sprawdził się w małym mieszkaniu. Drobny minus za instrukcję montażu, ale da się ogarnąć bez problemu.',
    'Drugi zakup w BuyNest i znowu jestem zadowolona. Szybka wysyłka, porządnie zapakowane, zero uszkodzeń.',
  ],
};

const buildReviews = (slug: string, rating: number, count: number): Review[] => {
  const random = seeded(`reviews-${slug}`);
  const total = 3 + Math.floor(random(1) * 3);
  return Array.from({ length: total }, (_, index) => {
    const localRating = Math.min(5, Math.max(3, Math.round(rating + (random(index + 2) - 0.5) * 2)));
    const day = 1 + Math.floor(random(index + 4) * 27);
    const month = 1 + Math.floor(random(index + 6) * 10);
    return {
      id: `${slug}-review-${index}`,
      author: reviewsPool.authors[Math.floor(random(index + 1) * reviewsPool.authors.length) % reviewsPool.authors.length],
      rating: localRating,
      title: reviewsPool.titles[Math.floor(random(index + 3) * reviewsPool.titles.length) % reviewsPool.titles.length],
      text: reviewsPool.bodies[Math.floor(random(index + 5) * reviewsPool.bodies.length) % reviewsPool.bodies.length],
      date: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      verified: random(index + 7) > 0.25,
      helpful: 2 + Math.floor(random(index + 8) * count * 0.05),
    };
  });
};

const buildDescription = (model: Model, color: ModelColor, categoryLabel: string) =>
  `${model.name} to ${model.tagline.charAt(0).toLowerCase()}${model.tagline.slice(1)}. Wariant w kolorze ${color.name.toLowerCase()} powstał z myślą o wnętrzach, w których liczy się spójna forma i codzienny komfort. ${categoryLabel} z serii ${model.name} łączy naturalne materiały z precyzyjnym wykończeniem detali, dzięki czemu dobrze znosi codzienne użytkowanie przez lata.`;

const buildAvailability = (random: (offset: number) => number): { availability: Availability; stock: number } => {
  const value = random(2);
  if (value > 0.93) return { availability: 'out-of-stock', stock: 0 };
  if (value > 0.78) return { availability: 'low-stock', stock: 1 + Math.floor(value * 4) };
  return { availability: 'in-stock', stock: 6 + Math.floor(value * 40) };
};

const buildBadges = (random: (offset: number) => number): Badge[] => {
  const badges: Badge[] = [];
  if (random(3) > 0.82) badges.push('nowosc');
  if (random(4) > 0.76) badges.push('bestseller');
  if (random(5) > 0.7) badges.push('promocja');
  if (random(6) > 0.86) badges.push('eko');
  return badges;
};

const resolveImages = (slug: string, name: string, color: string) => {
  const entry = imageList.find((item) => item.slug === slug);
  if (!entry) return [];
  return [
    { id: `${slug}-main`, url: entry.files.main, alt: `${name} w kolorze ${color.toLowerCase()} — widok główny` },
    { id: `${slug}-styled`, url: entry.files.styled, alt: `${name} w kolorze ${color.toLowerCase()} — aranżacja` },
    { id: `${slug}-detail`, url: entry.files.detail, alt: `${name} w kolorze ${color.toLowerCase()} — detal wykończenia` },
  ];
};

export const products: Product[] = modelList.flatMap((model) => {
  const category = categoryList.find((item) => item.id === model.category);
  const colors: ColorVariant[] = model.colors.map((color) => ({
    name: color.name,
    hex: color.hex,
    slug: slugify(color.name),
    family: color.family,
  }));

  return model.colors.map((color, colorIndex) => {
    const slug = `${model.id}-${slugify(color.name)}`;
    const typeLabel = TYPE_LABELS[model.subcategory] ?? model.name;
    const random = seeded(slug);
    const { availability, stock } = buildAvailability(random);
    const badges = buildBadges(random);
    const basePrice = roundPrice(model.basePrice + color.priceDelta);
    const discounted = badges.includes('promocja');
    const price = basePrice;
    const compareAtPrice = discounted ? roundPrice(basePrice * (1.12 + random(7) * 0.18)) : undefined;
    const rating = Math.round((4 + random(8) * 0.9) * 10) / 10;
    const reviewCount = 12 + Math.floor(random(9) * 320);

    return {
      id: `${model.id}-${colorIndex}`,
      slug,
      modelId: model.id,
      name: `${typeLabel} ${model.name}`,
      tagline: model.tagline,
      typeLabel,
      description: buildDescription(model, color, category?.name ?? ''),
      category: model.category,
      categoryLabel: category?.name ?? '',
      subcategory: model.subcategory,
      subcategoryLabel: model.subcategoryLabel,
      style: model.style,
      price,
      compareAtPrice,
      currency: 'PLN',
      rating,
      reviewCount,
      availability,
      stock,
      badges,
      colors,
      activeColor: colors[colorIndex],
      images: resolveImages(slug, model.name, color.name),
      features: model.features,
      materials: model.materials,
      dimensions: model.dimensions,
      weight: Math.round(8 + random(10) * 60),
      sku: `BN-${model.id.slice(0, 3).toUpperCase()}-${String(colorIndex + 1).padStart(2, '0')}`,
      warrantyYears: model.category === 'lamps' ? 2 : 5,
    };
  });
});

export const categories: Category[] = categoryList.map((category) => ({
  ...category,
  count: products.filter((product) => product.category === category.id).length,
}));

export const productBySlug = new Map(products.map((product) => [product.slug, product]));

const reviewCache = new Map<string, Review[]>();

export const getProductReviews = (product: Product) => {
  const cached = reviewCache.get(product.slug);
  if (cached) return cached;
  const reviews = buildReviews(product.slug, product.rating, product.reviewCount);
  reviewCache.set(product.slug, reviews);
  return reviews;
};

export const productByModel = modelList.map((model) => ({
  model,
  variants: products.filter((product) => product.modelId === model.id),
}));

export const priceBounds = {
  min: Math.min(...products.map((product) => product.price)),
  max: Math.max(...products.map((product) => product.price)),
};

const FAMILY_LABELS: Record<string, string> = {
  bez: 'Beżowy',
  bialy: 'Biały',
  brazowy: 'Brązowy',
  czarny: 'Czarny',
  niebieski: 'Niebieski',
  szary: 'Szary',
  zielony: 'Zielony',
};

export const colorFamilies = Array.from(
  new Map(
    modelList
      .flatMap((model) => model.colors.map((color) => [color.family, color.hex] as const))
      .reverse(),
  ).entries(),
).map(([id, hex]) => ({ id, label: FAMILY_LABELS[id] ?? id, hex }));

export const styles = Array.from(new Set(products.map((product) => product.style)));

export const subcategories = modelList
  .map((model) => ({ id: model.subcategory, label: model.subcategoryLabel, category: model.category }))
  .filter((item, index, list) => list.findIndex((entry) => entry.id === item.id) === index)
  .sort((a, b) => a.label.localeCompare(b.label, 'pl'));

export const heroProducts = products.filter((product) => product.images.length > 0);
