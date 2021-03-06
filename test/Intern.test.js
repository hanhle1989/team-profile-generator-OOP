const Intern = require("../lib/Intern");

test("Should be able to set school via constructor", () => {
  const testschool = "UW";
  const employee = new Intern("Foo", 1, "test@test.com", testschool);
  expect(employee.school).toBe(testschool);
});

test("\"Intern\" should be returned via getRole()  ", () => {
  const testRole = "Intern";
  const employee = new Intern("Foo", 1, "test@test.com", "UW");
  expect(employee.getRole()).toBe(testRole);
});

test("Should be able to get school via getSchool()", () => {
  const testschool = "UW";
  const employee = new Intern("Foo", 1, "test@test.com", testschool);
  expect(employee.getSchool()).toBe(testschool);
});
