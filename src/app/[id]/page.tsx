import { notFound } from "next/navigation";
import clubs from "@/app/_mocks_/data";
import ClubInterface from "@/interfaces/Club";
import ClubDetailComponent from "@/components/ClubDetail";
import { Suspense } from "react";

async function getClubById(id: string): Promise<ClubInterface | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clubs.find((club) => club.id === id) || null);
    }, 5000); // Simulating async delay
  });
}

async function ClubDetailAsync({ id }: { id: string }) {
  const club = await getClubById(id);
  if (!club) return notFound();
  return <ClubDetailComponent club={club} />;
}

export default async function ClubDetailPage({ params }: { params: { id: string } }) {
  const clubId = (await params).id;
  return (
    <>
      <Suspense fallback={<ClubDetailComponent club={null} />}>
        <ClubDetailAsync id={clubId} />
      </Suspense>
    </>
  );
}
