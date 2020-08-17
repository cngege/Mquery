//let $ = getShareData("_Mquery");
//by：CNGEGE

let formdata = {};																//表单事件存储
let playerlist = [];
let _$ = (a,b)=>{return new Mquery(a,b)};

setShareData("_Mquery",_$);

let Mquery = function (a,b){
	let data = [];
	let type = "";	//player or event
	if(typeof a == "string"){
		if(a.substring(0,1) == "#"){											//参数字符串以 # 开头
			data[0] = a.replace("#","");
			type = "event";
			this.key = data[0];
		}else{																	//否则参数代表的是玩家名称或UUID
			if(_$.isuuid(a)){
				data[0] = _$.json(selectPlayer(a)).playername;
				data[1] = a;
			}else{
				data[0] = a;
				data[1] = _$.nametouuid(a);
			}
			type = "player";
			this.playername = data[0];
			this.uuid = data[1];
		}
	}else{throw new Error("MQuert参数不能接受非法值")}
	this.type = type;
	
	
	
	this.BListener = (type)=>{													//注册事件前监听器 type:set/get/del
		if(typeof type == "function"){
			setBeforeActListener(data[0],type);
		}else if(type == "get"){
			return getBeforeActListener(data[0]);
		}else if(type == "del"){
			return removeBeforeActListener(data[0]);
		}
	}
	this.AListener = (type)=>{													//注册事件后监听器 type:set/get/del
		if(typeof type == "function"){
			setAfterActListener(data[0],type);
		}else if(type == "get"){
			return getAfterActListener(data[0]);
		}else if(type == "del"){
			return removeAfterActListener(data[0]);
		}
	}
	this.reName = (newname)=>reNameByUuid(data[1],newname);
	this.getPAB = ()=>{															//读取玩家能力表
		return _$.json(getPlayerAbilities(data[1]));
	}
	//$("8f976e22-78bc-3fe1-8ee5-cf5ff56347b9").setPAB({"opencontainers": false});
	this.setPAB = (ab)=>{														//设置玩家能力表
		return (typeof ab == "object")?setPlayerAbilities(data[1],_$.jsonStr(ab)):setPlayerAbilities(data[1],ab);
	}
	this.getPAT = ()=>{															//读取玩家属性表
		return _$.json(getPlayerAttributes(data[1]));
	}
	//$("8f976e22-78bc-3fe1-8ee5-cf5ff56347b9").setPAT({"attack_damage": 9999});
	this.setPAT = (ab)=>{														//设置玩家临时属性表
		return (typeof ab == "object")?setPlayerTempAttributes(data[1],_$.jsonStr(ab)):setPlayerTempAttributes(data[1],ab);
	}
	
	this.getPMAT = ()=>{														//读取玩家属性上限表
		return _$.json(getPlayerMaxAttributes(data[1]));
	}
	//$("8f976e22-78bc-3fe1-8ee5-cf5ff56347b9").setPMAT({"maxhealth": 200});
	this.setPMAT = (ab)=>{														//设置玩家属性上限表
		return (typeof ab == "object")?setPlayerMaxAttributes(data[1],_$.jsonStr(ab)):setPlayerMaxAttributes(data[1],ab);
	}
	this.getPItem = ()=>{														//获取玩家背包物品 包括末影箱
		return _$.json(getPlayerItems(data[1]));
	}
	this.setPItem = (ab)=>{														//设置玩家背包物品 包括末影箱
		return (typeof ab == "object")?setPlayerItems(data[1],_$.jsonStr(ab)):setPlayerItems(data[1],ab);
	}
	this.getPSItem = ()=>{														//获取玩家选择物品
		return _$.json(getPlayerSelectedItem(data[1]));
	}
	
	this.AddPI = (id,aux,count)=>{												//给玩家物品
		if(typeof id == "number"){
			return addPlayerItem(data[1],id,aux,count);
		}else if(typeof id == "object"){
			return addPlayerItemEx(data[1],_$.jsonStr(id));
		}else{
			return addPlayerItemEx(data[1],id);
		}
	}
	this.getPEff = ()=>{														//获取玩家的药水效果
		return _$.json(getPlayerEffects(data[1]));
	}
	this.setPEff = (ab)=>{														//设置玩家的药水效果
		return (typeof ab == "object")?setPlayerEffects(data[1],_$.jsonStr(ab)):setPlayerEffects(data[1],ab);
	}
	
	this.setPBB = (title,b)=>{													//设置玩家自定义Boos血条
		return setPlayerBossBar(data[1],title,b);
	}
	this.delPBB = ()=>{															//清除玩家自定义血条
		return removePlayerBossBar(data[1]);
	}
	this.setPS = (title,ab)=>{													//设置玩家侧边计分板
		return (typeof ab == "object")?setPlayerSidebar(data[1],title,_$.jsonStr(ab)):setPlayerSidebar(data[1],title,ab);
	}
	this.delPS = ()=>{															//清除玩家侧边计分板
		return removePlayerSidebar(data[1]);
	}
	
	this.getPPAG = ()=>{														//读取玩家权限和模式
		return _$.json(getPlayerPermissionAndGametype(data[1]));
	}
	this.setPPAG = (ab)=>{														//设置玩家权限或模式
		return (typeof ab == "object")?setPlayerPermissionAndGametype(data[1],_$.jsonStr(ab)):setPlayerPermissionAndGametype(data[1],ab);
	}
	this.info = ()=>{															//查询玩家信息
		return _$.json(_$.uncode(selectPlayer(data[1])));
	}
	this.tpserver = (ip,port = 19132)=>{										//传送玩家到其他服务器
		return transferserver(ip,port);
	}
	this.tp = (x,y,z,dim)=>{													//传送玩家到一个位置 或者传送到其他玩家的位置
		if(typeof x == "string"){
			if(!_$.isuuid(x)){
				x = _$.nametouuid(x);
			}
			let playerinfo = _$.json(selectPlayer(x));
			return teleport(data[1],playerinfo.XYZ.x,playerinfo.XYZ.y,playerinfo.XYZ.z,playerinfo.dimensionid);
		}else{
			return teleport(data[1],x,y,z,dim);
		}
	}
	this.talkAs = (t)=>{														//模仿玩家说话
		return talkAs(data[1],t);
	}
	this.cmdAS = (cmd)=>{														//模仿玩家执行指令
		return runcmdAs(data[1],cmd);
	}
//[例] let fid = sendSimpleForm('8f976e22-78bc-3fe1-8ee5-cf5ff56347b9', '致命选项', '请选择：', '["生存","死亡","求助"]')
	this.SForm = (title,content,btn,fun,time = 0)=>{							//发送简单表单
		if(typeof btn == "object"){
			btn = _$.jsonStr(btn);
		}
		let n = sendSimpleForm(data[1],title,content,btn);
		if(n == 0){
			return false;
		}
		formdata[n] = fun;
		if(time != 0){
			_$.timeout(()=>{
				delete formdata[n];
				_$.reform(n);
			},time);
		}
		return true;
	}
	
	this.MForm = (title,content,btn1,btn2,fun,time = 0)=>{						//发送对话框 点击前按钮反馈true,点击后按钮反馈false
		let n = sendModalForm(data[1],title,content,btn1,btn2);
		if(n == 0){
			return false;
		}
		formdata[n] = fun;
		if(time != 0){
			_$.timeout(()=>{
				delete formdata[n];
				_$.reform(n);
			},time);
		}
		return true;
	}
//[例] let fid = sendCustomForm('8f976e22-78bc-3fe1-8ee5-cf5ff56347b9', '{"content":[{"type":"label","text":"这是一个文本标签"},{"placeholder":"水印文本","default":"","type":"input","text":""},{"default":true,"type":"toggle","text":"开关~或许是吧"},{"min":0.0,"max":10.0,"step":2.0,"default":3.0,"type":"slider","text":"游标滑块！？"},{"default":1,"steps":["Step 1","Step 2","Step 3"],"type":"step_slider","text":"矩阵滑块？!"},{"default":1,"options":["Option 1","Option 2","Option 3"],"type":"dropdown","text":"如你所见，下拉框"}], "type":"custom_form","title":"这是一个自定义窗体"}')

	this.CForm = (form,fun,time = 0)=>{											//发送自定义表单
		if(typeof form == "object"){
			form = _$.jsonStr(form);
		}
		let n = sendCustomForm(data[1],form);
		if(n == 0){
			return false;
		}
		formdata[n] = fun;
		if(time != 0){
			_$.timeout(()=>{
				delete formdata[n];
				_$.reform(n);
			},time);
		}
		return true;
	}
	
	this.say = (t)=>{
		let rawtxt = {};
		rawtxt.rawtext = [];
		let text = {};
		text.text = t;
		rawtxt.rawtext.push(text);
		_$.cmd('tellraw ' + '"' + data[0] + '" ' + _$.jsonStr(rawtxt));
	}
}

