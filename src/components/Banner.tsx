type BannerProps = {
  children: any;
};

//todo: add changing background based on weather conditions for weather page

const Banner = ({ children }: BannerProps) => {
  return (
    <div className="md:container md:mx-auto bg-white shadow-lg p-8 m-10">
      {children}
    </div>
  );
};

export default Banner;
