const characters = {    
    "Aaravi Damien.png": "ULTRA RARE",
    "Alternate Damien.png": "COMMON",
    "Auditorium Damien.png": "RARE",
    "Classic Damien.png": "COMMON",
    "Gym Damien.png": "RARE",
    "Hooded Damien.png": "LEGENDARY",
    "Second Term Damien.png": "LEGENDARY",
    "Summer Damien.png": "ULTRA RARE",
    "Winter Damien.png": "RARE",
    "Damien in Suit.png": "ULTRA RARE",
    "Camp Damien.png": "COMMON",
    "Half-nude Damien.png": "LEGENDARY",
    "Scout Damien.png": "COMMON",
    "Damien in Swimsuit.png": "ULTRA RARE",
    "Lunar Damien.png": "RARE",
    "Drag Damien.png": "LEGENDARY",
    "Sexy Bee Damien.png": "RARE",
    "Very Sexy Bee Damien.png": "LEGENDARY",
    "Biblically Accurate Damien.png": "LEGENDARY",
    "Demion.png": "WTF",
    "Cerberus Damien.png": "ULTRA RARE",
    "Sci-Fi Damien.png": "COMMON",
    "Fantasy Damien.png": "COMMON",
    "Fairytale Damien.png": "COMMON",
    "Anime Damien.png": "LEGENDARY",
    "Robot Damien.png": "COMMON",
    "Savage Damien.png": "COMMON",
    "Mazeman Damien.png": "RARE",
    "Victorian Damien.png": "ULTRA RARE",
    "Mustache Damien.png": "RARE"

};

const rarityChances = {
  "COMMON": 60,
  "RARE": 25,
  "LEGENDARY": 4.7,
  "ULTRA RARE": 10,
  "WTF": 0.3,
};

const rarityColors = {
  "COMMON": "white",
  "RARE": "blue",
  "LEGENDARY": "gold",
  "ULTRA RARE": "purple",
  "WTF": "red",
};

let rolls = 5;
let obtainedCharacters = {};

// Генерация персонажа
function rollCharacter() {
    const rollButton = document.getElementById("roll-button");

    if (rolls <= 0) {
        // Проигрываем звук при отсутствии роллов
        const audio = new Audio('NO_ROLLZ.mp3');
        audio.play();

        // Показываем сообщение "NO ROLLZ LEFT!"
        const rollCountElement = document.getElementById("roll-count");
        rollCountElement.textContent = "NO ROLLZ LEFT!";
        rollCountElement.style.color = "red";

        // Убираем красное сообщение через 2 секунды
        setTimeout(() => {
            rollCountElement.textContent = `ROLLZ: ${rolls}`;
            rollCountElement.style.color = "white";
        }, 2000);
        return;
    }

    // Блокируем кнопку ролла
    rollButton.disabled = true;

    // Показываем сообщение "ROLLING..."
    const rollCountElement = document.getElementById("roll-count");
    rollCountElement.textContent = "ROLLING...";
    rollCountElement.style.color = "yellow";

    // Задержка перед выбором персонажа (например, 2 секунды)
    setTimeout(() => {
        const rarityPool = [];
        for (const [char, rarity] of Object.entries(characters)) {
            for (let i = 0; i < rarityChances[rarity]; i++) {
                rarityPool.push({ char, rarity });
            }
        }

        const selected = rarityPool[Math.floor(Math.random() * rarityPool.length)];
        const { char, rarity } = selected;

        // Обновляем список полученных персонажей и количество роллов
        obtainedCharacters[char] = (obtainedCharacters[char] || 0) + 1;
        rolls--;

        // Отображаем выбранного персонажа
        displayCharacter(char, rarity);
        rollCountElement.textContent = `ROLLZ: ${rolls}`;
        rollCountElement.style.color = "white";

        // Воспроизведение звука редкости
        playSound(rarity);

        // Разблокируем кнопку после завершения ролла
        rollButton.disabled = false;
    }, 300); // Задержка 0,3
}

function playSound(rarity) {
    const audio = new Audio();
    switch (rarity) {
        case "COMMON":
            audio.src = "COMMON.mp3";
            break;
        case "RARE":
            audio.src = "RARE.mp3";
            break;
        case "LEGENDARY":
            audio.src = "LEGENDARY.mp3";
            break;
        case "ULTRA RARE":
            audio.src = "ULTRA_RARE.mp3";
            break;
        case "WTF":
            audio.src = "WTF.mp3";
            break;
        default:
            return; // Если нет соответствия, звук не проигрывается
    }
    audio.play(); // Запускаем звук
}
 
function displayCharacter(char, rarity) {
  const charName = char.split(".")[0];
  document.getElementById("character-name").textContent = `U GOT ${rarity} DAMIEN!`;
  document.getElementById("character-name").style.color = rarityColors[rarity];
  document.getElementById("character-image").src = char;
  document.getElementById("rarity-info").textContent = charName;
}

