"use client"

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import ReactPlayer from 'react-player'
import parse from 'html-react-parser';
import CommentSection from "@/app/components/CommentSection";
// import LinesEllipsis from 'react-lines-ellipsis'
// import he from 'he';

export default function WatchMovie() {
    const search = useSearchParams();
    const [info, setInfo] = useState<any>({});
    const [url, setUrl] = useState('/');
    const [isClient, setIsClient] = useState(false)
    const [loading, setLoading] = useState(true);

    function formatDate(day: number, month: number, year: number) {
        if (!day)
            return `${month}/${year}`
        return `${day}/${month}/${year}`
    }
    useEffect(() => {
        setIsClient(true)
    }, [])

    const watch = async (episodeId: string) => {
        await axios.get(`https://animes-five.vercel.app/meta/anilist/watch/${episodeId}`).then((res: any) => {
            setUrl(res.data.sources[0]?.url);
        }).catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            await axios.get(`https://animes-five.vercel.app/meta/anilist/info/${search.get('id')}`, { params: { provider: "gogoanime" } }).then((res: any) => {
                setInfo(res.data);
            }).catch((err) => {
                console.log(err)
            })
            setLoading(false);
        };
        fetchData()
    }, [search]);

    return (
        <div className="">
            {
                loading ?
                    <div className="flex h-[calc(100vh-85px)] items-center justify-center bg-[#0f1416] dark:bg-black">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-red-500 border-primary border-t-transparent"></div>
                    </div>
                    :
                    <div>

                        <div className="flex justify-center items-center">
                            <div className="relative overflow-hidden h-[calc(100vh-85px)] w-full bg-red-600 rounded-t-lg">
                                <Image
                                    src={info?.cover}
                                    fill
                                    alt="Background image"
                                    className=" absolute w-full h-full object-cover object-center z-0"

                                />
                                <div className="absolute inset-0 w-full h-full bg-slate-900 opacity-60 z-10">
                                </div>
                                <div className="relative z-20 flex justify-between items-center p-5 w-full">
                                    <Link href={`/watch?id=${info.id}&episode=${1}`} className="mr-5 relative hover:opacity-80 w-1/4 h-[400px]">
                                        <div className="rounded-b-md absolute bottom-0 left-0 flex justify-center items-center w-full h-12 bg-red-500 text-white font-semibold z-10">
                                            XEM NGAY
                                        </div>
                                        <div className="w-48 h-64">
                                            <Image fill src={info?.image} alt={'image'} className="rounded-md w-full h-full object-center object-cover overflow-hidden" />
                                        </div>
                                    </Link>
                                    <div className="flex-1 text-white">
                                        <h1 className="text-2xl font-bold mb-5">{info?.title?.english}</h1>
                                        <div className="h-72 overflow-hidden border-b-[1px] border-slate-300">
                                            {parse(info?.description || '')}
                                        </div>
                                        <div className="py-5 flex items-center justify-between">
                                            <div style={{ backgroundColor: 'rgba(0, 0, 0, .65)' }} className="rounded-full text-[#f5ec42] h-10 w-10 flex justify-center items-center font-semibold text-sm">{info?.rating}%</div>
                                            <div>
                                                Ngày bắt đầu: {formatDate(info?.startDate?.day, info?.startDate?.month, info?.startDate?.year)}
                                            </div>
                                            <div>
                                                Ngày kết thúc: {formatDate(info?.endDate?.day, info?.startDate?.month, info?.startDate?.year)}
                                            </div>
                                            <div>
                                                {info?.popularity} lượt xem
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-10">
                            <div className="grid grid-cols-6 gap-5">
                                {
                                    info.characters?.map((character: any) => (
                                        <div className="flex flex-col justify-center items-center" key={character.id}>
                                            <div className="w-36 h-[216px] relative overflow-hidden rounded-md">
                                                <Image fill src={character.image} alt={""} className="w-full h-full object-cover object-center overflow-hidden rounded-md hover:scale-110 hover:transition-all hover:ease-linear hover:duration-100" />
                                            </div>
                                            <h1 className="font-semibold text-white py-2 text-sm text-ellipsis whitespace-nowrap overflow-hidden">{character.name?.full}</h1>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-full bg-white p-5">
                            <CommentSection />
                        </div>


                    </div>
            }
        </div>
    );
}
