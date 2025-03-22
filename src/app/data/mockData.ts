// Mock data สำหรับชมรมและกิจกรรม
export const clubsData = [
  {
    id: 'KUC-2025-001',
    name: 'ชมรมถ่ายภาพ',
    category: 'ด้านศิลปะวัฒนธรรม',
    campus: 'บางเขน',
    president: 'พศวีร์ ชัยประดิษฐ์',
    advisor: 'ผศ.ดร นภัทร รัตนสุข',
    description: 'ชมรมของผู้ที่หลงใหลในการถ่ายภาพเพื่อเรียนรู้เเลกเปลี่ยนเทคนิคการถ่ายภาพและสร้างความทรงจำไปด้วยกัน!',
    activities: [1, 2, 3, 4, 5] // เก็บเฉพาะ ID ของกิจกรรม
  },
  // เพิ่มชมรมตัวอย่างสำหรับวิทยาเขตอื่นๆ
  {
    id: 'KUC-2025-002',
    name: 'ชมรมดนตรีสากล',
    category: 'ด้านศิลปะวัฒนธรรม',
    campus: 'ศรีราชา',
    president: 'ธนวัฒน์ สุขสวัสดิ์',
    advisor: 'อ.ดร. วรรณา มีเพียร',
    description: 'ชมรมสำหรับผู้ที่รักในเสียงดนตรี เปิดโอกาสให้นิสิตได้แสดงความสามารถและพัฒนาทักษะทางดนตรี',
    activities: [] // ยังไม่มีกิจกรรม
  },
  {
    id: 'KUC-2025-003',
    name: 'ชมรมอนุรักษ์สิ่งแวดล้อม',
    category: 'ด้านบำเพ็ญประโยชน์',
    campus: 'กำแพงแสน',
    president: 'นภัสสร ใจดี',
    advisor: 'รศ.ดร. สมชาย รักธรรมชาติ',
    description: 'ชมรมที่มุ่งเน้นการอนุรักษ์สิ่งแวดล้อมและสร้างจิตสำนึกในการรักษาธรรมชาติให้แก่นิสิตและชุมชน',
    activities: [] // ยังไม่มีกิจกรรม
  }
  // สามารถเพิ่มชมรมอื่นๆ ได้ตรงนี้
];

