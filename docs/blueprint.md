# **App Name**: Roadmapa UI Store

## Core Features:

- Product Listings: Display a grid of products with image, title, price, and star ratings, sourced from local markdown files.
- Product Filtering: Allow users to filter products by categories, price range, and sort options.
- Product Page: Show detailed product information, including gallery, description, reviews, and related items.
- Shopping Cart: Provide a list of selected products with quantity input and total price calculation. Persist the cart with cookies.
- Checkout UI: Present a checkout form for delivery address, shipping options, and payment methods. Handle errors for missing fields.
- Wishlist: Allow users to save products to a wishlist using cookies for persistence.
- AI-Powered Product Description Tool: Enable users to select existing competing product listings, and summarize the features from those listings into an item description. Use a LLM as a tool to compare items from two listings and present the highlights of each item.

## Style Guidelines:

- Primary color: Soft sky blue (#87CEEB) to evoke trust and a sense of calm. This color reflects the UI aesthetic of popular e-commerce sites while remaining unique and fresh.
- Background color: Very light gray (#F5F5F5) for a clean and modern feel. Provides a neutral backdrop that highlights the products and avoids distracting the user.
- Accent color: Muted teal (#468499) to guide the user through key actions without overwhelming the interface.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern, machined, objective, neutral look.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use minimalist, consistent icons from a single set (e.g., Phosphor or Remix Icon) to maintain a clean and modern aesthetic.
- Implement a responsive grid layout using Tailwind CSS to adapt to different screen sizes. Transition to list view on mobile for better usability.
- Apply subtle hover animations, such as image zooming and shadow effects, to enhance interactivity and provide visual feedback. Add an animated loader on adding items to the cart.