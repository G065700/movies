interface SpacingProps {
  direction?: 'horizontal' | 'vertical';
}

const Spacing20 = ({ direction = 'vertical' }: SpacingProps) => {
  return <div className={direction === 'vertical' ? `h-[20px]` : `w-[20px]`} />;
};

export default Spacing20;
