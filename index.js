let data = [
  {
    id: 0,
    name: "肥宅心碎賞櫻3日",
    imgUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    area: "高雄",
    description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: "貓空纜車雙程票",
    imgUrl:
      "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台北",
    description:
      "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: "台中谷關溫泉會1日",
    imgUrl:
      "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    area: "台中",
    description:
      "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    group: 20,
    price: 1765,
    rate: 7,
  },
];
//form
const addTicketForm = document.querySelector(".addTicket-form");

// 為什麼直接取value有問題
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");

let ticketCardArea = document.querySelector(".ticketCard-area");
const addBtn = document.querySelector(".addTicket-btn");

// 選擇地區
const regionSearch = document.querySelector(".regionSearch");
let dataLens = document.querySelector("#searchResult-text");

let empty = false;
function checkEmpty() {
  // 目前問題無法中斷
  let checkInput = {
    ticketName: ticketName.value,
    ticketImgUrl: ticketImgUrl.value,
    ticketRegion: ticketRegion.value,
    ticketPrice: ticketPrice.value,
    ticketNum: ticketNum.value,
    ticketRate: ticketRate.value,
    ticketDescription: ticketDescription.value,
  };
  let emptyIndex = [];
  let checkInputValue = Object.values(checkInput);
  let checkInputIndex = Object.keys(checkInput);
  console.log(checkInputIndex);
  checkInputValue.forEach((item, index) => {
    if (item === "") {
      emptyIndex.push(index);
      empty = true;
    }
  });
  if (empty) {
    let emptyItem = checkInputIndex.filter((item) => {
      return emptyIndex == item;
    });
    alert(`請輸入${emptyItem}資料`);
  }
}

// 添加資料
function addData() {
  let id = data.length;
  data.push({
    id,
    name: ticketName.value,
    imgUrl: ticketImgUrl.value,
    area: ticketRegion.value,
    description: ticketDescription.value,
    group: ticketNum.value,
    price: ticketPrice.value,
    rate: ticketRate.value,
  });
  id++;
}

// 過濾區域
function filterData(option) {
  if (option === "全部地區") {
    renderData(data);
    return data;
  }
  let filterData = data.filter(function (item) {
    return item.area === option;
  });
  renderData(filterData);
  return filterData;
}

// 渲然資料
function renderData(data) {
  let str = "";
  let length = data.length;
  dataLens.textContent = `本次搜尋共 ${length} 筆資料`;
  data.forEach(function (item) {
    const { area, rate, name, description, group, price } = item;
    str += ` <li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img
                src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true"
                alt=""
              />
            </a>
            <div class="ticketCard-region">${area}</div>
            <div class="ticketCard-rank">${rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${name}</a>
              </h3>
              <p class="ticketCard-description">${description}</p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${price}</span>
              </p>
            </div>
          </div>
  </li>`;
  });
  ticketCardArea.innerHTML = str;
}
// reset 可以自己寫也可以用 form 內建 reset 方法
// function reset() {
//   ticketName.value = "";
//   ticketImgUrl.value = "";
//   ticketRegion.value = "";
//   ticketPrice.value = "";
//   ticketNum.value = "";
//   ticketRate.value = "";
//   ticketDescription.value = "";
// }

let areaStatus = "" || "全部地區";
// btn -> 判斷有無空值 -> 添加資料 -> 渲然資料
addBtn.addEventListener("click", function () {
  checkEmpty();
  addData();
  addTicketForm.reset();
  // reset();
  // renderData(data);     // 改善添加資料後，filter 沒正確顯示的問題
  filterData(areaStatus);
});

regionSearch.addEventListener("change", function (e) {
  areaStatus = e.target.value;
  let filterResult = filterData(areaStatus);
  renderData(filterResult);
});
