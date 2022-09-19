let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPelciulas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPelciulas();
  }
});

const cargarPelciulas = async () => {
  try {
    const respues = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=f7bc72d2eed45883c7d5ccc42c3173b5&language=es-MX&page=${pagina}`
    );

    console.log(respues);

    //si la respuesta es correcta
    if (respues.status === 200) {
      const datos = await respues.json();

      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class="titulo">${pelicula.title}</h3>
        </div>
        `;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respues.status === 401) {
      console.log("Pusistes la llave mal");
    } else if (respues.status === 404) {
      console.log("No existe");
    } else {
      console.log("Hubo un error ");
    }
  } catch (error) {
    console.log(error);
  }
};
cargarPelciulas();
