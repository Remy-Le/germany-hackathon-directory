yarn dev

# Germany Hackathon Directory

This project is a curated, directory of in-person and hybrid hackathons across Germany. It is built with [Next.js](https://nextjs.org) and designed for discoverability, clarity, and ease of contribution.

## Features

- Browse upcoming and past hackathons in Germany
- All event content is in English for international accessibility
- High-quality, non-pixelated event images
- Each hackathon includes: name, city, dates, venue, address, format, description, participant limits, website, image, tags, prizes, and contact info

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Adding a Hackathon

All hackathons are stored in `lib/data.ts` as objects in the `hackathons` array. To add a new event:

1. Copy the structure of an existing hackathon object.
2. Fill in all fields in English (no German or mixed content).
3. Use a high-resolution, clear image (ideally 800x400px or larger, dpr=2, quality=90+ if from Luma or similar sources).
4. Submit a pull request or push directly if you have access.

**Example:**

```ts
{
	id: 'example-hackathon-2026',
	name: 'Example Hackathon 2026',
	city: 'Example City',
	date: '2026-09-01',
	endDate: '2026-09-03',
	venue: 'Example Venue',
	address: '123 Example St, 12345 Example City, Germany',
	format: 'in-person',
	description: 'A sample hackathon for demonstration purposes. All content must be in English.',
	maxParticipants: 100,
	registeredParticipants: 0,
	website: 'https://example.com',
	image: 'https://example.com/image.jpg',
	tags: ['Sample', 'Demo'],
	prizes: 'Sample prizes',
	contact: 'info@example.com',
	approved: true,
}
```

## Contributing

Pull requests are welcome! Please ensure all event content is in English and images are clear and high-resolution.

## License

MIT
