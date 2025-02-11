export default TableBodyDataNotExistRow;

function TableBodyDataNotExistRow({ text }: { text: string }) {
  return (
    <tr className="h-20 bg-gray-300 table w-full">
      <th scope="row">{text}</th>
    </tr>
  );
}
