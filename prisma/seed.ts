import { faker } from '@faker-js/faker';

import { PrismaClient, Prisma } from '../src/generated/prisma';

const prisma = new PrismaClient();
const patienceArray = Array.from({ length: 20 }, (value, index) => index + 1);

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

function createAppointment(): Prisma.AppointmentCreateInput {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const date = faker.date.between({
    from: new Date(year, month, day),
    to: new Date(year + 1, month, day),
  });
  const symptoms = faker.lorem.lines({ min: 1, max: 3 });
  const diagnosis = faker.lorem.lines({ min: 1, max: 3 });
  return {
    date,
    symptoms,
    diagnosis,
    prescriptions: {
      create: [{ content: faker.lorem.lines({ min: 1, max: 4 }) }],
    },
  };
}

export async function main() {
  for (const p of patienceArray) {
    await prisma.patient.create({
      data: {
        ...createPatient(),
        address: {
          create: [createAddress()],
        },
        appointments: {
          create: [createAppointment()],
        },
      },
    });
  }
}

main();
