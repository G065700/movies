interface SpacingProps {
  direction?: 'horizontal' | 'vertical';
}

const Spacing10 = ({ direction = 'vertical' }: SpacingProps) => {
  return <div className={direction === 'vertical' ? `h-[10px]` : `w-[10px]`} />;
};

export default Spacing10;
