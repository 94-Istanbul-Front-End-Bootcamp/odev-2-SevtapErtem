let data = [];

const fetchData = () => {
  //verinin çekildiği yer
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json'dan okunan verinin data array'ine atanması
      data = responseData;

      //veri geldikten sonra filtreleme butonu görünür olsun
      let filterButton = document.querySelector("#filterButton");
      filterButton.setAttribute("style", "");

      let adultValue = document.querySelector("#adultValue");
      adultValue.setAttribute("style", "");

      let isActive = document.querySelector("#isActive");
      isActive.setAttribute("style", "");

      let search = document.querySelector("#search");
      search.setAttribute("style", "");

      let filter = document.querySelector("#filter");
      filter.setAttribute("style", "");

      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      alert("Bir hata oluştu.");
      console.log(err);
    });
};

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
  let list = document.querySelector(".list");
  list.innerHTML = data
    .map((element) => {
      return `
        <ul id=${element.id} class="table table-dark table-bordered">
            <li class='bold'>name: ${element.name} </li>
            <li class='bold'>email: ${element.email} </li>
        </ul>
        `;
    })
    .join("");
};

//verinin filtrelenmesini sağlayan fonksiyon
//TODO
const filterData = (filter) => {
  let filteredData = [];

  if (isActive.checked) {
    filteredData = data.filter((element) => element.isActive === true);
  } else {
    listData(filteredData);
  }

  if (adultValue.checked) {
    filteredData = data.filter((element) => element.age >= 18);
  }

  if (search.value.length > 0) {
    search.value = search.value.toUpperCase();
    filteredData = data.filter(
      (element) => element.name.charAt() === search.value.charAt()
    );
  }

  //2li koşullar
  //Doğru yöntemi öğrenince düzelteceğim.

  if (adultValue.checked && isActive.checked) {
    filteredData = data.filter(
      (element) => element.age >= 18 && element.isActive == true
    );
  }

  if (adultValue.checked && search.value.length > 0) {
    search.value = search.value.toUpperCase();
    filteredData = data.filter(
      (element) =>
        element.age >= 18 && element.name.charAt() == search.value.charAt()
    );
  }

  if (isActive.checked && search.value.length > 0) {
    search.value = search.value.toUpperCase();
    filteredData = data.filter(
      (element) =>
        element.name.charAt() == search.value.charAt() &&
        element.isActive == true
    );
  }

  listData(filteredData);
};
