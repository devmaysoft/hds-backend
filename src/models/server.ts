import { NextApiRequest, NextApiResponse } from 'next'

export interface ServerCtx {
  req: NextApiRequest
  res: NextApiResponse
  pathname: string
}

export interface AuthPayload {
  readonly userId: number
}

export interface RefreshTokenPayload {
  readonly userSecret: string
}