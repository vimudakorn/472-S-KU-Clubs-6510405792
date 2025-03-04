"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import FilterSelected from "@/components/FilterSelected";
import ClubBox from "@/components/ClubBox";
import Loading from "@/components/Loading";
import { Fragment, useEffect, useState } from "react";
import ClubBoxSkeleton from "@/components/ClubBoxSkeleton";
import clubs from "@/app/_mocks_/data";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Set a timeout to change isLoading to false after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen px-4 py-8 md:flex gap-6">
      <div className="md:w-[500px]">
        <Loading
          isLoading={isLoading}
          fallback={
            <>
              <Skeleton className="h-[36px] w-[135px]" />
              <Skeleton className="h-10 w-full mt-4" />
              <Skeleton className="h-[24px] w-[60px] mt-3" />

              <Skeleton className="h-10 w-full rounded-none rounded-tr-lg rounded-tl-lg mt-3" />
              <div className="w-full h-0.5"></div>
              <Skeleton className="h-10 w-full rounded-none rounded-br-lg rounded-bl-lg" />
            </>
          }
        >
          <h6 className="text-3xl font-semibold">
            <span className="text-lime-700">KU</span> Clubs
          </h6>
          <div className="flex mt-4 gap-2 w-full border border-gray-900 bg-gray-100 rounded-lg p-2">
            <Search />
            <input
              className="flex-1 border-none focus:border-transparent focus:ring-0 focus:outline-none bg-transparent text-sm"
              type="search"
              placeholder="ค้นหาชมรมที่ชื่นชอบ"
            />
          </div>
          <p className="font-medium mt-3">Filters</p>
          <div className="mt-3">
            <FilterSelected
              placeholder="ประเภทชมรม"
              items={["ทุกประเภท", "เทคโนโลยี", "วิทยาศาสตร์", "ศิลปะศาสตร์"]}
              className={`rounded-tr-lg rounded-tl-lg`}
            />
            <div className="w-full h-[1px] bg-white"></div>
            <FilterSelected
              placeholder="วิทยาเขต"
              items={["ทุกวิทยาเขต", "บางเขน", "กำแพงแสน", "ศรีราชา"]}
              className={`rounded-br-lg rounded-bl-lg r`}
            />
          </div>
        </Loading>
      </div>
      <div className="grid auto-rows-max mt-3 gap-3 md:grid-cols-2 w-full">
        <Loading
          isLoading={isLoading}
          fallback={clubs.map((club) => (
            <ClubBoxSkeleton key={club.id} />
          ))}
        >
          {clubs.map((club) => (
            <ClubBox
              key={club.id}
              id={club.id}
              clubType={club.clubType}
              campus={club.campus}
              clubName={club.clubName}
            />
          ))}
        </Loading>
      </div>
    </div>
  );
}
function setStage(): [any, any] {
  throw new Error("Function not implemented.");
}
