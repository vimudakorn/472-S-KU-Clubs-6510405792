const clubs: Club[] = [
    {
        id: 1,
        clubName: "ชมรมดนตรีสากล",
        clubCode: "1XX4216000XX",
        clubType: "ศิลปะและดนตรี",
        campus: "วิทยาเขตบางเขน",
        clubPresident: "นายกฤษณะ ทองดี",
        advisor: "อาจารย์สมหมาย พิพัฒน์",
        aboutClub: "ชมรมดนตรีสากลเปิดโอกาสให้นักศึกษาที่มีใจรักในเสียงดนตรีได้พัฒนาทักษะและร่วมแสดงในงานต่าง ๆ",
        activities: [
            {
                id: 101,
                date: "10 มี.ค. 2568",
                location: "ห้องซ้อมดนตรี A202",
                time: "17.00-20.00",
                activityName: "ซ้อมดนตรีเพื่อเตรียมงานมหกรรมดนตรี",
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
        id: 2,
        clubName: "ชมรมกีฬาแบดมินตัน",
        clubCode: "1XX4216000XX",
        clubType: "กีฬาและสุขภาพ",
        campus: "วิทยาเขตศรีราชา",
        clubPresident: "นางสาวสุพรรณี รัตนชัย",
        advisor: "อาจารย์วรพงษ์ สินสวัสดิ์",
        aboutClub: "ชมรมแบดมินตันส่งเสริมสุขภาพและความสามัคคีของนักศึกษาโดยมีการซ้อมและแข่งขันภายในมหาวิทยาลัย",
        activities: [
            {
                id: 102,
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
        id: 3,
        clubName: "ชมรมถ่ายภาพ",
        clubCode: "1XX4216000XX",
        clubType: "ศิลปะและสื่อสาร",
        campus: "วิทยาเขตบางเขน",
        clubPresident: "นายณัฐวุฒิ สุขสำราญ",
        advisor: "อาจารย์ปริญญา แสงทอง",
        aboutClub: "ชมรมถ่ายภาพเป็นพื้นที่สำหรับนักศึกษาที่สนใจในการถ่ายภาพ แบ่งปันเทคนิคและจัดกิจกรรมถ่ายภาพเชิงสร้างสรรค์",
        activities: [
            {
                id: 103,
                date: "20 มี.ค. 2568",
                location: "ลานกิจกรรมกลางแจ้ง",
                time: "16.00-19.00",
                activityName: "เวิร์กช็อปการถ่ายภาพ",
                aboutActivity: "เรียนรู้เทคนิคการถ่ายภาพจากช่างภาพมืออาชีพ",
                activityHours: {
                    universityActivity: 2,
                    fitnessActivity: 0,
                    socialActivity: 1
                }
            }
        ]
    },
    {
        id: 4,
        clubName: "ชมรมอาสาพัฒนา",
        clubCode: "1XX4216000XX",
        clubType: "จิตอาสาและพัฒนาสังคม",
        campus: "วิทยาเขตกำแพงแสน",
        clubPresident: "นางสาวกมลวรรณ สินสมบูรณ์",
        advisor: "อาจารย์อำพล แซ่หลี",
        aboutClub: "ชมรมอาสาพัฒนามุ่งเน้นการช่วยเหลือสังคมผ่านกิจกรรมอาสาต่าง ๆ เช่น การสร้างบ้านและการสอนหนังสือเด็กด้อยโอกาส",
        activities: [
            {
                id: 104,
                date: "5 เม.ย. 2568",
                location: "โรงเรียนบ้านดงมะไฟ",
                time: "08.00-16.00",
                activityName: "โครงการพัฒนาชุมชน",
                aboutActivity: "ช่วยกันปรับปรุงอาคารเรียนและสอนพิเศษให้น้อง ๆ ในโรงเรียนชนบท",
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
        id: i,
        clubName: `ชมรมที่ ${i}`,
        clubCode: `1XX421600XX`,
        clubType: "ทั่วไป",
        campus: "วิทยาเขตบางเขน",
        clubPresident: `ประธานชมรม ${i}`,
        advisor: `อาจารย์ที่ปรึกษา ${i}`,
        aboutClub: `รายละเอียดเกี่ยวกับชมรมที่ ${i}`,
        activities: [
            {
                id: 100 + i,
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

interface Club {
    id: number;
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
    id: number;
    date: string;
    location: string;
    time: string;
    activityName: string;
    aboutActivity: string;
    activityHours: ActivityHours;
}

interface ActivityHours {
    universityActivity: number;
    fitnessActivity: number;
    socialActivity: number;
}
