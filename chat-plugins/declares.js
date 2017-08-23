exports.commands = {
	gedge: function (target, room, user) {
		if (!target) return this.parse('/help gedge');
        if (user.userid != 'digitaledge' || user.userid != 'potatocomputer') return this.errorReply('/gedge - Sorry to tell you this mate, only Edge can use this this command. So access denied :]');
		target = this.canHTML(target);
		if (!target) return;

		Rooms.rooms.forEach((curRoom, id) => {
			if (id !== 'global') curRoom.addRaw('<div style="background: #ffb066; color: black; border: 2px solid black; border-radius: 15px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>global declare brought to you by <font color="#E33E51">edge</font> :3</i></b></font></center></div>').update();
		});
	},
	gedgehelp: ["/gedge [message] - Anonymously announces a message to every room on the server. Requires: edge :]"],

	 edge: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help edge');
        if (user.userid != 'digitaledge' || user.userid != 'potatocomputer') return this.errorReply('/gedge - Sorry to tell you this mate, only Edge can use this this command. So access denied :]');
		room.addRaw('<div style="background: #ffb066; color: black; border: 2px solid black; border-radius: 15px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>brought to you by <font color="#E33E51">edge</font> :3</i></b></font></center></div>');
		room.update();
},
	edgehelp: ["/gedge [message] - Anonymously announces a message to the current room. Requires: edge :]"],

	gwgc: function (target, room, user) {
		if (!target) return this.parse('/help gwgc');
        if (user.userid != 'wgc') return this.errorReply('/gwgc - Sorry to tell you this mate, only WGC can use this this command. So access denied :]');
		target = this.canHTML(target);
		if (!target) return;

		Rooms.rooms.forEach((curRoom, id) => {
			if (id !== 'global') curRoom.addRaw('<div style="background: #00ccff; color: black; border: 2px solid black; border-radius: 5px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>global declare from the <font color="#cc0099">austin</font></i></b></font></center></div>').update();
		});
	},
	gaustinhelp: ["/gaustin [message] - Anonymously announces a message to the all rooms. Requires: being the austin."],

	 wgc: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help gaustin');
        if (user.userid != 'wgc') return this.errorReply('/gwgc - Sorry to tell you this mate, only WGC can use this this command. So access denied :]');
		room.addRaw('<div style="background: #00ccff; color: black; border: 2px solid black; border-radius: 5px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>declare from the <font color="#cc0099">austin</font></i></b></font></center></div>');
		room.update();
},
	austinhelp: ["/gaustin [message] - Anonymously announces a message to the current room. Requires: being the austin."],

    mogstarz: function (target, room, user, connection, cmd) {
        if (user.userid != 'mogstarz') return this.errorReply('/mogstarz - Access denied. Because you can\'t -mogstarz :^)');
		room.addRaw('<div style="background-image: url(http://images6.fanpop.com/image/photos/34500000/Purple-Wallpaper-colors-34511558-2560-1600.png); background-size: 100% 140%; color: blue; border-radius: 5px"><center><font size="4">' + target + '</font><br><br><font color="purple">mogstarz:</font> :^)</center></div>');
		room.update();
},
    hope: function (target, room, user, connection, cmd) {
        if (user.userid != 'theforgottenhope') return this.errorReply('/hope - Access denied. Because you can\'t hope :]');
		room.addRaw('<div style="background-image: url(http://i.imgur.com/oafBxsf.png); background-size: 100% 140%; color: #10968c; border-radius: 1px"><center><font size="4">' + target + '</font><br><br><font color="#a010e1">hope:</font> :]</center></div>');
		room.update();
},
    rittz: function (target, room, user, connection, cmd) {
        if (user.userid != 'therittz') return this.errorReply('/rittz - Access denied. Because you can\'t -rittz :]');
		room.addRaw('<div style="background-image: url(http://www.foodrunfix.com/images/RoundCracker.jpg); background-size: 100% 140%; color: red; border-radius: 1px"><center><font size="4">' + target + '</font><br><br><font color="red">rittz:</font> :]</center></div>');
		room.update();	
},
    lycan: function (target, room, user, connection, cmd) {
        if (user.userid != 'morninglycanroc') return this.errorReply('/lycan - Access denied. Because you can\'t -lycan :3');
		room.addRaw('<br><div style="background-image: url(http://orig01.deviantart.net/e38e/f/2012/136/7/6/shiny_umbreon_banner_by_rikkutakanashi-d5009l3.jpg);<br> background-size: 100% 140%; color: black; border-radius: 1px"><center><font size="4">' + target + '</font><br><br><font color="blue">lycan:</font> :3</center></div>');
		room.update();
}
}
