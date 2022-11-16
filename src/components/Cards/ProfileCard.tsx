type ProfileCardProps = {
  name: string;
  time: string;
  timezone: string;
  occurrence: string;
  cronJobId: string;
};

const ProfileCard = ({
  name,
  occurrence,
  time,
  timezone,
  cronJobId,
}: ProfileCardProps) => {
  return (
    <div>
      {cronJobId ? (
        <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:bg-purple-200 ">
          <h2 className="text-lg text-gray-700">{name}</h2>
          <p className="text-sm text-gray-600">{occurrence}</p>
          <p className="text-sm text-gray-600">{time}</p>
          <p className="text-sm text-gray-600">{timezone}</p>
          <button>Delete</button>
          <button>Edit</button>
          <p>{`CRON job ID: ${cronJobId ?? ""}`}</p>
        </section>
      ) : null}
    </div>
  );
};

export default ProfileCard;
