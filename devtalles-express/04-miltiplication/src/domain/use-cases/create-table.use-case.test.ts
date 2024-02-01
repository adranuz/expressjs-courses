import {CreateTable} from './create-table.use-case'

describe("Create table use case instance", () => {
  test("should create a new instance of create table use case", () => {
    // Arrange:
    const createTable = new CreateTable();
    // Act:
    const table = createTable.execute({base: 2,limit: 10});
    const rows = table.split('\n').length;
    // Assert:
    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows).toBe(10);
    expect(table).toContain('2 x 2 = 4')
  });

  test("should create a new instance of create table use case", () => {
    // Arrange:
    const createTable = new CreateTable();
    // Act:
    const table = createTable.execute({base: 3,limit: 20});
    const rows = table.split('\n').length;
    // Assert:
    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows).toBe(20);
    expect(table).toContain('3 x 3 = 9')
  });
});