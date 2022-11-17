import { trpc } from "../../utils/trpc";
import { useState } from "react";
type ProfileCardProps = {
  name: string;
  time: string;
  timezone: string;
  occurrence: string;
  cronJobId: string;
  phoneNumber: string;
};

const ProfileCard = ({
  name,
  occurrence,
  time,
  timezone,
  cronJobId,
  phoneNumber,
}: ProfileCardProps) => {
  //call delete-api trpc function on click
  const cronJobData: any = {
    api: name,
    cronJobId: cronJobId,
    phoneNumber: phoneNumber,
  };

  const settingsMutation = trpc.useMutation(["supabase.delete-api-settings"]);

  const [deleted, setDeleted] = useState(false);
  console.log(deleted);

  const handleSettingsMutation = async () => {
    const response = await settingsMutation.mutate(cronJobData);
    console.log(response);
    setDeleted(true);
  };

  return (
    <div>
      {cronJobId && deleted === false ? (
        <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:bg-purple-200 ">
          <h2 className="text-lg text-gray-700">{name}</h2>
          <p className="text-sm text-gray-600">{occurrence}</p>
          <p className="text-sm text-gray-600">{time}</p>
          <p className="text-sm text-gray-600">{timezone}</p>
          <button onClick={handleSettingsMutation}>Delete</button>
          <button>Edit</button>
          <p>{`CRON job ID: ${cronJobId ?? ""}`}</p>
        </section>
      ) : (
        <section className="invisible">
          <h2 className="text-lg text-gray-700">{name}</h2>
          <p className="text-sm text-gray-600">{occurrence}</p>
          <p className="text-sm text-gray-600">{time}</p>
          <p className="text-sm text-gray-600">{timezone}</p>
          <button onClick={handleSettingsMutation}>Delete</button>
          <button>Edit</button>
          <p>{`CRON job ID: ${cronJobId ?? ""}`}</p>
        </section>
      )}
    </div>
  );
};

export default ProfileCard;
