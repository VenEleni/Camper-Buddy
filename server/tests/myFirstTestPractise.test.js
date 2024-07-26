//we can have multiple expectations in the same test but it's not recommended

test("1 plus 1 should return 2", () => {
  let a = 1;
  let b = 1;
  expect(a + b).toBe(2);
});

test("5 plus 9 should not return 11", () => {
  let a = 5;
  let b = 9;
  expect(a + b).not.toBe(11);
});

//or we can wrap multiple tests using describe

describe("number operations", () => {
  test("1 plus 1 should return 2", () => {
    let a = 1;
    let b = 3;
    expect(a + b).toBe(4);
  });

  test("5 plus 9 should not return 11", () => {
    let a = 11;
    let b = 9;
    expect(a + b).not.toBe(16);
  });
});

//instead of test() we can write it(). it's the same

test("1 plus 1 should return 2", () => {
  let a = 1;
  let b = 3;
  expect(a + b).toBeGreaterThanOrEqual(4);
});

test("there should not be I in team", () => {
  let string = "team";
  expect(string).not.toMatch("I"); // or like this toMatch(/E/)
  expect(string).not.toMatch(/I/i); // we can add -i- after/ so it'll search for both capital and lowercase letter. It only works for this syntax "(/E/i)" not for ("E"i)
});

test("there is stop in Christopher", () => {
  let string = "ChrisTopher";
  expect(string).toMatch(/stop/i);
});

//testing if an array contains a string

const shoppingList = ["coconut", "peanut", "avocado"];
test("the shopping list doesn't have candle", () => {
  expect(shoppingList).not.toContain(/candle/);

  shoppingList.forEach((element) => {
    expect(element).not.toMatch(/PEANUT/);
  });
});

//testing object equality

describe("tesing reference equality", () => {
  const user = {
    name: "Eleni",
  };
  user["age"] = 30; //or user.age = 30;
  test("should return a user object with age as 30", () => {
    expect(user).toEqual({ name: "Eleni", age: 30 }); //we can't use toBe method, because toBe tests primitive types (number, string, boolean etc)
  });

  test("should return a user with name and age key and with the correct type of value", () => {
    expect(user).toEqual(//we expect an object to be equal to:
      expect.objectContaining({ //an object that contains:
        name: expect.any(String), //this key. and we expect this key to contain a String as a value
        age: expect.any(Number), //this key. and we expect this key to contain a Number as a value
      })
    );
  });

  //testing array equality

  test("array equality", () => {
    const shoppingList = ["coconut", "peanut", "avocado"];
    shoppingList.push("bananas");
    expect(shoppingList).toEqual(["coconut", "peanut", "avocado", "bananas"]);
    //to see if it contains a specific value:
    expect(shoppingList).toEqual(expect.arrayContaining(["coconut"]))
    expect(shoppingList).toEqual(expect.arrayContaining([expect.any(String)])) //search if there is any value as a string inside the array.
    // Values don't have to be all of them Strings. If I have at least one String inside the array, it'll be passed.
  });

  test("complex array equality", () => {
    const users = [
        {
            name: "Eleni",
            age: 30
        },
        {
            name: "Zahos",
            lastName: "Dogkanos",
            age: 39
        },
        {
            name: "Tsourekakis",
            age: 37
        }
    ]

    users.push({
        name: "Totos",
        age: 46
    })

    expect(users).toEqual(
        expect.arrayContaining([ //we expect an array that contains:
            expect.objectContaining({//we expect an object that contains:
                name: expect.any(String), //this key. and we expect this key to contain a String as a value
                age: expect.any(Number), //this key. and we expect this key to contain a Number as a value
            })
        ])
      )
  })

 
});
