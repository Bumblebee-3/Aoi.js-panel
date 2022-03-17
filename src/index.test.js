describe("Exports", () => {
  it("should have an THeme export", () => {
    const pkg = require('./index');
    expect(pkg.Dash).toBeDefined();
  })
})