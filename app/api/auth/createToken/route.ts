import { type NextRequest, NextResponse } from "next/server";
import { sign as jwtsign } from "jsonwebtoken"
import { ITokenResponse } from "@/types/api/tokenEndpoint";

const TOKEN_AGE: string = '7d'

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  try {
    const ip = requestHeaders.get('x-forwarded-for')
    const userAgent = requestHeaders.get("user-agent")
    const token = jwtsign({ userAgent, ip }, process.env.JWT_API_CONTROL_KEY, { expiresIn: TOKEN_AGE, issuer: process.env.JWT_API_ISSUER })
    const response: ITokenResponse = { success: true, token }
    return NextResponse.json(response)
  } catch (err) {
    const response: ITokenResponse = { success: false }
    return NextResponse.json(response, { status: 500 })
  }
}