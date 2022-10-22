window.addEventListener('load', function () {
// comportamiento botón agregar

let addToCart = document.querySelectorAll('.fa-bag-shopping')

for(let i=0; i<addToCart.length ; i++){
  addToCart[i].addEventListener("click", function (e) {
    e.preventDefault()
    if (localStorage.getItem("g10libros")) {
      let carritoLibros = JSON.parse(localStorage.getItem("g10libros"));
      if (carritoLibros.find((libro) => libro.id == e.target.id)) {
        alert('el producto ya se encuentra en el carrito')
      } else {
        carritoLibros.push({id: e.target.id, qty: 1});
        addToCart[i].classList.remove('fa-bag-shopping')
        addToCart[i].classList.add('fa-circle-check')

      }
      localStorage.setItem("g10libros", JSON.stringify(carritoLibros));
    } else {
      localStorage.setItem("g10libros", JSON.stringify([{id: e.target.id, qty: 1}]));
      addToCart[i].classList.remove('fa-bag-shopping')
      addToCart[i].classList.add('fa-circle-check')
    }
  });
}



})