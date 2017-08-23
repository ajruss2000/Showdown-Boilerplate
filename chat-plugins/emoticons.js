'use strict';

const color = require('../config/color');
let demFeels = function () {};
demFeels.getEmotes = function () {
	return {};
};
try {
	demFeels = require('dem-feels');
} catch (e) {
	console.error(e);
}

exports.parseEmoticons = parseEmoticons;

// for travis build
if (typeof demFeels.extendEmotes === 'function') {
	// example extending emotes
	demFeels.extendEmotes({
	'(ditto)': 'https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/2x',
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'FacePalm': 'http://i.imgur.com/lv3GmpM.png',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'feelsackbr': 'http://i.imgur.com/BzZJedC.jpg',
	'feelsbebop': 'http://i.imgur.com/TDwC3wL.png',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbirb': 'http://i.imgur.com/o4KxmWe.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelsbt': 'http://i.imgur.com/rghiV9b.png',
	'feelschime': 'http://i.imgur.com/uIIBChH.png',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'feelscx': 'http://i.imgur.com/zRSUw2n.gif',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsfdra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsfro': 'http://i.imgur.com/ijJakJT.png',
	'feelsgay': 'http://i.imgur.com/zQAacwu.png',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png',
	'feelshigh': 'http://i.imgur.com/s9I2bxp.jpg?1',
	'feelshlwn': 'http://i.imgur.com/OHMDVNJ.jpg',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsho': 'http://i.imgur.com/J4oUHm2.png?1',
	'feelsilum': 'http://i.imgur.com/CnyGTTD.png',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png?1',
	'feelsjpn': 'http://i.imgur.com/Zz2WrQf.jpg',
	'feelskawaii': 'http://i.imgur.com/kLnDaYD.png', 
	'feelsky': 'http://i.imgur.com/BtATPId.png?1',
	'feelslelouch': 'http://i.imgur.com/qZrV75o.png',
	'feelslot': 'http://i.imgur.com/tl88F7i.png?1',
	'feelslu': 'http://i.imgur.com/REEBSOT.png?1',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsmixtape': 'http://i.imgur.com/7lncwng.png',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsns': 'http://i.imgur.com/jYRFUYW.jpg',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelsorange': 'http://i.imgur.com/3fxXP16.jpg',
	'feelspanda': 'http://i.imgur.com/qi7fue9.png',
	'feelspaul': 'http://imgur.com/KuDZMJR.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelsPika': 'http://i.imgur.com/eoTrTkn.png',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelspoli': 'http://i.imgur.com/FnzhrWa.jpg',
	'feelsPoli': 'http://i.imgur.com/sbKhXZE.jpg',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelsseis': 'http://i.imgur.com/gGGYxrE.png',
	'feelsshi': 'http://i.imgur.com/VzlGZ1M.jpg',
	'feelsslo': 'http://i.imgur.com/iQuToJf.jpg?1',
	'feelssnake': 'http://i.imgur.com/xoJnDUD.png',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'feelsdrg': 'http://i.imgur.com/UZzWcA3.png',
	'feelsvolc': 'http://i.imgur.com/QXlKzZd.png?1',
	'feelsvpn': 'http://i.imgur.com/ODTZISl.gif',
	'feelswin': 'http://i.imgur.com/rbs9pZG.png?1',
	'feelswnk': 'http://i.imgur.com/K1GhJaN.png', 
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'Kappa': 'http://i.imgur.com/ZxRU4z3.png?1',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'MingLee': 'https://static-cdn.jtvnw.net/emoticons/v1/68856/2.0',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'PeoplesChamp': 'http://i.imgur.com/QMiMBKe.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'stevo': 'http://imgur.com/Gid6Zjy.png',
	'thumbsup': 'http://i.imgur.com/eWcFLLn.jpg',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'trumpW': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/2.0',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'xoxo': 'http://orig00.deviantart.net/b49d/f/2014/220/5/3/ichigo_not_impressed_icon_by_magical_icon-d7u92zg.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'yesface': 'http://i.imgur.com/k9YCF6K.png',
	'youdontsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'gudone': 'http://i.imgur.com/USkp1b9.png',
	'feelsfloat': 'http://i.imgur.com/XKP1Kpf.gif',
	'feelsarken': 'http://i.imgur.com/YCCDZWq.png',
	'feelsfun': 'http://imgur.com/47aAUMf.png',
	'feelsev': 'http://a.deviantart.net/avatars/b/e/bestusernameever1.gif?4',
	'feelssyl': 'http://orig12.deviantart.net/1171/f/2013/104/9/3/iaza19412987157700_by_tldraco_ful-d61or0c.gif',
	'feelsfl': 'http://orig14.deviantart.net/a05e/f/2016/121/c/e/finsihed_flareon_lick_by_sydneykoren-da0yz5e.gif',
	'feelsalt': 'http://pixelart.virtualslayer.net/albums/userpics/10001/thumb_334_N0_Altaria.png',
	'feelsshinx': 'http://a.deviantart.net/avatars/s/i/silentnightninja.gif?2',
	'feelsjolt': 'http://orig15.deviantart.net/d7b8/f/2011/355/c/b/free_jolteon_lick_icon_by_supersilverabsol-d4ju665.gif',
	'feelschu': 'http://orig13.deviantart.net/2bc9/f/2013/119/a/3/spiky_eared_pichu_lick_icon_commission_by_poke_lover88-d63htrw.gif',
	'fukya': 'http://i.imgur.com/WPeazU8.gif',
	'feelslitten': 'http://a.deviantart.net/avatars/v/i/vixieblitz.gif?15',
	'feelschar': 'https://cdn.betterttv.net/emote/562b9101a6646e202bcc5447/2x',
	'feelssquirt': 'http://orig10.deviantart.net/fc37/f/2013/293/8/7/squirtle_by_creepydana-d6r9oe8.gif',
	'feelsohnoes': 'http://i.imgur.com/w6zbVkN.png',
	'zaa': 'http://i.imgur.com/POEv3rX.png',
	'feelsvape': 'http://i1341.photobucket.com/albums/o752/Ra_Bertumen/vaporeon_zpsc56153aa.png',
	'feelsmuffet': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh20wovaljO2IIENCn2xcNWwG2EftJQvLjH868gwgzrSUIegQXYw',
	'feelssans': 'http://vignette2.wikia.nocookie.net/deathbattlefanon/images/6/6a/Sans.jpg/revision/latest?cb=20160417013108',
	'feelsbadtime': 'http://i.imgur.com/UmyYlsF.png',
	'feelsvegito': 'http://orig02.deviantart.net/f5d9/f/2015/015/5/3/vegito__by_dbheroes-d8e11lt.png',
	'feelsgenji': 'http://vignette2.wikia.nocookie.net/overwatch/images/0/04/Genji_portrait.png/revision/latest?cb=20160429040512',
	'feelsgrump': 'http://pre02.deviantart.net/25ea/th/pre/f/2013/005/5/f/arin_grump_vector_by_hudgeba778-d5qll1c.png ',
	'feelsnsgrump': 'http://orig03.deviantart.net/413a/f/2013/295/c/d/danny_with_jon_s_hat_by_keno9988-d6rhf90.png',
	'feelsjsrs': 'https://s-media-cache-ak0.pinimg.com/236x/84/08/d4/8408d470287361c4ffa1c9e14c105260.jpg',
	'feelspoak': 'http://i.imgur.com/jElHTOv.png',
	'feelsls': 'http://vignette1.wikia.nocookie.net/archiesonic/images/1/10/Knuckles_232.jpg/revision/latest?cb=20120823055404',
	'feelsskep': 'http://www.relatably.com/m/img/skeptical-third-world-meme-origin/the-best-of-the-skeptical-3rd-world-kid-meme.jpg',
	'feelspbs': 'http://i.imgur.com/zU28MVJ.gif',
	'feelslati': 'http://orig13.deviantart.net/aec7/f/2010/326/8/8/latias_licking_screen_by_rubythelatias-d33cvii.gif',
	'feelshs': 'http://i.imgur.com/m9ndumS.png',
	'kowens': 'http://images.sportsworldnews.com/data/thumbs/full/21904/600/0/0/0/kevin-owens.jpg',
	'llamarawr':'http://i.imgur.com/KWAQbPu.gif',
	'wAt':'https://imgflip.com/s/meme/Black-Girl-Wat.jpg',
	'llamacool':'http://i.imgur.com/X1x3728.gif',
	'Orly':'http://vignette3.wikia.nocookie.net/uncyclopedia/images/4/4a/Orly_owl.jpg/revision/latest?cb=20051112001744',
	'oshayep':'http://orig13.deviantart.net/63e7/f/2014/287/b/0/oshawott_agrees_plz_by_whatiget4beinganerd-d82v0f0.gif',
	'feelsgod':'http://i.imgur.com/NTyNMmk.gif',
	'llamanv':'http://i.imgur.com/9PgUk4M.gif',
	'feelsgrr':'https://pbs.twimg.com/profile_images/740671171021115392/eF7LcyPb_400x400.jpg',
	'fgrat':'http://www.gifbin.com/bin/072011/reverse-1313397701_big_fish_vs_small_fish.gif',
	'llamanoodle':'http://i.imgur.com/SUZkz5p.gif',
	'feelsllama':'http://i.imgur.com/oSLSk2I.gif',
	'llamayawn':'http://i.imgur.com/SVj8kBt.gif',
	'feelscute':'https://s-media-cache-ak0.pinimg.com/originals/02/c2/e9/02c2e9d6c6b7eaa127cd6df667811ec0.jpg',
	'oshacry':'http://orig00.deviantart.net/4753/f/2014/299/3/1/oshawott_cry_plz_by_whatiget4beinganerd-d84a2ea.gif',
	'arceuskarp':'http://i.imgur.com/eUTfPqp.jpg',
	'llamatea':'http://i.imgur.com/nJnakEU.gif',
	'feelsdoom':'http://i326.photobucket.com/albums/k418/kayahtic/Houndoom.gif',
	'feelsgen':'http://cdn.bulbagarden.net/upload/thumb/c/c6/094Gengar.png/250px-094Gengar.png',
	'feelsmgen':'https://img.pokemondb.net/artwork/gengar-mega.jpg ',
	'feelsboney':'http://65.media.tumblr.com/b82898d5120a7b5757eafc241becfeff/tumblr_mzp9lkFRlV1rrqkwqo1_500.png',
	'feelsam':'http://i.imgur.com/qugCLvB.png',
	'feelspclo':'http://48palw1jqfwf1zkjitvyccc1.wpengine.netdna-cdn.com/wp-content/uploads/2015/08/Piccolo2.jpg',
	'feelssmm':'https://pbs.twimg.com/profile_images/464580457003102208/nNcp2I8v_400x400.png',
	'feelswild':'http://i.imgur.com/hiJDUey.gif',
	'imslimshady':'https://40.media.tumblr.com/adbcc98351874eb6d372d3602e9ce055/tumblr_nvjksd3Ev41ufnh57o1_1280.jpg',
	'datboi':'http://vignette4.wikia.nocookie.net/clubpenguin/images/b/b3/MediaWiki_Emoticons_-_datboi.gif/revision/latest?cb=20160516033125',
	'feelsedge':'http://67.media.tumblr.com/30757d6b6367f74661a4f8d848301bfd/tumblr_inline_mgr5x5KVAI1qcqwuv.gif',
	'llamadance':'http://s3.picofile.com/file/8227910476/llama_emoji_46_this_and_that_by_jerikuto_d6uwuve.gif',
	'llamaedge':'http://www.zupimages.net/up/15/46/z47u.gif',
	'llamacringe':'http://media.tumblr.com/b2d76be3d922449b1bfeef62d9386629/tumblr_inline_mrw41pSlaD1qz4rgp.gif',
	'llamamad':'https://i.imgur.com/nFUoUQn.gif',
	'dinotongue':'http://imgur.com/YRFPwsx.gif',
	'feelsbursting':'http://imgur.com/cM9DIAo.gif',
	'feelsperfect':'http://imgur.com/g4SUXAm.gif',
	'feelsac':'http://showdownsubserver-austin0602.c9users.io/avatars/theforgottenhope.png',
	'hulktrump':'http://i.imgur.com/Z7EFxXv.gif',
	'feelstrump':'http://i.imgur.com/QoRFD18.gif',
	'trumpzilla':'http://i.imgur.com/7HiEAZS.jpg',
	'feelsumb':'http://orig14.deviantart.net/52e6/f/2010/127/9/b/umbreon_lick_avatar_by_mythicazurel.gif',
	'feelsesp':'http://a.deviantart.net/avatars/s/u/sunsetespeon.gif?4',
	'Dolan':'https://pbs.twimg.com/profile_images/559166887968260096/e-SnfdE1_400x400.jpeg',
	'feelsleaf':'http://i.neoseeker.com/mg/895/103/leafeon_lick_by_fennekveed2xww6x_thumb.gif',
	'feelsglac':'http://orig03.deviantart.net/8f38/f/2011/187/6/8/free_glaceon_lick_icon_by_supersilverabsol-d3l5esi.gif',
	'feelsbayo':'https://media.giphy.com/media/34HAuzYslsHVm/giphy.gif',
	'feelsslime':'http://i1231.photobucket.com/albums/ee503/KingZenithDen/TaggingSlime.gif',
	'feelscamilla':'https://media.giphy.com/media/ac4fuIYVNBCrm/giphy.gif',
	'feelsmudkip':'https://media.giphy.com/media/O64MQsdmwIIxO/giphy.gif',
	'llamahello':'http://i.imgur.com/6iXGZs7.gif',
	'feelsmew':'http://i0.kym-cdn.com/photos/images/masonry/000/093/476/Mew_lick_avatar_by_MythicAzurel20110725-22047-2wuksy.gif',
	'feelsskymin':'http://rs1299.pbsrc.com/albums/ag78/Mioami/Lick%20Icons/Skymin_Free_Lick_Avatar_by_Yakalentos_zps81bd5ac6.gif~c200',
	'feelspikachu': 'http://i3.kym-cdn.com/photos/images/masonry/000/093/494/my_pikachu_lick_avatar_by_pdmantsunakajaike-d366tmo20110725-22047-zx13dv.gif',
  	  'feelswednesday': 'https://media.tenor.co/images/cfeb7a77e287d674d56d4706dcaeab1c/raw',
    	'feelslatias': 'http://a.deviantart.net/avatars/f/e/ferretlover22717.gif?3',
    	'feelsliep': 'http://rs1299.pbsrc.com/albums/ag78/Mioamis/liepard_lick_icon_by_mushydog-d3h8rk7_zps3d822e5b.gif~c200',
	'feelsgeneral': 'http://rs185.pbsrc.com/albums/x259/battleshinja12/Animated/GeneralSword.gif~c200',
	'bardtrain': 'http://vignette3.wikia.nocookie.net/fireemblem/images/0/0e/Nils_battle_animation.gif/revision/latest?cb=20150919014728',
  	  'feelsjaffar': 'http://www.abrhsvisualarts.com/webdesign/spring15web1/fire_emblem/images/jaffar_critical.gif',
   	 'feelslute': 'http://www.feplanet.net/media/sprites/8/battle/animations/ally/critical/lute_sage_magic.gif',
  	  'Boi':'http://i.makeagif.com/media/10-26-2015/txa6Ph.gif',
  	  'feelspew':'http://i.imgur.com/fWUABw3.png',
   	 'mimikyubouncy':'https://67.media.tumblr.com/9fdb8c55c499739a9fcd4dbe30913e74/tumblr_oakxq29jzY1rg5zovo1_500.gif',
 	   'waithmm':'https://67.media.tumblr.com/d5db40f26fc42c616f60e2b00108de3e/tumblr_oaor6dBHBS1uv7j1fo1_400.gif',
 	   'feelssilvally':'http://66.media.tumblr.com/0153566329bbaaab4ce4fd3c58822a37/tumblr_ofbuj1dOD11u32314o1_1280.gif',
  	  'feelsjumpscare':'http://i.imgur.com/QJQvfT1.gif',
  	  'feelsfu':'https://s-media-cache-ak0.pinimg.com/564x/3b/55/93/3b5593f1824a05e21ab0956430202190.jpg',
 	   'feelsalright':'http://s1.favim.com/610/150815/aesthetic-ariana-ariana-grande-cute-Favim.com-3122061.jpg',
 	   'feelsknife':'http://s6.favim.com/orig/150809/aesthetic-ariana-ariana-grande-funny-Favim.com-3089226.jpg',
 	   'feelslele':'http://66.media.tumblr.com/39a67416c80d494931a63e4a8ecbf5cc/tumblr_ofqh95smRb1v68t0mo1_400.gif',
 	   'feelsbulu':'http://66.media.tumblr.com/ec4882b22d476c8201223189460289cd/tumblr_ofqh95smRb1v68t0mo2_400.gif',
 	   'pepekoko':'https://66.media.tumblr.com/e456e232a230f52b40babe457ccbb9ea/tumblr_ofq4m3fTO91tih2rro1_500.png',
  	  'feelsfini':'http://66.media.tumblr.com/ed7268315ee7f3ac698a5eeba8d13280/tumblr_ofqh95smRb1v68t0mo3_400.gif',
  	  'feelskoko':'https://66.media.tumblr.com/7608fca3c9675e26230b62e9617ff8d0/tumblr_ofqeazsOR01r8sc3ro1_400.gif',
	 'yaboiguzma':'http://i2.kym-cdn.com/photos/images/newsfeed/001/157/939/401.gif',
   	 'feelsedgy':'https://66.media.tumblr.com/e019d7a035636ef9256bcccdfa914474/tumblr_od3p2daC6w1rux4bno1_540.gif',
  	  'feelslillie':'http://i2.kym-cdn.com/photos/images/newsfeed/001/129/874/c55.gif',
  	  'feelslusamine':'http://67.media.tumblr.com/1a38ecd2c446636048aacb147d305ee9/tumblr_od62ppGQjp1uq3bnuo1_500.gif',
  	  'feelsmchrg':'http://imgur.com/0R2ameG.png',
   	 'rollsafe':'http://i.imgur.com/HvBkiCe.png?1',
  	  'gudsht':'http://i.imgur.com/R9SO76u.png?1',
 	   'Boii': 'http://i.imgur.com/6P0uPtV.jpg',
   	 'feelsThumb':'http://i.imgur.com/dAU1hZP.png',
   	 'gUd':'http://a.deviantart.net/avatars/i/d/idubbbzplz.png',
   	 'hUh':'http://i.imgur.com/1ezMM9j.gif',
  	  'feelsfeel':'http://i.imgur.com/s8kN3AV.png',
  	  'feelsweird':'https://cdn.betterttv.net/emote/5603731ce5fc5eff1de93229/2x',
  	  'feelschiaki':'http://pa1.narvii.com/5951/e3580321d1a8b4bf19a922ebcc2f6e756c920f93_hq.gif',
  	  'feelsToGood':'http://i.imgur.com/87zXwfR.png',
  	  'feelstrig':'http://i.imgur.com/NOwS64t.png',
 	   'feelsmmyea':'https://cdn.betterttv.net/emote/562bf1bec6035e430db80824/2x',
	});
}

