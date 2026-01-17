require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  // Clean start (nice for dev)
  await prisma.listing.deleteMany();
  await prisma.game.deleteMany();

  await prisma.game.createMany({
    data: [
      {
        name: "FIFA 23",
        slug: "fifa-23",
        coverUrl: "https://via.placeholder.com/600x800?text=FIFA+23",
      },
      {
        name: "Red Dead Redemption 2",
        slug: "red-dead-redemption-2",
        coverUrl: "https://via.placeholder.com/600x800?text=RDR2",
      },
      {
        name: "Split Fiction",
        slug: "split-fiction",
        coverUrl: "https://via.placeholder.com/600x800?text=Split+Fiction",
      },
    ],
  });

  const games = await prisma.game.findMany();
  const bySlug = Object.fromEntries(games.map((g) => [g.slug, g]));

  await prisma.listing.createMany({
    data: [
      // Split Fiction (multiple like screenshot)
      {
        gameId: bySlug["split-fiction"].id,
        title: "Split Fiction EA App Key (PC) GLOBAL",
        platform: "EA App",
        region: "GLOBAL",
        priceCurrent: "40.93",
        priceOld: "49.99",
        discountPct: 18,
        cashback: "4.50",
        likes: 626,
      },
      {
        gameId: bySlug["split-fiction"].id,
        title: "Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE",
        platform: "Xbox Live",
        region: "EUROPE",
        priceCurrent: "34.14",
        priceOld: "49.99",
        discountPct: 32,
        cashback: "3.76",
        likes: 500,
      },
      {
        gameId: bySlug["split-fiction"].id,
        title: "Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL",
        platform: "Xbox Live",
        region: "GLOBAL",
        priceCurrent: "35.15",
        priceOld: "49.99",
        discountPct: 30,
        cashback: "3.87",
        likes: 1039,
      },

      // FIFA 23
      {
        gameId: bySlug["fifa-23"].id,
        title: "FIFA 23 (PC) EA App Key GLOBAL",
        platform: "EA App",
        region: "GLOBAL",
        priceCurrent: "12.99",
        priceOld: "59.99",
        discountPct: 78,
        cashback: "0.80",
        likes: 1200,
      },

      // RDR2
      {
        gameId: bySlug["red-dead-redemption-2"].id,
        title: "Red Dead Redemption 2 (PC) Rockstar Key GLOBAL",
        platform: "Rockstar",
        region: "GLOBAL",
        priceCurrent: "19.99",
        priceOld: "59.99",
        discountPct: 67,
        cashback: "1.25",
        likes: 2400,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
