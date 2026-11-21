import "dotenv/config";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { generateSeats } from "../lib/seats";

async function seedAdmin() {
  const email = "admin@mail.com";

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    console.log("Admin sudah ada, dilewati");
    return;
  }

  const ctx = await auth.$context;
  const hash = await ctx.password.hash("admin123");
  const id = crypto.randomUUID();

  await prisma.user.create({
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
  console.log("Admin dibuat:", email);
}

const airplanes = [
  {
    code: "SA-101",
    name: "Singa Air",
    image: "/uploads/airplanes/singa-air.png",
  },
  {
    code: "GA-202",
    name: "Garuda Nusantara",
    image: "/uploads/airplanes/garuda-nusantara.png",
  },
  {
    code: "LA-303",
    name: "Lion Wings",
    image: "/uploads/airplanes/lion-wings.png",
  },
  {
    code: "BA-404",
    name: "Batik Jet",
    image: "/uploads/airplanes/batik-jet.png",
  },
];

async function seedAirplanes() {
  let created = 0;
  for (const plane of airplanes) {
    const exists = await prisma.airplane.findFirst({
      where: { code: plane.code },
    });
    if (!exists) {
      await prisma.airplane.create({ data: plane });
      created++;
    }
  }
  console.log(`Airplane: ${created} baru`);
}

// Jam ditulis WIB (+07:00) supaya tidak bergeser
const flights = [
  {
    planeCode: "SA-101",
    departureCity: "Semarang",
    departureCityCode: "SMG",
    departureDate: "2026-12-05T06:03:00+07:00",
    destinationCity: "Surabaya",
    destinationCityCode: "SBY",
    arrivalDate: "2026-12-05T07:03:00+07:00",
    price: 1_200_000,
  },
  {
    planeCode: "SA-101",
    departureCity: "Semarang",
    departureCityCode: "SMG",
    departureDate: "2026-12-06T02:24:00+07:00",
    destinationCity: "Surabaya",
    destinationCityCode: "SBY",
    arrivalDate: "2026-12-06T08:24:00+07:00",
    price: 950_000,
  },
  {
    planeCode: "GA-202",
    departureCity: "Jakarta",
    departureCityCode: "CGK",
    departureDate: "2026-12-07T09:30:00+07:00",
    destinationCity: "Denpasar",
    destinationCityCode: "DPS",
    arrivalDate: "2026-12-07T12:15:00+07:00",
    price: 1_800_000,
  },
  {
    planeCode: "LA-303",
    departureCity: "Bandung",
    departureCityCode: "BDO",
    departureDate: "2026-12-08T13:00:00+07:00",
    destinationCity: "Makassar",
    destinationCityCode: "UPG",
    arrivalDate: "2026-12-08T16:10:00+07:00",
    price: 2_100_000,
  },
  {
    planeCode: "BA-404",
    departureCity: "Yogyakarta",
    departureCityCode: "YIA",
    departureDate: "2026-12-09T18:45:00+07:00",
    destinationCity: "Medan",
    destinationCityCode: "KNO",
    arrivalDate: "2026-12-09T21:30:00+07:00",
    price: 2_400_000,
  },
];

async function seedFlights() {
  let created = 0;

  for (const { planeCode, departureDate, arrivalDate, ...rest } of flights) {
    const plane = await prisma.airplane.findFirst({
      where: { code: planeCode },
    });
    if (!plane) continue;

    const data = {
      ...rest,
      planeId: plane.id,
      departureDate: new Date(departureDate),
      arrivalDate: new Date(arrivalDate),
    };

    const exists = await prisma.flight.findFirst({
      where: { planeId: data.planeId, departureDate: data.departureDate },
    });
    if (exists) continue;

    await prisma.flight.create({
      data: { ...data, seats: { createMany: { data: generateSeats() } } },
    });
    created++;
  }
  console.log(`Flight: ${created} baru`);

  // Samakan susunan kursi flight lama (hanya yang belum punya tiket)
  const expected = generateSeats().length;
  const outdated = await prisma.flight.findMany({
    where: { tickets: { none: {} } },
    select: { id: true, _count: { select: { seats: true } } },
  });

  let resynced = 0;
  for (const flight of outdated) {
    if (flight._count.seats === expected) continue;

    await prisma.$transaction([
      prisma.flightSeat.deleteMany({ where: { flightId: flight.id } }),
      prisma.flightSeat.createMany({
        data: generateSeats().map((seat) => ({ ...seat, flightId: flight.id })),
      }),
    ]);
    resynced++;
  }
  if (resynced) console.log(`Kursi disamakan di ${resynced} flight lama`);
}

async function main() {
  await seedAdmin();
  await seedAirplanes();
  await seedFlights();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
