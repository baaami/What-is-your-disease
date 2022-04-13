export const getDiseasePeriod = (e: string) => {
  switch (e) {
    case 'early':
      return '초기'
    case 'late':
      return '말기'
    case 'acute':
      return '급성'
    case 'chronic':
      return '만성'
    case 'emergency':
      return '응급'
    case 'cure':
      return '완치'
  }
}
