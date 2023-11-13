export default function SchedulerLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="font-mono text-sm p-14">
        🛩️ Jet Junction
      </div>
      <nav></nav>

      {children}
    </section>
  )
}