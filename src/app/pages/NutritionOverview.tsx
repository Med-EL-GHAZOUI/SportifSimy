import { Link } from 'react-router';

export function NutritionOverview() {
  const meals = [
    {
      type: 'Breakfast',
      name: 'Avocado Toast & Eggs',
      description: 'Sourdough, 2 poached eggs, chili flakes.',
      calories: 540,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop',
      color: 'primary',
      path: '/nutrition/breakfast',
    },
    {
      type: 'Lunch',
      name: 'Sweet Potato Quinoa Bowl',
      description: 'Kale, chickpeas, tahini lemon dressing.',
      calories: 720,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
      color: 'secondary',
    },
    {
      type: 'Dinner',
      name: 'Wild Salmon & Asparagus',
      description: 'Miso glazed salmon, steamed greens.',
      calories: 890,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop',
      color: 'tertiary',
    },
    {
      type: 'Snacks',
      name: 'Whey Isolate Shake',
      description: 'Post-workout nutrition with almond milk.',
      calories: 220,
      image: 'https://images.unsplash.com/photo-1622484211850-5f2c4fb8a034?w=400&h=400&fit=crop',
      color: 'neutral',
    },
  ];

  const colorClasses = {
    primary: 'text-[#4135d8] bg-[#bdbaff]/30',
    secondary: 'text-[#005e56] bg-[#91feef]/30',
    tertiary: 'text-[#622bcb] bg-[#c4acff]/30',
    neutral: 'text-[#596063] bg-[#dde3e7]',
  };

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-10">
      {/* Hero: Macro Stats Bento */}
      <section className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_rgba(45,51,55,0.04)] flex flex-col md:flex-row items-center gap-12 border border-white/50">
          {/* Circular Calorie Chart */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-[#dde3e7]"
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="currentColor"
                strokeWidth="12"
              ></circle>
              <circle
                cx="128"
                cy="128"
                fill="transparent"
                r="110"
                stroke="url(#gradient_primary)"
                strokeDasharray="691"
                strokeDashoffset="150"
                strokeLinecap="round"
                strokeWidth="12"
              ></circle>
              <defs>
                <linearGradient id="gradient_primary" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4e45e4' }}></stop>
                  <stop offset="100%" style={{ stopColor: '#4135d8' }}></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-extrabold text-[#2d3337] tracking-tighter">3,410</span>
              <span className="text-sm font-semibold text-[#596063] uppercase tracking-widest">
                Kcal Eaten
              </span>
              <span className="mt-1 text-xs text-[#006b62] font-medium">620 remaining</span>
            </div>
          </div>

          {/* Macro Bars */}
          <div className="flex-1 w-full space-y-8">
            <div>
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h4 className="text-lg font-bold">Carbohydrates</h4>
                  <p className="text-sm text-[#596063] font-medium">Fueling Performance</p>
                </div>
                <span className="text-xl font-bold text-[#6e3bd8]">
                  280g <span className="text-sm font-normal text-[#596063]">/ 350g</span>
                </span>
              </div>
              <div className="h-3 w-full bg-[#dde3e7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6e3bd8] to-[#c4acff] rounded-full"
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h4 className="text-lg font-bold">Protein</h4>
                  <p className="text-sm text-[#596063] font-medium">Muscle Recovery</p>
                </div>
                <span className="text-xl font-bold text-[#4e45e4]">
                  195g <span className="text-sm font-normal text-[#596063]">/ 210g</span>
                </span>
              </div>
              <div className="h-3 w-full bg-[#dde3e7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4e45e4] to-[#bdbaff] rounded-full"
                  style={{ width: '92%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h4 className="text-lg font-bold">Fats</h4>
                  <p className="text-sm text-[#596063] font-medium">Hormonal Balance</p>
                </div>
                <span className="text-xl font-bold text-[#006b62]">
                  85g <span className="text-sm font-normal text-[#596063]">/ 95g</span>
                </span>
              </div>
              <div className="h-3 w-full bg-[#dde3e7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#006b62] to-[#91feef] rounded-full"
                  style={{ width: '89%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meals Section */}
      <section className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold tracking-tight">Today's Meals</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meals.map((meal) => {
            const Component = meal.path ? Link : 'div';
            const props = meal.path ? { to: meal.path } : {};

            return (
              <Component
                key={meal.type}
                {...props}
                className="group bg-white rounded-[1.5rem] p-4 flex gap-6 hover:bg-[#f1f4f6] transition-all duration-300 cursor-pointer"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={meal.image}
                  />
                </div>

                <div className="flex flex-col justify-center flex-1 pr-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          colorClasses[meal.color as keyof typeof colorClasses]
                        }`}
                      >
                        {meal.type}
                      </span>
                      <h4 className="text-xl font-bold mt-1">{meal.name}</h4>
                    </div>
                    <span className="material-symbols-outlined text-[#acb3b7] group-hover:text-[#4e45e4] transition-colors">
                      arrow_forward
                    </span>
                  </div>

                  <p className="text-sm text-[#596063] mt-2 line-clamp-1 italic">{meal.description}</p>

                  <p className="text-lg font-bold text-[#2d3337] mt-auto">
                    {meal.calories} <span className="text-xs font-normal text-[#596063]">kcal</span>
                  </p>
                </div>
              </Component>
            );
          })}
        </div>
      </section>
    </div>
  );
}
