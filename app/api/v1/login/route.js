import { NextResponse } from "next/server";

export const POST = async (req) => {
  const request = await req.json();
  console.log(request);

  // Bind Database
  // Find a user in database
  // check password validity
  // return the response with the token
  // if password invalid return error respond
  // if user not found return error response
  
  return NextResponse.json({ success: true, username: "Harsha" });
};
