import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-neutral w-full">
           <footer className="footer text-neutral-content items-center py-4 w-11/12 mx-auto">
  <aside className="grid-flow-col items-center">
    <h2 className="text-2xl font-bold">Task Management</h2>
    
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end text-2xl">
    <a href="https://www.linkedin.com/in/nazim-uddin-a85aba345">
      <FaLinkedin />
      
    </a>
    <a href="https://github.com/Nazim1247">
      <FaGithub />
      
    </a>
    <a href="https://www.facebook.com/share/1BPK8VijLn">
      <FaFacebook />
      
    </a>
    <a href="https://youtube.com/@najimuddin-cv5eb?si=muFnCh-RxYEQ2ub5">
      <FaYoutube />
      
    </a>
  </nav>
</footer> 
        </div>
    );
};

export default Footer;