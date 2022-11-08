//build nav-bar dynamically
const sections = document.querySelectorAll("section");
const ulMenu = document.querySelector("#navbar__list");
const fragment = document.createDocumentFragment();
function navMenu() {
  //loop over the sections
  for (const section of sections) {
    //create li and a elements
    const list = document.createElement("li");
    const link = document.createElement("a");

    //extract datanav using gatAttribute (to get its value)
    //add text to <a>
    link.innerHTML = section.getAttribute("data-nav");
    //append <a> to <li>
    link.classList = "menu__link";

    list.appendChild(link);

    link.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
    });
    //append <li> to fragment
    fragment.appendChild(list);
  }
  //append fragment to ul
  ulMenu.appendChild(fragment);
}
navMenu();

//add and remove classes based when scrolling on activity using IntersectionObserver
window.addEventListener("scroll", () => {
  const options = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };
  const observer = new IntersectionObserver(callback, options);
  //callback excuted when target is intersected with the viewport
  function callback(entries) {
    //array of observing elements
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("your-active-class");
      } else {
        entry.target.classList.remove("your-active-class");
      }
    });
  }
  sections.forEach((section) => {
    //observe the intersection when the target is close to threshold
    observer.observe(section);
  });
  //add and remove links based on activity
  function activeLink() {
    //get all the links
    const links = document.querySelectorAll("a");
    //loop through each section to get each link related to each section
    for (const section of sections) {
      if (section.classList.contains("your-active-class")) {
        const active_section = section;
        for (const link of links) {
          //extract datanav using gatAttribute
          if (link.innerHTML == active_section.getAttribute("data-nav")) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      }
    }
  }
  activeLink();
});
