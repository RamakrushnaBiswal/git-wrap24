export default function Navbar() {
  return (
    <div className="navbar bg-base-300 justify-between p-3">
      <a className="text-2xl lg:text-5xl font-ache m-5 hover:text-blue-500 transition ease-in duration-200" href="/">GitWrap <sup className="text-lg lg:text-2xl">24</sup></a>
      <div className="flex flex-col lg:flex lg:flex-row items-center space-x-2 gap-2">
        <button type="button" className="btn btn-sm lg:btn-sm btn-primary"><a href="https://github.com/RamakrushnaBiswal/git-wrap24" target="_blank">Star us⭐</a></button>
        {/* <button type="button" className="btn btn-sm  lg:btn-sm btn-ghost"><a href="https://github.com/sponsors/RamakrushnaBiswal" target="_blank">Sponsor💖</a></button> */}
      </div>
    </div>
  );
}
