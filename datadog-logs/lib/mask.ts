const mask = (value: string): string => {
  return value.slice(-4).padStart(value.length, '*')
}

export default mask
