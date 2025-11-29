import { Button } from "@components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import type { UseFieldArrayRemove } from "react-hook-form";
import type { Activity } from "schemas/event";

type Props = {
    activities: Activity[];
    onRemoveActivity: UseFieldArrayRemove;
};

const Activities = ({ activities, onRemoveActivity }: Props) => {

    return (
        <div className="border p-4 rounded-md bg-primary">
            <ul className="space-y-2">
                {activities.map((activity, index) => (
                    <li
                        key={index}
                        className="dynamic_text bg-secondary border p-05 flex place-items-center justify-between p-1"
                    >
                        <div className="flex gap-1">
                            <span className="font-semibold">{activity.dateString}</span>
                            <span>-</span>
                            <span>{activity.time}</span>
                        </div>
                        <div className="flex gap-3">
                            <span>{activity.label}</span>
                            <span>{activity.activityType}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveActivity(index)}
                            >
                                <TrashIcon className="w-4 h-4 text-red-500" />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Activities;
