/**
 * 配置
 *
 * 用户可通过 cordis.yml 的 config 字段覆盖默认值。
 */

export const DEFAULT_CONFIG: Record<string, any> = {
  apiKey: '',
  baseUrl: 'https://mcp.xiaobenyang.com',
  timeoutMs: 30_000,
}
