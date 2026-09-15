import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

const compensationData = [
  {
    company: "Google",
    role: "Software Engineer",
    level: "L4",
    location: "Bangalore",
    baseSalary: 2000000,
    bonus: 400000,
    stock: 600000,
  },
  {
    company: "Google",
    role: "Software Engineer",
    level: "L5",
    location: "Bangalore",
    baseSalary: 2800000,
    bonus: 500000,
    stock: 1000000,
  },
  {
    company: "Google",
    role: "Data Scientist",
    level: "L4",
    location: "Bangalore",
    baseSalary: 2200000,
    bonus: 350000,
    stock: 700000,
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    level: "62",
    location: "Bangalore",
    baseSalary: 2100000,
    bonus: 300000,
    stock: 800000,
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    level: "63",
    location: "Hyderabad",
    baseSalary: 2500000,
    bonus: 400000,
    stock: 900000,
  },
  {
    company: "Microsoft",
    role: "Data Scientist",
    level: "62",
    location: "Bangalore",
    baseSalary: 1900000,
    bonus: 300000,
    stock: 600000,
  },
  {
    company: "Amazon",
    role: "Software Development Engineer",
    level: "L5",
    location: "Bangalore",
    baseSalary: 2200000,
    bonus: 300000,
    stock: 700000,
  },
  {
    company: "Amazon",
    role: "Software Development Engineer",
    level: "L6",
    location: "Bangalore",
    baseSalary: 3000000,
    bonus: 400000,
    stock: 1200000,
  },
  {
    company: "Amazon",
    role: "Data Scientist",
    level: "L5",
    location: "Hyderabad",
    baseSalary: 2000000,
    bonus: 250000,
    stock: 600000,
  },
  {
    company: "Meta",
    role: "Software Engineer",
    level: "E4",
    location: "Bangalore",
    baseSalary: 2600000,
    bonus: 500000,
    stock: 1200000,
  },
  {
    company: "Meta",
    role: "Software Engineer",
    level: "E5",
    location: "Bangalore",
    baseSalary: 3500000,
    bonus: 600000,
    stock: 1800000,
  },
  {
    company: "Adobe",
    role: "Software Engineer",
    level: "L4",
    location: "Noida",
    baseSalary: 1800000,
    bonus: 250000,
    stock: 500000,
  },
  {
    company: "Adobe",
    role: "Data Scientist",
    level: "L4",
    location: "Bangalore",
    baseSalary: 1900000,
    bonus: 300000,
    stock: 550000,
  },
  {
    company: "TCS",
    role: "Software Engineer",
    level: "Ninja",
    location: "Kolkata",
    baseSalary: 450000,
    bonus: 0,
    stock: 0,
  },
  {
    company: "TCS",
    role: "Software Engineer",
    level: "Digital",
    location: "Bangalore",
    baseSalary: 750000,
    bonus: 50000,
    stock: 0,
  },
  {
    company: "Infosys",
    role: "Software Engineer",
    level: "JL3",
    location: "Pune",
    baseSalary: 650000,
    bonus: 50000,
    stock: 0,
  },
  {
    company: "Infosys",
    role: "Data Analyst",
    level: "JL3",
    location: "Bangalore",
    baseSalary: 700000,
    bonus: 50000,
    stock: 0,
  },
  {
    company: "Wipro",
    role: "Software Engineer",
    level: "Project Engineer",
    location: "Bangalore",
    baseSalary: 600000,
    bonus: 40000,
    stock: 0,
  },
  {
    company: "Accenture",
    role: "Software Engineer",
    level: "Analyst",
    location: "Pune",
    baseSalary: 650000,
    bonus: 50000,
    stock: 0,
  },
  {
    company: "Flipkart",
    role: "Software Engineer",
    level: "SDE 2",
    location: "Bangalore",
    baseSalary: 1800000,
    bonus: 250000,
    stock: 500000,
  },
  {
    company: "Flipkart",
    role: "Software Engineer",
    level: "SDE 3",
    location: "Bangalore",
    baseSalary: 2600000,
    bonus: 400000,
    stock: 800000,
  },
  {
    company: "Razorpay",
    role: "Backend Engineer",
    level: "SDE 2",
    location: "Bangalore",
    baseSalary: 1600000,
    bonus: 200000,
    stock: 400000,
  },
  {
    company: "Swiggy",
    role: "Software Engineer",
    level: "SDE 2",
    location: "Bangalore",
    baseSalary: 1500000,
    bonus: 200000,
    stock: 350000,
  },
  {
    company: "IBM",
    role: "Data Scientist",
    level: "Senior",
    location: "Bangalore",
    baseSalary: 1400000,
    bonus: 150000,
    stock: 200000,
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  for (const record of compensationData) {
    const company = await prisma.company.upsert({
      where: {
        name: record.company,
      },
      update: {},
      create: {
        name: record.company,
      },
    });

    const totalCompensation =
      record.baseSalary +
      record.bonus +
      record.stock;

    await prisma.compensationRecord.create({
      data: {
        companyId: company.id,
        role: record.role,
        level: record.level,
        location: record.location,
        baseSalary: record.baseSalary,
        bonus: record.bonus,
        stock: record.stock,
        totalCompensation,
        currency: "INR",
      },
    });
  }

  console.log(
    `✅ Seed completed: ${compensationData.length} compensation records inserted.`
  );
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });