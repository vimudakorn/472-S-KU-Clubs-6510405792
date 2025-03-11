"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '../../components/ui/button';
import { ActivitySkeleton } from '../../components/skeleton/activity-skeleton';

// Mock data
const clubData = {
  id: 'KUC-2025-001',
  name: 'ชมรมถ่ายภาพ',
  category: 'ด้านศิลปะวัฒนธรรม',
  campus: 'บางเขน',
  president: 'พศวีร์ ชัยประดิษฐ์',
  advisor: 'ผศ.ดร นภัทร รัตนสุข',
  description: 'ชมรมของผู้ที่หลงใหลในการถ่ายภาพเพื่อเรียนรู้เเลกเปลี่ยนเทคนิคการถ่ายภาพและสร้างความทรงจำไปด้วยกัน!',
  activities: [
    {
      id: 1,
      title: 'เวิร์กช็อปถ่ายภาพแนวสตรีท',
      date: '15 มีนาคม 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'ห้องประชุม 101',
      description: 'เรียนรู้ศิลปะการถ่ายภาพแนวสตรีทกับช่างภาพมืออาชีพ ณัฐกิต เอื้อขัน อย่าลืมนำกล้องและรองเท้าที่ใส่สบายมาด้วย!',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'นิทรรศการภาพถ่าย: วิถีชีวิตในเมือง',
      date: '20 มีนาคม 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'คณะมนุษย์ศาสตร์ ตึก 63',
      description: 'นิทรรศการภาพถ่ายประจำปีที่นำเสนอภาพถ่ายเมืองที่ดีที่สุดจากสมาชิกชมรมของเรา"',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'คอร์สพื้นฐานการถ่ายภาพ',
      date: '5 เมษายน 2025',
      time: '1:00 PM - 4:00 PM',
      location: 'True lab อาคารเทพสถิตย์',
      description: 'เหมาะสำหรับมือใหม่! เรียนรู้พื้นฐานการใช้กล้อง การจัดองค์ประกอบ และเทคนิคการแต่งภาพเบื้องต้น',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'ทริปถ่ายภาพธรรมชาติ',
      date: '10 กุมภาพันธ์ 2025',
      time: '7:00 AM - 5:00 PM',
      location: 'อุทยานแห่งชาติเขาใหญ่',
      description: 'ทริปท่องเที่ยวันเดียวที่อุทยานแห่งชาติเขาใหญ่ เพื่อฝึกถ่ายภาพธรรมชาติและสัตว์ป่า',
      status: 'past'
    },
    {
      id: 5,
      title: 'เวิร์กช็อปถ่ายภาพบุคคล',
      date: '25 มกราคม 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'หอสมุด มหาวิทยาลัยเกษตรศาสตร์ บางเขน',
      description: 'เรียนรู้เทคนิคการถ่ายภาพบุคคลกับช่างภาพมืออาชีพ ณิชาภัทร ศรีมงคล',
      status: 'past'
    }
  ]
};

export default function ClubDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);

  // จำลองการโหลดข้อมูล
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - แสดงรายละเอียดชมรม */}
      <div className="w-full md:w-80 bg-white shadow-md p-6 md:min-h-screen">
        <Link href="/clubs" className="flex items-center text-blue-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ย้อนกลับไปหน้าหลัก
        </Link>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">Club ID</h2>
          <p className="font-bold">#{clubData.id}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">ชื่อชมรม</h2>
          <p className="font-bold">{clubData.name}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">ประเภทชมรม</h2>
          <p className="font-bold">{clubData.category}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">วิทยาเขต</h2>
          <p className="font-bold">{clubData.campus}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">ประธานชมรม</h2>
          <div className="flex items-center mt-1">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
            <p>{clubData.president}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">ที่ปรึกษา</h2>
          <p>{clubData.advisor}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-sm text-gray-500">รายละเอียดชมรม</h2>
          <p className="text-sm">{clubData.description}</p>
        </div>
      </div>
      
      {/* Main content - แสดงกิจกรรมของชมรม */}
      <div className="flex-1 p-6">
        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
          <p className="text-gray-500 text-xl">Club Banner Image</p>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Club Activities</h1>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {loading ? (
              <>
                <ActivitySkeleton />
                <ActivitySkeleton />
                <ActivitySkeleton />
              </>
            ) : (
              clubData.activities
                .filter(activity => activity.status === 'upcoming')
                .map(activity => (
                  <div key={activity.id} className="mb-6 p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">{activity.title}</h2>
                      <Button variant="link" className="text-blue-600 hover:text-blue-800">
                        View Full Detail
                      </Button>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="mr-4">{activity.date}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="mr-4">{activity.time}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span>{activity.location}</span>
                    </div>
                    <p className="text-gray-700">{activity.description}</p>
                  </div>
                ))
            )}
          </TabsContent>
          
          <TabsContent value="ongoing">
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">No ongoing activities at the moment</p>
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            {loading ? (
              <>
                <ActivitySkeleton />
                <ActivitySkeleton />
              </>
            ) : (
              clubData.activities
                .filter(activity => activity.status === 'past')
                .map(activity => (
                  <div key={activity.id} className="mb-6 p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">{activity.title}</h2>
                      <Button variant="link" className="text-blue-600 hover:text-blue-800">
                        View Full Detail
                      </Button>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="mr-4">{activity.date}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="mr-4">{activity.time}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span>{activity.location}</span>
                    </div>
                    <p className="text-gray-700">{activity.description}</p>
                  </div>
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}