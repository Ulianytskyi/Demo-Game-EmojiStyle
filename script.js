const container = document.querySelector('.container');
const coverScreen = document.querySelector('.cover-screen');
const overText = document.getElementById('over-text');
const result = document.getElementById('result');


let healthPoint = 16;
let experience = 0;
let armorStatus = '';
let armored = false;

function generateArray (length, min, max) {
	const arrTemp = [];
	
	for (let i=0; i < length; i++) {
		const ranNumber = getRandomNumber(1, 3);
		let name, value, icon;

		switch (ranNumber) {
			case 1:
				name = 'Heal';
				value = 5;
				icon = '🍎';
				break;
			case 2:
				name = 'Armor';
				value = getRandomNumber(1, 3);
				icon = '✊';
				break;
			case 3:
				name = 'Enemy';
				value = getRandomNumber(5,10);
				icon = enemyType(value);
				break;
		}
		arrTemp.push({name, value, icon});
	}
	return arrTemp;
}

function enemyType (value) {
	let enemies = ['🤡','👻','👹','🤖','👾','👽'];
	return enemies[value-5];
}

function displayField (array, targetElement) {
    targetElement.innerHTML = '';

    for (let i = 0; i < array.length; i++) {

        let objectClass = 'object';
        let objectNameClass = 'object-name';
        let objectNumberClass = 'object-number';
        let objectClassBtn = 'btn';
        let objectIdBtn = 'button';

        if (i <= 5) {
		targetElement.innerHTML += `<div class='${objectClass}'>
				<span class='${objectNameClass}'>${array[i].name}</span>
				<span class='${objectNumberClass}'>${array[i].icon}${array[i].value}</span>
			</div>`;
        }

        if (i > 5) {
		targetElement.innerHTML += `<div class='${objectClass}'>
        		<button class='${objectClassBtn}' id='${objectIdBtn}${i-5}'>
        		<span class='${objectNameClass}'>${array[i].name}</span>
        		<span class='${objectNumberClass}'>${array[i].icon}${array[i].value}</span>
        		</button>
        	</div>`;
        }
    }
}

function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copyNumbers (index) {
	array2.unshift(array[index]);
	updatePlayerStats();
}

let array = generateArray(9, 1, 3);
let array2 = [];
const gameField = document.getElementById('field');
displayField(array, gameField);

function updateArray () {
	array.splice(6, 3);
	const arrayTemp = generateArray(3, 1, 3);
	array = arrayTemp.concat(array);
	displayField(array, gameField);
	array2.splice(0, array2.length - 1);

	const button1 = document.getElementById('button1');
	button1.addEventListener('click', function() {
	    copyNumbers(6);
	    updateArray();
	});

	const button2 = document.getElementById('button2');
	button2.addEventListener('click', function() {
	    copyNumbers(7);
	    updateArray();
	});

	const button3 = document.getElementById('button3');
	button3.addEventListener('click', function() {
	    copyNumbers(8);
	    updateArray();
	});
}

function checkGameOver() {
	if (healthPoint <= 0) {
		coverScreen.classList.remove('hide');
		container.classList.add('hide');
		overText.classList.remove('hide');
		result.classList.remove('hide');
		result.innerText = `Final score: ${experience}`;
		startButton.innerText = "Restart Game";
		array2 = [];
		healthPoint = 16;
		experience = 0;
	}
}

function checkArmor() {
	if (healthPoint < 16) {
		armored = false;
	} else {
	armored = true;
	}
}

function updatePlayerStats() {
	const playerArmor = document.getElementById('armor-status');
	const playerHp = document.getElementById('health-points');
	const playerXp = document.getElementById('exp-points');

	if (array2.length > 0) {

		const arrIndex = array2[0];

		if (arrIndex.name === 'Heal') {
			if (!armored) {
				healthPoint += arrIndex.value;
				healthPoint = Math.min(healthPoint, 16);
			}

		} else if (arrIndex.name === 'Armor') {
			healthPoint += arrIndex.value;
			checkArmor();
			
		} else if (arrIndex.name === 'Enemy') {
			const damage = arrIndex.value;
			healthPoint -= damage;
			experience = experience + (Math.ceil(damage / 100 * 25));
			checkArmor();
		}
	}
	
	let classArmorStatus = 'armor-status';
	
	if (!armored) {
		armorStatus = '.';
		playerArmor.style.color = '#9dc4fb';
		playerArmor.style.backgroundColor = '#9dc4fb';
	} else {
		armorStatus = 'ARMORED';
		playerArmor.style.color = '#ffffff';
		playerArmor.style.backgroundColor = 'red';
	}

	playerArmor.innerHTML= `${armorStatus}`;
	playerHp.innerHTML = `HP: ${healthPoint}`;
	playerXp.innerHTML = `XP: ${experience}`;

	checkGameOver();
}

function startGame () {
	container.classList.remove('hide');
	coverScreen.classList.add('hide');
	updatePlayerStats();
}

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', function () {
	startGame();
	document.body.style.overflow = 'hidden';
});

const player = document.getElementById('player-image');
player.src = "player.png";

updateArray();
updatePlayerStats();