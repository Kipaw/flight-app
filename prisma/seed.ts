import "dotenv/config";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

async function main() {
  const email = "admin@mail.com";

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    console.log("Admin sudah ada, dilewati");
    return;
  }

  const ctx = await auth.$context;
  const hash = await ctx.password.hash("admin123");
  const id = crypto.randomUUID();

  const user = await prisma.user.create({
    data: {
      id,
      name: "Admin",
      email,
      emailVerified: true,
      role: "ADMIN",
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: id,
          providerId: "credential",
          password: hash,
        },
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
