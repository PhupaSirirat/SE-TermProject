import { Link } from "react-router-dom";

function App() {
  return (
    <main className="flex flex-col h-screen items-center pt-20">
      <h1 className="text-3xl font-bold mb-10">ลงชื่อเข้าใช้</h1>
      <section className="w-4/5">
        <form>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              หมายเลขโทรศัพท์/อีเมล
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@student.chula.coconut"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            ลงชื่อเข้าใช้
          </button>
        </form>

        <div className="flex items-center py-4">
          <div className="flex-grow h-px bg-[#FF4E00]"></div>
          <span className="flex-shrink text-sm text-[#FF4E00] px-4 italic font-light">
            หรือ หากไม่มีบัญชี
          </span>
          <div className="flex-grow h-px bg-[#FF4E00]"></div>
        </div>
        <div className="flex justify-center">
          <Link to="#"><span>ลงทะเบียน</span></Link>
        </div>
      </section>
    </main>
  );
}

export default App;
