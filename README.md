# Mquery 依赖梦之故里BDSJSRunner的JS前置,仿Jquery


---
本前置脚本并不完善,如果出现无法使用等任何问题,请在[issues][1]提交,提交问题及bug时越详细越有助于早日修复

**使用方法**

 1. 确保你的梦之故里服务端解析安装并可以正常运作,且已安装对应版本的BDSJSRunner.dll
 2. 将JS .Mquery.js移动到 `MCModDllExe\js` 文件夹
 3. 保证你的JS取名安装首字母排列规范不要排到此前置的前面
 4. 在你的JS代码执行之前 先获取前置公开的方法变量`let $ = getShareData("_Mquery");`
 5. 前置的方法具体的使用示例请参考 `example.js` 和 `example.txt` 

**梦之故里**

 - 梦之故里为Win版MinecraftBE官方服务端开服面板及插件注入器的开发团队
 - 本项目主要依靠梦之故里插件注入器或开服面板加载BDSJSRunner插件
 - BDSJSRunner.DLL使用V8引擎将接口公开到js接口,方便动态的控制,修改服务器


**相关地址**

| 标题 | 地址 | 作者 |
| ------ | ------ | ------ |
| ✨BDSJSRunner开源项目 | https://e.coding.net/mzgl/BDSJSRunner.git | 梦之故里 |
| 👍BBDSJSRunner贴 | https://www.minebbs.com/jsrunner/ | 梦之故里 |
| 🐯Win端开服面板贴 | https://www.minebbs.com/resources/win-bds-bds.789/ | 梦之故里 |
| ❤简易插件注入器 | https://www.minebbs.com/resources/1150/ | 梦之故里 |
| 👓如何编写官方服务端插件| https://www.minebbs.com/threads/mc-windows.2560/ | Player |

  [1]: https://github.com/cngege/Mquery/issues