export const activitiesData = [
  // For activity ID 1
  {
      id: 1,
      title: 'เวิร์กช็อปถ่ายภาพแนวสตรีท',
      date: '15 มีนาคม 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'ห้องประชุม 101',
      description: 'เรียนรู้ศิลปะการถ่ายภาพแนวสตรีทกับช่างภาพมืออาชีพ ณัฐกิต เอื้อขัน อย่าลืมนำกล้องและรองเท้าที่ใส่สบายมาด้วย!',
      status: 'upcoming',
      clubId: 'KUC-2025-001',
      fee: 'ฟรี',
      deadline: '10 มีนาคม 2025',
      maxParticipants: 30,
      // Removed currentParticipants
      benefits: {
        activityHours: 3,
        certificate: true,
        other: 'ได้รับภาพถ่ายที่ผ่านการตัดต่อจากวิทยากร 1 ภาพ'
      },
      requirements: 'เปิดรับนิสิตทุกคณะ ต้องมีกล้องถ่ายรูป (สมาร์ทโฟนก็ได้)',
      detailedDescription: `
        เข้าร่วมเวิร์กช็อปถ่ายภาพแนวสตรีทกับเรา! โดยมีการควบคุมแสงและเทคนิคการจัดองค์ประกอบเพื่อสร้างภาพที่มีความสมดุล
        
        เรียนรู้เทคนิคการควบคุมแสงเพื่อสร้างภาพที่มีความสมดุล
        
        เข้าใจการจัดองค์ประกอบเพื่อให้ภาพถ่ายมีความน่าสนใจ
        
        ฝึกฝนการถ่ายภาพสตรีทในสถานการณ์จริง
        
        รับคำแนะนำและเทคนิคการจากช่างภาพมืออาชีพ review and feedback
      `
    },
    // For activity ID 2
    {
      id: 2,
      title: 'นิทรรศการภาพถ่าย: วิถีชีวิตในเมือง',
      date: '20 มีนาคม 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'คณะมนุษย์ศาสตร์ ตึก 63',
      description: 'นิทรรศการภาพถ่ายประจำปีที่นำเสนอภาพถ่ายเมืองที่ดีที่สุดจากสมาชิกชมรมของเรา"',
      status: 'upcoming',
      clubId: 'KUC-2025-001',
      fee: 'ฟรี',
      deadline: 'ไม่มีกำหนด (Walk-in)',
      maxParticipants: 100,
      // Remove currentParticipants
      benefits: {
        activityHours: 2,
        certificate: false,
        other: 'โอกาสในการพบปะพูดคุยกับช่างภาพมืออาชีพ'
      },
      requirements: 'เปิดให้บุคคลทั่วไปเข้าชม ไม่จำเป็นต้องเป็นนิสิต',
      detailedDescription: `
        นิทรรศการภาพถ่ายประจำปีที่นำเสนอภาพถ่ายเมืองที่ดีที่สุดจากสมาชิกชมรมของเรา
        
        พบกับผลงานภาพถ่ายกว่า 50 ภาพที่คัดสรรมาอย่างดี
        
        ร่วมโหวตภาพถ่ายยอดเยี่ยมประจำปี
        
        พูดคุยกับช่างภาพเจ้าของผลงาน
      `
    },
    {
      id: 3,
      title: 'คอร์สพื้นฐานการถ่ายภาพ',
      date: '5 เมษายน 2025',
      time: '1:00 PM - 4:00 PM',
      location: 'True lab อาคารเทพสถิตย์',
      description: 'เหมาะสำหรับมือใหม่! เรียนรู้พื้นฐานการใช้กล้อง การจัดองค์ประกอบ และเทคนิคการแต่งภาพเบื้องต้น',
      status: 'upcoming',
      clubId: 'KUC-2025-001',
      fee: '300 บาท',
      deadline: '1 เมษายน 2025',
      maxParticipants: 20,
      // Remove this line: currentParticipants: 5,
      benefits: {
        activityHours: 6,
        certificate: true,
        other: 'ได้รับคู่มือการถ่ายภาพเบื้องต้นฉบับดิจิทัล และส่วนลด 10% สำหรับการซื้ออุปกรณ์ถ่ายภาพที่ร้านพันธมิตร'
      },
      requirements: 'เปิดรับนิสิตทุกคณะ เหมาะสำหรับผู้เริ่มต้น ไม่จำเป็นต้องมีกล้อง DSLR',
      detailedDescription: `
        คอร์สพื้นฐานสำหรับผู้เริ่มต้นถ่ายภาพ ไม่จำเป็นต้องมีกล้อง DSLR สามารถใช้สมาร์ทโฟนได้
        
        เรียนรู้การตั้งค่ากล้องเบื้องต้น
        
        เข้าใจหลักการจัดองค์ประกอบภาพ
        
        เทคนิคการถ่ายภาพในสภาพแสงต่างๆ
        
        พื้นฐานการแต่งภาพด้วยแอพพลิเคชั่นบนมือถือ
      `
      // Remove these duplicate lines:
      // maxParticipants: 20,
      // currentParticipants: 5
    },
    {
      id: 4,
      title: 'ทริปถ่ายภาพธรรมชาติ',
      date: '10 กุมภาพันธ์ 2025',
      time: '7:00 AM - 5:00 PM',
      location: 'อุทยานแห่งชาติเขาใหญ่',
      description: 'ทริปท่องเที่ยวันเดียวที่อุทยานแห่งชาติเขาใหญ่ เพื่อฝึกถ่ายภาพธรรมชาติและสัตว์ป่า',
      status: 'past',
      clubId: 'KUC-2025-001',
      fee: '500 บาท',
      deadline: '5 กุมภาพันธ์ 2025', // Add deadline if missing
      maxParticipants: 15,
      // Remove this line: currentParticipants: 15,
      benefits: {
        activityHours: 8,
        certificate: true,
        other: 'อาหารกลางวัน 1 มื้อ และค่าเข้าอุทยาน'
      },
      requirements: 'เฉพาะสมาชิกชมรมถ่ายภาพเท่านั้น ต้องมีกล้องถ่ายรูปและขาตั้งกล้อง',
      detailedDescription: `
        // ... existing description ...
      `,
      // Remove this line if it exists as a duplicate:
      // maxParticipants: 15,
      // currentParticipants: 15,
      // Keep the summary and eventPhotos
    },
    {
      id: 5,
      title: 'เวิร์กช็อปถ่ายภาพบุคคล',
      date: '25 มกราคม 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'หอสมุด มหาวิทยาลัยเกษตรศาสตรฌ บางเขน',
      description: 'เรียนรู้เทคนิคการถ่ายภาพบุคคลกับช่างภาพมืออาชีพ ณิชาภัทร ศรีมงคล',
      status: 'past',
      clubId: 'KUC-2025-001',
      fee: '300 บาท',
      deadline: '20 มกราคม 2025', // Add deadline if missing
      maxParticipants: 20,
      // Remove this line: currentParticipants: 18,
      benefits: {
        activityHours: 5,
        certificate: true,
        other: 'ได้รับลิขสิทธิ์ Lightroom Preset สำหรับภาพบุคคล มูลค่า 500 บาท'
      },
      requirements: 'เปิดรับนิสิตทุกคณะ ควรมีความรู้พื้นฐานการถ่ายภาพ และมีกล้อง DSLR หรือ Mirrorless',
      detailedDescription: `
        // ... existing description ...
      `,
      // Remove these lines if they exist as duplicates:
      // maxParticipants: 20,
      // currentParticipants: 18,
      // Keep the summary and eventPhotos
    }
];

// ฟังก์ชันสำหรับดึงข้อมูลชมรมตาม ID
export function getClubById(id: string) {
  return clubsData.find(club => club.id === id);
}

// ฟังก์ชันสำหรับดึงข้อมูลกิจกรรมตาม ID
export function getActivityById(id: number) {
  return activitiesData.find(activity => activity.id === id);
}

// ฟังก์ชันสำหรับดึงกิจกรรมทั้งหมดของชมรม
export function getClubActivities(clubId: string) {
  const club = getClubById(clubId);
  if (!club) return [];
  
  return activitiesData.filter(activity => activity.clubId === clubId);
}