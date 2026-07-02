const Loading = ({ fullPage }) => (
  <div className={`flex items-center justify-center p-8${fullPage ? ' min-h-[60vh]' : ''}`}>
    <div className="w-9 h-9 border-[3px] border-gray-200 border-t-primary rounded-full animate-spin" />
  </div>
);

export default Loading;
