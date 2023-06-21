import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { QueryKey, useQueryClient } from "@tanstack/react-query"
import { AccountAddress } from "components/AccountAddress"
import { AccountWithAvatar } from "components/AccountWithAvatar"
import { isValidName } from "ethers/lib/utils.js"
import { useAccountQuery } from "hooks/useAccountQuery"
import { FC, useState } from "react"
import { useDebounce } from "usehooks-ts"
import { useGnarsV2TokenDelegate } from "utils/sdk"
import { mainnet } from "wagmi"

export interface UpdateDelegateModalProps extends Omit<ModalProps, "children"> {
  delegationQueryKey: QueryKey
  currentDelegate: string
}

export const UpdateDelegateModal: FC<UpdateDelegateModalProps> = ({
  delegationQueryKey,
  currentDelegate,
  onClose,
  ...props
}) => {
  const { invalidateQueries } = useQueryClient()
  const [accountQuery, setAccountQuery] = useState<string>("")
  const debouncedAccountQuery = useDebounce(accountQuery, 600)
  const { isLoading, address, ensAvatar, nnsOrEnsName } = useAccountQuery(
    debouncedAccountQuery
  )
  const toast = useToast()
  const { writeAsync: delegate, isLoading: isDelegating } =
    useGnarsV2TokenDelegate({
      mode: "recklesslyUnprepared",
      args: [address!],
      chainId: mainnet.id,
    })
  return (
    <Modal isCentered onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent w={"fit-content"} color={"chakra-body-text"}>
        <ModalHeader>Delegate votes</ModalHeader>
        <ModalBody>
          <VStack alignItems={"start"} spacing={10}>
            <FormControl>
              <FormLabel>Delegate</FormLabel>
              <Input
                id={"destination"}
                value={accountQuery}
                onChange={(e) => setAccountQuery(e.target.value)}
                placeholder="gnars.eth / 0x558bfff0d583416f7c4e380625c7865821b8e95c"
              />
              <FormHelperText>
                You can use an address or an ENS name
              </FormHelperText>
            </FormControl>
            <AccountWithAvatar
              isLoading={isLoading}
              address={address}
              avatarImg={ensAvatar}
            >
              {!address && (
                <Text>
                  {!!accountQuery
                    ? accountQuery
                    : "Enter the destination account"}
                </Text>
              )}
              {accountQuery && !address && !isLoading && (
                <Text color={"red.300"}>
                  {isValidName(accountQuery)
                    ? "Account not found"
                    : "Invalid query. Use an address or ens name"}
                </Text>
              )}
              {address && <AccountAddress truncate address={address} />}
            </AccountWithAvatar>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              onClick={() => {
                setAccountQuery("")
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={isDelegating}
              loadingText={"Delegating"}
              isDisabled={
                !address ||
                currentDelegate.toLowerCase() === address.toLowerCase()
              }
              onClick={() =>
                delegate()
                  .then((tx) => tx.wait())
                  .then(() => {
                    invalidateQueries(delegationQueryKey)
                    setAccountQuery("")
                    onClose()
                  })
                  .catch(() =>
                    toast({
                      status: "error",
                      title: "Error",
                      description:
                        "Something went wrong. Check your wallet for details",
                    })
                  )
              }
            >
              Delegate
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}