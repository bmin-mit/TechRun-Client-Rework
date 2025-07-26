import type { SkillCardHistory } from '@/types/skill-card-history.types'
import { requests } from '@/lib/data/requests'
import { SkillCard } from '@/types/skill-card.enum'

export async function getTeamSkillCardHistory(
  teamUsername: string,
  stationCodename: string,
  pin: string,
): Promise<SkillCardHistory[]> {
  const res = await requests.post(`/team/skill-card-history/${teamUsername}`, {
    stationCodename,
    pin,
  })
  return res.data
}

export function getSkillCardDisplayName(
  skillCard: SkillCard,
): string {
  switch (skillCard) {
    case SkillCard.DONG_BO:
      return 'Thẻ Đồng Bộ'
    case SkillCard.GAMBLE:
      return 'Thẻ Gamble'
    case SkillCard.HO_TRO:
      return 'Thẻ Hỗ Trợ'
    case SkillCard.HOI_SINH:
      return 'Thẻ Hồi Sinh'
    case SkillCard.LAG_MAY:
      return 'Thẻ Lag Máy'
    case SkillCard.NGOI_SAO_HI_VONG:
      return 'Thẻ Ngôi Sao Hi Vọng'
    case SkillCard.VUOT_TRAM_MINIGAME:
      return 'Thẻ Vượt Trạm Minigame'
    default:
      return skillCard
  }
}
