// ---------- get elements from the page ----------
var daysEl = document.getElementById("days");
var monthTitle = document.getElementById("monthTitle");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var todayBtn = document.getElementById("todayBtn");
var liveTime = document.getElementById("liveTime");

var selectedTitle = document.getElementById("selectedTitle");
var summary = document.getElementById("summary");
var itemForm = document.getElementById("itemForm");
var titleInput = document.getElementById("titleInput");
var timeInput = document.getElementById("timeInput");
var typeInput = document.getElementById("typeInput");
var itemList = document.getElementById("itemList");
var emptyMsg = document.getElementById("emptyMsg");

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// ---------- variables ----------
var today = new Date();
var viewYear = today.getFullYear();   // year of the month we are showing
var viewMonth = today.getMonth();     // 0 = January, 11 = December
var selectedKey = makeKey(viewYear, viewMonth, today.getDate());

// all saved data lives here, like:
// { "2026-10-24": [ {id: 1, title: "Meeting", time: "10:00", type: "Event", done: false} ] }
var data = loadData();

// ---------- helper functions ----------
function addZero(num) {
  return num < 10 ? "0" + num : "" + num;
}

// makes a key like "2026-10-24" (month is 0-based so we add 1)
function makeKey(year, month, day) {
  return year + "-" + addZero(month + 1) + "-" + addZero(day);
}

// ---------- saving and loading (localStorage) ----------
function loadData() {
  try {
    var saved = localStorage.getItem("myGlassCalendar");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // if storage is blocked, we just start with empty data
  }
  return {};
}

function saveData() {
  try {
    localStorage.setItem("myGlassCalendar", JSON.stringify(data));
  } catch (e) {
    alert("Could not save. Please allow browser storage.");
  }
}

// ---------- draw the calendar ----------
function drawCalendar() {
  daysEl.innerHTML = "";
  monthTitle.textContent = monthNames[viewMonth] + " " + viewYear;

  var firstDay = new Date(viewYear, viewMonth, 1).getDay();         // 0 = Sunday
  var totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();   // last date of month

  // empty boxes before the 1st date
  for (var i = 0; i < firstDay; i++) {
    daysEl.appendChild(document.createElement("div"));
  }

  // one box for every date
  for (var d = 1; d <= totalDays; d++) {
    var key = makeKey(viewYear, viewMonth, d);
    var box = document.createElement("div");
    box.className = "day";
    box.textContent = d;

    if (key === makeKey(today.getFullYear(), today.getMonth(), today.getDate())) {
      box.classList.add("today");
    }
    if (key === selectedKey) {
      box.classList.add("selected");
    }
    if (data[key] && data[key].length > 0) {
      box.classList.add("has-items");
    }

    box.dataset.key = key;
    box.addEventListener("click", function () {
      selectedKey = this.dataset.key;
      drawCalendar();
      drawDetails();
    });

    daysEl.appendChild(box);
  }
}

// ---------- draw the right side (items of the selected date) ----------
function drawDetails() {
  var parts = selectedKey.split("-");
  var niceDate = new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
  selectedTitle.textContent = niceDate;

  var items = data[selectedKey] || [];

  // sort by time, items without time go last
  items.sort(function (a, b) {
    return (a.time || "99:99").localeCompare(b.time || "99:99");
  });

  var doneCount = items.filter(function (item) { return item.done; }).length;
  summary.textContent = items.length + " item(s) saved, " + doneCount + " done";

  itemList.innerHTML = "";
  emptyMsg.style.display = items.length === 0 ? "block" : "none";

  items.forEach(function (item) {
    var li = document.createElement("li");
    if (item.done) {
      li.classList.add("done");
    }

    // checkbox to mark done
    var check = document.createElement("input");
    check.type = "checkbox";
    check.checked = item.done;
    check.addEventListener("change", function () {
      item.done = check.checked;
      saveData();
      drawDetails();
    });

    // title + time
    var text = document.createElement("div");
    text.className = "text";
    var title = document.createElement("span");
    title.className = "title";
    title.textContent = item.title;
    text.appendChild(title);
    if (item.time) {
      var small = document.createElement("small");
      small.textContent = item.time;
      text.appendChild(small);
    }

    // type badge (Event / Task / Note)
    var badge = document.createElement("span");
    badge.className = "badge " + item.type;
    badge.textContent = item.type;

    // delete button
    var del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "\u2715";
    del.title = "Delete";
    del.addEventListener("click", function () {
      data[selectedKey] = data[selectedKey].filter(function (x) {
        return x.id !== item.id;
      });
      if (data[selectedKey].length === 0) {
        delete data[selectedKey]; // remove empty dates from storage
      }
      saveData();
      drawCalendar();
      drawDetails();
    });

    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(badge);
    li.appendChild(del);
    itemList.appendChild(li);
  });
}

// ---------- events ----------
itemForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  var title = titleInput.value.trim();
  if (title === "") {
    return;
  }

  if (!data[selectedKey]) {
    data[selectedKey] = [];
  }

  data[selectedKey].push({
    id: Date.now(),            // unique number for each item
    title: title,
    time: timeInput.value,
    type: typeInput.value,
    done: false
  });

  saveData();
  itemForm.reset();
  drawCalendar();
  drawDetails();
});

prevBtn.addEventListener("click", function () {
  viewMonth--;
  if (viewMonth < 0) {
    viewMonth = 11;
    viewYear--;
  }
  drawCalendar();
});

nextBtn.addEventListener("click", function () {
  viewMonth++;
  if (viewMonth > 11) {
    viewMonth = 0;
    viewYear++;
  }
  drawCalendar();
});

todayBtn.addEventListener("click", function () {
  today = new Date();
  viewYear = today.getFullYear();
  viewMonth = today.getMonth();
  selectedKey = makeKey(viewYear, viewMonth, today.getDate());
  drawCalendar();
  drawDetails();
});

// small live clock at the top
function updateLiveTime() {
  var now = new Date();
  liveTime.textContent = addZero(now.getHours()) + ":" + addZero(now.getMinutes()) + ":" + addZero(now.getSeconds());
}

// ---------- start ----------
drawCalendar();
drawDetails();
updateLiveTime();
setInterval(updateLiveTime, 1000);
