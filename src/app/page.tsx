"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import FilterSelected from "@/components/FilterSelected";
import ClubBox from "@/components/ClubBox";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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
          fallback={
            <>
              <div className="flex flex-col justify-between h-44 border border-gray-200 p-4 rounded-lg bg-white w-full">
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <Skeleton className="h-[16px] w-[70px]" />
                    <Skeleton className="h-[16px] w-[50px]" />
                  </div>
                  <div className="flex justify-between items-start gap-1">
                    <Skeleton className="h-[28px] w-full" />
                    <Skeleton className="h-[24px] w-[24px]" />
                  </div>
                </div>
                <Skeleton className="h-[28px] w-[112px] rounded-3xl" />
              </div>
            </>
          }
        >
          <ClubBox
            category="การสื่อสาร"
            campus="บางเขน"
            name="ชมรมส่งเสริมศิลปะการพูด"
          />
          <ClubBox
            category="ศิลปะกรรมศาสตร์"
            campus="บางเขน"
            name="ชมรมส่งเสริมและเผยแพร่ศิลปวัฒนธรรมภาคเหนือ"
          />
          <ClubBox
            category="การสื่อสาร"
            campus="กำแพงแสน"
            name="ชมรมส่งเสริมศิลปะการพูด"
          />
          <ClubBox
            category="การสื่อสาร"
            campus="ศรีราชา"
            name="ชมรมส่งเสริมศิลปะการพูด"
          />
        </Loading>
      </div>
    </div>
  );
}
function setStage(): [any, any] {
  throw new Error("Function not implemented.");
}
