/**
 * The emoji palette offered when writing bullet points.
 *
 * Deliberately small and profile-specific rather than a full emoji keyboard —
 * the OS already has one of those. These are the glyphs that actually recur in
 * profile READMEs, grouped by what the line is usually saying.
 */
export const EMOJI_GROUPS: { group: string, emoji: string[] }[] = [
  { group: 'Working on', emoji: ['🔭', '🚀', '🛠️', '⚡', '🧪', '🏗️', '💼', '🎯'] },
  { group: 'Learning', emoji: ['🌱', '📚', '🎓', '🧠', '🔍', '📖', '💡', '🗺️'] },
  { group: 'Talk to me', emoji: ['💬', '📫', '🤝', '👋', '📮', '☎️', '🗓️', '✉️'] },
  { group: 'Making', emoji: ['💻', '⌨️', '🖥️', '📱', '🎨', '🧩', '⚙️', '🔧'] },
  { group: 'Life', emoji: ['🌏', '☕', '🎵', '📷', '🏃', '🌙', '🐈', '🍜'] },
  { group: 'Fun', emoji: ['⚡', '🔥', '✨', '🎲', '🏆', '🌈', '🦀', '🐧'] }
]
