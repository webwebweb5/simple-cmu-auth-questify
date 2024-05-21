// src/pages/api/auth/token.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { code } = await req.json();

  if (!code) {
    return new Response('Code not found', { status: 400 });
  }

  const tokenUrl = 'https://oauth.cmu.ac.th/v1/GetToken.aspx';
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const clientId = process.env.NEXT_PUBLIC_CMU_OAUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_CMU_OAUTH_CLIENT_SECRET;

  try {
    const tokenResponse = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log(tokenResponse.data);

    const { access_token: accessToken } = tokenResponse.data;

    const userResponse = await axios.get(
      "https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = userResponse.data;

    console.log(user);

    return NextResponse.json({ accessToken, user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
