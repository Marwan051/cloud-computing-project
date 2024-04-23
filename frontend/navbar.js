document.addEventListener("DOMContentLoaded", function() {
    var navbar = `
      <header>
        <nav>
          <ul>
            <li><a class = "navlink" href = "index.html">Home</a></li>
            <li><a class = "navlink" href = "students.html">About Us</a></li>
            <li><a class = "navlink" href = "project.html">About Project</a></li>
          </ul>
        </nav>
      </header>
    `;
  
    document.body.innerHTML = navbar + document.body.innerHTML;
  });