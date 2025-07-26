'use client'

import { Box, Button, Card, Code, Flex, For, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { toaster } from '@/components/ui/toast'
import { useMyTeam } from '@/hooks/useMyTeam'
import { callUseCard } from '@/lib/data/team'
import { SkillCard, skillCardImage } from '@/types/skill-card.enum'

const skillCards = Object.values(SkillCard)

export default function SkillsPage() {
  return (
    <Box>
      <Heading textAlign="center" mb="4">Thẻ kỹ năng</Heading>

      <VStack gap="4">
        <For each={skillCards}>
          {card => <SkillCardTile key={card} card={card} />}
        </For>
      </VStack>
    </Box>
  )
}

function SkillCardTile({ card }: { card: SkillCard }) {
  const { data, isLoading, mutate } = useMyTeam()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [disable, setDisable] = useState(false)

  const skillCardCount = data?.skillCards?.filter(skillCard => skillCard === card).length ?? 0

  const callCard = async () => {
    try {
      setDisable(true)
      await callUseCard(card)
      void mutate()
      toaster.create({
        type: 'success',
        message: `Đã sử dụng thẻ kỹ năng ${getSkillCardDisplayName(card)}`,
      })
    }
    catch (error) {
      console.error('Error using skill card:', error)
      toaster.create({
        type: 'error',
        message: 'Không thể sử dụng thẻ kỹ năng',
      })
    }

    setDisable(false)
  }

  return (
    <Card.Root overflow="clip">
      <Skeleton loading={!imageLoaded} w="full">
        <Image src={skillCardImage[card]} alt="" width="503" height="322" onLoad={() => setImageLoaded(true)} />
      </Skeleton>

      <Card.Body>
        <Skeleton loading={isLoading} w="full" asChild>
          <Flex position="relative" h="10">
            <Box alignSelf="center">
              <Text as="span" fontFamily="space" my="auto">Đang có </Text>
              <Code as="span">{skillCardCount}</Code>
            </Box>
            <Button w="fit" disabled={skillCardCount <= 0 || disable} position="absolute" right="0" onClick={callCard}>Sử dụng</Button>
          </Flex>
        </Skeleton>
      </Card.Body>
    </Card.Root>
  )
}
