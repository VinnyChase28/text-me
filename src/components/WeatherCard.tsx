type WeatherCardProps = {
  children: React.ReactNode;
};

const WeatherCard = ({ children }: WeatherCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 motion-safe:hover:bg-purple-200">
      {children}
    </section>
  );
};

export default WeatherCard;
