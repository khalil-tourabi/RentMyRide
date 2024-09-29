import logo from '../assets/logo-no-background.png'
const Register = () => {
  return (
    <>
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
  <div className="text-center mb-16">
    <a href="javascript:void(0)">
      <img
        src= {logo}
        alt="logo"
        className="w-52 inline-block"
      />
    </a>
    <h4 className="text-gray-800 text-base font-semibold mt-6">
      Create a new account
    </h4>
  </div>
  <form>
    <div className="grid sm:grid-cols-2 gap-8">
      <div>
        <label className="text-gray-800 text-sm mb-2 block">Username</label>
        <input
          name="username"
          type="text"
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="Enter Username"
        />
      </div>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">Phone number</label>
        <input
          name="phone"
          type="tel"
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="Enter Phone number"
        />
      </div>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">Email</label>
        <input
          name="email"
          type="email"
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="Enter Email"
        />
      </div>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">Account</label>
        <select
          name="userType"
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
        >
          <option value="CLIENT">CLIENT</option>
          <option value="AGENCY">AGENCY</option>
        </select>
      </div>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">Password</label>
        <input
          name="password"
          type="password"
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="Enter password"
        />
      </div>
      <div>
        <label className="text-gray-800 text-sm mb-2 block">
          Confirm Password
        </label>
        <input
          name="cpassword"
          type="password"
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="Enter confirm password"
        />
      </div>
    </div>
    <div className="!mt-12">
      <button
        type="button"
        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        Sign up
      </button>
    </div>
  </form>
</div>

    </>
  )
}

export default Register