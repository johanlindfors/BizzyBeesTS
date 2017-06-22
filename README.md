#H1 BizzyBees in Typescript and Phaser.io

[Typescript] and [Phaser.io] implementation of the Bizzy Bees game originally created by [Tess Ferrandez].


To try locally on Windows 10 use the following instructions:

Clone repository with:

```
git clone git@github.com:programmeramera/BizzyBeesTS.git
```

Install typescript with a powershell command window:

```
npm install -g typescript
```

Install node to act as a server locally:

```
npm install node-static
```

Change directory into the src directory. Then transpile the typescript files into the js directory served by node:

```
tsc --out ..\bin\js\game.js
```

Change directory back to the root directory of the repo and launch the server:

```
node .\server\server.js
```

Now open your favorite browser and point it to http://localhost:5858

The repository also contains configuration and tasks for [Visual Studio Code].

Bizzy Bees can also be found in these languages/technologies:
+ [BizzyBees in C# and XNA]
+ [BizzyBees in C++ leveraging DirectXTK]

[Tess Ferrandez]: https://blogs.msdn.microsoft.com/tess/
[Phaser.io]: http://phaser.io
[Visual Studio Code]: http://code.visualstudio.com
[Typescript]: http://www.typescriptlang.org
[BizzyBees in C++ leveraging DirectXTK]: https://blogs.msdn.microsoft.com/tess/2014/08/13/bizzy-bees-xna-to-directxdirectxtk-introduction/
[BizzyBees in C# and XNA]: https://blogs.msdn.microsoft.com/tess/2012/03/02/xna-for-windows-phone-walkthroughcreating-the-bizzy-bees-game/