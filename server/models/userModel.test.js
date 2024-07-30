const mongoose = require('mongoose');
const UserModel = require("./userModel");
const dotenv = require("dotenv");
dotenv.config();

describe("UsherModel Test", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
    await UserModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
})


it("create & save user successfully", async () => {
    const userData = {
        username: "eleni.veniou",
        email: "eleni.veniou@gmail.com",
        password: "123456",
        role : "admin"
    }
    
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save()

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).not.toBe(userData.password);
    expect(savedUser.role).toBe(userData.role);
})

it("Save user successfully but it there is a field which is not defined in schema the this field should be undefinied", async () =>{
    const invalidField = new UserModel({
        username: "eleni.veniou",
        lastName: "Nikolidaki",
        email: "eleni.veniou@gmail.com",
        password: "123456",
        role : "admin"
    })
    const savedinvalidField = await invalidField.save();
    expect(savedinvalidField._id).toBeDefined();
    expect(savedinvalidField.nickname).toBeUndefined()
//     const invalidUser = new UserModel(userData);
//     const userWithInvalidField = await invalidUser.save()
//     const savedUserObject = userWithInvalidField.toObject();
//   expect(savedUserObject.lastName).toBeUndefined();
})

it('create user without required field should fail',async () => {
    let err;
    try {
        const userData = new UserModel({ 
            email: "eleni.veniou@gmail.com"
        })
        await UserModel.save()
    } catch(error){
        err = error
    }
    expect(err).toBeDefined();
});

});