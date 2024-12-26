import { NextResponse } from "next/server";

export const POST = async (req) => {
  const request = await req.json();
  console.log(request);
  return NextResponse.json({ success: true, username: "Harsha" });
  //const response = await fetch('https://api.github.com/users/octocat');
};
