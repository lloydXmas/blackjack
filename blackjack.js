$(document).ready(function() {

	$('#new-game').css('visibility', 'hidden');
	$('#stand-button').attr("disabled", true);
	$('#hit-button').attr("disabled", true);
	var deck, dealerHand, playerHand, playerPoints, dealerPoints;
	startNewGame();

	/*
	DEAL
	*/
	$('#deal-button').click(function() {
		$('#deal-button').prop("disabled", true);
		$('#stand-button').attr("disabled", false);
		$('#hit-button').attr("disabled", false);
		for (let i = 0; i < 2; i++) {
			let x = cards[Math.floor(Math.random() * cards.length)];
			$('#dealer-hand').append('<img src="' + getCardImageUrl(x) + '" />');
			cards.splice(cards.indexOf(x), 1);
			dealerHand.push(x);
			dealerPoints = calculatePoints(dealerHand);
		}
		for (let j = 0; j < 2; j++) {
			let x = cards[Math.floor(Math.random() * cards.length)];
			$('#player-hand').append('<img src="' + getCardImageUrl(x) + '" />');
			cards.splice(cards.indexOf(x), 1);
			playerHand.push(x);
			playerPoints = calculatePoints(playerHand);
		}
		$('#player-points').text(playerPoints);
		$('#dealer-points').text(dealerPoints);
		if (playerPoints === 21 && dealerPoints === 21) {
			pushGame(); // two blackjacks
		} else if (dealerPoints === 21) {
			dealerWin(21);
		} else if (playerPoints === 21) {
			playerWin(21);
		}
	});

	/*
	HIT
	*/
	$('#hit-button').click(function() {
		let x = cards[Math.floor(Math.random() * cards.length)];
		$('#player-hand').append('<img src="' + getCardImageUrl(x) + '" />')
		playerHand.push(x);
		cards.splice(cards.indexOf(x), 1);
		playerPoints = calculatePoints(playerHand);
		$('#player-points').text(playerPoints);
		if (playerPoints > 21) {
			$('#player-hand').empty();
			$('#player-hand').append('<h2 class="bust">BUST</h2>');
			dealerWin();
		}
	});

	/*
	STAND
	*/
	$('#stand-button').click(function() {
		if (dealerPoints < 17) {
			while (dealerPoints < 17) {
				let x = cards[Math.floor(Math.random() * cards.length)];
				$('#dealer-hand').append('<img src="' + getCardImageUrl(x) + '" />');
				cards.splice(cards.indexOf(x), 1);
				dealerHand.push(x);
				dealerPoints = calculatePoints(dealerHand);
				$('#dealer-points').text(dealerPoints);
				console.log('Dealer Points ' + dealerPoints);
				if (dealerPoints > 21) {
					$('#dealer-hand').empty();
					$('#dealer-hand').append('<h2 class="bust">BUST</h2>');
					playerWin();
				} else {
					checkScore();
				}
			}
		} else {
			checkScore();
		}
	});

	$('#new-game').click(function() {
		$('.d_h_s').prop("disabled", true);
		$('#deal-button').prop("disabled", false);
		$('#new-game').css('visibility', 'hidden');
		$('[id$=hand]').empty();
		$('#messages').text('');
		$('[id$=points]').text('');
		startNewGame();
	});

	function getCardImageUrl(card) {
		if (card.point == 11) {
			var img_url = './images/jack_of_' + card.suit + '.png';
		} else if (card.point == 12) {
			var img_url = './images/queen_of_' + card.suit + '.png';
		} else if (card.point == 13) {
			var img_url = './images/king_of_' + card.suit + '.png';
		} else if (card.point == 1) {
			var img_url = './images/ace_of_' + card.suit + '.png';
		} else {
			var img_url = './images/' + card.point + '_of_' + card.suit + '.png';
		}
		return img_url;
	}

	function makeDeck() {
		var cards = [];
		for (let i = 1; i <= 13; i++) {
			cards.push({
				point: i,
				suit: 'spades'
			});
			cards.push({
				point: i,
				suit: 'hearts'
			});
			cards.push({
				point: i,
				suit: 'clubs'
			});
			cards.push({
				point: i,
				suit: 'diamonds'
			});
		}
		return cards;
	}

	function calculatePoints(hand) {
		var total = 0,
			isAce = false;
		for (var key in hand) {
			if (hand[key].point === 1) {
				isAce = true;
			}
			total += Math.min(hand[key].point, 10); // Face Card
		}
		if (total === 11 && isAce) {
			total = 21;
		}
		return total;
	}

	function checkScore() {
		if (dealerPoints > playerPoints) {
			dealerWin();
		} else if (dealerPoints < playerPoints) {
			playerWin();
		} else if (dealerPoints === playerPoints) {
			pushGame();
		}
	}

	function pushGame() {
		$('#hit-button').prop("disabled", true);
		$('#stand-button').prop("disabled", true);
		$('#messages').text('PUSH');
		$('#new-game').css('visibility', 'visible');
	}

	function playerWin(y = 0) {
		if (y === 21) {
			$('#messages').text('Blackjack! You Win');
		} else {
			$('#messages').text('You Win!');
		}
		$('#hit-button').prop("disabled", true);
		$('#stand-button').prop("disabled", true);
		$('#new-game').css('visibility', 'visible');
	}

	function dealerWin(y = 0) {
		if (y === 21) {
			$('#messages').text('Dealer has Blackjack');
		} else {
			$('#messages').text('Dealer Wins');
		}
		$('#hit-button').prop("disabled", true);
		$('#stand-button').prop("disabled", true);
		$('#new-game').css('visibility', 'visible');
	}

	function startNewGame() {
		playerPoints = dealerPoints = 0;
		cards = makeDeck();
		dealerHand = [];
		playerHand = [];
		$('[id$=hand]').empty();
		$('[id$=points]').text('');
	}
});
