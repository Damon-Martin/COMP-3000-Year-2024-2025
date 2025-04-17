import Link from 'next/link'
export default function OrderButtonDesktop({ index, transactionID="TRANSACTION ID", totalPrice="XX.XX" }) {
    const ariaLabel = `Link to Order ID: ${transactionID} and costs £${totalPrice}`;
    return (
        <Link href={`/`} key={index} aria-label={ariaLabel} className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-3 min-w-[70vw] min-h-[20vh] max-h-[20vh] rounded-lg flex flex-col">
            <div className='m-3'>
                <p className='text-xl font-bold'>Order: #{transactionID}</p>
                <p className='text-xl'>Price: {totalPrice}</p>
            </div>
        </Link>
    )
}