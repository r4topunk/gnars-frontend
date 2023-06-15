import { useQuery } from "@tanstack/react-query"
import { Provider } from "@wagmi/core"
import { Abi } from "abitype"
import { isAddress } from "viem"
import { useProvider } from "wagmi"

export interface RegularContractInfo {
  name: string
  abi: Abi
  address: `0x${string}`
  isProxy?: boolean
}
export interface ProxyContractInfo extends RegularContractInfo {
  implementation: ContractInfo | null
  implementationAddress: `0x${string}`
  isProxy: true
}

export type ContractInfo = RegularContractInfo | ProxyContractInfo

export const useEtherscanContractInfo = (address?: string) => {
  const provider = useProvider()
  return useQuery<ContractInfo | null>(
    ["etherscanAbi", address],
    async ({ signal }) => {
      if (!address || !isAddress(address)) return null

      return fetchContractInfo(address, provider, signal)
    }
  )
}

const fetchContractInfo = async (
  address: string,
  provider: Provider,
  signal?: AbortSignal | null
): Promise<ContractInfo | null> => {
  try {
    const contractInfo = await fetch(
      `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
      { signal }
    ).then((res) => res.json())

    if (contractInfo.status !== "1") return null

    const isProxy = contractInfo.result[0].Proxy === "1"

    if (isProxy) {
      const implementationAddress = contractInfo.result[0]
        .Implementation as `0x${string}`
      return {
        name: contractInfo.result[0].ContractName,
        abi: JSON.parse(contractInfo.result[0].ABI),
        address: address as `0x${string}`,
        isProxy,
        implementationAddress,
        implementation: await fetchContractInfo(
          implementationAddress,
          provider,
          signal
        ),
      }
    }

    return {
      name: contractInfo.result[0].ContractName,
      abi: JSON.parse(contractInfo.result[0].ABI),
      address: address as `0x${string}`,
      isProxy,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const isProxy = (
  contractInfo: ContractInfo
): contractInfo is ProxyContractInfo => contractInfo.isProxy === true

export const getProxyAndImplementations = (
  contractInfo: ContractInfo
): ContractInfo[] => {
  if (isProxy(contractInfo) && contractInfo.implementation) {
    return [
      contractInfo,
      ...getProxyAndImplementations(contractInfo.implementation),
    ]
  }

  return [contractInfo]
}

export const getEffectiveAbi = (contractInfo: ContractInfo): Abi =>
  getProxyAndImplementations(contractInfo).reduce(
    (effectiveAbi, currentContract) => [
      ...currentContract.abi,
      ...effectiveAbi,
    ],
    [] as Abi
  )