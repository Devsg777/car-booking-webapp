import React from 'react'

const GlassEffect = () => {
  return (
    <>
    <div className="absolute right-0 top-0 h-full w-full flex justify-end -z-5 ">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-purple-600 rounded-md rotate-45" />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 h-full w-full flex items-end">
            <div className="w-28 h-28 overflow-hidden flex rounded-xl relative blur-2xl">
              <span className="absolute w-16 h-16 -top-1 -right-1 bg-emerald-500 rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -right-1 bg-[#8cd66a] rounded-md rotate-45" />
              <span className="absolute w-16 h-16 -bottom-1 -left-1 bg-indigo-300 rounded-md rotate-45" />
            </div>
          </div></>
  )
}

export default GlassEffect