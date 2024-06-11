"use client"
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';


// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }: any) {
//     return (
//         <div className='flex'>
//             {currentItems &&
//                 currentItems.map((item: any) => (
//                     <div key={item.id} className='w-10 h-10 rounded-md bg-slate-100 flex justify-center items-center mr-2'>
//                         <h3>{item}</h3>
//                     </div>
//                 ))}
//         </div>
//     );
// }

export default function PaginatedItems({ itemsPerPage }: any) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const router = useRouter();
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        router.push(`?page=${event.selected + 1}`);
        setItemOffset(newOffset);
    };

    return (
        <div className='px-10'>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                hrefBuilder={(page) => `?page=${page + 1}`}
                pageCount={pageCount}
                previousLabel="<"
                selectedPageRel={`?page=${itemOffset + 1}`}
                pageClassName="w-10 h-10 rounded-md bg-slate-100 mr-2 hover:bg-blue-400"
                pageLinkClassName="w-full h-full flex justify-center items-center"
                previousClassName="w-10 h-10 rounded-md bg-slate-100 mr-2 hover:bg-blue-400"
                previousLinkClassName="flex justify-center items-center w-full h-full"
                nextClassName="w-10 h-10 rounded-md bg-slate-100 mr-2 hover:bg-blue-400"
                nextLinkClassName="flex justify-center items-center w-full h-full"
                breakLabel="..."
                breakClassName="w-10 h-10 rounded-md bg-slate-100 mr-2"
                breakLinkClassName="flex justify-center items-center w-full h-full"
                containerClassName="flex"
                activeClassName="bg-blue-500 text-white w-10 h-10 rounded-md flex justify-center items-center mr-2"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

