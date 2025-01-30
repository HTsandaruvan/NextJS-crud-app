import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    //console.log("Form Data :", name, email, password);
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const passwordValidation = {
      minLength: 8,
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      specialCharacter: /[@$!%*?&]/,
    };
    // Check if any field is missing
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Name validation
    if (!nameRegex.test(name)) {
      return NextResponse.json(
        { error: "Name can only contain letters and spaces" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    // Email validation
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password validations
    if (password.length < passwordValidation.minLength) {
      return NextResponse.json(
        {
          error: `Password must be at least ${passwordValidation.minLength} characters long`,
        },
        { status: 400 }
      );
    }

    if (!passwordValidation.uppercase.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter" },
        { status: 400 }
      );
    }

    if (!passwordValidation.lowercase.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter" },
        { status: 400 }
      );
    }

    if (!passwordValidation.number.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one number" },
        { status: 400 }
      );
    }

    if (!passwordValidation.specialCharacter.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must contain at least one special character (@, $, !, %, *, ?, &)",
        },
        { status: 400 }
      );
    }
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exist" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createAt: new Date(),
    });

    if (user && user.acknowledged) {
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        userData: {
          userId: user.insertedId,
          name,
          email,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    //console.log("existing user", existingUser);
  } catch (error) {
    //console.log("mongodb error", error);
    return NextResponse.json(
      { error: "MongoDB connection failed" },
      { status: 500 }
    );
  }
};
