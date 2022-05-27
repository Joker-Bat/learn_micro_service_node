import mongoose from "mongoose";
import { Password } from "../services/password";

// Interface that describes Parameters type for creating new user
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes the properties that User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties that User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  next();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
