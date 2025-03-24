import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { Skeleton } from "./skeleton/skeleton";
import ClubInterface from "@/interfaces/Club";

export default function ClubDetail({ club }: { club: ClubInterface | null }) {
    return (
        <aside id="default-sidebar" className="w-full md:w-80 lg:w-96 bg-green-800 text-white md:sticky md:top-0 md:h-screen md:overflow-y-auto shrink-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-green-900 text-green-100">
                <Link href="/" className="flex items-center mb-6 cursor-pointer">
                    <ArrowLeft className="mr-2" />
                    <h2 className="text-xl font-medium">ย้อนกลับไปหน้าหลัก</h2>
                </Link>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <p className="text-sm">Club ID</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.id}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm">ชื่อชมรม</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.clubName}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm">วิทยาเขต</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.campus}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm">ประเภทชมรม</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.clubType}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm">ประธานชมรม</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.clubPresident}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm">ที่ปรึกษา</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.advisor}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>


                    <div className="space-y-1">
                        <p className="text-sm">รายละเอียดชมรม</p>
                        {club ? (
                            <p className="text-sm">{club.aboutClub}</p>
                        ) : (
                            <Skeleton className="h-[60px] w-[350px] bg-green-800" />
                        )}
                    </div>

                </div>
            </div>
        </aside>
    );
}