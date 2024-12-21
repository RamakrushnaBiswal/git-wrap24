export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary text-primary-content p-4 flex justify-between">
      <aside className="grid grid-flow-col">
        <h3 className="font-bold text-6xl font-ache hover:text-white transition ease-in duration-200">
          GitWrap <sup className="text-4xl">24</sup>
        </h3>
        <p className="font-normal">
          Created by{" "}
          <a href="https://github.com/RamakrushnaBiswal" target="_blank" className=" underline underline-offset-2 ">Ramakrushna Biswal</a>
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/RamakrushnaBiswal" target="_blank">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ramakrushna-biswal/" target="_blank">
            linkedin
          </a>
          <a href="https://www.instagram.com/ram__mzqp/" target="_blank">
            Instagram
          </a>
        </div>
      </nav>
    </footer>
  );
}
