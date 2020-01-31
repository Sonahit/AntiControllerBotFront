chunks_size = 16;

let user_config = {
  chunks_number: 0,
  url: "http://127.0.0.1:8000/bus_stop/brest/dirty?time=50000"
};

function url_change(city) {
  return `http://127.0.0.1:8000/bus_stop/${city}/dirty?time=50000`;
}

function chunks_creater(arr, chunkSize) {
  const chunks = [];
  for (let num = 0; num < arr.length; num += chunkSize) {
    chunks.push(arr.slice(num, num + chunkSize));
  }
  return chunks;
}

async function get_response_json(url) {
  const body = await fetch(url);
  return body.json();
}

async function data_creater(url) {
  const json = await get_response_json(url);
  const keys = Object.keys(json);
  let arr = [];
  for (const key of keys) {
    arr.push([key, json[key][0], json[key][1]]);
  }
  return arr;
}

function сreate_table(data) {
  const table = document.getElementById("table");
  let tbody = table.tBodies[0];
  tbody.innerHTML = "";
  if (!tbody) return;
  for (let element of data) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${element[0]}</td><td>${element[1]}</td><td>${element[2]}</td>`;
    tbody.appendChild(tr);
  }
}

async function get_data(url, chunks) {
  const data = await data_creater(url);
  return chunks_creater(data, chunks);
}

function paginator_create() {
  const button_right = document.getElementsByClassName("paginator_button_right")[0];
  const button_left = document.getElementsByClassName("paginator_button_left")[0];
  button_right.addEventListener("click", async () => {
    data = await get_data(user_config["url"], chunks_size);
    if (data[user_config["chunks_number"] + 1] != undefined) {
      user_config["chunks_number"]++;
      сreate_table(data[user_config["chunks_number"]]);
    }
  });
  button_left.addEventListener("click", async () => {
    data = await get_data(user_config["url"], chunks_size);
    if (data[user_config["chunks_number"] - 1] != undefined) {
      user_config["chunks_number"]--;
      сreate_table(data[user_config["chunks_number"]]);
    }
  });
}

function top_btn_create() {
  const btn_gomel = document.getElementById("btn_gomel");
  const btn_brest = document.getElementById("btn_brest");
  btn_gomel.addEventListener("click", async () => {
    user_config["chunks_number"] = 0;
    user_config["url"] = url_change("gomel");
    arr = await get_data(user_config["url"], chunks_size);
    сreate_table(arr[user_config["chunks_number"]]);
  });
  btn_brest.addEventListener("click", async () => {
    user_config["url"] = url_change("brest");
    user_config["chunks_number"] = 0;
    arr = await get_data(user_config["url"], chunks_size);
    сreate_table(arr[user_config["chunks_number"]]);
  });
}

async function main() {
  сreate_table((await get_data(user_config["url"], chunks_size))[0]);
  paginator_create();
  top_btn_create();
}

main();
