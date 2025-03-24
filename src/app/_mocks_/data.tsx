import Club from "@/interfaces/Club";

const clubs: Club[] = [
    {
        id: "1",
        clubName: "ชมรมดนตรีสากล",
        clubCode: "1XX4216000XX",
        clubType: "ศิลปะและดนตรี",
        campus: "วิทยาเขตบางเขน",
        clubPresident: "นายกฤษณะ ทองดี",
        advisor: "อาจารย์สมหมาย พิพัฒน์",
        aboutClub: "ชมรมดนตรีสากลเปิดโอกาสให้นักศึกษาที่มีใจรักในเสียงดนตรีได้พัฒนาทักษะและร่วมแสดงในงานต่าง ๆ",
        activities: [
            {
                id: "101",
                date: "10 มี.ค. 2568",
                location: "ห้องซ้อมดนตรี A202",
                time: "17.00-20.00",
                activityName: "ซ้อมดนตรีเพื่อเตรียมหกรรมดนตรี",
                aboutActivity: "ซ้อมวงดนตรีสำหรับการแสดงในงานมหกรรมดนตรีประจำปี",
                activityHours: {
                    universityActivity: 2,
                    fitnessActivity: 0,
                    socialActivity: 0
                }
            }
        ]
    },
    {
        id: "2",
        clubName: "ชมรมกีฬาแบดมินตัน",
        clubCode: "1XX4216000XX",
        clubType: "กีฬาและสุขภาพ",
        campus: "วิทยาเขตศรีราชา",
        clubPresident: "นางสาวสุพรรณี รัตนชัย",
        advisor: "อาจารย์วรพงษ์ สินสวัสดิ์",
        aboutClub: "ชมรมแบดมินตันส่งเสริมสุขภาพและความสามัคคีของนักศึกษาโดยมีการซ้อมและแข่งขันภายในมหาวิทยาลัย",
        activities: [
            {
                id: "102",
                date: "15 มี.ค. 2568",
                location: "โรงยิมมหาวิทยาลัย",
                time: "18.00-20.00",
                activityName: "ซ้อมแบดมินตันประจำสัปดาห์",
                aboutActivity: "ฝึกซ้อมแบดมินตันเพื่อพัฒนาทักษะและเตรียมตัวสำหรับการแข่งขัน",
                activityHours: {
                    universityActivity: 1,
                    fitnessActivity: 2,
                    socialActivity: 0
                }
            }
        ]
    },
    {
        id: "3",
        clubName: "ชมรมถ่ายภาพ",
        clubCode: "1XX4216000XX",
        clubType: "ศิลปะและสื่อสาร",
        campus: "วิทยาเขตบางเขน",
        clubPresident: "นายณัฐวุฒิ สุขสำราญ",
        advisor: "อาจารย์ปริญญา แสงทอง",
        aboutClub: "ชมรมถ่ายภาพเป็นพื้นที่สำหรับนักศึกษาที่สนใจในการถ่ายภาพ แบ่งปันเทคนิคและจัดกิจกรรมถ่ายภาพเชิงสร้างสรรค์",
        activities: [
            {
                id: "103",
                date: "20 มี.ค. 2568",
                location: "ลานกิจกรรมกลางแจ้ง",
                time: "16.00-19.00",
                activityName: "เวิร์กช็อปการถ่ายภาพ",
                aboutActivity: "เรียนรู้เทคนิคการถ่ายภาพจากช่างภาพมืออาชีพ",
                activityHours: {
                    universityActivity: 2,
                    fitnessActivity: 0,
                    socialActivity: 1
                },
                status: "upcoming",
                fee: "ฟรี",
                requirements: "เปิดรับนิสิตทุกคณะ ต้อimage.pngงมีกล้องถ่ายรูป (สมาร์ทโฟนก็ได้)",
                benefits: {
                    certificate: true,
                    other: "ได้รับคำแนะนำจากช่างภาพมืออาชีพ"
                },
                deadline: "18 มี.ค. 2568",
                maxParticipants: 30
            },
            {
                id: "103-1",
                date: "15 เม.ย. 2568",
                location: "ห้องประชุม 101 อาคารกิจกรรมนิสิต",
                time: "14.00-17.00",
                activityName: "เวิร์กช็อปถ่ายภาพแนวสตรีท",
                aboutActivity: "เรียนรู้ศิลปะการถ่ายภาพแนวสตรีทกับช่างภาพมืออาชีพ ณัฐกิต เอื้อขัน อย่าลืมนำกล้องและรองเท้าที่ใส่สบายมาด้วย!",
                activityHours: {
                    universityActivity: 3,
                    fitnessActivity: 0,
                    socialActivity: 0
                },
                status: "upcoming",
                fee: "300 บาท",
                requirements: "เปิดรับนิสิตทุกคณะ ต้องมีกล้องถ่ายรูปและรองเท้าที่เหมาะสำหรับเดินถ่ายภาพ",
                benefits: {
                    certificate: true,
                    other: "ได้รับภาพถ่ายที่ผ่านการตัดต่อจากวิทยากรการกับช่างภาพมืออาชีพ"
                },
                deadline: "10 เม.ย. 2568",
                maxParticipants: 25
            },
            {
                id: "103-2",
                date: "20 เม.ย. 2568",
                location: "คณะมนุษย์ศาสตร์ ตึก 63",
                time: "10.00-18.00",
                activityName: "นิทรรศการภาพถ่าย: วิถีชีวิตในเมือง",
                aboutActivity: "นิทรรศการภาพถ่ายประจำปีที่นำเสนอภาพถ่ายเมืองที่ดีที่สุดจากสมาชิกชมรมของเรา พบกับผลงานภาพถ่ายกว่า 50 ภาพที่คัดสรรมาอย่างดี",
                activityHours: {
                    universityActivity: 2,
                    fitnessActivity: 0,
                    socialActivity: 0
                },
                status: "upcoming",
                fee: "ฟรี",
                requirements: "เปิดให้บุคคลทั่วไปมคคลทั่วไปเข้าชม ไม่จำเป็นต้องเป็นนิสิต",
                benefits: {
                    certificate: false,
                    other: "โอกาสในการพบปะพูดคุยกับช่างภาพมืออาชีพ"
                },
                deadline: "ไม่มีกำหนด (Walk-in)",
                maxParticipants: 100
            },
            {
                id: "103-3",
                date: "5 พ.ค. 2568",
                location: "True lab อาคารเทพสถิตย์",
                time: "13.00-16.00",
                activityName: "คอร์สพื้นฐานการถ่ายภาพ",
                aboutActivity: "เหมาะสำหรับมือใหม่! เรียนรู้พื้นฐานการใช้กล้อง การจัดองค์ประกอบ และเทคนิคการแต่งภาพเบื้องต้น",
                activityHours: {
                    universityActivity: 3,
                    fitnessActivity: 0,
                    socialActivity: 0
                },
                status: "upcoming",
                fee: "300 บาท",
                requirements: "เปิดรับนิสิตทุกคณะ เหมาะสำหรับผู้เริ่มต้น ไม่จำเป็นต้องมีกล้อง DSLR",
                benefits: {
                    certificate: true,
                    other: "ได้รับคู่มือการถ่ายภาพเบื้องต้นฉบับดิจิทัล และส่วนลด 10% สำหรับการซื้ออุปกรณ์ถ่ายภาพที่ร้านพันธมิตร"
                },
                deadline: "1 พ.ค. 2568",
                maxParticipants: 20
            },
            {
                id: "103-4",
                date: "10 ก.พ. 2568",
                location: "อุทยานแห่งชาติเขาใหญ่",
                time: "07.00-17.00",
                activityName: "ทริปถ่ายภาพธรรมชาติ",
                aboutActivity: "ทริปท่องเที่ยวันเดียวที่อุทยานแห่งชาติเขาใหญ่ เพื่อฝึกถ่ายภาพธรรมชาติและสัตว์ป่า",
                activityHours: {
                    universityActivity: 4,
                    fitnessActivity: 2,
                    socialActivity: 2
                },
                status: "past",
                fee: "500 บาท",
                requirements: "เฉพาะสมาชิกชมรมถ่ายภาพเท่านั้น ต้องมีกล้องถ่ายรูปและขาตั้งกล้อง",
                benefits: {
                    certificate: true,
                    other: "อาหารกลางวัน 1 มื้อ และค่าเข้าอุทยาน"
                },
                deadline: "5 ก.พ. 2568",
                maxParticipants: 15
            },
            {
                id: "103-5",
                date: "25 ม.ค. 2568",
                location: "หอสมุด มหาวิทยาลัยเกษตรศาสตรฌางเขน",
                time: "14.00-17.00",
                activityName: "เวิร์กช็อปถ่ายภาพบุคลคล",
                aboutActivity: "เรียนรู้เทคนิคการถ่ายภาพบุคลคลกับช่างภาพมืออาชีพ ณิชาภัทร ศรีมงคล",
                activityHours: {
                    universityActivity: 3,
                    fitnessActivity: 0,
                    socialActivity: 0
                },
                status: "past",
                fee: "300 บาท",
                requirements: "เปิดรับนิสิตทุกคณะ ต้องมีกล้องถ่ายรูป",
                benefits: {
                    certificate: true,
                    other: "ได้รับลิขสิทธิ์ Lightroom Preset สำหรับภาพบุคลคล มูลค่า 500 บาท"
                },
                deadline: "20 ม.ค. 2568",
                maxParticipants: 20
            },
            {
                id: "103-6",
                date: "1 มี.ค. 2568",
                location: "ห้องปฏิบัติการคอมพิวเตอร์ คณะวิศวกรรมศาสตร์",
                time: "13.00-16.00",
                activityName: "เวิร์กช็อปตัดต่อภาพด้วย Lightroom",
                aboutActivity: "เรียนรู้การใช้งาน Adobe Lightroom เพื่อปรับแต่งภาพถ่ายให้มีความสวยงามและมืออาชีพ",
                activityHours: {
                    universityActivity: 3,
                    fitnessActivity: 0,
                    socialActivity: 0
                },
                status: "ongoing",
                fee: "200 บาท",
                requirements: "เปิดรับนิสิตทุกคณะ ต้องนำโน้ตบุ๊คส่วนตัวที่ติดตั้ง Adobe Lightroom มาด้วย",
                benefits: {
                    certificate: true,
                    other: "ได้รับชุด Preset สำหรับภาพถ่ายประเภทต่างๆ"
                },
                deadline: "28 ก.พ. 2568",
                maxParticipants: 25
            }
        ]
    },
    {
        id: "4",
        clubName: "ชมรมอาสาพัฒนา",
        clubCode: "1XX4216000XX",
        clubType: "จิตอาสาและพัฒนาสังคม",
        campus: "วิทยาเขตกำแพงแสน",
        clubPresident: "นางสาวกมลวรรณ สินสมบูรณ์",
        advisor: "อาจารย์อำพล แซ่หลี",
        aboutClub: "ชมรมอาสาพัฒนามุ่งเน้นการช่วยเหลืองคมชมรมอาสาต่าง ๆ เช่น การสร้างบ้านและการสอนหนังสือเด็กด้อยโอกาส",
        activities: [
            {
                id: "104",
                date: "5 เม.ย. 2568",
                location: "โรงเรียนบ้านดงมะไฟ",
                time: "08.00-16.00",
                activityName: "โครงการพัฒนาชุมชน",
                aboutActivity: "ช่วยกันปรับปรุงอาคารเรียนและสอนพิเศกษะในกิจกรรม",
                activityHours: {
                    universityActivity: 2,
                    fitnessActivity: 0,
                    socialActivity: 4
                }
            }
        ]
    }
];

