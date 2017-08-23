'use strict';
/********************
 * Pets
 * Skrub's Pet System: Credit to WGC
********************/
const uuid = require('uuid');
const pets = require('./pet-data.js');
let color = require('../config/color');
 
const colors = {
	Mythic: '#D82A2A',
	Legendary: '#E8AB03',
	Epic: '#73DF14',
	Rare: '#2DD1B6',
	Uncommon: '#2D3ED1',
	Common: '#000',
};

const shop = [
	['Common', 'Get one pet of the Common rarity!', 2],
	['Uncommon', 'Get one pet of the Uncommon rarity!', 5],
	['Rare', 'Get one pet of the Rare rarity!', 8],
	['Epic', 'Get one pet of the Epic rarity!', 10],
	['Legendary', 'Get one pet of the Legendary rarity!', 15],
	['Mythic', 'Get one pet of the Mythic rarity!', 20],
	['Random', 'Get one pet of a random rarity!', 12.5],
];

let petShop = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Random'];
const tourPetsRarity = ['No Pet', 'Common', 'Uncommon', 'Rare', 'Epic', 'Epic', 'Legendary', 'Legendary', 'Mythic'];
const petRarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
let cleanShop = [];
let cleanPet = [];
let rareCache = []; //Used to cache cards for tours
let petCache = []; //Used to cache cards in packs
let userPetPacks = {}; //Used to store users unopened packs

function cachePetPacks() {
	for (let i = 0; i < petShop.length; i++) {
		petCache.push([]);
		for (let key in pets) {
			if (pets.hasOwnProperty(key)) {
				let obj = pets[key];
				if (obj.hasOwnProperty('collection') && obj.collection.indexOf(petShop[i]) > -1) petCache[i].push(key);
			}
		}
	}
	for (let i = 0; i < petShop.length; i++) {
		cleanShop.push(toId(petShop[i]));
	}
}
function getShopDisplay(shop) {
	let display = '<table border="1" cellspacing="0" cellpadding="5" width="100%">' +
					'<tbody><tr style="border-radius: 0px; padding: 18px; background: linear-gradient(rgba(53, 53, 53, 0.8), rgba(40, 40, 40, 0.8)); border-bottom: 1px solid #1a1a1a; border-radius: 0px;"><th><strong style="font-size: 12pt; color: #6666ff;">Command</strong></th><th><strong style="font-size: 12pt; color: #6666ff;">Description</strong></th><th><strong style="font-size: 12pt; color: #6666ff;">Cost</strong></th></tr>';
	let start = 0;
	while (start < shop.length) {
		display += '<tr style="background: rgba(53, 53, 53, 0.8); padding: 8px 0px; text-align: center; border: 1px solid #333; border-top: none; border-radius: 0px; color: white;">' +
						"<td align='center'><button name='send' value='/buypet " + shop[start][0] + "'><b>" + shop[start][0] + "</b></button>" + "</td>" +
						"<td align='center'>" + shop[start][1] + "</td>" +
						"<td align='center'>" + shop[start][2] + "</td>" +
					"</tr>";
		start++;
	}
	display += "</tbody></table><center>To buy an item from the shop, use /buypet <em>command</em>. Every time you buy a pet, there is a 5% chance of it becoming shiny!</center>";
	return display;
}

function cacheRarity() {
	for (let i = 0; i < petRarity.length; i++) {
		rareCache.push([]);
		for (let key in pets) {
			if (pets.hasOwnProperty(key)) {
				let obj = pets[key];
				if (obj.hasOwnProperty('rarity') && obj.rarity.indexOf(petRarity[i]) > -1) rareCache[i].push(key);
			}
		}
	}
	for (let i = 0; i < petRarity.length; i++) {
		cleanPet.push(toId(petRarity[i]));
	}
}

global.tourPet = function (tourSize, userid) {
	if (tourSize > 32) tourSize = 32;
	let tourRarity = tourPetRarity[Math.floor(tourSize / 4)];
	let cacheValue = rareCache[cleanPet.indexOf(toId(tourRarity))];
	let pet = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
	if (tourRarity === 'No Pet') return;
	addPet(userid, pet);
	return [colors[pets[pet].rarity], pets[pet].rarity, pets[pet].title, pets[pet].name];
};

function addPet(name, pet) {
	let newPet = {};
	newPet.id = uuid.v1();
	newPet.title = pets[pet].title;
	newPet.pet = pets[pet].pet;
	newPet.name = pets[pet].name;
	newPet.rarity = pets[pet].rarity;
	newPet.points = pets[pet].points;

	let userid = toId(name);
	db.pets.set(userid, db.pets.get(userid, []).concat([newPet]));
	db.points.set(userid, db.points.get(userid, 0) + newPet.points);
}

