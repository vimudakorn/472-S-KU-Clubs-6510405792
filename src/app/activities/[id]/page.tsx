"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getActivityById } from '@/app/data/mockData';

export default function ActivityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<any>(null);
  const [daysLeft, setDaysLeft] = useState(0);

  // ฟังก์ชันช่วยแปลงชื่อเดือนภาษาไทยเป็นตัวเลข
  const getThaiMonthIndex = (thaiMonth: string) => {
    const months: Record<string, number> = {
      'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3,
      'พฤษภาคม': 4, 'มิถุนายน': 5, 'กรกฎาคม': 6, 'สิงหาคม': 7,
      'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
    };
    return months[thaiMonth] || 0;
  };

  useEffect(() => {
    // จำลองการโหลดข้อมูล
    const timer = setTimeout(() => {
      const activityId = id ? Number(id) : 1;
      const foundActivity = getActivityById(activityId);
      setActivity(foundActivity);
      
      // คำนวณวันที่เหลือ (สำหรับกิจกรรม upcoming)
      if (foundActivity && foundActivity.status === 'upcoming') {
        // แก้ไขการแปลงวันที่
        const dateParts = foundActivity.date.split(' ');
        const year = parseInt(dateParts[2]);
        const month = getThaiMonthIndex(dateParts[1]);
        const day = parseInt(dateParts[0]);
        
        const eventDate = new Date(year, month, day);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays);
      }
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">ไม่พบกิจกรรมที่ต้องการ</h1>
        <Link href="/clubs">
          <Button variant="outline">กลับไปหน้าหลัก</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href={`/ClubActivities?id=${activity.clubId}`} className="flex items-center text-blue-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ย้อนกลับไปหน้ากิจกรรม
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
        
        <div className="mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {activity.status === 'upcoming' ? 'Upcoming' : activity.status === 'past' ? 'Past' : 'Ongoing'}
          </span>
        </div>
        
        {/* Event Poster */}
        <div className="w-full h-96 rounded-lg overflow-hidden mb-8 relative">
          <Image 
            src={`/images/activities/${activity.id}-poster.jpg`}
            alt={activity.title}
            fill
            className="object-cover"
            onError={(e) => {
              // @ts-ignore
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/default-poster.jpg";
            }}
          />
        </div>
        
        {/* Event Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลอีเวนต์</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{activity.date}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{activity.time}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{activity.fee}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>{activity.location}</span>
            </div>
            
            {activity.status === 'upcoming' && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{daysLeft} วันในกิจกรรม</span>
              </div>
            )}
          </div>
        </div>
        
        {/* แสดงรายละเอียดแตกต่างกันตามสถานะของกิจกรรม */}
        {activity.status === 'upcoming' ? (
          <>
            {/* Event Description สำหรับ upcoming */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">รายละเอียดอีเวนต์</h2>
              <div className="prose max-w-none">
                {activity.detailedDescription.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph.trim()}</p>
                ))}
              </div>
            </div>
            
            {/* Registration Button */}
            <div className="flex justify-center">
              <Button className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="https://forms.gle/WXL7tCh2c5tVBFhN8" target="_blank" rel="noopener noreferrer">
                  สมัครเข้าร่วม
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Event Summary สำหรับ past */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">สรุปกิจกรรม</h2>
              <div className="prose max-w-none">
                {activity.summary.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph.trim()}</p>
                ))}
              </div>
            </div>
            
            {/* Event Photos สำหรับ past */}
            {activity.status === 'past' && activity.eventPhotos && activity.eventPhotos.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">ภาพกิจกรรม</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activity.eventPhotos.map((photo: string, index: number) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden relative">
                      <Image 
                        src={photo} // Use the path directly from eventPhotos array
                        alt={`ภาพกิจกรรมที่ ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // @ts-ignore
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/default-photo.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}