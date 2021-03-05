const Employee = require("../lib/Employee");

test("Should be able to create new Employee", () => {
  const employee = new Employee();

  expect(typeof(employee)).toBe("object");
});

test("Should be able to set name", () => {
  const name = "Hanh";
  const employee = new Employee(name);

  expect(employee.name).toBe(name);
});

test("Should be able to set ID", () => {
  const testId = 9999;
  const employee = new Employee("Foo", testId);

  expect(employee.id).toBe(testId);
});

test("Should be able to set email", () => {
  const testEmail = "test@test.com";
  const employee = new Employee("Foo", 1, testEmail );

  expect(employee.email).toBe(testEmail);
});

test("Should be able to get name via getName()", () => {
  const testName = "Hanh";
  const employee = new Employee(testName);

  expect(employee.getName()).toBe(testName);
});

test("Should be able to get id via getId()", () => {
  const testId = 9999;
  const employee = new Employee("Foo", testId);

  expect(employee.getId()).toBe(testId);
});

test("Should be able to get email via getEmail()", () => {
  const testEmail = "test@test.com";
  const employee = new Employee("Foo", 1, testEmail);

  expect(employee.getEmail()).toBe(testEmail);
});

test("\"Employee\" should return via getRole()", () => {
  const testEmployee = "Employee";
  const employee = new Employee("Hanh", 1, "test@test.com");
  
  expect(employee.getRole()).toBe(testEmployee);
});
