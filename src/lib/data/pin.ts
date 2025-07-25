'use client'

import Cookies from 'js-cookie'

export function savePin(pin: string, station: string) {
  Cookies.set(`pin-${station}`, pin)
}

export function getPin(station: string): string | undefined {
  return Cookies.get(`pin-${station}`)
}
