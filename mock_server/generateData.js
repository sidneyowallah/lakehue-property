var faker = require("faker");

var database = { properties: [] };

function makeArray(length, generator) {
  return Array.from({ length }, generator);
}

for (var i = 1; i <= 10; i++) {
  database.properties.push({
    id: i,
    name: faker.company.companyName(),
    description: faker.lorem.sentences(),
    type: faker.random.arrayElement([
      "Single-family",
      "Townhomes",
      "Condominiums",
      "Apartment",
      "Residential",
      "other",
    ]),
    imageUrl: `${faker.image.imageUrl(
      400,
      400,
      "townhome"
    )}?random=${Date.now()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.streetName()}`,
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    price: faker.commerce.price(),
    categories: faker.random.arrayElements(
      [
        "Single-family",
        "Townhomes",
        "Condominiums",
        "Apartment",
        "Residential",
      ],
      3
    ),
    status: faker.random.arrayElement(["INACTIVE", "ACTIVE"]),
    active: faker.random.arrayElement([true, false]),
    createdAt: faker.date.past(10),
    updatedAt: faker.date.past(2),

    // itemSizes: faker.helpers.shuffle(["12 pack", "18 pack"]),
    // description: faker.lorem.sentences(),
    // emptyDays: faker.datatype.number({ min: 0, max: 9 }),

    // reviews: makeArray(4, faker.lorem.sentences),
    // owner: faker.name.findName(),
    // specialties: makeArray(4, faker.random.word),
    // categories: faker.random.arrayElements(
    //   ["larger", "Amber", "Selzer", "IPA", "Cider", "Plisner"],
    //   3
    // ),
  });
}

console.log(JSON.stringify(database));
