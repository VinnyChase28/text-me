import Link from "next/link";

type BannerProps = {
  children: any;
};

const Banner = ({ children }: BannerProps) => {
  return (
    <div className="md:container md:mx-auto bg-white shadow-lg p-8 m-10">
      {children}
    </div>
  );
};

export default Banner;
