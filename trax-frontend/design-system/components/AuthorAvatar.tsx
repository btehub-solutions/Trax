import Image from 'next/image'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export interface AuthorAvatarProps {
  name: string
  src?: string | null
  size?: 'sm' | 'md'
  className?: string
}

export default function AuthorAvatar({
  name,
  src,
  size = 'md',
  className = '',
}: AuthorAvatarProps) {
  const dim = size === 'sm' ? 28 : 36

  return (
    <span
      className={`ds-author-avatar ds-author-avatar--${size} ${className}`.trim()}
      aria-hidden
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={dim}
          height={dim}
          className="ds-author-avatar__img"
        />
      ) : (
        <span className="ds-author-avatar__initials">{initials(name) || 'T'}</span>
      )}
    </span>
  )
}
