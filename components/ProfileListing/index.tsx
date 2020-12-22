import React from 'react'

const ProfileListing = () => {
    return (
      <div className="sm:w-1/2 mb-10 px-4">
        <div className="rounded-lg h-96 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src="/profile.jpg" />
        </div>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Buy YouTube Videos</h2>
        <p className="leading-relaxed text-base">Williamsburg occupy sustainable snackwave gochujang. Pinterest cornhole brunch, slow-carb neutra irony.</p>
        <button className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
      </div>
    )
}

export default ProfileListing
