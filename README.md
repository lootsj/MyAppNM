# MyAppNM

net core 2 and agular instructions: 
.net core 2 installation. 
Make sure you have .NET Core 2.0 installed and/or VS2017 15.3. VS2017 will automatically install all the neccessary npm & .NET dependencies when you open the project.
https://blogs.msdn.microsoft.com/benjaminperkins/2017/09/20/how-to-install-net-core-2-0/

npm install && npm run build:dev && dotnet restore
next install primeng 
https://www.npmjs.com/package/primeng
npm install primeng --save
"dependencies": {
  //...
  "primeng": "^5.2.0-rc.1",
  "font-awesome": "^4.7.0"
},

"styles": [
  "../node_modules/font-awesome/css/font-awesome.min.css",
  "../node_modules/primeng/resources/themes/omega/theme.css",
  "../node_modules/primeng/resources/primeng.min.css",
  //...
],

After rebuilding everything should be working now. If you have any issues feel free to contact me
