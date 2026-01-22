require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { prisma } = require("./prismaClient");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/list", async (req, res) => {
  try {
    const q = (req.query.search || "").toString().trim();
    const terms = q ? q.split(/\s+/).filter(Boolean).slice(0, 5) : [];

    const where =
      terms.length === 0
        ? undefined
        : {
            AND: terms.map((t) => ({
              OR: [
                { title: { contains: t, mode: "insensitive" } },
                { game: { name: { contains: t, mode: "insensitive" } } },
              ],
            })),
          };

    const listings = await prisma.listing.findMany({
      where,
      include: { game: true },
      orderBy: { likes: "desc" },
      take: 50,
    });

    const items = listings.map((l) => ({
      ...l,
      priceCurrent: l.priceCurrent.toString(),
      priceOld: l.priceOld ? l.priceOld.toString() : null,
      cashback: l.cashback ? l.cashback.toString() : null,
    }));

    res.json({ count: items.length, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const clientDistPath = path.resolve(__dirname, "public");
app.use(express.static(clientDistPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
