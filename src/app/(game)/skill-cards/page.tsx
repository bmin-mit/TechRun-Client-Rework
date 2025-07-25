'use client'

import { Box, Button, Card, For, Heading, Skeleton, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
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
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Card.Root overflow="clip">
      <Skeleton loading={!imageLoaded} w="full">
        <Image src={skillCardImage[card]} alt="" width="503" height="322" onLoad={() => setImageLoaded(true)} />
      </Skeleton>

      <Card.Body>
        <Button>Sử dụng</Button>
      </Card.Body>
    </Card.Root>
  )
}
