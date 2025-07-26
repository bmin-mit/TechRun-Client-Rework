import type { SkillCardAction } from '@/types/skill-card-action.enum'
import type { SkillCard } from '@/types/skill-card.enum'
import type { Team } from '@/types/team.types'

export interface SkillCardHistory {
  _id: string
  team: Team
  skillCard: SkillCard
  action: SkillCardAction
  createdAt: Date
}
