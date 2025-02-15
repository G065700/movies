import { ReactNode } from 'react';

export default Data;

interface DataProps {
  title: ReactNode;
  content: ReactNode;
  contentClassName?: string;
}

function Data(props: DataProps) {
  const { title, content, contentClassName = '' } = props;

  return (
    <>
      <div className="p-1 w-[100px] text-white bg-black flex items-center px-3 py-2">
        {title}
      </div>
      <div
        className={`p-1 flex flex-1 items-center bg-white px-3 py-2 ${contentClassName}`}
      >
        {content || '-'}
      </div>
    </>
  );
}
