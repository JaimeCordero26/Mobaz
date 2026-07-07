type Props = {
  className?: string;
  flip?: boolean;
};

// Skyline minimalista en línea — decoración de fondo, hace eco del ícono del logo.
export default function BuildingSkyline({ className = "", flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 520 260"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {/* torre alta */}
      <rect x="20" y="40" width="70" height="220" />
      <rect x="35" y="60" width="14" height="14" />
      <rect x="61" y="60" width="14" height="14" />
      <rect x="35" y="90" width="14" height="14" />
      <rect x="61" y="90" width="14" height="14" />
      <rect x="35" y="120" width="14" height="14" />
      <rect x="61" y="120" width="14" height="14" />

      {/* edificio medio */}
      <rect x="110" y="110" width="90" height="150" />
      <rect x="130" y="135" width="16" height="16" />
      <rect x="164" y="135" width="16" height="16" />
      <rect x="130" y="170" width="16" height="16" />
      <rect x="164" y="170" width="16" height="16" />

      {/* torre chica */}
      <rect x="260" y="170" width="60" height="90" />
      <rect x="274" y="188" width="12" height="12" />
      <rect x="296" y="188" width="12" height="12" />
      <rect x="274" y="214" width="12" height="12" />
      <rect x="296" y="214" width="12" height="12" />

      {/* edificio ancho */}
      <rect x="345" y="90" width="45" height="170" />
      <rect x="355" y="108" width="10" height="10" />
      <rect x="355" y="132" width="10" height="10" />
      <rect x="355" y="156" width="10" height="10" />
      <rect x="355" y="180" width="10" height="10" />

      {/* torre baja */}
      <rect x="410" y="170" width="80" height="90" />
      <rect x="428" y="190" width="14" height="14" />
      <rect x="456" y="190" width="14" height="14" />
      <rect x="428" y="216" width="14" height="14" />
      <rect x="456" y="216" width="14" height="14" />

      {/* línea de piso */}
      <path d="M0 260 H520" />
    </svg>
  );
}
