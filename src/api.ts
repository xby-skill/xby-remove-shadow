/**
 * 通用 MCP API 客户端
 *
 * 封装对 xiaobenyang MCP 平台的 HTTP 调用，不绑定特定工具。
 */

/**
 * 通用 API 调用
 *
 * @param config      - 插件配置（需含 apiKey、baseUrl、timeoutMs）
 * @param mcpId       - MCP 平台 ID
 * @param toolName    - 工具名称
 * @param params      - 请求参数
 * @returns { success, text, raw, message }
 */
export async function callApi(
    config: Record<string, any>,
    mcpId: string,
    toolName: string,
    params: Record<string, any>,
): Promise<Record<string, any>> {
  if (!config.apiKey) {
    return {
      success: false,
      text: '',
      raw: null,
      message: 'API 密钥未设置。请告诉 agent 你的密钥，agent 会自动调用 set_ocr_api_key 工具保存。',
    }
  }

  const url = `${config.baseUrl}/api`
  const headers: Record<string, string> = {
    'XBY-APIKEY': config.apiKey,
    func: toolName,
    mcpid: mcpId,
    'Content-Type': 'application/json',
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 30_000)

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    if (!resp.ok) {
      const body = await resp.text().catch(() => null)
      return {
        success: false,
        text: '',
        raw: null,
        message: `API 返回异常状态码: ${resp.status}${body ? `: ${body}` : ''}`,
      }
    }

    // 判断响应是否为 JSON
    const contentType = resp.headers.get('content-type') || ''
    const isJsonResponse = contentType.includes('application/json')

    if (isJsonResponse) {
      const data = (await resp.json()) as Record<string, unknown>
      // const text = extractText(data)

      return {
        success: true,
        data,
        raw: data,
        message: '调用成功',
      }
    } else {
      // 非JSON响应，直接拿原始文本返回，不执行extractText
      const rawText = await resp.text()
      return {
        success: true,
        text: rawText,
        raw: rawText,
        message: '调用成功(非JSON响应)',
      }
    }

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return {
      success: false,
      text: '',
      raw: null,
      message: `API 调用失败: ${msg}`,
    }
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * 从 API 响应中提取文本内容
 * 适配小笨羊 API 多种返回格式
 */
function extractText(data: Record<string, unknown>): string {
  if (typeof data.text === 'string') return data.text
  if (typeof data.result === 'string') return data.result
  if (typeof data.content === 'string') return data.content
  if (typeof data.data === 'string') return data.data

  if (data.data && typeof data.data === 'object') {
    const d = data.data as Record<string, unknown>
    if (typeof d.text === 'string') return d.text
    if (typeof d.content === 'string') return d.content
    if (typeof d.result === 'string') return d.result
  }

  return JSON.stringify(data, null, 2)
}