import React from 'react'
import Layout from "../components/layout";

const Calendar = () => {
    return (
        <Layout>
            <div className='py-12 max-w-4xl mx-auto flex'>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%239CA3AF&ctz=Asia%2FSeoul&showCalendars=0&showPrint=0&src=NTE4MmExOGI1ZmQ4NzAwY2Q0NGZlNzFiNDlmMGE4Yzg4NWI5NDdmYmIwYTQ2Zjc3ODY1N2UzZGQ0YjZkNDNhMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NDU2MGY2NTQ2NGU2N2MxZjQyNWVjMTczMDY3YTBiNWE0YTY4MjU0Yjg0MTU2OWM1Y2U1MmQwMGVhNWNmNDAwOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=cW85amRwb2RnMnJ1aWQ2MjAzYmVzNjR1am9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5&color=%23009688&color=%23D50000"
                    className='bg-transparent rounded-lg w-full h-[800px] p'/>
            </div>
        </Layout>
    )
}

export default Calendar