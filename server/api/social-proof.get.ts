export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const configuredCount = Number(config.trustedUserCount)
  const trustedUserCount = Number.isFinite(configuredCount)
    ? Math.max(0, Math.floor(configuredCount))
    : 0

  return {
    userCountLabel: `${trustedUserCount.toLocaleString('en-US')}+`
  }
})
