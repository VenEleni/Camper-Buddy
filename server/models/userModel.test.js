// const UserModel = require("./userModel");

// const userData = {
//     name: "Eleni",
//     lastName: "Veniou",
//     email: "eleni.veniou@gmail.com",
//     password: "123456",
//     address: "Athens",
//     phoneNumber: 6976543210
// }

// const user = new UserModel(userData);

// test("user model", () => {
    
//     expect(user.name).toBe(userData.name);
//     expect(user.lastName).toBe(userData.lastName);
//     expect(user.email).toBe(userData.email);
//     expect(user.phoneNumber).toBe(userData.phoneNumber);
//     expect(user.address).toBe(userData.address);
//     expect(user._id).toBeDefined();
//     expect(user.password).toBeDefined();
// })

// test("testing reference equality", () => {
//     expect(user).toEqual(
//         expect.objectContaining({
//             name: expect.any(String),
//             lastName: expect.any(String),
//             email: expect.any(String),
//             phoneNumber: expect.any(Number),
//             address: expect.any(String)
//         })
//     )
// })

// test("should return the correct values", () => {
    
//     expect(userData).toEqual({name: "Eleni",
//         lastName: "Veniou",
//         email: "eleni.veniou@gmail.com",
//         password: "123456",
//         address: "Athens",
//         phoneNumber: 6976543210})
// })

// test("a field not defined in schema should be undefined", () => {
//     const user = new UserModel(userData);
//     expect(user.age).toBeUndefined();
// })