// Модальное окно HAREM
function showHarem() {
    let haremContent = "<div class='harem-gallery'>";

    // Перебираем только полученных персонажей
    for (const [char, count] of Object.entries(obtainedCharacters)) {
        const rarity = characters[char];
        const color = rarityColors[rarity];
        const charName = char.split(".")[0];

        // Добавляем изображение и текст, с возможностью клика
        haremContent += `
            <div class="harem-item" style="color: ${color}" onclick="showCharacterInfo('${char}', '${charName}', '${rarity}', ${count})">
                <img src="${char}" alt="${charName}" class="harem-image">
                <p>${charName} (x${count})</p>
            </div>
        `;
    }

    if (haremContent === "<div class='harem-gallery'>") {
        haremContent += "<p>U GOT NO DAMIENS, NOOB</p>";
    }

    haremContent += "</div>";
    document.getElementById("harem-content").innerHTML = haremContent;

    // Показываем модальное окно и оверлей
    document.getElementById("harem-modal").style.display = "block";
    document.getElementById("modal-overlay").style.display = "block";

    document.getElementById("modal-overlay").onclick = (event) => {
        const modal = document.getElementById("harem-modal");
        if (!modal.contains(event.target)) {
            closeHarem();
        }
    };
}

// Функция для отображения информации о персонаже
function showCharacterInfo(char, charName, rarity, count) {
    const infoModal = document.getElementById("character-info-modal");
    const infoOverlay = document.getElementById("character-info-overlay");

    document.getElementById("info-name").textContent = charName;
    document.getElementById("info-image").src = char;
    document.getElementById("info-rarity").textContent = `${rarity}`;
    document.getElementById("info-count").textContent = `X${count}`;
    document.getElementById("info-rarity").style.color = rarityColors[rarity];

    // Показываем модальное окно и оверлей
    infoModal.style.display = "block";
    infoOverlay.style.display = "block";

    // Закрываем модальное окно при клике на оверлей
    infoOverlay.onclick = closeCharacterInfo;
}

function closeCharacterInfo() {
    document.getElementById("character-info-modal").style.display = "none";
    document.getElementById("character-info-overlay").style.display = "none";
}

function closeHarem() {
    document.getElementById("harem-modal").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
}

// Модальное окно NERD GAME

let targetNumber; // Объявляем глобальную переменную для цели
let gameEnded = false; // Флаг, чтобы предотвратить многократные клики

function startMinigame() {
    targetNumber = Math.floor(Math.random() * 10) + 1; // Генерируем новое число
    gameEnded = false; // Сбрасываем флаг окончания игры

    let gameContent = "";

    for (let i = 1; i <= 10; i++) {
        gameContent += `<button style="margin: 5px; padding: 10px; font-size: 16px;" onclick="checkGuess(${i})">${i}</button>`;
    }

    document.getElementById("number-buttons").innerHTML = gameContent;

    // Очищаем текст результата
    document.getElementById("nerd-game-result").textContent = "";

    document.getElementById("nerd-game-modal").style.display = "block";
    document.getElementById("nerd-game-overlay").style.display = "block";
}

function checkGuess(guess) {
    if (gameEnded) return; // Если игра уже закончена, ничего не делаем

    const difference = Math.abs(targetNumber - guess);
    const rollsEarned = Math.max(5 - difference, 1);
    rolls += rollsEarned;

    // Показываем результат
    const resultMessage = `NUMBER WAS ${targetNumber}. U GOT ${rollsEarned} ROLLZ!`;
    document.getElementById("nerd-game-result").textContent = resultMessage;
    document.getElementById("roll-count").textContent = `ROLLZ: ${rolls}`;

    gameEnded = true; // Устанавливаем флаг окончания игры

    // Делаем все кнопки неактивными
    const buttons = document.getElementById("number-buttons").querySelectorAll("button");
    buttons.forEach((button) => {
        button.disabled = true;
        button.style.opacity = "0.5"; // Добавляем визуальное указание
        button.style.cursor = "not-allowed";
    });

    // Закрываем окно через небольшую задержку
    setTimeout(closeNerdGame, 700);
}


// Закрытие модального окна по клику на оверлей
document.getElementById("nerd-game-overlay").onclick = (event) => {
    const modal = document.getElementById("nerd-game-modal");
    if (!modal.contains(event.target)) {
        closeNerdGame();
    }
};


function closeNerdGame() {
  document.getElementById("nerd-game-modal").style.display = "none";
  document.getElementById("nerd-game-overlay").style.display = "none";
}
// Функция для изменения ширины меню
function setMenuWidth(menuId, width) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.width = width;
    } else {
        console.warn(`Menu with ID '${menuId}' not found.`);
    }
}

// Устанавливаем ширину для перечисленных меню
setMenuWidth("harem-modal", "70%");
setMenuWidth("nerd-game-modal", "70%");
setMenuWidth("character-info-modal", "70%");

// Если есть другие меню, добавьте их сюда
// Например:
// setMenuWidth("your-menu-id", "90%");
document.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.modal-overlay');
    if (overlay && !modal.contains(event.target)) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
});
// Открытие модального окна
document.querySelector('#nerd-game-button').addEventListener('click', function () {
    document.querySelector('#nerd-game-overlay').classList.add('open');
    document.querySelector('#nerd-game-modal').classList.add('open');
});

// Закрытие при клике на фон
document.querySelector('#nerd-game-overlay').addEventListener('click', function () {
    document.querySelector('#nerd-game-overlay').classList.remove('open');
    document.querySelector('#nerd-game-modal').classList.remove('open');
});

// (Опционально) Закрытие по кнопке внутри окна
document.querySelector('#nerd-game-close').addEventListener('click', function () {
    document.querySelector('#nerd-game-overlay').classList.remove('open');
    document.querySelector('#nerd-game-modal').classList.remove('open');
});
document.getElementById("nerd-game-overlay").onclick = (event) => {
    const modal = document.getElementById("nerd-game-modal");
    if (!modal.contains(event.target)) {
        closeNerdGame();
    }
};
