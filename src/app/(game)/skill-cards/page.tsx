'use client'

import { Box, Button, Card, Code, Flex, For, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { useMyTeam } from '@/hooks/useMyTeam'
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
  const { data, isLoading } = useMyTeam()
  const [imageLoaded, setImageLoaded] = useState(false)

  const skillCardCount = data?.skillCards?.filter(skillCard => skillCard === card).length ?? 0

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
            <Button w="fit" disabled={skillCardCount <= 0} position="absolute" right="0">Sử dụng</Button>
          </Flex>
        </Skeleton>
      </Card.Body>
    </Card.Root>
  )
}
