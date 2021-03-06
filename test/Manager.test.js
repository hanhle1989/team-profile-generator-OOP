const Manager = require("../lib/manager");
const Employee = require("../lib/employee");

test("Should be able to set office number via constructor argument", () => {
  const testOffice = 9999999999;
  const employee = new Manager("Foo", 1, "test@test.com", testOffice);

  expect(employee.office).toBe(testOffice);
});

test("'Manager' should be returned via getRole()", () => {
  const testRole = "Manager";
  const employee = new Manager("Foo", 1, "test@test.com", 9999999999);

  expect(employee.getRole()).toBe(testRole);
});

test("Should be able to get office number via getOffice()", () => {
  const testOffice = 999;
  const employee = new Manager("Foo", 1, "test@test.com", testOffice);

  expect(employee.getOffice()).toBe(testOffice);
});
