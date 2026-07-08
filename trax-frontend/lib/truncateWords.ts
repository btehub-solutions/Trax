/** Editorial display limits — homepage & story cards */
export const STORY_TITLE_MAX_WORDS = 7
export const STORY_EXCERPT_MAX_WORDS = 15

export function truncateWords(text: string, maxWords: number): string {
  if (!text) return ''
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length <= maxWords) return text.trim()
  return `${words.slice(0, maxWords).join(' ')}…`
}

export function storyTitle(text: string): string {
  return truncateWords(text, STORY_TITLE_MAX_WORDS)
}

export function storyExcerpt(text: string): string {
  return truncateWords(text, STORY_EXCERPT_MAX_WORDS)
}
