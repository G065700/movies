export default TableHeader;

interface TableHeaderProps {
  data: {
    tableHeaderRow: TableHeaderCol[];
  };
}

export type TableHeaderCol = {
  name: string;
  width: string;
  className?: string;
};

function TableHeader(props: TableHeaderProps) {
  const {
    data: { tableHeaderRow },
  } = props;

  return (
    <thead>
      <tr className="bg-gray-400">
        {tableHeaderRow.map((tableHeaderCol) => (
          <th
            key={tableHeaderCol.name}
            className={`inline-block leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap ${tableHeaderCol.width} ${tableHeaderCol.className}`}
          >
            {tableHeaderCol.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
