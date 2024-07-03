import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcryptjs as a default import

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Hash the password with bcryptjs
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

export const User = mongoose.models.User || model("User", schema);

