import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return {
      redirect:{
        destination:'/Auth',
        permanent:false,
      }
    }
  }
  return{
    props: {}
  }
}

export default function Home() {
  const {data:movies = []} = useMovieList();
  const {data:user} = useCurrentUser();
  const {data:favorites = []} = useFavorites();
  const {isOpen, closeModal} = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <BillBoard/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
    
  );
}
