"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getClubActivities, getClubById } from "@/app/_mocks_/data";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/ui/safe-image";
import { Activity } from "@/interfaces/Activity";
import { useParams } from "next/navigation";

// Change the component to use async/await properly
export default function ActivityDetail() {
  const params = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [clubName, setClubName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Use the id directly from params in useEffect
  useEffect(() => {
    // Check if params exists
    if (!params) {
      console.error("Params object is undefined");
      setIsLoading(false);
      return;
    }
    
    try {
      // Access id safely using the params object
      const activityId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : "";
      
      if (!activityId) {
        console.error("No activity ID found in URL parameters");
        setIsLoading(false);
        return;
      }
      
      console.log("Activity ID from params:", activityId);
      
      // Simulate fetching activity data
      const timer = setTimeout(() => {
        // ดึงข้อมูลกิจกรรมทั้งหมดจากทุกชมรม
        const allActivities: Activity[] = [];
        for (let i = 1; i <= 20; i++) {
          const clubActivities = getClubActivities(i.toString());
          allActivities.push(...clubActivities);
        }
        
        // หากิจกรรมที่ตรงกับ ID ที่ระบุ
        const foundActivity = allActivities.find(a => a.id === activityId) || null;
        
        // Debug: Log activity status and ID
        console.log(`Activity ID: ${activityId}, Status: ${foundActivity?.status}`);
        
        // Add custom images based on activity type
        if (foundActivity && foundActivity.status === 'past') {
          // Check if this is a nature trip activity
          if (foundActivity.title?.includes('ทริป') || foundActivity.title?.includes('ธรรมชาติ') ||
            foundActivity.description?.includes('ทริป') || foundActivity.description?.includes('ธรรมชาติ') ||
            foundActivity.id === '103-4') {
            // Nature trip images
            foundActivity.images = [
              'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1770&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1770&auto=format&fit=crop'
            ];
          }
          // Check if this is a portrait photography workshop
          else if (foundActivity.title?.includes('บุคคล') || foundActivity.title?.includes('เวิร์กช็อป') ||
            foundActivity.description?.includes('บุคคล') || foundActivity.description?.includes('เวิร์กช็อป') ||
            foundActivity.id === '103-5') {
            // Portrait photography images
            foundActivity.images = [
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1887&auto=format&fit=crop'
            ];
          }
          // Default images for other activities
          else {
            foundActivity.images = [
              'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1974&auto=format&fit=crop'
            ];
          }
          
          console.log("Activity images set:", foundActivity.images);
        }
        
        setActivity(foundActivity);
        
        // ดึงชื่อชมรมจาก clubId
        if (foundActivity) {
          const club = getClubById(foundActivity.clubId);
          if (club) {
            setClubName(club.clubName);
          }
        }
        
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error in useEffect:", error);
      setIsLoading(false);
    }
  }, [params]); // Use params as the dependency, not params.id

  const handleBack = () => {
    router.back();
  };

  const handleRegister = () => {
    alert("ลงทะเบียนสำเร็จ! เราจะติดต่อกลับเพื่อยืนยันการสมัครอีกครั้ง");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Button onClick={handleBack} variant="outline" className="mb-6">
          ย้อนกลับ
        </Button>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลกิจกรรม</h1>
          <p className="text-gray-600">กิจกรรมที่คุณกำลังค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
        </div>
      </div>
    );
  }

  const isRegistrationClosed = activity.status === "past";
  const isOngoing = activity.status === "ongoing";

  // After the benefits section, add the summary and images sections
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Button onClick={handleBack} variant="outline" className="mb-6">
        ย้อนกลับ
      </Button>
        
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-700 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">{activity.title}</h1>
          <p className="text-green-100">จัดโดย {clubName}</p>
        </div>
          
        {/* Display a featured image at the top ONLY for past activities */}
        {isRegistrationClosed && activity.images && activity.images.length > 0 && (
          <div className="w-full h-64 md:h-80 relative">
            <SafeImage
              src={activity.images[0]}
              alt={`ภาพกิจกรรม ${activity.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
          
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">รายละเอียดกิจกรรม</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">วันที่จัดกิจกรรม</p>
                    <p className="text-gray-600">{activity.date}</p>
                  </div>
                </div>
                  
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">เวลา</p>
                    <p className="text-gray-600">{activity.time} น.</p>
                  </div>
                </div>
                  
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">สถานที่</p>
                    <p className="text-gray-600">{activity.location}</p>
                  </div>
                </div>
              </div>
            </div>
              
            <div>
              <h2 className="text-lg font-semibold mb-4">ข้อมูลการสมัคร</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">ค่าใช้จ่าย</p>
                    <p className="text-gray-600">{activity.fee}</p>
                  </div>
                </div>
                  
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">สมัครภายใน</p>
                    <p className="text-gray-600">{activity.deadline}</p>
                  </div>
                </div>
                  
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">รับจำนวน</p>
                    <p className="text-gray-600">{activity.maxParticipants} คน</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">รายละเอียดเพิ่มเติม</h2>
            <p className="text-gray-700">{activity.detailedDescription}</p>
          </div>
            
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">คุณสมบัติผู้สมัคร</h2>
            <p className="text-gray-700">{activity.requirements}</p>
          </div>
            
          {/* Add summary section for past activities */}
          {isRegistrationClosed && activity.summary && (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-2">สรุปกิจกรรม</h2>
              <p className="text-gray-700">{activity.summary}</p>
            </div>
          )}
            
          {/* Add images section for past activities */}
          {isRegistrationClosed && activity.images && activity.images.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">ภาพกิจกรรม</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activity.images.map((imageUrl, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={imageUrl}
                      alt={`ภาพกิจกรรม ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log("Image failed to load:", imageUrl);
                        // Use a reliable placeholder service
                        e.currentTarget.src = `https://via.placeholder.com/400x300/e2e8f0/1e293b?text=ภาพกิจกรรม+${index + 1}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
            
          <div className="flex justify-center mt-8">
            {isRegistrationClosed ? (
              <Button disabled className="w-full md:w-1/3 bg-gray-400 text-white">
                กิจกรรมนี้สิ้นสุดแล้ว
              </Button>
            ) : isOngoing ? (
              <Button disabled className="w-full md:w-1/3 bg-yellow-500 text-white">
                กิจกรรมกำลังดำเนินการ
              </Button>
            ) : (
              <Button onClick={handleRegister} className="w-full md:w-1/3 bg-green-600 hover:bg-green-700 text-white">
                สมัครเข้าร่วมกิจกรรม
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}