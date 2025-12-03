import mongoose from "mongoose";
import { IUser } from "../models/user-model";
import { encrypt } from "../utils/encrypt";
import { renderEmail, sendEmail } from "../utils/mail/mail";

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

  // generate active code
  user.activeCode = encrypt(user._id.toString());
});

// send email if user succes created
UserSchema.post("save", async function (doc, next) {
  const user = doc;

  console.log("🔥 POST SAVE HOOK TERPANGGIL UNTUK:", user.email);

  const contentEmail = await renderEmail("registration-succes.ejs", {
    username: user.username,
    fullname: user.fullName,
    email: user.email,
    registeredAt: user.createdAt,
    activationLink: `${process.env.CLIENT_URL}/auth/activation?code=${user.activeCode}`,
  });

  console.log("📄 TEMPLATE EMAIL LENGTH:", contentEmail.length);

  await sendEmail(user.email, "Registration Success", contentEmail);

  next();
});

// model
const UserModel = mongoose.model<IUser>("User", UserSchema);

// export
export default UserModel;
