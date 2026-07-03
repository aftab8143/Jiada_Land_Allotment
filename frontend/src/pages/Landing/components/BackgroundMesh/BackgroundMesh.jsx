const BackgroundMesh = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
    <div className="glass-orb absolute -top-32 -left-24 w-[32rem] h-[32rem] bg-primary/25" />
    <div
      className="glass-orb absolute top-1/3 -right-32 w-[36rem] h-[36rem] bg-accent/20"
      style={{ animationDelay: '-7s' }}
    />
    <div
      className="glass-orb absolute bottom-[-10rem] left-1/4 w-[30rem] h-[30rem] bg-gov-green/15"
      style={{ animationDelay: '-14s' }}
    />
    <div
      className="glass-orb absolute bottom-0 right-1/4 w-[24rem] h-[24rem] bg-teal/15"
      style={{ animationDelay: '-3s' }}
    />
  </div>
);

export default BackgroundMesh;
