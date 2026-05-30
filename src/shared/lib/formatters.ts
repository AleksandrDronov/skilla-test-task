const PHONE_DIGITS_COUNT = 11

export const formatRecordTime = (seconds?: number | null) => {
  const safeSeconds = Math.max(0, Math.floor(seconds ?? 0))
  const minutes = Math.floor(safeSeconds / 60)
  const restSeconds = safeSeconds % 60

  return `${minutes}:${String(restSeconds).padStart(2, '0')}`
}

export const formatCallDuration = (seconds?: number | null) => {
  if (!seconds) {
    return ''
  }

  return formatRecordTime(seconds)
}

const normalizePhoneDigits = (digits: string) => {
  if (digits.length === PHONE_DIGITS_COUNT && digits[0] === '8') {
    return `7${digits.slice(1)}`
  }

  if (digits.length === PHONE_DIGITS_COUNT - 1) {
    return `7${digits}`
  }

  return digits
}

export const formatPhoneNumber = (phone: string) => {
  const digits = normalizePhoneDigits(phone.replace(/\D/g, ''))

  if (digits.length !== PHONE_DIGITS_COUNT || digits[0] !== '7') {
    return phone
  }

  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
}

export const formatCallTime = (date: string) => {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return parsedDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
