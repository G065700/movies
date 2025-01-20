const Loader = () => {
  return (
    <div className="h-[90vh] max-w-6xl mx-auto w-full flex flex-col gap-5 justify-center items-center py-40 text-2xl">
      <LoadingIcon />
      잠시만 기다려 주세요.
    </div>
  );
};

function LoadingIcon() {
  return (
    <svg
      fill="none"
      height="50"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}

export default Loader;
