const menu = [
    {
      id: 0,
      catagory: "Pizzák",
      title: "Margarétás Pizza",
      price: 1950,
      imge: "pizzak/margareta.webp",
      desc: `paradicsomszósz, sajt`
    },
    {
        id: 1,
        catagory: "Pizzák",
        title: "Szalámis Pizza",
        price: 2250,
        imge: "pizzak/szalamis.jpg",
        desc: `paradicsomszósz, sajt, szalámi`
    },
    {
        id: 2,
        catagory: "Pizzák",
        title: "Hawaii Pizza",
        price: 2550,
        imge: "pizzak/hawaii.jpg",         
        desc: `paradicsomszósz, sajt, sonka, ananász`
    },
    {
        id: 4,
        catagory: "Pizzák",
        title: "Vegetáriánus Pizza",
        price: 2550,
        imge: "pizzak/vege.jpg",         
        desc: `paradicsomszósz, sajt, paradicsom, brokkoli, kaliforniai paprika, bébikukorica`
    },
    {
        id: 5,
        catagory: "Pizzák",
        title: "Pikáns prémium pizza",
        price: 2950,
        imge: "pizzak/pikans.jpg",         
        desc: `mézes-mustáros alap, csirkehús, sajt, sonka, kukorica`
    },
    {
        id: 6,
        catagory: "Pizzák",
        title: "Carbonara pizza",
        price: 2550,
        imge: "pizzak/carbonara.avif",         
        desc: `fokhagymás tejfölös alap, sajt, füstölt sajt, bacon`
    },
    {
      id: 7,
      catagory: "Üdítők",
      title: "Coca-Cola",
      price: 300,
      imge: "pizzak/coca.png",
      desc: ``
    },
    {
        id: 8,
        catagory: "Üdítők",
        title: "Coca-Cola Zero",
        price: 250,
        imge: "pizzak/zero.png",
        desc: ``
    },
    {
        id: 9,
        catagory: "Üdítők",
        title: "Fanta",
        price: 300,
        imge: "pizzak/fanta.png",
        desc: ``
    },
    {
        id: 10,
        catagory: "Üdítők",
        title: "Cappy",
        price: 350,
        imge: "pizzak/cappy.png",
        desc: ``
    },
  ];

  const sectionContainer = document.querySelector(".section-container");
  const containerBtn = document.querySelector(".btn-container");
  

  window.addEventListener("DOMContentLoaded", function () {
    displayMenuItems(menu);
    displayMenuButton();
  });
  

  function displayMenuItems(menuItem) {
    let displayItems = menuItem.map(function (item) {
      return `<div class="section-item">
                              <div class="left-item">
                                  <img class ="img" src=${item.imge}>
                              </div>
                              <div class="right-item">
                                  <div class="flex-item">
                                      <h4 class="item-title">${item.title}</h4>
                                      <span class="item-price">${item.price} Ft</span>
                                  </div>
                                  <div class="item-desc">
                                      <p>${item.desc}</p>
                                  </div>
                              </div>
                          </div>`;
    });
    displayItems = displayItems.join("");
    sectionContainer.innerHTML = displayItems;
  }
  
  
  function displayMenuButton() {
    const catagories = menu.reduce(
      function (values, item) {
        if (!values.includes(item.catagory)) {
          values.push(item.catagory);
        }
        return values;
      },
      ["Összes"]
    );
    const catagoryBtn = catagories
      .map(function (catagory) {
        return `<button type="button" class="btn filter-btn" data-id=${catagory}>
                              ${catagory}
                          </button>`;
      })
      .join("");
    containerBtn.innerHTML = catagoryBtn;
   
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const catagory = e.currentTarget.dataset.id;
        const menuCatagory = menu.filter(function (menuItem) {
          if (catagory === menuItem.catagory) {
            return menuItem;
          }
        });
        if (catagory === "Összes") {
          displayMenuItems(menu);
        } else {
          displayMenuItems(menuCatagory);
        }
      });
    });
}