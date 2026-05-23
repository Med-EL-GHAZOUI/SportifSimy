export function TrainingSession() {
  const exercises = [
    {
      name: 'Biceps hammer curls',
      sets: '3 sets × 12 reps',
      rest: 'Rest: 1:15',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop',
    },
    {
      name: 'Triceps bands extension',
      sets: '4 sets × 15 reps',
      rest: 'Rest: 1:15',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    },
    {
      name: 'Over head triceps bands extension',
      sets: '3 sets × 12 reps',
      rest: 'Rest: 1:15',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    },
    {
      name: 'Triceps one arm bands extension',
      sets: '4 sets × 12 reps',
      rest: 'Rest: 1:15',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
    },
    {
      name: 'Diamond push ups',
      sets: '2 sets × MAX reps',
      rest: 'Rest: 1:15',
      image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=400&fit=crop',
      isMax: true,
    },
  ];

  return (
    <div className="flex-1 px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Section: Header */}
        <header className="flex flex-col gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold font-['Manrope'] tracking-tight text-[#2d3337]">
              ARMS
            </h1>
            <div className="flex items-center gap-2 text-[#596063] font-medium">
              <span className="material-symbols-outlined text-lg">fitness_center</span>
              <span className="text-sm uppercase tracking-widest">5 exercises</span>
            </div>
          </div>
        </header>

        {/* Exercise List */}
        <div className="flex flex-col gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white shadow-[0_4px_24px_rgba(45,51,55,0.04)] transition-all duration-300 hover:translate-x-2 hover:shadow-[0_8px_32px_rgba(45,51,55,0.08)]"
            >
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#f1f4f6]">
                <img className="w-full h-full object-cover" src={exercise.image} alt={exercise.name} />
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold font-['Manrope'] text-[#2d3337] leading-tight">
                  {exercise.name}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm font-medium text-[#596063]">
                  <span className="flex items-center gap-1">
                    <span
                      className={`material-symbols-outlined text-xs ${
                        exercise.isMax ? 'text-[#ac3149]' : 'text-[#4e45e4]'
                      }`}
                    >
                      {exercise.isMax ? 'local_fire_department' : 'rebase_edit'}
                    </span>
                    {exercise.sets}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#006b62]">timer</span>
                    {exercise.rest}
                  </span>
                </div>
              </div>

              <div className="text-[#596063] group-hover:text-[#4e45e4] transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
