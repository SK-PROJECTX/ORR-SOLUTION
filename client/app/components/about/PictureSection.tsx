export const PictureSection = () => {
  return (
    <div className="relative flex justify-center items-center py-[9rem]">
      <img
        src="/images/n_curl.svg"
        alt="glow"
        className="absolute opacity-90 pointer-events-none select-none z-[-5]"
      />
      <img src="/images/handshake.png" alt="" className="w-5xl " />
    </div>
  );
};