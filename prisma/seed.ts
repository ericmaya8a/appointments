import { faker } from '@faker-js/faker';

import { PrismaClient, Prisma } from '../src/generated/prisma';

const prisma = new PrismaClient();
const patienceArray = Array.from({ length: 40 }, (value, index) => index + 1);
const timeSlots = patienceArray.reduce((obj: { [key: number]: { from: number; to: number } }, item) => {
  const mod = item % 5;
  obj[item] = { from: mod > 0 ? mod + 9 : 14, to: mod > 0 ? mod + 10 : 15 };
  return obj;
}, {});

function createPatient(): Prisma.PatientCreateInput {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  const email = faker.internet.email({ firstName, lastName, provider: 'gmail' }).toLowerCase();
  const birthDay = new Date(faker.date.birthdate({ mode: 'age', min: 18, max: 65 }));
  const phone = faker.phone.number();
  return { email, firstName, lastName, birthDay, phone };
}

function createAddress(): Prisma.AddressCreateInput {
  const street = faker.location.street();
  const city = faker.location.city();
  const state = faker.location.state();
  const postalCode = faker.location.zipCode('#####');
  const country = faker.location.country();
  return {
    street,
    city,
    state,
    postalCode,
    country,
    isDefault: true,
  };
}

function createAppointment(from: Date, to: Date): Prisma.AppointmentCreateInput {
  const description = faker.lorem.lines({ min: 1, max: 3 });
  const symptoms = faker.lorem.lines({ min: 1, max: 3 });
  const diagnosis = faker.lorem.lines({ min: 1, max: 3 });
  return {
    from,
    to,
    description,
    symptoms,
    diagnosis,
    prescriptions: {
      create: [{ content: faker.lorem.lines({ min: 1, max: 4 }) }],
    },
  };
}

export async function main() {
  let count = 0;
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  for (const n of patienceArray) {
    const from = new Date(year, month, day + count, timeSlots[n].from, 0);
    const to = new Date(year, month, day + count, timeSlots[n].to, 0);
    await prisma.patient.create({
      data: {
        ...createPatient(),
        address: {
          create: [createAddress()],
        },
        appointments: {
          create: [createAppointment(from, to)],
        },
      },
    });
    if (n % 5 === 0) count++;
  }
}

main();
