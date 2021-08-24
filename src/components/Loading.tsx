
const Loading = (): JSX.Element => {

  return (
    <div className="relative w-10 h-10 animate-spin">
      <div className="rounded-full border-4 w-full h-full"></div>
      <div className="absolute top-0 w-full h-1/2 border-4 border-b-0 border-green-300 rounded-tl-full rounded-tr-full">
      
      </div>
      
    </div>
  );
}

export default Loading;