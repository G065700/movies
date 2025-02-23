export const revalidateTime = 3600;

export function getSecondsUntilMidnight() {
  const now = new Date();
  const nextUpdate = new Date();
  nextUpdate.setUTCHours(15, 5, 0, 0); // 00:05 KST = UTC 기준 15:05

  // 현재 시간이 00:05(KST) 이후라면, 다음날 00:05(KST)로 설정
  if (now > nextUpdate) {
    nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 1);
  }

  // 현재 시각과 00:05(KST)까지 남은 초 계산
  return Math.max(0, Math.floor((nextUpdate.getTime() - now.getTime()) / 1000));
}

export function getSecondsUntilMondayMidnight() {
  const now = new Date();
  const nextUpdate = new Date();

  const dayOfWeek = now.getUTCDay();
  // 월요일로 이동하기 위해 필요한 날짜 차이 계산
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7; // 1이 월요일 (0은 일요일)

  // 월요일 00:05 KST로 설정 (UTC 15:05)
  nextUpdate.setUTCDate(now.getUTCDate() + daysUntilMonday);
  nextUpdate.setUTCHours(15, 5, 0, 0); // 15:05 UTC, 즉 00:05 KST

  // 현재 시간이 월요일 00:05(KST) 이후라면, 다음 주 월요일 00:05로 설정
  if (now > nextUpdate) {
    nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 7); // 7일 더해서 다음 주 월요일로 설정
  }

  // 현재 시각과 다음 월요일 00:05(KST)까지 남은 초 계산
  return Math.max(0, Math.floor((nextUpdate.getTime() - now.getTime()) / 1000));
}
