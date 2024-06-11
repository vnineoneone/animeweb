"use client"

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Paginate from "../components/Paginate";

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [url, setUrl] = useState("https://animes-five.vercel.app/meta/anilist/trending");
  const [countPaginate, setCountPaginate] = useState(1)
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1

  const search = async (query: string) => {
    setLoading(true);
    await axios.get(`https://animes-five.vercel.app/meta/anilist/${query}?page=${page}`).then((res: any) => {
      setAnimes(res.data.results);
    })
    setLoading(false);
  };

  const fetchTopTrending = async () => {
    setLoading(true);
    await axios.get(`https://animes-five.vercel.app/meta/anilist/trending`, {
      params: {
        page: page,
        perPage: 20
      }
    }).then((res: any) => {
      setAnimes(res.data.results);
    })
    setLoading(false);
  };

  useEffect(() => {
    fetchTopTrending()
  }, [page]);


  return (
    <div className="min-h-screen relative">
      <div className="">
        <div className="py-10">
          {
            loading ?
              <div className="flex h-[calc(100vh-85px)] items-center justify-center bg-[#0f1416] dark:bg-black">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-red-500 border-primary border-t-transparent"></div>
              </div>
              : <div className="grid grid-cols-5 gap-5 px-10 pb-20">
                {animes?.map((anime: any) => (
                  <Link href={`/watch/?id=${anime.id}`} key={anime.id} style={{ backgroundColor: `${anime.color}` }} className="p-1 rounded-lg">
                    <div className="w-full h-[300px] relative shadow-lg overflow-hidden hover:opacity-90">
                      <div >
                        <Image fill src={anime.image} className={`rounded-lg object-fill h-full w-full hover:scale-125 hover:transition-all hover:ease-linear hover:duration-300 shadow-lg shadow-[${anime.color}]`} alt={""} />
                      </div>
                      <div className="absolute top-1 left-0 px-2 flex justify-between items-center w-full h-10 ">
                        <h3 className={`font-semibold text-ellipsis whitespace-nowrap overflow-hidden px-2 py-1 bg-red-800 rounded-full z-10 text-white`}>{anime.totalEpisodes} tập</h3>
                        <div style={{ backgroundColor: 'rgba(0, 0, 0, .65)' }} className="rounded-full text-[#f5ec42] h-10 w-10 flex justify-center items-center font-semibold text-sm">{anime?.rating}%</div>
                      </div>
                      <div className="absolute bottom-0 left-0 flex justify-center items-center w-full h-12 ">
                        <div className="absolute bottom-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 opacity-60 rounded-bl-[8px] rounded-br-[8px]">
                        </div>
                        <h3 className="font-semibold text-lg text-ellipsis whitespace-nowrap overflow-hidden px-4  text-white z-10">{anime.title?.english}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
          }
          <div className="absolute bottom-10 left-0">
            <Paginate itemsPerPage={1} page={page} />
          </div>
        </div>
      </div>
    </div>
  );
}
