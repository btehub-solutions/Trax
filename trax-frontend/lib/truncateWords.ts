/** Editorial display limits — homepage & story cards */
export const STORY_EXCERPT_MAX_WORDS = 25

export function truncateWords(text: string, maxWords: number): string {
  if (!text) return ''
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length <= maxWords) return text.trim()
  return `${words.slice(0, maxWords).join(' ')}…`
}

export function storyTitle(text: string): string {
  // Let headlines wrap naturally to preserve the full context
  return text ? text.trim() : ''
}

export function storyExcerpt(text: string): string {
  return truncateWords(text, STORY_EXCERPT_MAX_WORDS)
}
