export default Dimmed;

function Dimmed({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/70 z-10">
      {children}
    </div>
  );
}
