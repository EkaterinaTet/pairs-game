const game = document.getElementById("game");

//после победы начинаем игру сначала
function startGame(game, cardsNumber) {
  const cardsNumberArr = []; //массив номеров карточек
  let firstCard = null; //хранение 1-ой карточки, которую открываем
  let secondCard = null; //хранение 2-ой карточки, которую открываем

  //заполняю массив числами
  for (let i = 1; i <= cardsNumber; i++) {
    //начинаю с 1
    cardsNumberArr.push(i, i); //добавляю число 2 раза в массив(тк оно должно повторяться)
  }

  //перемешать массив
  for (let i = 0; i < cardsNumberArr.length; i++) {
    //ищу произвольный индекс в массиве
    let randomIndex = Math.floor(Math.random() * cardsNumberArr.length); //число от 0 до длинны массива
    //меняю местами цифры
    let tmp = cardsNumberArr[i];
    cardsNumberArr[i] = cardsNumberArr[randomIndex];
    cardsNumberArr[randomIndex] = tmp;
  }

  //настраиваю сетку исходя из кол-ва колонок
  // let columns = 2; // колонки по умолчанию
  // if (cardsNumber == 3) {
  //   columns = 3;
  // }
  // if (cardsNumber == 4) {
  //   columns = 4;
  // }
  // if (cardsNumber == 5) {
  //   columns = 5;
  // }
  // if (cardsNumber == 6) {
  //   columns = 4;
  // }
  // game.style = `grid-template-columns: repeat(${columns}, 1fr);`;

  //создаю карточки
  for (let cardNumber of cardsNumberArr) {
    let card = document.createElement("div");
    card.textContent = cardNumber; //указываю номер карточки
    card.classList.add("card"); //создаю класс(для стилизации карточки)

    //ловлю клик по карточке
    card.addEventListener("click", function () {
      //проверяю если карточка содержит классы (то дальше все выполняться не будет) - чтобы предотвратить два раза клик по одной и той же карте
      if (
        card.classList.contains("open-card") ||
        card.classList.contains("success")
      ) {
        //   alert("карточка уже открыта");
        return;
      }

      if (firstCard !== null && secondCard !== null) {
        //сработает только при 3 клике на карточки(тк карточки 2 уже будут не null)
        //удаляю классы при открытии 3-ей карточки (если 2 не совпали)
        firstCard.classList.remove("open-card");
        secondCard.classList.remove("open-card");
        //и опять начинаем заново(чтобы первое условие дальше сработало)
        firstCard = null;
        secondCard = null;
      }

      card.classList.add("open-card");

      //при клике на карту проверяю
      if (firstCard === null) {
        //если еще ничего нет (ни одна карточка не открывалась)
        firstCard = card; //добавляю значение в 1 карточку
      } else {
        secondCard = card; //добавляю во вторую
      }

      //проверяю открыты ли две карточки
      if (firstCard !== null && secondCard !== null) {
        //сравниваю номера открытых карточек
        let firstCardNumber = firstCard.textContent;
        let secondCardNumber = secondCard.textContent;

        if (firstCardNumber === secondCardNumber) {
          firstCard.classList.add("success");
          secondCard.classList.add("success");
        }
      }
      //при каждом клике делаю проверку (чтобы проверить все ли карточки открыты успешно)
      if (
        cardsNumberArr.length === document.querySelectorAll(".success").length
      ) {
        setTimeout(function () {
          game.innerHTML = ""; //очищаем поле перед след игрой
          alert("ПОБЕДА!");
          let cardsNumber = +prompt("Хотите еще раз? Введите кол-во пар", 4);
          startGame(game, cardsNumber); //рекурсия. вызываем заново
        }, 500);
      }
    });

    game.append(card); //добавляю на стр
  }
}

let cardsNumber = +prompt("Введите кол-во пар", 4); //кол-во пар

startGame(game, cardsNumber);
