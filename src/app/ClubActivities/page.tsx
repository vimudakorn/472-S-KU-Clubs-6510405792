"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ActivitySkeleton } from '@/components/skeleton/activity-skeleton';
import { getClubById, getClubActivities } from '../data/mockData';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export default function ClubDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'KUC-2025-001';
  
  const [loading, setLoading] = useState(true);
  const [clubData, setClubData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  
  // เพิ่มสถานะสำหรับการค้นหาและเรียงลำดับ
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);

  // จำลองการโหลดข้อมูล
  useEffect(() => {
    const timer = setTimeout(() => {
      // ใช้ ID จาก params หรือใช้ค่าเริ่มต้นถ้าไม่มี
      const club = getClubById(id);
      const clubActivities = getClubActivities(id);
      
      setClubData(club);
      setActivities(clubActivities);
      setFilteredActivities(clubActivities);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // ฟังก์ชันสำหรับแปลงวันที่ไทยเป็น Date object
  const parseThaiDate = (thaiDate: string) => {
    const months: Record<string, number> = {
      'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3,
      'พฤษภาคม': 4, 'มิถุนายน': 5, 'กรกฎาคม': 6, 'สิงหาคม': 7,
      'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
    };
    
    const parts = thaiDate.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = months[parts[1]];
      const year = parseInt(parts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return new Date(); // ถ้าแปลงไม่ได้ให้ใช้วันที่ปัจจุบัน
  };

  // ฟังก์ชันสำหรับกรองและเรียงลำดับกิจกรรม
  useEffect(() => {
    if (!loading) {
      let result = [...activities];
      
      // กรองตามคำค้นหา
      if (searchTerm) {
        result = result.filter(activity =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // เรียงลำดับตามตัวเลือก
      switch (sortOption) {
        case 'newest':
          result.sort((a, b) => parseThaiDate(b.date).getTime() - parseThaiDate(a.date).getTime());
          break;
        case 'oldest':
          result.sort((a, b) => parseThaiDate(a.date).getTime() - parseThaiDate(b.date).getTime());
          break;
        case 'alphabetical':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'reverseAlphabetical':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      
      setFilteredActivities(result);
    }
  }, [searchTerm, sortOption, activities, loading]);

  if (!clubData && !loading) {
    return <div className="p-6">ไม่พบข้อมูลชมรม</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar - แสดงรายละเอียดชมรม */}
      <div className="w-full md:w-80 bg-white shadow-md p-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <Link href="/clubs" className="flex items-center text-black mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ย้อนกลับไปหน้าหลัก
        </Link>
        
        {loading ? (
          <div className="space-y-4">
            <div>
              <div className="h-4 w-16 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            <div>
              <div className="h-4 w-20 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            <div>
              <div className="h-4 w-24 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            <div>
              <div className="h-4 w-20 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-28 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            <div>
              <div className="h-4 w-24 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex items-center mt-1">
                <div className="w-8 h-8 rounded-full mr-2 bg-gray-200 animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            
            <div>
              <div className="h-4 w-20 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-36 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            <div>
              <div className="h-4 w-28 mb-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-full mt-2 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-3/4 mt-2 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">Club ID</h2>
              <p className="font-bold">#{clubData.id}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">ชื่อชมรม</h2>
              <p className="font-bold">{clubData.name}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">วิทยาเขต</h2>
              <p className="font-bold">{clubData.campus || "บางเขน"}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">ประเภทชมรม</h2>
              <p className="font-bold">{clubData.category}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">ประธานชมรม</h2>
              <p>{clubData.president}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">ที่ปรึกษา</h2>
              <p>{clubData.advisor}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-sm text-gray-500">รายละเอียดชมรม</h2>
              <p className="text-sm">{clubData.description}</p>
            </div>
          </>
        )}
      </div>
        
      {/* Main content - แสดงกิจกรรมของชมรม */}
      <div className="flex-1 p-6">
        {loading ? (
          <>
            {/* Skeleton for banner */}
            <div className="w-full h-48 rounded-lg mb-6 bg-gray-200 animate-pulse"></div>
            
            {/* Skeleton for heading */}
            <div className="h-8 w-48 mb-6 bg-gray-200 animate-pulse rounded"></div>
            
            {/* Skeleton for tabs */}
            <div className="mb-6">
              <div className="flex space-x-2">
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            
            {/* Skeleton for activities */}
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
        ) : (
          <>
            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden relative mb-6">
              <Image
                src={`/images/clubs/${clubData?.id || 'default'}-banner.jpg`}
                alt={`${clubData?.name || 'Club'} Banner`}
                fill
                className="object-cover"
                onError={(e) => {
                  // @ts-ignore
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/default-banner.jpg";
                }}
              />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">กิจกรรมทั้งหมดของชมรม</h1>
            <p className="text-gray-600 mb-6">นี่คือกิจกรรมหรืออีเวนต์ต่าง ๆ ภายในชมรมที่กำลังจะจัดขึ้น สามารถเลือกเข้าร่วมกิจกรรมที่คุณสนใจได้เลย!</p>
            
            {/* เพิ่มส่วนค้นหาและเรียงลำดับ */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="ค้นหากิจกรรม..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-green-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full border-green-200 focus:border-gray-400 focus:ring-gray-400">
                    <SelectValue placeholder="เรียงลำดับตาม..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">วันที่: ล่าสุดไปเก่าสุด</SelectItem>
                    <SelectItem value="oldest">วันที่: เก่าสุดไปล่าสุด</SelectItem>
                    <SelectItem value="alphabetical">เรียงตามตัวอักษร: ก-ฮ</SelectItem>
                    <SelectItem value="reverseAlphabetical">เรียงตามตัวอักษร: ฮ-ก</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-6 bg-gray-50">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Ongoing</TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-800">Past</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {filteredActivities.filter(activity => activity.status === 'upcoming').length > 0 ? (
                  <div className="space-y-4">
                    {filteredActivities
                      .filter(activity => activity.status === 'upcoming')
                      .map(activity => (
                        <div key={activity.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{activity.title}</h3>
                            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
                              <Link href={`/activities/${activity.id}`}>
                                ดูรายละเอียดทั้งหมด
                              </Link>
                            </Button>
                          </div>
                          <div className="flex items-center text-gray-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{activity.date}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{activity.time}</span>
                          </div>
                          
                          {/* ... existing code ... */}
                          
                          <p className="text-gray-700 mb-4">{activity.description}</p>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">ไม่พบกิจกรรมที่กำลังจะมาถึง</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="ongoing">
                {filteredActivities.filter(activity => activity.status === 'ongoing').length > 0 ? (
                  <div className="space-y-4">
                    {filteredActivities
                      .filter(activity => activity.status === 'ongoing')
                      .map(activity => (
                        <div key={activity.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{activity.title}</h3>
                            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
                              <Link href={`/activities/${activity.id}`}>
                                ดูรายละเอียดทั้งหมด
                              </Link>
                            </Button>
                          </div>
                          <div className="flex items-center text-gray-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{activity.date}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{activity.location}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>รับ: {activity.maxParticipants} คน</span>
                          </div>
                          <p className="text-gray-700 mb-4">{activity.description}</p>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">ไม่มีกิจกรรมที่กำลังดำเนินการในขณะนี้</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {filteredActivities.filter(activity => activity.status === 'past').length > 0 ? (
                  <div className="space-y-4">
                    {filteredActivities
                      .filter(activity => activity.status === 'past')
                      .map(activity => (
                        <div key={activity.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{activity.title}</h3>
                            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
                              <Link href={`/activities/${activity.id}`}>
                                ดูรายละเอียดทั้งหมด
                              </Link>
                            </Button>
                          </div>
                          <div className="flex items-center text-gray-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{activity.date}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{activity.time}</span>
                          </div>
                          
                          {/* ... existing code ... */}
                          
                          <p className="text-gray-700 mb-4">{activity.description}</p>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">ไม่มีกิจกรรมที่ผ่านมาแล้ว</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
