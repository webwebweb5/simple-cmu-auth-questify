// src/pages/api/auth/me.js
import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authorization = headers().get('authorization')

  if (!authorization) {
    return NextResponse.error("No Access Token!")
  }

  try {
    const response = await axios.get(
      "https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo",
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    const user = response.data;

    console.log(user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" });
  }
}
