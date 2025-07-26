import type { SkillCard } from '@/types/skill-card.enum'

export interface Auction {
  _id: string
  skillCard: SkillCard
  endTime: Date
  durationInSeconds: number
}
