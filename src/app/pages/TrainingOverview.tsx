import { Link } from 'react-router';

export function TrainingOverview() {
  const sessions = [
    {
      name: 'PUSH',
      description: 'Chest, Shoulders, Triceps',
      duration: '55 min',
      color: 'primary',
      icon: 'fitness_center',
    },
    {
      name: 'PULL',
      description: 'Back, Biceps',
      duration: '50 min',
      color: 'secondary',
      icon: 'exercise',
    },
    {
      name: 'LEGS',
      description: 'Lower Body Power',
      duration: '65 min',
      color: 'tertiary',
      icon: 'directions_run',
    },
    {
      name: 'ARMS',
      description: 'Biceps, Triceps Isolation',
      duration: '45 min',
      color: 'neutral',
      icon: 'sports_gymnastics',
      path: '/training/arms',
    },
    {
      name: 'SHOULDERS',
      description: 'Deltoids & Traps',
      duration: '40 min',
      color: 'primary',
      icon: 'rebase_edit',
    },
  ];

  const colorClasses = {
    primary: {
      bg: 'bg-[#bdbaff]',
      text: 'text-[#270ac3]',
      hover: 'hover:text-[#4e45e4]',
    },
    secondary: {
      bg: 'bg-[#91feef]',
      text: 'text-[#006259]',
      hover: 'hover:text-[#006b62]',
    },
    tertiary: {
      bg: 'bg-[#c4acff]',
      text: 'text-[#4300a1]',
      hover: 'hover:text-[#6e3bd8]',
    },
    neutral: {
      bg: 'bg-[#dde3e7]',
      text: 'text-[#2d3337]',
      hover: 'hover:text-[#2d3337]',
    },
  };

  return (
    <div className="flex-1 min-h-screen px-4 py-8 md:px-12 md:py-12 max-w-[1440px] mx-auto">
      {/* Program Hero Card */}
      <section className="mb-12">
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-[0_8px_32px_rgba(45,51,55,0.06)] group">
          <div className="flex flex-col md:flex-row min-h-[320px]">
            {/* Left Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#91feef] text-[#006259] font-['Inter'] font-semibold text-xs mb-6 w-fit">
                5 sessions per week
              </div>
              <h2 className="font-['Manrope'] font-bold text-4xl md:text-5xl text-[#2d3337] mb-3 tracking-tighter">
                5X Dumbbell Workout
              </h2>
              <p className="font-['Inter'] text-xl text-[#596063] mb-8">
                Dumbbell + Bands
              </p>
            </div>

            {/* Right Visual/Image */}
            <div className="w-full md:w-2/5 relative h-64 md:h-auto">
              <img
                alt="Workout Program Hero"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent md:block hidden"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Grid Title */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-['Manrope'] font-bold text-2xl text-[#2d3337]">
          Weekly Sessions
        </h3>
        <div className="h-[2px] flex-grow ml-6 bg-[#dde3e7] rounded-full"></div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const colors = colorClasses[session.color as keyof typeof colorClasses];
          const Component = session.path ? Link : 'div';
          const props = session.path ? { to: session.path } : {};

          return (
            <Component
              key={session.name}
              {...props}
              className="group bg-[#f1f4f6] rounded-2xl p-6 hover:bg-white hover:shadow-[0_8px_32px_rgba(45,51,55,0.06)] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    <span className="material-symbols-outlined">{session.icon}</span>
                  </div>
                  <span className={`material-symbols-outlined text-[#596063] ${colors.hover} transition-colors`}>
                    arrow_forward
                  </span>
                </div>
                <h4 className="font-['Manrope'] font-bold text-xl text-[#2d3337] mb-2">
                  {session.name}
                </h4>
                <p className="font-['Inter'] text-[#596063] text-sm">
                  {session.description}
                </p>
              </div>
              <div className={`mt-6 flex items-center gap-2 text-xs font-semibold ${colors.text}`}>
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>{session.duration}</span>
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
}
