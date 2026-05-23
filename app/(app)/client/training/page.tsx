import { ArrowRight, Clock, Dumbbell, Repeat2, Timer } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const sessionColors = [
  { bg: "bg-[#bdbaff]", text: "text-[#270ac3]" },
  { bg: "bg-[#91feef]", text: "text-[#006259]" },
  { bg: "bg-[#c4acff]", text: "text-[#4300a1]" },
  { bg: "bg-[#dde3e7]", text: "text-[#2d3337]" }
];

export default async function ClientTrainingPage() {
  const user = await getCurrentUser();
  const program = await prisma.program.findFirst({
    where: { clientId: user!.id, status: "ACTIVE" },
    include: { sessions: { include: { exercises: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } } }
  });

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(45,51,55,0.06)]">
          <div className="flex min-h-[320px] flex-col md:flex-row">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
              <div className="mb-6 inline-flex w-fit items-center rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">
                {program?.sessions.length ?? 0} sessions per week
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-[#2d3337] md:text-5xl">{program?.title ?? "Programme actif"}</h1>
              <p className="mt-3 text-xl text-[#596063]">{program?.description ?? "Dumbbell + Bands"}</p>
            </div>

            <div className="relative h-64 w-full md:h-auto md:w-2/5">
              <img alt="Workout Program Hero" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=700&fit=crop" />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/20 to-transparent md:block" />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[#2d3337]">Weekly Sessions</h2>
            <div className="ml-6 h-[2px] flex-grow rounded-full bg-[#dde3e7]" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {program?.sessions.map((session, index) => {
              const colors = sessionColors[index % sessionColors.length];
              return (
                <article key={session.id} className="group flex min-h-[240px] cursor-pointer flex-col justify-between rounded-2xl bg-[#f1f4f6] p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_32px_rgba(45,51,55,0.06)]">
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`rounded-xl p-3 ${colors.bg} ${colors.text}`}>
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-[#596063] transition-colors group-hover:text-[#4e45e4]" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-[#2d3337]">{session.title}</h3>
                    <p className="text-sm text-[#596063]">{session.exercises.length} exercises prepared by your coach</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#4e45e4]">
                    <Clock className="h-4 w-4" />
                    <span>{session.durationMinutes} min</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4">
          {(program?.sessions ?? []).flatMap((session) =>
            session.exercises.map((exercise) => (
              <div key={exercise.id} className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(45,51,55,0.04)] transition-all duration-300 hover:translate-x-2 hover:shadow-[0_8px_32px_rgba(45,51,55,0.08)]">
                <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#f1f4f6] text-[#4e45e4]">
                  <Dumbbell className="h-8 w-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold leading-tight text-[#2d3337]">{exercise.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-[#596063]">
                    <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3 text-[#4e45e4]" />{exercise.sets} sets x {exercise.reps}</span>
                    <span className="flex items-center gap-1"><Timer className="h-3 w-3 text-[#006b62]" />Rest: {exercise.restSeconds ?? 60}s</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[#596063] transition-colors group-hover:text-[#4e45e4]" />
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
