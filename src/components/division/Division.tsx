interface DivisionProps {
  hasMarginTop?: boolean;
  hasMarginBottom?: boolean;
}

function Division({
  hasMarginTop = true,
  hasMarginBottom = true,
}: DivisionProps) {
  return (
    <div
      className={`h-[1px] bg-gray-400 ${hasMarginTop ? 'mt-5' : ''} ${hasMarginBottom ? 'mb-5' : ''}`}
    />
  );
}

export default Division;
