export enum StationPosition {
  THSG = 'thsg',
  KHTN = 'khtn',
  KHTN_THSG = 'khtn_thsg',
}

export interface Station {
  _id: string
  name: string
  codename: string
  difficulty: string
  stationGroup: StationGroup
}

export interface StationGroup {
  _id: string
  name: string
  codename: string
  position: StationPosition
}
