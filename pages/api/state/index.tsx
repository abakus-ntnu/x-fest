import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  state: string
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ state: "State from API" });
}
export default handler;
