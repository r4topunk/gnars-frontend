import * as dotenv from "dotenv"
dotenv.config()
import Fastify from "fastify"
import fastifySensible from "@fastify/sensible"
import cors from "@fastify/cors"
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { Static, Type } from "@sinclair/typebox"

import { startWorker } from "./worker"
import { prisma } from "./constants"

const PORT = process.env["PORT"] ?? 3001
const fastify = Fastify()
fastify.register(fastifySensible)
fastify.register(cors)
fastify.withTypeProvider<TypeBoxTypeProvider>()

const GnarIdParams = Type.Object({
  gnarId: Type.Integer(),
})

type GnarIdParamsType = Static<typeof GnarIdParams>

fastify.get("/ping", async (req, rep) => {
  rep.send({ pong: true })
})

fastify.get<{ Params: GnarIdParamsType }>(
  "/bids/:gnarId",
  { schema: { params: GnarIdParams } },
  async (req, rep) => {
    const { gnarId } = req.params
    const res = await prisma.bid.findMany({
      where: { auctionId: gnarId },
      select: {
        sender: true,
        amount: true,
        timestamp: true,
        transactionHash: true,
      },
      orderBy: [{ timestamp: "desc" }],
    })

    if (!res) return rep.send(null)
    return rep.send(res)
  }
)

fastify.get<{ Params: GnarIdParamsType }>(
  "/winner/:gnarId",
  { schema: { params: GnarIdParams } },
  async (req, rep) => {
    const { gnarId } = req.params
    const res = await prisma.winner.findUnique({
      where: { auctionId: gnarId },
      select: {
        sender: true,
        amount: true,
        timestamp: true,
      },
    })

    if (!res) return rep.send(null)
    return rep.send(res)
  }
)

fastify.get<{ Params: GnarIdParamsType }>(
  "/auction/:gnarId",
  { schema: { params: GnarIdParams } },
  async (req, rep) => {
    const { gnarId } = req.params
    const res = await prisma.auction.findUnique({
      where: { gnarId: gnarId },
      select: {
        startTimestamp: true,
        endTimestamp: true,
        bids: {
          select: {
            sender: true,
            amount: true,
            timestamp: true,
            transactionHash: true,
          },
          orderBy: [{ timestamp: "desc" }],
        },
      },
    })

    if (!res) return rep.send(null)
    return rep.send(res)
  }
)

fastify.get("/latest-auction", async (req, rep) => {
  const res = await prisma.auction.findFirst({
    orderBy: { gnarId: "desc" },
    select: {
      gnarId: true,
      startTimestamp: true,
      endTimestamp: true,
      bids: {
        select: {
          sender: true,
          amount: true,
          timestamp: true,
          transactionHash: true,
        },
        orderBy: [{ timestamp: "desc" }],
      },
    },
  })

  if (!res) return rep.send(null)
  return rep.send({ ...res, hasFinished: res.endTimestamp! <= new Date() })
})

const startServer = async () => {
  try {
    await fastify.listen({
      host: "0.0.0.0",
      port: Number(PORT),
    })
    console.log(`Server live at http://0.0.0.0:${PORT}`)
  } catch (err) {
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}
startServer()
startWorker()