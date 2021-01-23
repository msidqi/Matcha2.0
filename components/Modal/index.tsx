import React from 'react'

const Modal = () => {
const [state, setState] = React.useState()
  const name= "small-modal",
  const data = () => {
    return {
      showModal: false
    }
  }
  const methods = {
    toggleModal: function(){
      this.showModal = !this.showModal;
    }
  }
    return (
        <template>
  <div>
    <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" v-on:click="toggleModal()">
      Open small modal
    </button>
    <div v-if="showModal" className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        {/* <!--content--> */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* <!--header--> */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">
              Modal Title
            </h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* <!--body--> */}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-gray-600 text-lg leading-relaxed">
              I always felt like I could do anything. That’s the main
              thing people are controlled by! Thoughts- their perception
              of themselves! They're slowed down by their perception of
              themselves. If you're taught you can’t do anything, you
              won’t do anything. I was taught I could do everything.
            </p>
          </div>
          {/* <!--footer--> */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" v-on:click="toggleModal()">
              Close
            </button>
            <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" v-on:click="toggleModal()">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>


    )
}

export default Modal
