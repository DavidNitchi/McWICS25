'use client'
import { useState, useEffect } from 'react'
import { prompt } from '@/gemini/geminiAPI'

export default function Page() {
  const [reply, setReply] = useState<string | null>(null)
  const [buttonClick, setClick] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const response = await prompt("Computer Scientist", "Experience: McDonald's Cashier, Google Engineer")
      setReply(response)
    }
    fetchData()
  }, [buttonClick])

  return (
    <div className="flex flex-col items-center">
      <button className="bg-green-400 text-white p-4 border rounded-md border-black hover:text-xl" onClick={()=> setClick(prev => !prev)}>Chicken</button>
      <div className='border border-black w-[500px] h-[500px]'>
        {reply && <p>{reply}</p>}
      </div>
    </div>
  );
}
