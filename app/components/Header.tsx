"use client"
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


export default function Header(setAnimes: any) {
    const [searchInput, setSearchInput] = useState('');
    const searchParams = useSearchParams()
    const page = searchParams.get('page') || 1
    const [loading, setLoading] = useState(false);

    const search = async (query: string) => {
        setLoading(true);
        await axios.get(`https://animes-five.vercel.app/meta/anilist/${query}?page=${page}`).then((res: any) => {
            setAnimes(res.data.results);
        }).catch((err) => {
            console.log(err)
        })
        setLoading(false);
    };
    return (
        <div className="bg-[#0f1416] py-5 px-20 flex justify-between items-center">
            <div className="flex items-center w-2/3 ">
                <div>
                    <Link href={'/'} className="text-center font-medium text-white px-2">TRANG CHỦ</Link>
                </div>
                <div>
                    <Link href={'#'} className="text-center font-medium text-white px-2">DẠNG ANIME</Link>
                </div>
                <div>
                    <Link href={'#'} className="text-center font-medium text-white px-2">TOP ANIME</Link>
                </div>
                <div>
                    <Link href={'#'} className="text-center font-medium text-white px-2">THỂ LOẠI</Link>
                </div>
                <div>
                    <Link href={'#'} className="text-center font-medium text-white px-2">SEASON</Link>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <input type="text" className="p-1 border-[1px] border-slate-200 rounded-md" placeholder="Tìm kiếm theo tên ..." name="" id="" onChange={(e: any) => {
                    setSearchInput(e.target.value)
                }} />
                <button type="button" className="px-3 py-1 bg-blue-300 rounded-md ml-4" onClick={() => {
                    search(searchInput)
                }}>
                    Tìm kiếm
                </button>
            </div>
        </div>

    )
}