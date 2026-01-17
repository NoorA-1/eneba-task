Neon DB connection string:
psql 'postgresql://neondb_owner:npg_LYC8W5TglxDJ@ep-wild-lake-ahkqvksb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

- Need to run:
  2.6.3 Run the seed
  npx prisma db seed

  2.7 Validate with Prisma Studio (super helpful)
  npx prisma studio

You should see Game and Listing populated.

- Done till seed.js, now check games and add the right cover art url

✅ Important: Your Express server must do the same

When you build /list, create PrismaClient like this too:

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

(And on shutdown, await pool.end().)
