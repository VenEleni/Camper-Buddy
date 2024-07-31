const mongoose = require('mongoose');
const UserModel = require("./userModel");
const dotenv = require("dotenv");
dotenv.config();

//connect in a different db for running tests so we won't effect the db we use for the app
describe("UsherModel Test", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI_TEST);
});

// mongoose method (deleteMany) to clear the UserModel after each test
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
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.role).toBe(userData.role);
})

it("Save user successfully but it there is a field which is not defined in schema the this field should be undefined", async () =>{
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
})

it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new UserModel({ username: 'testuser' });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      err = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError); //ValidationError is a type of error that mongoose throws when we can't save() successfully. 
    expect(err.errors).toBeDefined(); // the error mongoose returns is an obj with message(describes the error),name and errors. So if we got an error from above. the err.error should not be undefinied but it should contain a value. 
    expect(err.errors.email).toBeDefined(); //inside the errors there in another obj. this obj has as key the fields of the user which are required to fill. 
    expect(err.errors.password).toBeDefined();// so here it was required to fill the password in order to save a user. So we'll also find the password key inside the errors, which won't be undefined, because it should contain another obj inside describing the error 
                                           // e.x : errors.password.message === "Path `password` is required."
  });
});