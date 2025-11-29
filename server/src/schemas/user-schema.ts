import mongoose from "mongoose";
import { IUser } from "../models/user-model";
import { encrypt } from "../utils/encrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    pictureUser: {
      type: Schema.Types.String,
      default: "default.png",
    },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activeCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre("save", function () {
  const user = this;
  // get password
  user.password = encrypt(user.password);
});

// model
const UserModel = mongoose.model<IUser>("User", UserSchema);

// export
export default UserModel;
