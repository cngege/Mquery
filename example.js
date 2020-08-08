let $ = getShareData("_Mquery");

$.log("example脚本 和 Mquery脚本加载完成");

let block = $("#onUseItem")
block.BListener(e=>{
	e=$.json($.uncode(e));
	if(e.itemname == "木棍"){
		let s = $(e.playername).MForm("这是一个对话框","就是因为你使用了木棍,现在要把你传送到一个未知的地方,知道了吗？","我不怕","我不敢了",e=>{
			if(e.selected != null){
				if(e.selected == true){
					$(e.playername).tp(e.playername);
				}
				else{
					$(e.playername).say("哈哈 不敢了吧")
				}
			}
			else{
				$(e.playername).say("喂喂 你要无视我吗")
			}
		});
	}
})