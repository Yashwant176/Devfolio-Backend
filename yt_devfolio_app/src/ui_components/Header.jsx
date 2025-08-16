import banner from "../images/tech-girl.jpg"

const Header = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-4 relative">
      <div className="w-full h-[450px] overflow-hidden rounded-lg">
        <img
          src={banner}
          alt="Tech Girl"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  )
}

export default Header
