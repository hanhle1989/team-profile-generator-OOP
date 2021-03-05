const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const testOffice = 999;
  const employee = new Manager("Foo", 1, "test@test.com", testOffice);

  expect(employee.office).toBe(testOffice);
});

test('getRole() should return "Manager"', () => {
  const testRole = "Manager";
  const employee = new Manager("Foo", 1, "test@test.com", 999);

  expect(employee.getRole()).toBe(testRole);
});

test("Can get office number via getOffice()", () => {
  const testOffice = 999;
  const employee = new Manager("Foo", 1, "test@test.com", testOffice);

  expect(employee.getOffice()).toBe(testOffice);
});
