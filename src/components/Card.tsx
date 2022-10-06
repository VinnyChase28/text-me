import Link from "next/link";

type CardProps = {
  name: string;
  description: string;
  link: string;
};

const Card = ({ name, description, link }: CardProps) => {
  return (
    <Link href={link}>
      <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 motion-safe:hover:cursor-pointer motion-safe:hover:bg-purple-200 ">
        <h2 className="text-lg text-gray-700">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </section>
    </Link>
  );
};

export default Card;
