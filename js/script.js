document.addEventListener("DOMContentLoaded", docLoad);

function docLoad() {

	// Select

	let select = function() {
		let selectHeader = document.querySelectorAll('.select__header');
		let selectItem = document.querySelectorAll('.select__item');
		let selectInput = document.querySelectorAll('.select__input');
		selectHeader.forEach(item => {
			item.addEventListener("click", selectToggle);
		});

		selectItem.forEach(item => {
			item.addEventListener("click", selectChoose);
		});

		function selectToggle() {
			this.parentElement.classList.toggle("is-active");
		}

		function selectChoose() {
			let text = this.innerText,
			select = this.closest('.select'),
			currentText = select.querySelector('.select__current');
			inputText = select.querySelector('.select__input');

			currentText.innerText = text;
			inputText.value = text;
			select.classList.remove("is-active");
		}
	}
	select();

	// Files 
	
	let showFile = function() {
		let btn = document.getElementById("btnAddFiles");
		let elem;
		let counter = 1;
		let id;

		function addInput() {
			elem = document.createElement("input");
			id = "file" + counter;
			elem.setAttribute("type", "file");
			elem.setAttribute("id", id);
			document.querySelector("#fileBlock").appendChild(elem);
			inputEventHandler(elem);
		}
		addInput();

		function inputEventHandler(elem) {
			elem.addEventListener("change", eventHandler);			
		}
		function eventHandler(event) {
			elem.removeEventListener("change", eventHandler);
			let fileSize = elem.files[0].size;
			if(fileSize < 1024) {
				fileSize = fileSize + "b";
			}
			if(fileSize > 1024 && fileSize < 1024 * 1024) {
				fileSize = (fileSize / 1024).toFixed(1) + "kb";
			}
			if (fileSize > 1024 * 1024) {
				fileSize = (fileSize / (1024 * 1024)).toFixed(1) + "Mb";
			}

			let newFile = document.createElement("tr");
			newFile.setAttribute("data-id", id);
			newFile.innerHTML = `
			<td data-th="File name"><i class="fas fa-file-alt"></i>${elem.files[0].name}</td>
			<td data-th="File size">${fileSize}</td>
			<td data-th="Number of words">894</td>
			<td data-th="Remove"><i class="far fa-trash-alt"></i></td>
			`;
			document.querySelector("#tableFiles").appendChild(newFile);
			counter++;
			id = "file" + counter;
			addInput();


			let removeBtn = document.getElementsByClassName("fa-trash-alt");

			removeBtn[removeBtn.length - 1].addEventListener("click", function(event) {
				event.preventDefault();
				let removeRow = this.closest("tr");
				let dataId = removeRow.getAttribute("data-id");
				console.log(dataId);
				removeRow.parentNode.removeChild(removeRow);
				var removeInput = document.getElementById(dataId);
				removeInput.parentNode.removeChild(removeInput);
			});
		}
		
		btn.addEventListener("click", function(event) {
			event.preventDefault();
			elem = document.getElementById(id);
			elem.dispatchEvent(new MouseEvent("click"));
		});
	}

	showFile();

// Range

	function req() {
		const request = new XMLHttpRequest();
		request.open("GET", "/urgency.json");
		request.setRequestHeader("Content-type","application/json; charset=utf-8");
		request.send();
		request.addEventListener("load", function() {
			if(request.status == 200) {
				let data = JSON.parse(request.response);
				let range = document.getElementById("range");
				range.addEventListener('change', function(event) {
					let timeLineResult = document.getElementById("timeLineResult");
					let timeLineJson = document.getElementById("timeLineJson");
					let rangeval = range.value;
					switch (rangeval) {
						case "0":
						timeLineResult.innerHTML = "I got time";
						timeLineJson.innerHTML = data.gotTime;
						break;
						case "1":
						timeLineResult.innerHTML = "average";
						timeLineJson.innerHTML = data.average;
						break;
						case "2":
						timeLineResult.innerHTML = "Yesterday";
						timeLineJson.innerHTML = data.yesterday;
						break;
					};
				});
				range.dispatchEvent(new Event("change"));
			} else {
				console.log("Error");
			}
		});
	}
	req();

	// let willGetJsonObj = new Promise(
	// 	function(resolve, regect) {
	// 		if (true) {}
	// 	}
	// );
}