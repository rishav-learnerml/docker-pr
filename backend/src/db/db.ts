import mongoose, { model, Schema } from "mongoose";

const mongoUrl: string = "mongodb://mongodbusers:27017/users";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Succesfully connected to MongoDb..."))
  .catch(() => console.log("Unable to connect to MongoDb..."));

interface IUser {
  username: string;
  password: string;
}

const userSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = model<IUser>("User",userSchema);

export default User;
