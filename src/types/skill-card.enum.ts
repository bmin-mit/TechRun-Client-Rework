// TODO recheck api values (outdated card names)

export enum SkillCard {
  DONG_BO = 'dong_bo',
  NGOI_SAO_HI_VONG = 'ngoi_sao_hi_vong',
  VUOT_TRAM_MINIGAME = 'vuot_tram_phu',
  HO_TRO = 'tang_goi_y',
  LAG_MAY = 'lag_may',
  GAMBLE = 'gamble',
  HOI_SINH = 'hoi_sinh',
}

export const skillCardImage: { [key in SkillCard]: string } = {
  dong_bo: '/dong-bo.png',
  ngoi_sao_hi_vong: '/ngoi-sao-hy-vong.png',
  vuot_tram_phu: '/vuot-tram-minigame.png',
  tang_goi_y: '/ho-tro.png',
  lag_may: '/lag-may.png',
  gamble: '/gamble.png',
  hoi_sinh: '/hoi-sinh.png',
}

export const skillCardBasePrice: { [key in SkillCard]: number } = {
  dong_bo: 3,
  ngoi_sao_hi_vong: 3,
  vuot_tram_phu: 2,
  tang_goi_y: 3,
  lag_may: 4,
  gamble: 2,
  hoi_sinh: 5,
}
