'use client'

import 'flowbite'

export default function Modal({modalId, showModal, children}) {

  return (
      <div style={{visibility: showModal? 'visible' : 'hidden'}} >
        <div className={'flex'}>
          <div
              id={modalId}
              tabIndex="-1"
              aria-hidden="true"
              className="absolute top-3 right-0 z-20 overflow-y-auto h-full max-h-[60vh] justify-center items-center p-2 w-52"
          >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-black/75 rounded-lg shadow">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
  )

}