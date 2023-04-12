class Header {
  // DOM methods
  renderHeader(location) {
    const header = document.createElement('header');
    header.innerHTML = `<h1>Sketch Pad</h1>`;
    document.querySelector(location).appendChild(header);
  }
}

export default Header;