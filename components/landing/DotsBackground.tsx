"use client"

export default function DotsBackground() {
  const rows = 15
  const cols = 75

  return (
    <div className="absolute -z-10 inset-0 flex items-start justify-center overflow-hidden pointer-events-none opacity-30 animate-fade-down">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols)
          const opacity = 0.6 - row / rows

          return (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary "
              style={{ opacity }}
            />
          )
        })}
      </div>
    </div>
  )
}