// เพิ่มอีก 16 ชมรมให้ครบ 20
for (let i = 5; i <= 20; i++) {
    clubs.push({
        id: `${i}`,
        clubName: `ชมรมที่ ${i}`,
        clubCode: `1XX421600XX`,
        clubType: "ทั่วไป",
        campus: "วิทยาเขตบางเขน",
        clubPresident: `ประธานชมรม ${i}`,
        advisor: `อาจารย์ที่ปรึกษา ${i}`,
        aboutClub: `รายละเอียดเกี่ยวกับชมรมที่ ${i}`,
        activities: [
            {
                id: `${100 + i}`,
                date: "1 พ.ค. 2568",
                location: "อาคารกิจกรรม",
                time: "13.00-16.00",
                activityName: `กิจกรรมของชมรมที่ ${i}`,
                aboutActivity: `รายละเอียดเกี่ยวกับกิจกรรมของชมรมที่ ${i}`,
                activityHours: {
                    universityActivity: 2,
                    fitnessActivity: 1,
                    socialActivity: 1
                }
            }
        ]
    });
}

export default clubs;

// เพิ่มฟังก์ชันสำหรับดึงข้อมูลชมรมตาม ID
export function getClubById(id: string) {
    return clubs.find(club => club.id === id) || null;
}

