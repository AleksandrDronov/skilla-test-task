import { describe, expect, it } from 'vitest'
import {
  formatCallDuration,
  formatCallTime,
  formatPhoneNumber,
  formatRecordTime,
} from './formatters'

describe('formatters', () => {
  it('форматирует длительность записи в минуты и секунды с ведущим нулём', () => {
    expect(formatRecordTime(65)).toBe('1:05')
    expect(formatRecordTime(undefined)).toBe('0:00')
    expect(formatRecordTime(-10)).toBe('0:00')
  })

  it('скрывает отсутствующую длительность звонка', () => {
    expect(formatCallDuration(0)).toBe('')
    expect(formatCallDuration(undefined)).toBe('')
  })

  it('форматирует положительную длительность звонка', () => {
    expect(formatCallDuration(125)).toBe('2:05')
  })

  it('форматирует российские номера телефонов из распространённых форматов ввода', () => {
    expect(formatPhoneNumber('89161234567')).toBe('+7 (916) 123-45-67')
    expect(formatPhoneNumber('9161234567')).toBe('+7 (916) 123-45-67')
    expect(formatPhoneNumber('+7 916 123 45 67')).toBe('+7 (916) 123-45-67')
  })

  it('оставляет неизвестные форматы телефонов без изменений', () => {
    expect(formatPhoneNumber('12345')).toBe('12345')
  })

  it('форматирует валидную дату звонка в часы и минуты', () => {
    expect(formatCallTime('2026-06-10T09:05:00')).toBe('09:05')
  })

  it('возвращает пустую строку для невалидной даты звонка', () => {
    expect(formatCallTime('not-a-date')).toBe('')
  })
})