function removePet(petTitle, userid) {
	let userPets = db.pets.get(userid, []);
	let idx = -1;
	// search for index of the pet
	for (let i = 0; i < userPets.length; i++) {
		let pet = userPets[i];
		if (pet.title === petTitle) {
			idx = i;
			break;
		}
	}
	if (idx === -1) return false;
	// remove it
	userPets.splice(idx, 1);
	// set it in db
	db.pets.set(userid, userPets);
	return true;
}

function getPetPointTotal(userid) {
	let totalPets = db.pets.get(userid, []);
	let total = 0;
	for (let i = 0; i < pets.length; i++) {
		total += totalPets[i].points;
	}
	return total; q
}

function toTitleCase(str) {
	return str.replace(/(\w\S*)/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

cachePetPacks();
cacheRarity();

exports.commands = {
	pets: 'pet', 
	pet: {
	showcase: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let userid = user.userid;
		if (target) userid = toId(target);
		const pets = db.pets.get(userid, []);
		if (!pets.length) return this.sendReplyBox(userid + " has no pets.");
		const petsMapping = pets.map(function (pet) {
			return '<button name="send" value="/pet info ' + pet.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="pet-button"><img src="' + pet.pet + '" height="80" title="' + pet.name + '"></button>';
		});
		this.sendReplyBox('<div style="max-height: 300px; overflow-y: scroll;">' + petsMapping.join('') + '</div><br><center><b><font color="' + color(userid) + '">' + userid + '</font> has ' + pets.length + ' Pets.');
		//color(userid) 	
	},

	info: function (target, room, user) {
		if (!target) return this.sendReply("/pet [name] - Shows information about a pet.");
		if (!this.runBroadcast()) return;
		let petName = toId(target);
		if (!pets.hasOwnProperty(petName)) return this.sendReply(target + ": pet not found.");
		let pet = pets[petName];
		let html = '<div class="pet-div pet-td" style="box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);"><img src="' + pet.pet + '" width="96" title="' + pet.name + '" align="right">' +
			'<span class="pet-name" style="border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9);  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset, 0px 0px 2px rgba(0, 0, 0, 0.2); font-size: 30px;">' + pet.name + '</span>' +
			'<br /><br /><h1><font color="' + colors[pet.rarity] + '">' + pet.rarity + '</font></h1>' +
			'<br /><br /><font color="#AAA"><i>Points:</i></font> ' + pet.points  +
			'<br clear="all">';
		this.sendReply('|raw|' + html);
	},
	
	ladder: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let keys = Object.keys(db.points.object()).map(function (name) {
			return {name: name, points: getPetPointTotal(name)};
		});
		if (!keys.length) return this.sendReplyBox("Pet ladder is empty.");
		keys.sort(function (a, b) { return b.points - a.points; });
		this.sendReplyBox(rankLadder('Pet Ladder', 'Points', keys.slice(0, 100), 'points'));
	},

	search: function (target, room, user) {
		const letters = "abcdefghijklmnopqrstuvwxyz".split("");
		const categories = {
			Rarity: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Godly'], // rarities
			DontUse: ['Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6'],
		};

		const scrollable = "<div style=\"max-height: 300px; overflow-y: scroll\">"; // code for scrollable html
		const divEnd = "</div>";
		const definePopup = "|wide||html|<center><b>PetSearch</b></center><br />";
		const generalMenu = "<center>" +
			'<button name="send" value="/pet search category" style=\"background-color:aliceblue;height:30px\">Categories</button>&nbsp;&nbsp;' + // category
			'</center><br />';
		if (!target) {
			return user.popup(definePopup + generalMenu);
		}
		// quick fix for when target ends with a comma
		target = target.replace(/\,[\s]+$/i, "");
		let parts = target.split(",");
		let actionCommand = parts.shift();
		let petDisplay;
		switch (toId(actionCommand)) {
		case 'letter':
			let letter = toId(parts[0]);

			const letterMenu = '<center>' + letters.map(l => {
				return '<button name="send" value="/pet search letter, ' + l + '" ' + (letter === l ? "style=\"background-color:lightblue;height:30px;width:35px\"" : "style=\"background-color:aliceblue;height:30px;width:35px\"") + ">" + l.toUpperCase() + "</button>";
			}).join("&nbsp;") + "</center><br />";

			if (!letter || letters.indexOf(letter) === -1) {
				// invalid letter to search for, or none given
				// only show menu
				return user.popup(definePopup + generalMenu + letterMenu);
			}
			// sort pets by letter
			let letterMons = {};
			for (let m in pets) {
				if (!letterMons[m.charAt(0)]) letterMons[m.charAt(0)] = {};
				letterMons[m.charAt(0)][m] = 1;
			}

			if (!letterMons[letter]) return user.popup(definePopup + generalMenu + letterMenu);
			// make graphics for the letter
			petDisplay = Object.keys(letterMons[letter]).sort().map(m => {
				let pet = pets[m];
				return '<button name="send" value="/pet search pet, ' + pet.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="pet-button"><img src="' + pet.pet + '" width="100" title="' + pet.name + '"></button>';
			}).join("&nbsp;");
			// send the popup
			user.lastPetSearch = target;
			user.popup(definePopup + generalMenu + letterMenu + scrollable + petDisplay + divEnd);
			break;
		case 'category':
			// clean all the parts first
			parts = parts.map(p => {
				return toId(p);
			});

			// create category menu
			let categoryMenu = "";
			for (let c in categories) {
				categoryMenu += '<b>' + c + ' -</b> ' + categories[c].map(k => {
					let m = toId(k);
					// add a special search condition for rarity
					if (c === "Rarity") m += "rarity";

					// new params for the search
					// clone parts
					let newParams = parts.slice(0);
					if (parts.indexOf(m) > -1) {
						// remove it
						newParams.splice(newParams.indexOf(m), 1);
					} else {
						newParams.push(m);
					}

					let style = (parts.indexOf(m) > -1 ? "style=\"background-color:lightblue;height:23\"" : "style=\"background-color:aliceblue;height:23\""); // button style checking if currently searching

					return '<button name="send" value="/pet search category, ' + newParams.join(", ") + '" ' + style + '>' + k + '</button>';
				}).join("&nbsp;") + "<br />";
			}
			if (!parts.length) {
				return user.popup(definePopup + generalMenu + categoryMenu);
			}
			// now clone the pets and delete the ones who dont match the categories
			let paramPets = Object.assign({}, pets);

			// filter out the unneeded ones; ignore rarity
			for (let i = 0; i < parts.length; i++) {
				let param = parts[i];
				// ignore rarity
				if (/rarity$/i.test(param)) continue;
				for (let c in paramPets) {
					let petParams = paramPets[c].gen.join("~").toLowerCase().replace(/[^a-z0-9\~]/g, "").split("~");
					if (petParams.indexOf(param) === -1) delete paramPets[c]; // remove the pet from the currently searched ones.
				}
			}

			// seperate check for rarity
			let rarityCheck = parts.some(a => {
				return /rarity$/i.test(a);
			});
			if (rarityCheck) {
				for (let c in paramPets) {
					let petRare = toId(paramPets[c].rarity);
					for (let i = 0; i < parts.length; i++) {
						if (/rarity$/i.test(parts[i])) {
							// check if rarity is the pet's rarity
							if (parts[i].replace(/rarity$/i, "") !== petRare) {
								// remove if not matched
								delete paramPets[c];
							}
						}
					}
				}
			}

			// no pets left
			if (!Object.keys(pets).length) {
				return user.popup(definePopup + generalMenu + categoryMenu + '<br /><center><font color="red"><b>Nothing matches your search</b></font></center>');
			}
			user.lastPetSearch = target;
			// build the display
			petDisplay = Object.keys(paramPets).sort().map(m => {
				let pet = paramPets[m];
				return '<button name="send" value="/pet info ' + pet.name + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="pet-button"><img src="' + pet.pet + '" width="100" title="' + pet.name + '"></button>';
			}).join("&nbsp;");
			user.popup(definePopup + generalMenu + categoryMenu + scrollable + petDisplay + divEnd);
			break;
		case 'pet':
			let backButton = '<button name="send" value="/pet info ' + user.lastPetSearch + '" style="background-color:aliceblue;height:30px;width:35">&lt;&nbsp;Back</button><br /><br />';
			if (!parts[0] || !(toId(parts[0]) in pets)) {
				return user.popup(definePopup + backButton + '<center><font color="red"><b>Invalid Pet</b></font></center>');
			}

			// build the display screen for the pet
			let pet = pets[toId(parts[0])];
			// the image
			let petImage = '<img src="' + pet.pet + '" height=250>';
			// the name of the pet
			let petName = "<b>Name:</b> " + pet.name + "<br />";
			// the id of the pet
			let petId = "<font color=\"gray\">(" + pet.title + ")</font><br />";
			// rarity display
			let petRarityPoints = '<b>Rarity: </b><font color="' + colors[pet.rarity] + '">' + pet.rarity + '</font> (' + pet.points + ')<br />';
			// get users that have the pet
			let allPetUsers = db.pets.object();
			let petHolders = [];
			// dont allow duplicates
			for (let u in petUsers) {
				let userData = allPetUsers[u];
				for (let i = 0; i < userData.length; i++) {
					let tC = userData[i];
					if (tC && tC.title === pet.title) {
						if (!petHolders[u]) petHolders[u] = 0;
						petHolders[u]++;
					}
				}
			}
			// show duplicates as (x#)
			petHolders = Object.keys(petHolders).sort().map(u => {
				return "&nbsp;- " + u + (petHolders[u] > 1 ? " (x" + petHolders[u] + ")" : "");
			});

			// build the display!
			petDisplay = "<center><table><tr>" +
				"<td style='img-align:center;'>" + petImage + "</td>" + // Pet on the left
				"<td>" + // details now
				petName + petId + petRarityPoints + petgen +
				"<b>Users with this pet:</b><br />" + // pet holders
				"<div style=\"max-height: 130px; overflow-y: scroll\">" + // scrollable
				petHolders.join("<br />") + "<br />" +
				"</td></tr></table></center>"; // close the table

			user.popup(definePopup + backButton + petDisplay);
			break;
		case 'error':
		default:
			user.popup(definePopup + generalMenu + '<br /><center><font color="red"><b>Invalid Command action for PetSearch</b></font></center>');
			break;
		}
	},
},
	tradepet: 'pettrade',
	pettrade: function (target, room, user) {
		if (!target) return this.errorReply("/tradepet [pet ID], [user], [targetPet ID]");
		let parts = target.split(",").map(p => toId(p));
		if (parts.length !== 3) return this.errorReply("/tradepet [your pet's ID], [targetUser], [targetPet ID]");
		let match;

		// check for user's pet
		let forTrade = parts[0];
		match = false;
		let userPets = db.pets.get(user.userid, []);
		for (let i = 0; i < userPets.length; i++) {
			if (userPets[i].title === forTrade) {
				match = true;
				break;
			}
		}
		if (!match) return this.errorReply("You don't have that pet!");

		// check for target's pet
		let targetUser = parts[1];
		let targetTrade = parts[2];

		let targetPets = db.pets.get(targetUser, []);
		match = false;
		for (let i = 0; i < targetPets.length; i++) {
			if (targetPets[i].title === targetTrade) {
				match = true;
				break;
			}
		}

		if (!match) return this.errorReply(targetUser + " does not have that pet!");

		// initiate trade
		let tradeId = uuid.v1();
		let newTrade = {
			from: user.userid,
			to: targetUser,
			fromExchange: forTrade,
			toExchange: targetTrade,
			id: tradeId,
		};

		db.pettrades.set(tradeId, newTrade);

		// send messages
		this.sendReply("Your trade has been taken submitted.");
		if (Users.get(targetUser)) Users.get(targetUser).send("|pm|~Mr. Pet Trader|" + targetUser + "|/html <div class=\"broadcast-green\">" + Chat.escapeHTML(user.name) + " has initiated a trade with you.  Click <button name=\"send\" value=\"/pettrades last\">here</button> or use <b>/pettrades</b> to view your pending trade requests.</div>");
		user.send("|pm|~Mr. Pet Trader|" + user.userid + "|/html <div class=\"broadcast-green\">Your trade with " + Chat.escapeHTML(targetUser) + " has been initiated.  Click <button name=\"send\" value=\"/pettrades last\">here</button> or use <b>/pettrades</b> to view your pending trade requests.</div>");
	},

	pettrades: 'viewpettrades',
	viewpettrades: function (target, room, user) {
		// popup variables
		const popup = "|html|<center><b><font color=\"blue\">Trade Manager</font></b></center><br />";

		// get the user's trades
		let allTrades = db.pettrades.object();
		let userTrades = [];
		for (let id in allTrades) {
			let trade = allTrades[id];
			if (trade.from === user.userid || trade.to === user.userid) {
				// push this into the user's trade data
				userTrades.push(trade);
			}
		}

		// if no pending trades
		if (!userTrades.length) return user.popup(popup + "<center>You have no pending trades.</center>");

		// build trade manager screen
		// decide which trade to display
		if (target === "last") {
			target = userTrades.length - 1;
		} else {
			// when there is no target (initial use of command)
			if (!target) target = 0;
			target = parseInt(target);
			if (isNaN(target)) target = 0;
			if (target < 0) target = 0;
			if (target >= userTrades.length) target = userTrades.length - 1;
		}

		// show trade details
		let displayTrade = userTrades[target];
		const acceptReject = '<center>' + (displayTrade.from === user.userid ? "" : '<button name="send" value="/tradeaction accept, ' + displayTrade.id + '" style=\"background-color:green;height:30px\"><b>Accept</b></button>') + // accept button
			'&nbsp;&nbsp;' + // spacing
			'<button name="send" value="/tradeaction ' + (displayTrade.from === user.userid ? "cancel" : "reject") + ', ' + displayTrade.id + '" style=\"background-color:red;height:30px\"><b>' + (displayTrade.from === user.userid ? "Cancel" : "Reject") + '</b></button></center>' + // reject button
			'<br /><br />'; // new line

		// build the user's pet first
		let pet = pets[(displayTrade.from === user.userid ? displayTrade.fromExchange : displayTrade.toExchange)];
		// the image
		let petImage = '<img src="' + pet.pet + '" height=250>';
		// rarity display
		let petRarityPoints = '(<font color="' + colors[pet.rarity] + '">' + pet.rarity + '</font> - ' + pet.points + ')<br />';
		let userSideDisplay = '<center>' + user.userid + '<br />' + petImage + "<br />" + petRarityPoints + '</center>';

		// now build the target's side
		pet = pets[(displayTrade.from !== user.userid ? displayTrade.fromExchange : displayTrade.toExchange)];
		// the image
		petImage = '<img src="' + pet.pet + '" height=250>';
		// rarity display
		petRarityPoints = '(<font color="' + colors[pet.rarity] + '">' + pet.rarity + '</font> - ' + pet.points + ')<br />';
		let targetSideDisplay = "<center>" + (displayTrade.from !== user.userid ? displayTrade.from : displayTrade.to) + '<br />' + petImage + "<br />" + petRarityPoints + "</center>";

		// now build the entire popup
		let tradeScreen = popup + // base popup
			'<center><table><tr><td>' + // table element
			userSideDisplay +
			'</td><td>' + // next column
			targetSideDisplay +
			'</td></tr></table></center><br />' + // close table and add new line
			acceptReject;

		// build the navigation bar
		// build max and min
		let navigationButtons;
		if (userTrades.length === 1) {
			navigationButtons = '<center><button style="background-color:deepskyblue;height:30px;width:30px">1</button></center>';
		} else {
			// build min and mas
			let min = '<button style="background-color:lightblue;height:30px;width:30px" name="send" value="/viewpettrades 0">1</button>&nbsp;&nbsp;&nbsp;';
			let max = '&nbsp;&nbsp;&nbsp;<button style="background-color:lightblue;height:30px;width:30px" name="send" value="/viewpettrades last">' + (userTrades.length) + '</button>';
			// lazy replace for colour
			if (target === 0) min = min.replace("background-color:lightblue;height:30px", "background-color:deepskyblue;height:30px");
			if (target === userTrades.length - 1) max = max.replace("background-color:lightblue;height:30px", "background-color:deepskyblue;height:30px");

			let middle = "";
			// build range
			let range = Object.keys(userTrades).slice(1, userTrades.length - 1); // remove min and max and turn it into a array of numbers
			if (range.length !== 0) { // only build middle buttons is there is none
				if (range.length > 5) {
					// find the current one and get 2 above and below
					let displayRange = [target - 2, target - 1, target, target + 1, target + 2].filter(i => {
						return i > 0 && i <= range.length;
					});
					// build middle buttons
					middle = (displayRange[0] !== 1 ? "... " : "") + displayRange.map(n => {
						n = parseInt(n);
						let style = n === target ? "background-color:deepskyblue;height:30px;width:30px" : "background-color:aliceblue;height:30px;width:30px";
						return '<button style="' + style + '" name="send" value="/viewpettrades ' + n + '">' + (n + 1) + '</button>';
					}).join("&nbsp;") + (displayRange[displayRange.length - 1] !== range.length ? " ..." : "");
				} else {
					// just map the range
					middle = range.map(n => {
						n = parseInt(n);
						let style = n === target ? "background-color:deepskyblue;height:30px;width:30px" : "background-color:aliceblue;height:30px;width:30px";
						return '<button style="' + style + '" name="send" value="/viewpettrades ' + n + '">' + (n + 1) + '</button>';
					}).join("&nbsp;");
				}
			}
			// add the stuff to navigation buttons
			navigationButtons = "<center>" + min + middle + max + "</center>";
		}
		// add the navigation buttons to the popup
		user.lastTradeCommand = "/viewpettrades " + target;
		tradeScreen += navigationButtons;
		user.popup(tradeScreen);
	},

	tradeaction: function (target, room, user) {
		if (!target) return false; // due to the complexity of the command, this should only be used through the viewtrades screen
		let parts = target.split(",").map(p => p.trim());
		let action = toId(parts.shift());
		const backButton = '<button name="send" value="' + (user.lastTradeCommand || '/viewpettrades') + '" style="background-color:aliceblue;height:30px">< Back</button><br /><br />';
		const tradeError = "|html|" + backButton + '<center><font color="red"><b>ERROR: Invalid Trade / You cannot accept your own trade request!</b></font><center>';
		let trade;
		switch (action) {
		case 'confirmaccept':
		case 'accept':
			if (!parts[0]) return false;
			if (action === "accept") {
				// make the user confirm the decision
				// build a back button
				return user.popup("|html|" + backButton + // back button
				'<center><button name="send" value="/tradeaction confirmaccept, ' + parts[0] + '" style="background-color:red;height:65px;width:150px"><b>Confirm Trade</b></button></center>');
			}
			// finalize trade
			// get the trade
			trade = db.pettrades.get(parts[0], null);
			if (!trade) return user.popup(tradeError);

			// check if the trade involves the user
			let accepter, otherTarget;
			if (trade.to === user.userid) {
				accepter = "to";
				otherTarget = "from";
			} else {
				// user has no say in this trade
				return user.popup(tradeError);
			}

			let match;
			// now double check that both users still have those pets
			// check user first
			match = false;
			let userPets = db.pets.get(user.userid, []);
			for (let i = 0; i < userPets.length; i++) {
				if (userPets[i].title === trade[accepter + "Exchange"]) {
					match = true;
					break;
				}
			}

			if (!match) return this.parse('/tradeaction forcecancel, ' + trade.id);

			// check target
			match = false;
			let targetPets = db.pets.get(trade[otherTarget], []);
			for (let i = 0; i < targetPets.length; i++) {
				if (targetPets[i].title === trade[otherTarget + "Exchange"]) {
					match = true;
					break;
				}
			}
			if (!match) return this.parse('/tradeaction forcecancel, ' + trade.id);

			// now go ahead with the trade!
			// for "from" first
			addPet(trade.from, trade.toExchange);
			removePet(trade.fromExchange, trade.from);

			// apply the actions to "to"
			addPet(trade.to, trade.fromExchange);
			removePet(trade.toExchange, trade.to);

			// update points
			db.petpoints.set(trade.to, getPetPointTotal(trade.to));
			db.petpoints.set(trade.from, getPetPointTotal(trade.from));

			// remove the trade
			db.pettrades.delete(parts[0]);

			// on trade success
			// send popups to both user and target saying the trade with user was a success
			// and a button to view the pet they just received
			let targetUsers = [Users.get(trade.to), Users.get(trade.from)];
			if (targetUsers[0]) {
				targetUsers[0].popup("|html|" + backButton + "<center>Your trade with " + trade.from + " has gone through." +
				"<br /><button name=\"send\" value=\"/pet info " + trade.fromExchange + "\">View Traded Pet</button></center>"); // show pet
			}
			if (targetUsers[1]) {
				targetUsers[1].popup("|html|<center>Your trade with " + trade.to + " has gone through." +
				"<br /><button name=\"send\" value=\"/pet info " + trade.toExchange + "\">View Traded Pet</button></center>");
			}

			// log trades and delete the data from list of trades.
			let now = Date.now().toString();
			db.completedTrades.set(now, trade);
			break;
		case 'forcecancel':
		case 'cancel':
		case 'reject':
			if (!parts[0]) return false;
			// check for trade
			trade = db.pettrades.get(parts[0], null);

			if (!trade) return user.popup(tradeError);

			// additional consts
			const popupText = {
				forcecancel: "The trade has automatically been cancelled as one of the participants does not have that pet anymore.",
				cancel: "You have cancelled the trade",
			};

			// check if user is involved
			if (trade.from === user.userid || trade.to === user.userid) {
				// check that the action is correct
				if (trade.from === user.userid && action === "reject") action = "cancel";
				if (trade.to === user.userid && action !== "reject" && action !== "forcecancel") action = "reject";
			} else {
				return user.popup(tradeError);
			}

			// remove the trade
			db.pettrades.delete(parts[0]);

			// letting the users involved know
			let targetUser;
			if (action === "reject") {
				targetUser = Users.get(trade.from);
				if (targetUser) targetUser.popup("Your trade request with " + user.userid + " was rejected");
				user.popup("|html|" + backButton + "You have rejected " + trade.from + "'s trade request.");
			} else {
				user.popup("|html|" + backButton + popupText[action]);
			}
			break;
		}
	},

	confirmtransferpet: 'transferpet',
	transferpet: function (target, room, user, connection, cmd) {
		if (!target) return this.errorReply("/transferpet [user], [pet ID]");
		if (toId(target) === user) return this.errorReply("You cannot transfer pets to yourself.");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the pet being transfered.
		let targetUser = parts.shift();
		let pet = parts[0];
		if (!targetUser || !pet) return this.errorReply("/transferpet [user], [pet ID]");

		if (cmd === "transferpet") {
			return user.popup('|html|<center><button name="send" value="/confirmtransferpet ' + target + '" style="background-color:red;height:65px;width:150px"><b><font color="white" size=3>Confirm Transfer to ' + targetUser + '</font></b></button>');
		}
		// check if pet can been removed
		let canTransfer = removePet(pet, user.userid);
		if (!canTransfer) return user.popup("Invalid pet.");
		// complete transfer
		addPet(targetUser, pet);

		db.petpoints.set(targetUser, getPetPointTotal(targetUser));
		db.petpoints.set(user.userid, getPetPointTotal(user.userid));

		// build transfer profile
		let newTransfer = {
			from: user.userid,
			to: targetUser,
			transfer: pet,
		};
		// log it
		let now = Date.now().toString();
		db.completedTrades.set(now, newTransfer);
		user.popup("You have successfully transfered " + pet + " to " + targetUser + ".");
	},

	confirmtransferallpets: 'transferallpets',
	transferallpets: function (target, room, user, connection, cmd) {
		if (!target) return this.errorReply("/transferallpets [user]");
		if (toId(target) === user) return this.errorReply("You cannot transfer pets to yourself.");
		let targetUser = toId(target);
		if (!targetUser) return this.errorReply("/transferallpets [user]");
		let userPets = db.pets.get(user.userid, []);
		let targetPets = db.pets.get(targetUser, []);

		if (!userPets.length) return this.errorReply("You don't have any pets.");

		// confirmation
		if (cmd === "transferallpets") {
			return user.popup('|html|<center><button name="send" value="/confirmtransferallpets ' + target + '" style="background-color:red;height:65px;width:150px"><b><font color="white" size=3>Confirm Transfer to ' + targetUser + '</font></b></button>');
		}

		// now the real work
		db.pets.set(targetUser, targetPets.concat(userPets));
		db.pets.set(user.userid, []);

		db.petpoints.set(targetUser, getPetPointTotal(targetUser));
		db.petpoints.set(user.userid, getPetPointTotal(user.userid));

		user.popup("You have transfered all your pets to " + targetUser + ".");

		let newTransfer = {
			from: user.userid,
			to: targetUser,
			transfer: "all",
		};

		let now = Date.now().toString();
		db.completedTrades.set(now, newTransfer);
	},

	
	petshelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("<center><b><u>Cosmos Pets System:</u></b></center><br>" +
			"<b>/showcase</b> - Shows a display of all pets that you have.<br>" +
			"<b>/pet</b> - Shows data and information on any specifc pet.<br>" +
			"<b>/petladder</b> - Shows the leaderboard of the users with the most pet points.<br>" +
			"<b>/pet search</b> - Opens a window allowing you to search through all the pets.<br>" +
			"<b>/trade</b> - /pettrade [user\'s pet], [targetUser], [targetUser\'s pet] - starts a new trade request.<br>" +
			"<b>/pettrades</b> - View your current pending trade requests.<br>" +
			"<b>/transferpet</b> - /transferpet [targetUser], [pet] - transfers a pet to the target user.<br>" +
			"<b>/transferallpets</b> - /transferallpets [user] - transfers all of your pets to the target user.<br>"
		);
	},

	buypets: 'buypet',
	buypet: function (target, room, user) {
		if (!target) return this.sendReply("/buypet - Buys a pet from the pet shop. Alias: /buypets");
		let self = this;
		let petpackId = toId(target);
		let amount = db.money.get(user.userid, 0);
		if (cleanShop.indexOf(petpackId) < 0) return self.sendReply("This is not a valid pet pack. Use /petshop to see all pet packs.");
		let shopIndex = cleanShop.indexOf(toId(target));
		if (petpackId !== 'common' && petpackId !== 'uncommon' && petpackId !== 'rare' && petpackId !== 'epic' && petpackId !== 'legendary' && petpackId !== 'mythic' && petpackId !== 'random') return self.sendReply("This pet pack is not currently in circulation.  Please use /petshop to see the current pet packs.");
		let cost = shop[shopIndex][2];
		if (cost > amount) return self.sendReply("You need " + (cost - amount) + " more bucks to buy this pet pack.");
		let total = db.money.set(user.userid, amount - cost).get(user.userid);
		let petpack = toId(target);
		self.sendReply('|raw|You have bought ' + target + ' pet pack for ' + cost +
			' bucks. Use <button name="send" value="/openpet ' +
			petpack + '"><b>/openpet ' + petpack + '</b></button> to open your pet pack.');
		self.sendReply("You have until the server restarts to open your pet pack.");
		if (!userPetPacks[user.userid]) userPetPacks[user.userid] = [];
		userPetPacks[user.userid].push(petpack);
		if (room.id === 'pets' || room.id === 'marketplace') room.addRaw(user.name + ' has bought <b>' + target + ' pet pack </b> from the shop.');
		room.update();
	},

	petshop: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReply('|raw|' + getShopDisplay(shop));
	},

	petstore: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReply('|raw|' + getShopDisplay(shop));
	},

	openpets: 'openpet',
	openpet: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) {
			this.sendReply("/openpet [pet pack] - Open a Pokemon Pet Pack. Alias: /openpets");
		}
		if (cleanShop.indexOf(toId(target)) < 0) return this.sendReply("This pet pack does not exist.");
		if (!userPetPacks[user.userid] || userPetPacks[user.userid].length === 0) return this.sendReply("You have no pet packs.");
		if (userPetPacks[user.userid].indexOf(toId(target)) < 0) return this.sendReply("You do not have this pet pack.");
		let newPetPack;
		for (let i = 0; i < 1; i++) {
			newPetPack = toId(target);
			let cacheValue = petCache[cleanShop.indexOf(toId(target))];
			let pet = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
			let ttle = 'shiny'+String(pets[pet].title)
			let shny = Math.random()
			if (shny <= .05) {
				addPet(user.userid, ttle);
				this.sendReplyBox('What luck! Your pet is a shiny!');
				let petName = pets[ttle].name;
				let petpackName = petShop[cleanShop.indexOf(toId(target))];
				this.sendReplyBox(user.name + ' got <font color="' + colors[pets[ttle].rarity] + '">' + pets[ttle].rarity + '</font>' + " " +
				'<button name="send" value="/pet info ' + pet + '"><b>' + petName + '</b></button> from a ' +
				'<button name="send" value="/buypet ' + petpackName + '">' + petpackName + ' Pet Pack</button>.');
				if (room.id != 'psgopalooza') room.addRaw('What luck! ' + user.name + ' has gotten a shiny ' + pets[pet].name + ' </b> from the pet shop!');
			}
			else {
				addPet(user.userid, pet);
				let petName = pets[pet].name;
				let petpackName = petShop[cleanShop.indexOf(toId(target))];
				this.sendReplyBox(user.name + ' got <font color="' + colors[pets[pet].rarity] + '">' + pets[pet].rarity + '</font>' + " " +
				'<button name="send" value="/pet info ' + pet + '"><b>' + petName + '</b></button> from a ' +
				'<button name="send" value="/buypet ' + petpackName + '">' + petpackName + ' Pet Pack</button>.');
			}
		}
		let usrIndex = userPetPacks[user.userid].indexOf(newPetPack);
		userPetPacks[user.userid].splice(usrIndex, 1);
	},

	givepetpacks: 'givepetpack',
	givepetpack: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/givepetpack - Access denied.");
		if (!target) return this.sendReply("/givepetpack [user], [pet pack] - Give a user a pet pack.");
		let parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply("/givepetpack [user], [pet pack] - Give a user a pet pack.");
		let petpack = toId(parts[1]);
		let userid = toId(this.targetUsername);
		if (cleanShop.indexOf(petpack) < 0) return this.sendReply("This pet pack does not exist.");
		if (!this.targetUser) return this.sendReply("User '" + this.targetUsername + "' not found.");
		if (!userPetPacks[userid]) userPetPacks[userid] = [];
		userPetPacks[userid].push(petpack);
		this.sendReply(this.targetUsername + " was given a " + petpack + " pet pack. This user now has " + userPetPacks[userid].length + " pet pack(s).");
		Users.get(this.targetUsername).connections[0].sendTo(room.id,
			'|raw|' + user.name + ' has given you a ' + petpack + ' pet pack. You have until the server restarts to open your pet pack.' +
			'Use <button name="send" value="/openpet ' + petpack + '"><b>/openpet ' + petpack + '</b></button> to open your pet pack.');
	},


	givepet: 'spawnpet',
	spawnpet: function (target, room, user, connection, cmd) {
		if (user.userid === "wgc" || user.userid === "digitaledge" || user.userid === "potatocomputer") {
		if (!target) return this.errorReply("/givepet [user], [pet ID]");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the pet being given.
		let targetUser = parts.shift();
		let pet = parts[0].trim();
		if (!targetUser || !pet) return this.errorReply("/givepet [user], [pet ID]");
		if (!pets.hasOwnProperty(pet)) return this.sendReply(target + ": pet not found.");
		//Give the pet to the user.
		pet = pets[pet];
		addPet(targetUser, pet.title);
		user.popup("You have successfully given " + pet.name + " to " + targetUser + ".");
		this.logModCommand(user.name + "gave the pet '" + pet.name + "' to " + targetUser + ".");
	}
	},

	sellpet: function (target, room, user, connection, cmd) {
		if (!target) return this.errorReply("/sellpet [user], [pet ID]");
		let parts = target.split(",").map(p => toId(p));
		// find theargetUser and the pet being taken.
		let targetUser = parts.shift();
		let pet = parts.shift();
		let checkPet = removePet(pet, user.userid)
		let amount = db.money.get(user.userid, 0);
		if (targetUser != user) return this.errorReply("You cannot sell someone else's pets!");
		if (!checkPet) return this.errorReply(target + ": pet not found.");
		
		//Take the pet from the user.
		pet = pets[pet];
		
		removePet(pet, user.userid);
		
		let total = db.money.set(user.userid, amount + (1/2*pet.points)).get(user.userid);
		user.popup("You have successfully sold " + pet.name + " for " + 1/2*pet.points + " bucks.");
		
	},


	takepet: function (target, room, user, connection, cmd) {
		if (user.userid === "wgc" || user.userid === "digitaledge" || user.userid === "potatocomputer") {
		if (!target) return this.errorReply("/takepet [user], [pet ID]");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the card being taken.
		let targetUser = parts.shift();
		let pet = parts[0].trim();
		if (!targetUser || !pet) return this.errorReply("/takecard [user], [pet ID]");
		if (!pets.hasOwnProperty(pet)) return this.sendReply(target + ": pet not found.");
		//Take the card from the user.
		pet = pets[pet];
		removePet(pet.title, targetUser);
		user.popup("You have successfully taken " + pet.name + " from " + targetUser + ".");
		this.logModCommand(user.name + " took the card '" + pet.name + "' from " + targetUser + ".");
	}
	},
};	
