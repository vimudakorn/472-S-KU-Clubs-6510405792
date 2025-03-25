import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import ClubInterface from "@/interfaces/Club";
import { ActivityInterface } from "@/interfaces/Activity";

export default async function getActivityById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Add Delay to simulate server response time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const clubId = req.query.id as string;
  const activityId = req.query.activityId as string;

  if (!clubId || isNaN(Number(clubId)) || !activityId) {
    return res.status(400).json({ message: "ท่านเรียกใช้งานไม่ถูกต้อง" });
  }

  try {
    const filePath = path.join(process.cwd(), "data/clubs.json");
    const fileData = await fs.readFile(filePath, "utf-8");

    if (!fileData) {
      return res
        .status(500)
        .json({ message: "ไม่พบไฟล์ .json ข้อมูลองค์กรนิสิต" });
    }

    const clubs = JSON.parse(fileData);
    const club = clubs.find((club: ClubInterface) => club.id === clubId);

    if (!club) {
      return res.status(404).json({ message: "ไม่พบข้อมูลชมรม" });
    }

    const activity = club.activities.find(
      (act: ActivityInterface) => act.id === activityId
    );

    if (!activity) {
      return res.status(404).json({ message: "ไม่พบข้อมูลกิจกรรม" });
    }

    // แปลงข้อมูลกิจกรรมให้เข้ากับรูปแบบที่ต้องการใช้ในหน้ารายละเอียดกิจกรรม
    const activityDate =
      activity.status === "ongoing" ? "29 มีนาคม 2568" : activity.date;

    // กำหนด deadline สำหรับกิจกรรม upcoming
    let activityDeadline = activity.deadline || activityDate;
    if (activity.status === "upcoming" || !activity.status) {
      const day = Math.floor(Math.random() * 16) + 30;
      const month = day > 31 ? "เมษายน" : "มีนาคม";
      const actualDay = day > 31 ? day - 31 : day;
      activityDeadline = `${actualDay} ${month} 2568`;
    }

    // สร้างข้อมูลสรุปกิจกรรมสำหรับกิจกรรมที่ผ่านมาแล้ว (past)
    let activitySummary = "";
    if (activity.status === "past") {
      if (activity.id === "103-4") {
        activitySummary = `กิจกรรมทริปถ่ายภาพธรรมชาติที่อุทยานแห่งชาติจัดขึ้นเมื่อวันที่ ${activity.date
          } มีผู้เข้าร่วมทั้งสิ้น ${Math.floor(
            (activity.maxParticipants || 30) * 0.9
          )} คน ผู้เข้าร่วมได้เรียนรู้เทคนิคการถ่ายภาพธรรมชาติและสัตว์ป่า ได้ฝึกปฏิบัติจริงในสถานที่จริง และได้ภาพถ่ายสวยๆ กลับไปมากมาย นอกจากนี้ยังได้สัมผัสยากาศธรรมชาติและได้ออกกำลังกายจากการเดินป่า ทางชมรมขอขอบคุณทุกท่านที่มาร่วมกิจกรรมในครั้งนี้`;
      } else if (activity.id === "103-5") {
        activitySummary = `เวิร์กช็อปถ่ายภาพบุคลคลกับคุณณิชาภัทร ศรีมงคล ได้จัดขึ้นเมื่อวันที่ ${activity.date
          } ณ ${activity.location} มีผู้เข้าร่วมทั้งสิ้น ${Math.floor(
            (activity.maxParticipants || 30) * 0.85
          )} คน ผู้เข้าร่วมได้เรียนรู้เทคนิคการจัดแสง การจัดท่าทาง และการปรับแต่งภาพบุคคลให้ดูสวยงามและเป็นธรรมชาติ ทุกคนได้ลงมือปฏิบัติจริงและได้ภาพถ่ายที่สวยงามกลับไป พร้อมทั้งได้รับ Lightroom Preset สำหรับภาพบุคคลที่มีมูลค่า 500 บาท`;
      } else {
        activitySummary = `กิจกรรม ${activity.activityName
          } ได้จัดขึ้นเมื่อวันที่ ${activity.date} ณ ${activity.location
          } มีผู้เข้าร่วมทั้งสิ้น ${Math.floor(
            (activity.maxParticipants || 30) * 0.8
          )} คน กิจกรรมดำเนินไปด้วยความเรียบร้อย ผู้เข้าร่วมได้รับความรู้และประสบการณ์ที่ดี มีการแลกเปลี่ยนความคิดเห็นและทำกิจกรรมร่วมกัน ทางชมรมขอขอบคุณทุกท่านที่มาร่วมกิจกรรมในครั้งนี้ และหวังว่าจะได้พบกันในกิจกรรมครั้งต่อไป`;
      }
    }

    // สร้างข้อมูลรูปภาพสำหรับกิจกรรมที่ผ่านมาแล้ว (past)
    let activityImages: string[] = [];
    let debugInfo = "";
    
    // Handle ongoing activities
    if (activity.status === "ongoing") {
      debugInfo = `Activity ID: ${activity.id}, Status: Ongoing`;
      // ไม่มีรูปแกลลอรีสำหรับกิจกรรม ongoing
      // กำหนดค่าเริ่มต้นสำหรับกิจกรรม ongoing เหมือนกับ upcoming
      if (!activity.maxParticipants) {
        activity.maxParticipants = 30;
      }
      if (!activity.deadline) {
        const day = Math.floor(Math.random() * 16) + 30;
        const month = day > 31 ? "เมษายน" : "มีนาคม";
        const actualDay = day > 31 ? day - 31 : day;
        activity.deadline = `${actualDay} ${month} 2568`;
      }
    }
    
    if (activity.status === "past") {
      const clubType = club.clubType || "";
      debugInfo = `Club ID: ${club.id}, ClubType: ${clubType}, Raw club data: ${JSON.stringify(club).substring(0, 200)}...`;
      
      // คอลเลกชันรูปภาพตามประเภทชมรม
      const imageCollections: Record<string, string[]> = {
        "ศิลปะและดนตรี": [
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"
        ],
        "กีฬาและสุขภาพ": [
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop"
        ],
        "จิตอาสาและพัฒนาสังคม": [
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1593113598332-cd59a93c6138?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560252829-804f1aedf1be?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&h=600&fit=crop"
        ],
        "วิทยาศาสตร์และเทคโนโลยี": [
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1581092160607-ee22731c2eaf?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop"
        ],
        "ภาษาและวรรณกรรม": [
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=600&fit=crop"
        ],
        "การเรียนรู้และพัฒนา": [
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
        ],
        "สังคมและมนุษย์ศาสตร์": [
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1484712401471-05c7215830eb?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1536080805909-a9594a9e6b16?w=800&h=600&fit=crop"
        ],
        "การพัฒนาบุคลิกภาพ": [
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1557425955-df376b5903c8?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
        ],
        "ศิลปะและสื่อสาร": [
          "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1522152804-24ce8cecc34e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&h=600&fit=crop"
        ],
        "เทคโนโลยีและการพัฒนา": [
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
        ],
        "default": [
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517486430290-35657bdcef51?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=600&fit=crop"
        ]
      };
      
      // เลือกคอลเลกชันรูปภาพตามประเภทชมรม
      let selectedCollection = imageCollections["default"];
      
      // สร้างแมปปิ้งสำหรับประเภทชมรมที่ไม่ตรงกับคีย์ในคอลเลกชัน
      const clubTypeMapping: Record<string, string> = {
        "ศิลปะและสื่อสาร": "ศิลปะและดนตรี",
        "เทคโนโลยีและการพัฒนา": "วิทยาศาสตร์และเทคโนโลยี"
      };
      
      // แปลงประเภทชมรมให้ตรงกับคีย์ในคอลเลกชัน (ถ้ามี)
      const mappedClubType = clubTypeMapping[clubType] || clubType;
      
      // ตรวจสอบว่าประเภทชมรมตรงกับคีย์ในคอลเลกชันหรือไม่
      if (imageCollections[mappedClubType]) {
        selectedCollection = imageCollections[mappedClubType];
        debugInfo += `, Using collection for: ${mappedClubType}`;
      } else {
        debugInfo += `, Using default collection`;
      }
      
      // ใช้ activity ID เป็น seed ในการสุ่มรูปภาพ
      const activityIdNum = parseInt(activity.id.replace(/\D/g, '')) || 0;
      
      // สร้างฟังก์ชันสุ่มที่ใช้ seed จาก activity ID
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      
      // สุ่มเลือกรูปภาพ 3 รูปที่ไม่ซ้ำกันโดยใช้ activity ID เป็น seed
      const getUniqueImages = (images: string[], count: number, seed: number) => {
        const shuffled = [...images];
        
        // สลับตำแหน่งรูปภาพโดยใช้ seed
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(seededRandom(seed + i) * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled.slice(0, count);
      };
      
      // เลือกรูปภาพ 3 รูปที่ไม่ซ้ำกันสำหรับกิจกรรมนี้
      activityImages = getUniqueImages(selectedCollection, 3, activityIdNum);
      
    
    }

    const activityDetail = {
      id: activity.id,
      activityName: activity.activityName || activity.title || `กิจกรรม ${activity.id}`,
      date: activityDate,
      time: activity.time,
      location: activity.location,
      aboutActivity: activity.aboutActivity || activity.description || `รายละเอียดกิจกรรมที่จัดขึ้นที่ ${activity.location} ในวันที่ ${activity.date} เวลา ${activity.time}`,
      status: activity.status || "upcoming",
      clubId: clubId,
      fee: activity.fee || "ฟรี",
      deadline: activityDeadline,
      maxParticipants: activity.maxParticipants || 30,
      benefits: activity.benefits || {
        activityHours:
          (activity.activityHours?.universityActivity || 0) +
          (activity.activityHours?.fitnessActivity || 0) +
          (activity.activityHours?.socialActivity || 0) || 2,
        certificate: true,
        other: "ได้รับประสบการณ์และความรู้ใหม่ๆ",
      },
      requirements: activity.requirements || "เปิดรับนิสิตทุกคณะ",
      detailedDescription: activity.detailedDescription,
      summary: activitySummary || undefined,
      images: activityImages.length > 0 ? activityImages : undefined,
      showHeaderImage: false,
      galleryTitle: activity.status === "past" ? "ภาพจากการจัดกิจกรรม" : 
                    activity.status === "ongoing" ? "กิจกรรมกำลังดำเนินการ" : 
                    "ภาพกิจกรรม",
      debugInfo: debugInfo // เพิ่มข้อมูล debug ไปในการตอบกลับ
    };

    return res.status(200).json(activityDetail);
  } catch (error) {
    console.error("Error fetching activity:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูลกิจกรรม" });
  }
}