"use client"

import { ChakraProvider, DarkMode, Divider, VStack } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/react"
import Footer from "components/Footer"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { WagmiConfig, createConfig } from "wagmi"

import { BaseAlertHeader } from "components/BaseJumpAnnouncement"
import { alchemyApiKey, walletConnectProjectId } from "constants/env"
import Head from "next/head"
import { queryClient } from "utils"
import { mainnet } from "wagmi/chains"
import theme from "../theme"

const config = createConfig({
  ...getDefaultConfig({
    appName: "Gnars",
    alchemyId: alchemyApiKey,
    chains: [mainnet],
    walletConnectProjectId,
  }),
  persister: null,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <WagmiConfig config={config}>
            <ConnectKitProvider theme={"midnight"} options={{ enforceSupportedChains: false, initialChainId: 1 }}>
              <QueryClientProvider client={queryClient}>
                <DarkMode>
                  <VStack minH={"full"} spacing={10}>
                    <Head>
                      <title>Gnars DAO</title>
                    </Head>
                    <BaseAlertHeader />
                    {children}
                    <Divider />
                    <Footer />
                  </VStack>
                  <Analytics debug={false} />
                </DarkMode>
              </QueryClientProvider>
            </ConnectKitProvider>
          </WagmiConfig>
        </ChakraProvider>
      </body>
    </html>
  )
}
