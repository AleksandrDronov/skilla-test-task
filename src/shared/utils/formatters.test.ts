import { describe, expect, it } from 'vitest'
import { formatCallDuration, formatPhoneNumber, formatRecordTime } from './formatters'

describe('formatters', () => {
  it('formats call duration as mm:ss', () => {
    expect(formatCallDuration(726)).toBe('12:06')
    expect(formatCallDuration(61)).toBe('1:01')
    expect(formatCallDuration(0)).toBe('')
  })

  it('formats record time as mm:ss and keeps zero value visible', () => {
    expect(formatRecordTime(0)).toBe('0:00')
    expect(formatRecordTime(608)).toBe('10:08')
  })

  it('formats russian phone numbers from API values', () => {
    expect(formatPhoneNumber('79875671712')).toBe('+7 (987) 567-17-12')
    expect(formatPhoneNumber('+7 (912) 587-19-34')).toBe('+7 (912) 587-19-34')
  })
})
