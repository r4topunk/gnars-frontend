import TextLink from "./TextLink"
import {
  Box,
  DarkMode,
  Heading,
  HStack,
  Image,
  LightMode,
  SimpleGrid,
  Text,
  VStack,
  chakra,
  AspectRatio,
  Stack,
  Code,
} from "@chakra-ui/react"
import Link from "next/link"

export default function Explainer() {
  return (
    <Box color={"chakra-body-text"} bgColor={"chakra-body-bg"}>
      <VStack
        px={6}
        pt={{ base: 10, sm: 32 }}
        spacing={{ base: 10, sm: 32 }}
        w={"full"}
        justifyContent={"center"}
      >
        <Stack
          px={0}
          w={"full"}
          direction={{ base: "column", xl: "row" }}
          spacing={{ base: 10, sm: 32 }}
          justifyContent={"center"}
          alignItems={"start"}
        >
          <Text
            textStyle={"h1"}
            fontSize={{
              base: "calc(60px + (128 - 60) * ((100vw - 375px) / (1280 - 375)))",
              xl: "8xl",
            }}
          >
            ONE GNAR,
            <br />
            LESS OFTEN,
            <br />
            FOREVER.
          </Text>
          <AspectRatio ratio={16 / 9} w={{ base: "full", md: "xl", xl: "2xl" }}>
            <chakra.iframe
              width="full"
              height="full"
              src="https://www.youtube.com/embed/JQSmfSnRGVk?rel=0&modestbranding=1&controls=1"
              title="Gnars: The New Way Skateboarding Pros Earn $$"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </AspectRatio>
        </Stack>

        <div id="wtf" className="flex justify-center container">
          <div className="w-full sm:w-2/3">
            <div className="text-6xl font-secondary">WTF?</div>
            <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
              <p>
                <TextLink href="https://gnars.com"> Gnars</TextLink> is a
                community owned (and run) extreme sports club. We prefer a world
                where kids aren’t shilled energy drinks by their heroes. So as a
                community of action sports enthusiasts, we’ve formed a DAO to
                rethink how shredders get sponsored.
              </p>

              <p>
                Based on Nouns open source code and CC0 artwork, they’re stored
                fully on-chain on Ethereum with no external dependencies (not
                even IPFS), and each one represents a DAO vote. We’re changing
                the way extreme sport is funded with{" "}
                <TextLink href="https://nouns.wtf/vote/51">
                  backing from Nouns DAO
                </TextLink>
                .
              </p>

              <p>
                Start creating Gnars off-chain using the{" "}
                <TextLink href={"/playground"}>Playground</TextLink> or learn
                more at <TextLink href="https://gnars.com">gnars.com</TextLink>.
              </p>
            </div>

            <div className="pb-12">
              <h2 className="text-4xl font-secondary">Summary</h2>
              <div className="pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <ul className="list-disc list-inside">
                  <li>Gnars artwork is in the public domain.</li>
                  <li>
                    One Gnar is trustlessly auctioned every 10 minutes, then
                    less often, forever.
                  </li>
                  <li>
                    By “less often” we mean auction length doubles every 1000
                    auctions.
                  </li>
                  <li>
                    Gnar auction proceeds are trustlessly sent to the treasury
                    and founder.
                  </li>
                  <li>
                    Setting the bid slider determines the resulting percentage
                    split.
                  </li>
                  <li>Settlement of one auction kicks off the next.</li>
                  <li>All Gnars are members of Gnars DAO.</li>
                  <li>One Gnar is equal to one vote.</li>
                  <li>
                    The treasury is controlled exclusively by Gnars via
                    governance.
                  </li>
                  <li>
                    Artwork is generative and stored directly on-chain (not
                    IPFS).
                  </li>
                  <li>Shredders receive 10% of supply.</li>
                </ul>
              </div>

              <h2 className="text-4xl font-secondary">Gnarving Auctions</h2>
              <Stack
                direction={{ base: "column", xl: "row-reverse" }}
                className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor"
                alignItems={"center"}
              >
                <VStack flexShrink={0} w={{ base: "full", sm: "sm" }}>
                  <Heading>Auctions</Heading>
                  <Image src="/images/auction-chart.png" />
                  <SimpleGrid
                    columns={2}
                    w={"full"}
                    px={8}
                    fontFamily={'"Londrina Solid", sans-serif'}
                    fontSize={["2xl", "3xl"]}
                  >
                    <HStack>
                      <Box boxSize={4} bgColor={"#E53B44"} />
                      <Text> Per day</Text>
                    </HStack>
                    <HStack>
                      <Box boxSize={4} bgColor={"#0484D1"} />
                      <Text> Duration</Text>
                    </HStack>
                  </SimpleGrid>
                </VStack>
                <VStack spacing={8}>
                  <p>
                    The Gnars Auction Contract will act as a self-sufficient
                    Gnar generation and distribution mechanism, auctioning one
                    Gnar every 10 minutes, then less often, forever. As per the
                    supply curve diagram shown above, auction duration doubles
                    every 1000 auctions, known as “The Gnarving” and in effect
                    halving the supply emission each time.
                  </p>
                  <p>
                    Auction proceeds (ETH) are automatically sent to the Gnars
                    DAO treasury and to our founder 0xigami.eth, depending on
                    what balance you set with the bid slider. You can even
                    choose not to reward the founder if you wish. Funds received
                    to the treasury are governed by Gnar owners.
                  </p>
                  <p>
                    Each time an auction is settled, the settlement transaction
                    will also cause a new Gnar to be minted and a new auction to
                    begin. While settlement is most heavily incentivized for the
                    winningbidder, it can be triggered by anyone, allowing the
                    system to trustlessly auction Gnars as long as Ethereum is
                    operational and there are interested bidders.
                  </p>
                </VStack>
              </Stack>

              <h2 className="text-4xl font-secondary">
                Bidding and Settling Auctions
              </h2>
              <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <div className="flex flex-col">
                  <div className="font-bold text-xl">Settlement</div>
                  <div>
                    Anyone can settle an auction. When an auction ends, a
                    gas-only transaction is required to start the next auction
                    and mint the current Gnar to the winner’s wallet. As gas
                    prices fluctuate, the cost of settlement also fluctuates.
                  </div>
                </div>
                <div>
                  Cost of settlement for every Gnar ID ending in 6 is higher as
                  it consumes more gas. This is due to the transaction also
                  triggering the free Gnar mint: all Gnars ending in 7 are sent
                  to the treasury and held on behalf of the Shredders.
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-xl">Bids</div>
                  <div>
                    Once an auction starts, everyone has 10 minutes to bid
                    (auction duration doubles every 1000 auctions from #627
                    onwards). Anyone can bid an amount at/above 0.011 ETH. If
                    your bid is outbid by someone else, the full amount of your
                    bid (minus gas spent to bid) is returned to you in the same
                    transaction as the new higher bid.
                  </div>
                </div>
                <div>
                  Bids at the very last minute DO NOT increase the auction time.
                  Instead, you have the opportunity to snipe the auction with a
                  winning bid during the final moments. Sometimes, multiple bids
                  are sent at the same time, but only one will be accepted by
                  the auction house contract.
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-xl">Bid Refunds</div>
                  <div>
                    Unsuccessful bids are refunded in full. Refunds are sent via
                    an internal transaction included in the transaction of a new
                    higher bid. This means that refunds for unsuccessful bids
                    occur when a higher bid is received.
                  </div>
                </div>
              </div>

              <h2 className="text-4xl font-secondary">Gnars DAO</h2>
              <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <p>
                  Gnars DAO utilizes a Gnosis Safe multisig, which combined with
                  Zodiac Reality Module and Snapshot, allows for gasless
                  governance voting. Gnars DAO is the main governing body of the
                  Gnars ecosystem and the Gnars DAO treasury receives whatever
                  percentage of ETH proceeds bidders choose at time of bidding.
                </p>
                <p>
                  Each Gnar is an irrevocable member of Gnars DAO and entitled
                  to one vote in all governance matters. Gnar votes are
                  non-transferable (if you sell your Gnar the vote goes with it)
                  but delegatable, which means you can assign your vote to
                  someone else as long as you own your Gnar.
                </p>
              </div>

              <h2 className="text-4xl font-secondary">Gnar Traits</h2>
              <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <p>
                  Gnars are generated randomly based on Ethereum block hashes.
                  There are no 'if' statements or other rules governing Gnar
                  trait scarcity, which makes all Gnars equally rare. As of this
                  writing, Gnars are made up of:
                </p>
                <ul className="list-disc list-inside leading-8 sm:leading-10">
                  <li>backgrounds (12)</li>
                  <li>bodies (30)</li>
                  <li>accessories (153)</li>
                  <li>heads (235)</li>
                  <li>glasses (68)</li>
                </ul>
                <p>
                  You can experiment with off-chain Gnar generation at the {""}
                  <TextLink href={"/playground"}>Playground</TextLink>, or
                  browse through different traits by using filters on your
                  favorite NFT marketplace.
                </p>
              </div>
              <h2 className="text-4xl font-secondary">On-Chain Artwork</h2>
              <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <p>
                  Gnars are stored directly on Ethereum and do not utilize
                  pointers to other networks such as IPFS. This is possible
                  because Gnar parts are compressed and stored on-chain using a
                  custom run-length encoding (RLE), which is a form of lossless
                  compression.
                </p>
                <p>
                  The compressed parts are efficiently converted into a single
                  base64 encoded SVG image on- chain. To accomplish this, each
                  part is decoded into an intermediate format before being
                  converted into a series of SVG rects using batched, on-chain
                  string concatenation. Once the entire SVG has been generated,
                  it is base64 encoded.
                </p>
              </div>
              <h2 className="text-4xl font-secondary">Gnar Seeder Contract</h2>
              <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <p>
                  The Gnar Seeder contract is used to determine Gnar traits
                  during the minting process. The seeder contract can be
                  replaced to allow for future trait generation algorithm
                  upgrades. Additionally, it can be locked by the Gnars DAO to
                  prevent any future updates. Currently, Gnar traits are
                  determined using pseudo-random number generation:
                </p>
                <Code colorScheme={"red"} p={4}>
                  keccak256(
                  <wbr />
                  abi.encodePacked(
                  <wbr />
                  blockhash(block.number - 1), gnarId))
                </Code>
                <p>
                  Trait generation is not truly random. Traits can be predicted
                  when minting a Gnar on the pending block.
                </p>
              </div>
              <h2 className="text-4xl font-secondary">0xigami’s Reward</h2>
              <div className="flex flex-col gap-8 pt-8 pb-10 mb-10 border-b-2 border-borderColor">
                <p>0xigami is the builder that initiated Gnars.</p>
                <p>
                  You have the choice to reward 0xigami with a percentage of a
                  successful bid, a tip, by setting the slider to a suitable
                  position. By default the slider is set to the midpoint, as a
                  50/50 split meaning that half of your bid, if successful,
                  would be deposited to 0xigami.eth during settlement.
                </p>
                <p>
                  From time to time we change the tip recipient in order to
                  facilitate promotions with other CC0 projects included in our
                  protocol. For example, Nounvember, where all tips during the
                  month of November are sent to the Nouns DAO treasury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </VStack>
    </Box>
  )
}
