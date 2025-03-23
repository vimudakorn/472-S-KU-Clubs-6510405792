import React from 'react';
import ActivityCard from './ActivityCard';

interface ActivityListProps {
  activities: any[];
  status: 'upcoming' | 'ongoing' | 'past';
}

export default function ActivityList({ activities, status }: ActivityListProps) {
  const filteredActivities = activities.filter(activity => activity.status === status);
  
  if (filteredActivities.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">
          {status === 'upcoming' 
            ? 'ไม่พบกิจกรรมที่กำลังจะมาถึง' 
            : status === 'ongoing' 
              ? 'ไม่พบกิจกรรมที่กำลังดำเนินการ' 
              : 'ไม่พบกิจกรรมที่ผ่านมาแล้ว'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredActivities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}