$(document).ready(function() {

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
	var dealerHand = [],
		playerHand = [];

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

	$('#deal-button').click(function() {
		for (let i = 0; i < 2; i++) {
			let x = cards[Math.floor(Math.random() * cards.length)];
			$('#dealer-hand').append('<img src="' + getCardImageUrl(x) + '" />');
			cards.splice(cards.indexOf(x), 1);
			dealerHand.push(x);
		}
		for (let j = 0; j < 2; j++) {
			let x = cards[Math.floor(Math.random() * cards.length)];
			$('#player-hand').append('<img src="' + getCardImageUrl(x) + '" />');
			cards.splice(cards.indexOf(x), 1);
			playerHand.push(x);
		}
		$('#player-total').append(calculatePoints(playerHand));
		$('#dealer-total').append(calculatePoints(dealerHand));
	});

	$('#hit-button').click(function() {
		let x = cards[Math.floor(Math.random() * cards.length)];
		$('#player-hand').append('<img src="' + getCardImageUrl(x) + '" />')
		playerHand.push(x);
		$('#player-total').text(calculatePoints(playerHand));
	});

	function calculatePoints(hand) {
		var total = 0,
			isAce = false;
		for (var key in hand) {
			if (hand[key].point == 1) {
				isAce = true;
			}
			var value = Math.min(hand[key].point, 10);
			total += value;
		}
		if (total == 11 && isAce) {
			total = 21;
		}
		return total;
	}

});

