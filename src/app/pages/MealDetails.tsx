import { useNavigate } from 'react-router';

export function MealDetails() {
  const navigate = useNavigate();

  const ingredients = [
    {
      name: 'Fresh Avocado',
      macros: 'F: 22g • C: 12g • P: 3g',
      calories: 240,
      amount: '150g',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop',
    },
    {
      name: 'Large Organic Eggs',
      macros: 'F: 10g • C: 1.2g • P: 13g',
      calories: 140,
      amount: '2 Units',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop',
    },
    {
      name: 'Artisan Sourdough',
      macros: 'F: 1.5g • C: 45g • P: 8g',
      calories: 225,
      amount: '80g',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
    },
    {
      name: 'Smoked Bacon',
      macros: 'F: 13.5g • C: 0.1g • P: 15g',
      calories: 330,
      amount: '45g',
      image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=200&h=200&fit=crop',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <section className="relative w-full h-[250px] rounded-3xl overflow-hidden mb-8 shadow-sm">
        <img
          alt="Breakfast details"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&h=600&fit=crop"
        />
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d3337]/60 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-2xl text-[#2d3337] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Text Overlay */}
        <div className="absolute bottom-8 left-8">
          <h1 className="font-['Manrope'] font-extrabold text-4xl text-white tracking-tight">
            Breakfast
          </h1>
          <p className="font-['Manrope'] text-xl text-[#bdbaff] font-bold">935 kcal</p>
        </div>
      </section>

      {/* Content Layout (2-column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Macros Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm shadow-[#2d3337]/5">
            <div className="flex flex-col items-center">
              {/* Progress Ring (Macro Tracking) */}
              <div className="relative flex items-center justify-center w-64 h-64 mb-10">
                {/* SVG Progress Ring Layers */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    className="stroke-[#dde3e7]"
                    cx="128"
                    cy="128"
                    fill="transparent"
                    r="110"
                    strokeWidth="12"
                  ></circle>
                  {/* Carbs - Blue (Primary) */}
                  <circle
                    className="stroke-[#4e45e4] transition-all duration-1000"
                    cx="128"
                    cy="128"
                    fill="transparent"
                    r="110"
                    strokeDasharray="690"
                    strokeDashoffset="172"
                    strokeLinecap="round"
                    strokeWidth="12"
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-['Manrope'] font-extrabold text-5xl text-[#2d3337] tracking-tighter">
                    935
                  </span>
                  <span className="font-['Inter'] text-sm uppercase tracking-widest text-[#596063] font-semibold">
                    Calories
                  </span>
                </div>
              </div>

              {/* Macro Bars */}
              <div className="w-full space-y-6">
                {/* Carbs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-['Inter'] text-sm font-bold text-[#2d3337]">Carbs</span>
                    <span className="font-['Inter'] text-sm font-medium text-[#596063]">92g</span>
                  </div>
                  <div className="h-2 w-full bg-[#e3e9ec] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4e45e4] rounded-full w-[65%]"></div>
                  </div>
                </div>

                {/* Protein */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-['Inter'] text-sm font-bold text-[#2d3337]">Protein</span>
                    <span className="font-['Inter'] text-sm font-medium text-[#596063]">39g</span>
                  </div>
                  <div className="h-2 w-full bg-[#e3e9ec] rounded-full overflow-hidden">
                    <div className="h-full bg-[#6e3bd8] rounded-full w-[40%]"></div>
                  </div>
                </div>

                {/* Fat */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-['Inter'] text-sm font-bold text-[#2d3337]">Fat</span>
                    <span className="font-['Inter'] text-sm font-medium text-[#596063]">47g</span>
                  </div>
                  <div className="h-2 w-full bg-[#e3e9ec] rounded-full overflow-hidden">
                    <div className="h-full bg-[#006b62] rounded-full w-[55%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ingredients Card */}
        <div className="lg:col-span-7">
          <div className="bg-[#f1f4f6] p-8 rounded-[2rem]">
            <h2 className="font-['Manrope'] font-bold text-2xl mb-8 text-[#2d3337]">Ingredients</h2>

            <div className="flex flex-col gap-4">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl flex justify-between items-center transition-all hover:translate-x-1 group"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#e3e9ec]">
                      <img
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                        src={ingredient.image}
                      />
                    </div>
                    <div>
                      <p className="font-['Inter'] font-bold text-[#2d3337] group-hover:text-[#4e45e4] transition-colors">
                        {ingredient.name}
                      </p>
                      <p className="font-['Inter'] text-xs text-[#596063]">{ingredient.macros}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block font-['Manrope'] font-extrabold text-[#4e45e4] text-lg">
                      {ingredient.calories} kcal
                    </span>
                    <span className="block font-['Inter'] text-xs text-[#596063]">
                      {ingredient.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
