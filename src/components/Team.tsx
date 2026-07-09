const TEAM = [
  { name: "Jason Mora Cordero", role: "Propietario y Desarrollador", profession: "Ingeniero Civil (IC-27071)", photo: "/team/jason.png" },
  { name: "Bryan Mora Cordero", role: "Propietario y Desarrollador", profession: "Ingeniero Electromecánico (IME-28435)", photo: "/team/bryan.png", zoom: true },
  { name: "Alfonso Castro", role: "Director de Proyecto", profession: "Arquitecto (ARQ-37779)", photo: "/team/alfonso.png", zoom: true },
  { name: "Tatiana Fonseca Fernández", role: "Directora de Proyecto", profession: "Arquitecta (ARQ-29725)", photo: "/team/tatiana.png" },
  { name: "Douglas Melgara", role: "Director de Proyecto", profession: "Ingeniero Civil", photo: "/team/douglas.png", zoom: true },
];

export default function Team() {
  return (
    <section id="equipo" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#b70000] font-semibold text-sm uppercase tracking-widest">
            Nuestro equipo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-2 mb-4">
            Conozca a nuestros profesionales
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg max-w-2xl mx-auto">
            El equipo detrás de cada proyecto: ingenieros y arquitectos con años de experiencia
            entregando obras llave en mano.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-[#e6e6e6] p-6 text-center border border-transparent hover:border-[#b70000] transition-colors duration-300"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className={`w-full h-full object-cover ${member.zoom ? "scale-125" : ""}`}
                />
              </div>
              <h3 className="font-bold text-[#1a1a1a] leading-snug">{member.name}</h3>
              <p className="text-[#b70000] text-xs font-semibold uppercase tracking-wide mt-1">
                {member.role}
              </p>
              <p className="text-[#1a1a1a]/50 text-sm mt-2">{member.profession}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