_$.version = "1.0.2";
_$.isempty = v => v === undefined || v == undefined || v == "undefined" || v == null || v == "null" || v == "";
_$.trim = s => s.replace(/(^\s*)|(\s*$)/g,"");									//去除首位空格

_$.isuuid = s =>{let re = /\w{8}(-\w{4}){3}-\w{12}/;return re.test(s)};
_$.nametouuid=n=>{for(a=0;a<playerlist.length;a++){if(playerlist[a]["playername"]==n){return playerlist[a]["uuid"]}}let Player=JSON.parse(_$.getplayer());playerlist=Player;for(i=0;i<Player.length;i++){if(Player[i]["playername"]==n){return Player[i]["uuid"]}}return null};
_$.json = JSON.parse;															//JSON 反序列化
_$.jsonStr = JSON.stringify														//JSON 序列化为字符串
_$.uncode = unescape;
_$.encode = escape;

_$.read = fileReadAllText;														//读文件
_$.write = (f,t,a = false)=> a ? fileWriteAllText(f,t):fileWriteLine(f,t);		//写文件 f:文件 t:内容 a:是否全部写入/还是追加一行
_$.setcmd = setCommandDescribe;													//注册cmd指令信息
_$.time = TimeNow;																//返回当前时间字符串;
_$.setdata = setShareData;
_$.getdata = getShareData;
_$.deldata = removeShareData;
_$.log = log;																	//写日志到控制台
_$.run = runScript;																//运行脚本
_$.cmd = runcmd;																//运行命令 控制台不回显
_$.getplayer = getOnLinePlayers;												//获取在线玩家列表
_$.setworld = setStructure;														//let r = setStructure(fileReadAllText('data.json'), 0, '{"x":0, "y":4, "z":0}', 0, true, true) 返回是否成功
_$.getworld = getStructure;														//let d = getStructure(0, '{"x":0, "y":4, "z":0}', '{"x":10, "y":14, "z":10}', false, true) //返回JSON字符串
_$.reform = releaseForm;														//丢弃表单


