# ionic-angular-cookies
show how ionic1 or ionic2 support cookies ,and dispaly the log,the server is base on node Express

### story
search internet,many people include me  get answer that ionic don't support cookies authentication,we must use request header instead of cookies.

for my experience,the difficult work is that i can't catch cookie log,so i dont know is't been set in the webview,i write this article show how do i catch cookies log and the server config.I write start-up a server by Express,and build hybrid app by ionic1,the problem is between webview depend on IOS and Android and the way how server set cookies ,I have tested on ios(simulator and  device) and and android(just device) ,both are work very well.

at last,we set up a gateway to set cookies by Nginx,it work good too.

### environment

macOS Sierra 10.12.5

Xcode 8.3.3

node v4.4.3

ionic 2.1.18

cordova 7.0.1
```
Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed Google Inc.:Google APIs:18,android-25,android-24,android-N,android-23,android-19,android-18
Gradle: installed /Applications/Android Studio.app/Contents/gradle/gradle-2.10/bin/gradle

Requirements check results for ios:
Apple OS X: installed darwin
Xcode: installed 8.3.3
ios-deploy: installed 1.9.0
CocoaPods: installed 
 ```
### start-up node server and ionic app

run command below start up node server
```
git clone https://github.com/wangjinyang/ionic-angular-cookies.git

cd nodeServer/

npm i

node ./bin/www
```
then,the server is start up depend on localhost:3000,open your brower

there's two rest api /setCookies--------set cookies to webview

there's two rest api /getCookies--------get cookies value

you can change cookies value in this file 'nodeServer/routes/index.js'

run command below build and run ionic hybrid app on device or simulator

```
cd ionicApp/

npm i
```
run command below to get your computer ip
```
ifconfig
```
find file 'ionicApp/www/app.js' line 28 (var server='http://\[YOUR IP HERE \]:3000'),for example (var server='http://192.168.33.44:3000')

```
ionic state restore

ionic build
```
then,ios and android app is ready

use Xcode open 'ionicApp/platforms/ios/cookies.xcodeproj',run app on simulator

run command below
```
ionic run android

```
run the app on android device

### how app and server work And prove cookies work perfect according log

app has two buttons one is  'set cookies' which is send a ajax request to server +/setCookies,the response is String data('SET COOKIES SUCCESS') and let webview set cookies('cookiesTest', 'set cookies success,your cookies can be set by server');

another is  'get cookies' which is send a ajax request to server +/getCookies,the response is JSON data({'cookiesTest', 'set cookies success,your cookies can be set by server'});

iso click 'set cookies',screen shot

 

