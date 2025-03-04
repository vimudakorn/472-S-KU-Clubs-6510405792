import { notFound } from "next/navigation";
import clubs from "@/app/_mocks_/data";

interface Club {
  id: string;
  clubName: string;
  clubType: string;
  campus: string;
}


async function getClubById(id: string): Promise<Club | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clubs.find((club) => club.id === id) || null);
    }, 100); // Simulating async delay
  });
}

export default async function ClubDetailPage({ params }: { params: { id: string } }) {
  const clubId = params.id;
  const club = await getClubById(clubId);

  if (!club) return notFound();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold">{club.clubName}</h1>
      <p className="text-lg mt-2">ประเภท: {club.clubType}</p>
      <p className="text-lg">วิทยาเขต: {club.campus}</p>
    </div>
  );
}