const emotes = demFeels.getEmotes();

const emotesKeys = Object.keys(emotes).sort();

/**
* Parse emoticons in message.
*
* @param {String} message
* @param {Object} room
* @param {Object} user
* @param {Boolean} pm - returns a string if it is in private messages
* @returns {Boolean|String}
*/
function parseEmoticons(message, room, user, pm) {
	if (typeof message !== 'string' || (!pm && room.disableEmoticons)) return false;

	let match = false;
	let len = emotesKeys.length;

	while (len--) {
		if (message && message.indexOf(emotesKeys[len]) >= 0) {
			match = true;
			break;
		}
	}

	if (!match) return false;

	// escape HTML
	message = Chat.escapeHTML(message);

	// add emotes
	message = demFeels(message);

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

	let group = user.getIdentity().charAt(0);
	if (room && room.auth) group = room.auth[user.userid] || group;
	if (pm && !user.hiding) group = user.group;

	if (pm) return "<div class='chat' style='display:inline'>" + "<em class='mine'>" + message + "</em></div>";

	let style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";
	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + color(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";

	room.addRaw(message);

	room.update();

	return true;
}

/**
* Create a two column table listing emoticons.
*
* @return {String} emotes table
*/
function create_table() {
	let emotes_name = Object.keys(emotes);
	let emotes_list = [];
	let emotes_group_list = [];
	let len = emotes_name.length;

	for (let i = 0; i < len; i++) {
		emotes_list.push("<td style='padding: 5px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5) inset; border-radius: 5px;'>" + "<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' style='vertical-align: middle;  padding-right: 5px;' />" + emotes_name[i] + "</td>");
	}

	for (let i = 0; i < len; i += 4) {
		let emoteOutput = [emotes_list[i], emotes_list[i + 1], emotes_list[i + 2], emotes_list[i + 3]];
		if (i < len) emotes_group_list.push("<tr>" + emoteOutput.join('') + "</tr>");
	}

	return (
		"<div class='infobox'><center><font style='font-weight: bold; text-decoration: underline; color: #555;'>List of Emoticons</font></center>" +
		"<div style='max-height: 300px; overflow-y: scroll; padding: 5px 0px;'><table style='background: rgba(245, 245, 245, 0.4); border: 1px solid #BBB;' width='100%'>" +
		emotes_group_list.join("") +
		"</table></div></div>"
	);
}

let emotes_table = create_table();

exports.commands = {
	blockemote: 'blockemoticons',
	blockemotes: 'blockemoticons',
	blockemoticon: 'blockemoticons',
	blockemoticons: function (target, room, user) {
		if (user.blockEmoticons === (target || true)) return this.sendReply("You are already blocking emoticons in private messages! To unblock, use /unblockemoticons");
		user.blockEmoticons = true;
		return this.sendReply("You are now blocking emoticons in private messages.");
	},
	blockemoticonshelp: ["/blockemoticons - Blocks emoticons in private messages. Unblock them with /unblockemoticons."],

	unblockemote: 'unblockemoticons',
	unblockemotes: 'unblockemoticons',
	unblockemoticon: 'unblockemoticons',
	unblockemoticons: function (target, room, user) {
		if (!user.blockEmoticons) return this.sendReply("You are not blocking emoticons in private messages! To block, use /blockemoticons");
		user.blockEmoticons = false;
		return this.sendReply("You are no longer blocking emoticons in private messages.");
	},
	unblockemoticonshelp: ["/unblockemoticons - Unblocks emoticons in private messages. Block them with /blockemoticons."],

	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return false;
		room.disableEmoticons = !room.disableEmoticons;
		this.sendReply("Disallowing emoticons is set to " + room.disableEmoticons + " in this room.");
		if (room.disableEmoticons) {
			this.add("|raw|<div class=\"broadcast-red\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],

	rande: 'randemote',
	randemote: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let rng = Math.floor(Math.random() * emotesKeys.length);
		let randomEmote = emotesKeys[rng];
		this.sendReplyBox("<img src='" + emotes[randomEmote] + "' title='" + randomEmote + "' height='50' width='50' />");
	},
	randemotehelp: ["/randemote - Get a random emote."],
};