_$.get = (url,data = "",fun = (e)=>{})=>{request(url,"get",data,fun)};			//网络Get请求
_$.post = (url,data = "",fun = (e)=>{})=>{request(url,"post",data,fun)};		//网络post请求

_$.timeout = setTimeout;

_$.iniread = (path,item,key,defvalue) => {
	let file = _$.read(path);
	if(_$.isempty(file)||file.indexOf("\n")==-1){return defvalue}
	let array = file.split("\n");
	for(i=0;i<array.length;i++){
		if(_$.trim(array[i]) == "["+item+"]"){
			for(j=i+1;j<array.length;j++){
				if(_$.trim(array[j])[0] != "["){
					if(_$.isempty(_$.trim(array[j])) || _$.trim(array[j])[0] == ";" || array[j].indexOf("=") == -1){
						continue;
					}else{
						let keyarray = array[j].split("=");
						if(_$.trim(keyarray[0]) == key){
							return _$.trim(keyarray[1]);
						}
					}
				}else{
					return defvalue;
				}
			}
			return defvalue;
		}
	}
	return defvalue;
}

_$.iniwrite = (path,item,key,value)=>{
	let file = _$.read(path);
	if(_$.isempty(file)){
		return _$.write(path,"["+item+"]\n"+key+"="+value,true);
	}else{
		if(file.indexOf("\n")==-1){
			if(_$.trim(file)=="["+item+"]"){
				return _$.write(path,key+"="+value,false);
			}
		}
		let array = file.split("\n");
		for(i=0;i<array.length;i++){
			if(_$.trim(array[i])=="["+item+"]"){
				for(j=i+1;j<array.length;j++){
					if(_$.trim(array[j])[0] != "["){
						if(_$.isempty(_$.trim(array[j])) || _$.trim(array[j])[0] == ";" || array[j].indexOf("=") == -1){
							continue;
						}else if(array[j].indexOf("=") != -1){
							let keyarray = array[j].split("=");
							if(_$.trim(keyarray[0])==key){
								keyarray[1]=value;
								array[j] = keyarray.join("=");
								return _$.write(path,array.join("\n"),true);
							}
						}
					}else{
						array.splice(j,0,key+"="+value);
						return _$.write(path,array.join("\n"),true);
					}
				}
				array.push(key+"="+value);
				return _$.write(path,array.join("\n"),true);
			}
		}
		array.push("["+item+"]",key+"="+value);
		return _$.write(path,array.join("\n"),true);
	}
}



setBeforeActListener("onFormSelect",function(e){
	var je=_$.json(e);
	je.selected = _$.json(je.selected);
	if (typeof formdata[je.formid] == "function"){
		formdata[je.formid](je);
		delete formdata[je.formid];
	}
	return true;
})

/* _$.nametouuid = n =>{
	for(a=0;a<playerlist.length;a++){
		if(playerlist[a]["playername"] == n){
			return playerlist[a]["uuid"];
		}
	}
	
	let Player = JSON.parse(_$.getplayer());
	playerlist = Player;
	for(i=0;i<Player.length;i++){
		if(Player[i]["playername"] == n){
			return Player[i]["uuid"];
		}
	}
	return null
}; */