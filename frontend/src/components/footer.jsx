import iconTwitter from "../assets/icons/twitter.svg";
import iconFacebook from "../assets/icons/facebook.svg";
import iconInstagram from "../assets/icons/instagram.svg";
import iconYoutube from "../assets/icons/youtube.svg";
import "../styles/App.css"

function Footer() {
  return (
    <footer className=" absolute bottom-0 flex justify-center mx-auto w-screen gap-5 footer h-24 items-center">
      <span>
        <img src={iconTwitter} alt="" />
      </span>
      <span>
        <img src={iconFacebook} alt="" />
      </span>
      <span>
        <img src={iconInstagram} alt="" />
      </span>
      <span>
        <img src={iconYoutube} alt="" />
      </span>
    </footer>
  );
}

export default Footer;
