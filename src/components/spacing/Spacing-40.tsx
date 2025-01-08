interface SpacingProps {
  direction?: 'horizontal' | 'vertical';
}

const Spacing40 = ({ direction = 'vertical' }: SpacingProps) => {
  return <div className={direction === 'vertical' ? `h-[40px]` : `w-[40px]`} />;
};

export default Spacing40;
