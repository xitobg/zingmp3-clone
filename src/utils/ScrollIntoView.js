function scrollIntoView(element) {
  element?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
export default scrollIntoView;
