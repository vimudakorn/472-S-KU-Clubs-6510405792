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

  // ฟังก์ชันช่วยแปลงชื่อเดือนภาษาไทยเป็นตัวเลุจำ 
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
      <div className="w-full mb-6">
        <Link href={`/ClubActivities?id=${activity.clubId}`} className="flex items-center text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ย้อนกลับไปหน้ากิจกรรม
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
        
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            activity.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 
            activity.status === 'past' ? 'bg-gray-200 text-gray-800' : 
            'bg-green-100 text-green-800'
          }`}>
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
            
            {/* Add capacity info */}
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium text-blue-600">จำนวน: {activity.maxParticipants} ที่นั่ง</span>
            </div>
            
            {/* Add deadline info */}
            {activity.deadline && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-red-600">ลงทะเบียนภายใน: {activity.deadline}</span>
              </div>
            )}
            
            {activity.status === 'upcoming' && (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">ระยะเวลากิจกรรม: {activity.time.includes('-') ? 
                  `${activity.time.split('-')[1].trim().replace('PM', '').replace('AM', '')} ชั่วโมง` : 
                  'ภายในวันที่ ' + activity.date}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Add Benefits and Requirements section */}
        {(activity.benefits || activity.requirements) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">ผลประโยชน์และข้อกำหนด</h2>
            
            {activity.benefits && (
              <div className="mb-4">
                <h3 className="font-medium text-lg mb-2">ผลประโยชน์ที่จะได้รับ</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {activity.benefits.certificate && (
                    <li>ได้รับเกียรติบัตร</li>
                  )}
                  {activity.benefits.activityHours > 0 && (
                    <li>ได้รับชั่วโมงกิจกรรม {activity.benefits.activityHours} ชั่วโมง</li>
                  )}
                  {activity.benefits.other && (
                    <li>{activity.benefits.other}</li>
                  )}
                </ul>
              </div>
            )}
            
            {activity.requirements && (
              <div>
                <h3 className="font-medium text-lg mb-2">ข้อกำหนดการเข้าร่วม</h3>
                <p className="text-gray-700">{activity.requirements}</p>
              </div>
            )}
          </div>
        )}
        
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
              <Button className="px-8 py-6 text-lg bg-green-600 hover:bg-green-700" asChild>
                <Link href="https://forms.gle/WXL7tCh2c5tVBFhN8" target="_blank" rel="noopener noreferrer">
                  สมัครเข้าร่วม
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* What I Learned section for past activities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">สิ่งที่ได้เรียนรู้จากกิจกรรมนี้</h2>
              <div className="prose max-w-none">
                {activity.id === 4 ? (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-4">
                      <p className="italic text-gray-700">
                        "ทริปถ่ายภาพที่เขาใหญ่เป็นประสบการณ์ที่น่าทึ่งมาก ได้เรียนรู้เทคนิคการถ่ายภาพสัตว์ป่าในระยะไกล 
                        และการปรับตั้งค่ากล้องให้เหมาะกับสภาพแสงในป่า การได้เห็นนกเงือกและกระทิงในธรรมชาติเป็นประสบการณ์ที่ไม่มีวันลืม"
                      </p>
                      <p className="text-right text-sm text-gray-600 mt-2">- นิสิตชั้นปีที่ 3 คณะวิทยาศาสตร์</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 mb-4">
                      <p className="italic text-gray-700">
                        "อาจารย์สมชายสอนเทคนิคการใช้เลนส์ซูมได้อย่างมืออาชีพมาก ทำให้ผมถ่ายภาพสัตว์ป่าได้คมชัดแม้อยู่ไกล 
                        และยังได้เรียนรู้เรื่องการอนุรักษ์ธรรมชาติควบคู่ไปด้วย ทริปนี้คุ้มค่ามากครับ"
                      </p>
                      <p className="text-right text-sm text-gray-600 mt-2">- นิสิตชั้นปีที่ 2 คณะวนศาสตร์</p>
                    </div>
                  </>
                ) : activity.id === 5 ? (
                  <>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 mb-4">
                      <p className="italic text-gray-700">
                        "เวิร์กช็อปถ่ายภาพบุคคลกับอาจารย์ณิชาภัทรเปิดโลกทัศน์ใหม่ให้กับฉันมาก ได้เรียนรู้การจัดแสงและการสื่อสารกับนางแบบ
                        เพื่อให้ได้ภาพที่เป็นธรรมชาติ Lightroom Preset ที่ได้รับก็ช่วยให้การแต่งภาพง่ายขึ้นมาก"
                      </p>
                      <p className="text-right text-sm text-gray-600 mt-2">- นิสิตชั้นปีที่ 4 คณะนิเทศศาสตร์</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <p className="italic text-gray-700">
                        "ประทับใจมากกับเทคนิคการถ่ายภาพบุคคลในสถานที่จำกัด อาจารย์สอนวิธีใช้อุปกรณ์ที่มีอยู่ให้เกิดประโยชน์สูงสุด
                        ทำให้ฉันมั่นใจว่าสามารถถ่ายภาพสวยๆ ได้แม้ไม่มีอุปกรณ์ราคาแพง"
                      </p>
                      <p className="text-right text-sm text-gray-600 mt-2">- นิสิตชั้นปีที่ 1 คณะศิลปกรรมศาสตร์</p>
                    </div>
                  </>
                ) : (
                  <p>ไม่มีข้อมูลสิ่งที่ได้เรียนรู้จากกิจกรรมนี้</p>
                )}
              </div>
            </div>
            
            {/* Event Photos สำหรับ past */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">ภาพกิจกรรม</h2>
              {activity.eventPhotos && activity.eventPhotos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activity.eventPhotos.map((photo: string, index: number) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden relative">
                      <Image 
                        src={photo}
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
              ) : activity.id === 4 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="aspect-video rounded-lg overflow-hidden relative">
                      <Image 
                        src={`/images/events/trip-khao-yai-${num}.jpg`}
                        alt={`ภาพกิจกรรมที่ ${num}`}
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
              ) : activity.id === 5 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="aspect-video rounded-lg overflow-hidden relative">
                      <Image 
                        src={`/images/events/portrait-workshop-${num}.jpg`}
                        alt={`ภาพกิจกรรมที่ ${num}`}
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
              ) : (
                <p className="text-center text-gray-500">ไม่มีภาพกิจกรรมนี้</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}