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
      <div
        className={`
          bg-black text-white
          flex items-center 
          break-keep
          w-[68px] p-2 text-[11px] 
          sm:w-[100px] sm:px-3 sm:py-2 sm:text-[13px] 
        `}
      >
        {title}
      </div>
      <div
        className={`
          flex flex-1 items-center 
          bg-white 
          break-keep
          p-2 text-[11px]
          sm:px-3 sm:py-2 sm:text-[13px] 
          ${contentClassName}
        `}
      >
        {content || '-'}
      </div>
    </>
  );
}
