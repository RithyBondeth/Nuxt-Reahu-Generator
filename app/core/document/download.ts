/** Triggers a browser download for in-memory text. No server round-trip. */
export function downloadTextFile(
  filename: string,
  contents: string,
  mime = 'text/plain;charset=utf-8'
): void {
  const url = URL.createObjectURL(new Blob([contents], { type: mime }))
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  anchor.click()

  URL.revokeObjectURL(url)
}

export function downloadMarkdown(filename: string, contents: string): void {
  downloadTextFile(filename, contents, 'text/markdown;charset=utf-8')
}
