import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";

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
  const {data:user} = useCurrentUser();
  return (
    <>
      <Navbar/>
      <BillBoard/>
    </>
    
  );
}
