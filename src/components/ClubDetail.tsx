import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import ClubInterface from "@/interfaces/Club";
import { Skeleton } from '@/components/ui/skeleton';

export default function ClubDetail({ club }: { club: ClubInterface | null }) {
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-green-900 text-green-100">
                <Link href="/" className="flex items-center mb-6 cursor-pointer">
                    <ArrowLeft className="mr-2" />
                    <h2 className="text-xl font-medium">ย้อนกลับ</h2>
                </Link>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <p className="text-sm">รหัสชมรม</p>                    
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.clubCode}</p>
                        ) : (
                            <Skeleton className="h-[40px] w-[300px] bg-green-800" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm">ชื่อชมรม</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.clubCode}</p>
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
                        <p className="text-sm">วิทยาเขต</p>
                        {club ? (
                            <p className="text-2xl text-bold text-green-300">{club.campus}</p>
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
                        <p className="text-sm">เกี่ยวกับชมรม</p>
                        {club ? (
                            <p className="text-sm">{club.aboutClub}</p>
                        ) : (
                            <Skeleton className="h-[100px] w-[300px] bg-green-800" />
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}