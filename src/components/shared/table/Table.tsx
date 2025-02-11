export default Table;

function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full table-fixed my-[10px] rounded-lg overflow-x-auto overflow-hidden text-ellipsis whitespace-nowrap">
      {children}
    </table>
  );
}
