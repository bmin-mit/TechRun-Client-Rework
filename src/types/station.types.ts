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
}
