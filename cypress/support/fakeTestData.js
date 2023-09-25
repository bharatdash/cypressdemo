// cypress/support/utils.js

import { faker } from '@faker-js/faker';

export function generateRandomUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const sex = `${faker.person.sexType().charAt(0).toUpperCase()}${faker.person.sexType().slice(1)}`;
  const dob = faker.date.between({from:'1950-01-01', to: '2000-12-31'}).toLocaleDateString('en-US');
  const email = faker.internet.email({firstName, lastName});
  const company = faker.company.buzzPhrase();
  const randomString = faker.string.alphanumeric({ length: { min: 5, max: 10 } });
  const password = faker.string.alphanumeric({ length: { min: 8, max: 10 } })

  return {
    firstName,
    lastName,
    sex,
    dob,
    email,
    company,
    randomString,
    password
  };
}
