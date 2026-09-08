export function Logo({ showText = true, size = 24, className = '' }) {
  return (
    <span className={`brand-logo ${className}`}>
      <span className="brand-logo-mark" style={{ width: size, height: size }}>
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M28 4a3 3 0 0 0-4.6.8L8.4 15.4a1.6 1.6 0 0 0-.4.6L5.6 25.6a.8.8 0 0 0 1 1l9.6-2.4c.2-.1.5-.2.6-.4l10.6-15A3 3 0 0 0 28 4Z"
            fill="var(--primary)"
          />
          <path
            d="M10.5 20.5a1 1 0 0 1 1.4-1.4L14 21 21 12.8a1 1 0 0 1 1.5 1.3L15 23.2a1 1 0 0 1-1.5 0Z"
            fill="var(--chart-3)"
          />
        </svg>
      </span>
      {showText && <span className="brand-logo-text">Escribir Bien</span>}
    </span>
  );
}