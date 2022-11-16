type BannerProps = {
  children: any;
  title: string;
};

//todo: add changing background based on weather conditions for weather page

const Banner = ({ children, title }: BannerProps) => {
  return (
    <div className="md:container md:mx-auto bg-white shadow-lg p-8 m-10">
      <h1>{`${title} API`}</h1>
      {children}
    </div>
  );
};

export default Banner;
