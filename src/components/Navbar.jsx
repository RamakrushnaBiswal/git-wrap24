export default function Navbar() {
  return (
    <div className="navbar bg-base-300 justify-between p-3">
      <a className="text-5xl font-ache m-5 hover:text-blue-500 transition ease-in duration-200" href="/">GitWrap <sup className="text-2xl">24</sup></a>
      <div className="flex items-center space-x-2">
        <button type="button" className="btn btn-sm btn-primary"><a href="https://github.com/RamakrushnaBiswal/git-wrap24" target="_blank">Star us⭐</a></button>
        <iframe src="https://github.com/sponsors/RamakrushnaBiswal/button" title="Sponsor RamakrushnaBiswal" height="32" width="100" style={{ border: 0, flexShrink: 0,marginRight: "20px" }}></iframe>
      </div>
    </div>
  );
}