// เพิ่มฟังก์ชันสำหรับดึงข้อมูลกิจกรรมของชมรมตาม ID
export function getClubActivities(clubId: string) {
    const club = clubs.find(club => club.id === clubId);
    if (!club) return [];
    
    // แปลงข้อมูลกิจกรรมให้เข้ากับรูปแบบที่ต้องการใช้ในหน้า ClubActivities
    const activitiesFromClub = club.activities.map(activity => {
        // ถ้าสถานะเป็น ongoing ให้กำหนดวันที่เป็น 29 มีนาคม 2568
        const activityDate = activity.status === 'ongoing' ? "29 มีนาคม 2568" : activity.date;
        
        // กำหนด deadline สำหรับกิจกรรม upcoming ให้เป็นหลังวันที่ 29 มีนาคม 2568
        let activityDeadline = activity.deadline || activityDate;
        if (activity.status === 'upcoming' || !activity.status) {
            // ถ้าไม่มี deadline กำหนดไว้ หรือ deadline เดิมอยู่ก่อนวันที่ 29 มีนาคม 2568
            // ให้สุ่มวันที่ระหว่าง 30 มีนาคม - 15 เมษายน 2568
            const day = Math.floor(Math.random() * 16) + 30; // สุ่มวันที่ 30 มีนาคม - 15 เมษายน
            const month = day > 31 ? "เมษายน" : "มีนาคม"; // ถ้าวันที่เกิน 31 ให้เป็นเดือนเมษายน
            const actualDay = day > 31 ? day - 31 : day; // ปรับวันที่ให้ถูกต้องตามเดือน
            activityDeadline = `${actualDay} ${month} 2568`;
        }
        
        // สร้างข้อมูลสรุปกิจกรรมสำหรับกิจกรรมที่ผ่านมาแล้ว (past)
        let activitySummary = '';
        if (activity.status === 'past') {
            // สร้างข้อมูลสรุปกิจกรรมตาม ID ของกิจกรรม
            if (activity.id === '103-4') {
                activitySummary = `กิจกรรมทริปถ่ายภาพธรรมชาติที่อุทยานแห่งชาติเขาใหญ่ได้จัดขึ้นเมื่อวันที่ ${activity.date} มีผู้เข้าร่วมทั้งสิ้น ${Math.floor((activity.maxParticipants || 30) * 0.9)} คน ผู้เข้าร่วมได้เรียนรู้เทคนิคการถ่ายภาพธรรมชาติและสัตว์ป่า ได้ฝึกปฏิบัติจริงในสถานที่จริง และได้ภาพถ่ายสวยๆ กลับไปมากมาย นอกจากนี้ยังได้สัมผัสบรรยากาศธรรมชาติและได้ออกกำลังกายจากการเดินป่า ทางชมรมขอขอบคุณทุกท่านที่มาร่วมกิจกรรมในครั้งนี้`;
            } else if (activity.id === '103-5') {
                activitySummary = `เวิร์กช็อปถ่ายภาพบุคลคลกับคุณณิชาภัทร ศรีมงคล ได้จัดขึ้นเมื่อวันที่ ${activity.date} ณ ${activity.location} มีผู้เข้าร่วมทั้งสิ้น ${Math.floor((activity.maxParticipants || 30) * 0.85)} คน ผู้เข้าร่วมได้เรียนรู้เทคนิคการจัดแสง การจัดท่าทาง และการปรับแต่งภาพบุคคลให้ดูสวยงามและเป็นธรรมชาติ ทุกคนได้ลงมือปฏิบัติจริงและได้ภาพถ่ายที่สวยงามกลับไป พร้อมทั้งได้รับ Lightroom Preset สำหรับภาพบุคคลที่มีมูลค่า 500 บาท`;
            } else {
                // สำหรับกิจกรรม past อื่นๆ ที่ไม่ได้กำหนดเฉพาะ
                activitySummary = `กิจกรรม ${activity.activityName} ได้จัดขึ้นเมื่อวันที่ ${activity.date} ณ ${activity.location} มีผู้เข้าร่วมทั้งสิ้น ${Math.floor((activity.maxParticipants || 30) * 0.8)} คน กิจกรรมดำเนินไปด้วยความเรียบร้อย ผู้เข้าร่วมได้รับความรู้และประสบการณ์ที่ดี มีการแลกเปลี่ยนความคิดเห็นและทำกิจกรรมร่วมกัน ทางชมรมขอขอบคุณทุกท่านที่มาร่วมกิจกรรมในครั้งนี้ และหวังว่าจะได้พบกันในกิจกรรมครั้งต่อไป`;
            }
        }
        
        // สร้างข้อมูลรูปภาพสำหรับกิจกรรมที่ผ่านมาแล้ว (past)
        const activityImages = activity.status === 'past' ? [
            `https://picsum.photos/800/600?random=${activity.id}-1`,
            `https://picsum.photos/800/600?random=${activity.id}-2`,
            `https://picsum.photos/800/600?random=${activity.id}-3`
        ] : [];
        
        return {
            id: activity.id,
            title: activity.activityName,
            date: activityDate,
            time: activity.time,
            location: activity.location,
            description: activity.aboutActivity,
            status: activity.status || 'upcoming', // ใช้ status จากข้อมูลจริง หรือ default เป็น upcoming
            clubId: clubId,
            fee: activity.fee || 'ฟรี',
            deadline: activityDeadline,
            maxParticipants: activity.maxParticipants || 30,
            benefits: activity.benefits || {
                activityHours: activity.activityHours.universityActivity + activity.activityHours.fitnessActivity + activity.activityHours.socialActivity,
                certificate: true,
                other: 'ได้รับประสบการณ์และความรู้ใหม่ๆ'
            },
            requirements: activity.requirements || 'เปิดรับนิสิตทุกคณะ',
            detailedDescription: activity.aboutActivity,
            summary: activitySummary || undefined, // เพิ่มข้อมูลสรุปกิจกรรม
            images: activityImages.length > 0 ? activityImages : undefined // เพิ่มข้อมูลรูปภาพกิจกรรม
        };
    });
    
    // รวบกิจกรรมทั้งหมด
    return activitiesFromClub;
}

interface Club {
    id: string;
    clubName: string;
    clubCode: string;
    clubType: string;
    campus: string;
    clubPresident: string;
    advisor: string;
    aboutClub: string;
    activities: Activity[];
}

interface Activity {
    id: string;
    date: string;
    location: string;
    time: string;
    activityName: string;
    aboutActivity: string;
    activityHours: ActivityHours;
    status?: string; // เพิ่ม status
    fee?: string; // เพิ่ม fee
    requirements?: string; // เพิ่ม requirements
    benefits?: {
        certificate: boolean;
        other: string;
    }; // เพิ่ม benefits
    deadline?: string; // เพิ่ม deadline
    maxParticipants?: number; // เพิ่ม maxParticipants
}

interface ActivityHours {
    universityActivity: number;
    fitnessActivity: number;
    socialActivity: number;
}
