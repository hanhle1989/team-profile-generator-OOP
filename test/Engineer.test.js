const Engineer = require("../lib/engineer");
const Employee = require("../lib/employee");

test("Should be able to set GitHUb account via constructor", () => {
  const testGithub = "GitHubUser";
  const employee = new Engineer("Foo", 1, "test@test.com", testGithub);

  expect(employee.github).toBe(testGithub);
});

test("\"Engineer\" should be returned via getRole()", () => {
  const testRole = "Engineer";
  const employee = new Engineer("Foo", 1, "test@test.com", "GitHubUser");

  expect(employee.getRole()).toBe(testRole);
});

test("Should be able to get GitHub username via getGithub()", () => {
  const testGithub = "GitHubUser";
  const employee = new Engineer("Foo", 1, "test@test.com", testGithub);
  
  expect(employee.getGithub()).toBe(testGithub);
});
