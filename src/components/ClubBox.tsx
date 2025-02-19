"use client";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  category: string;
  campus: string;
  name: string;
}

export default function ClubBox({ category, campus, name }: Props) {
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  return (
    <div className="flex flex-col justify-between h-44 border border-gray-200 p-4 rounded-lg transition duration-300 hover:shadow-[5px_5px_0px_rgb(229,231,235)] w-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs">#{category} #{campus}</p>
          <h5 className="text-lg font-semibold">{name}</h5>
        </div>
        <button onClick={() => setIsFav(!isFav)}>
          <Star
            className="transition-colors duration-300"
            fill={`${isFav ? "#eab308" : "#fff"}`}
            color={`${isFav ? "#eab308" : "#000"}`}
          />
        </button>
      </div>
      <button
        className="w-28 border border-black rounded-3xl px-2 py-0.5 bg-white"
        onClick={() => router.push("")}
      >
        <p className="text-sm">ดูรายละเอียด</p>
      </button>
    </div>
  );
}

// bg-yellow-50 hover:bg-gradient-to-br from-yellow-100 to-yellow-50
