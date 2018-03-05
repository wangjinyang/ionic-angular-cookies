# ionic-angular-cookies
show how ionic1 or ionic2 support cookies ,and dispaly the log,the server is base on node Express

### story
search internet,many people include me  get answer that ionic don't support cookies authentication,we must use request header instead of cookies.

for my experience,the difficult work is that i can't catch cookie log,so i dont know is't been set in the webview,i write this article show how do i catch cookies log and the what server done.I write javascript code to start-up a server by Express,and build hybrid app by ionic1,the problem is only between webview depend on IOS and Android and the way how server set cookies(no business with ionic app version) ,I have tested on ios(simulator and  device) and and android(just device) ,both are work very well.

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
then,the server is start up depend on localhost:3000,open your brower and visit localhost:3000,you can see Express String!

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

### how app and server work And proof cookies work perfect according log

app has two buttons one is  'set cookies' which is send a ajax request to server +/setCookies,the response is String data('SET COOKIES SUCCESS') and let webview set cookies('cookiesTest', 'set cookies success,your cookies can be set by server');

another is  'get cookies' which is send a ajax request to server +/getCookies,the response is JSON data({'cookiesTest', 'set cookies success,your cookies can be set by server'});

>if images can't see clearly,just click it,brower will open a new tag to show raw image

#### ios app click 'set cookies',screen shot

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_simulator_click_setCookies_screen_shot.png?raw=true)

by String 'SET COOKIES SUCCESS',make sure ajax request to server +/setCookies is work very well,next we check webview log

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_req_setCookies_webview_log.jpeg?raw=true)

on image,we can find Set-Cookie key,it has cookies value,path,Expires,so webview get set cookies command.

check the wireshark there is two step. first app send request,second server reponse command Set-Cookie to webview,i take screen shot as show below

 ![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_get_req_url_setCookies_wireShark_screen_shot.jpeg?raw=true)

 ![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_get_res_url_setCookies_wireShark_screen_shot.jpeg?raw=true)

#### next ios app click 'get cookies',screen shot

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_simulator_click_getCookies_screen_shot.png?raw=true)

by String {'cookiesTest', 'set cookies success,your cookies can be set by server'},make sure ajax request to server +/getCookies is work very well,next we check webview log

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_get_req_getCookies_webview_log.jpeg?raw=true)

check request message on image,there is only two key 'Accept' and 'User-Agent',no things about cookie.we don't know is't cookies was send,but we know the server response correct Json data that is requset.cookies which is handled by server logic.

the question is two, one is that is't webview send cookies but webview log do not show, other is how server identify and Analysis the ajax request.

we can catch http log by wireshark that show the resault,below images show ajax request to server +/getCookies what webview send

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_get_req_url_getCookies_wireShark_screen_shot.jpeg?raw=true)

checked log,we can sure webview send cookies,and we can see the cookies value.next image show server response

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_get_res_url_getCookies_wireShark_screen_shot.jpeg?raw=true)

this is node server log

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/ios/ios_node_server_log.jpeg?raw=true)

#### android app click 'set cookies',screen shot

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_simulator_click_setCookies_screen_shot.png?raw=true)

by String 'SET COOKIES SUCCESS',make sure ajax request to server +/setCookies is work very well,next we check webview log

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_get_req_setCookies_webview_log.jpeg?raw=true)

on image,compare ios webview,wo can not see Set-Cookie key,check the wireshark log there is two step. first app send request,second server reponse command Set-Cookie to webview(obviously server send set_cookies command),i take screen shot as show below

the question is that is't webview run the set cookies command which is send by server,we have no ideas about it ?

 ![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_get_req_url_setCookies_wireShark_screen_shot.jpeg?raw=true)

 ![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_get_res_url_setCookies_wireShark_screen_shot.jpeg?raw=true)

#### next android app click 'get cookies',screen shot

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_simulator_click_getCookies_screen_shot.png?raw=true)

by String {'cookiesTest', 'set cookies success,your cookies can be set by server'},make sure ajax request to server +/getCookies is work very well,next we check webview log

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_get_req_getCookies_webview_log.jpeg?raw=true)

check request message on image,there is only two key 'Accept' and 'User-Agent',no things about cookie.we don't know is't cookies was send,but we know the server response correct Json data that is requset.cookies which is handled by server logic.

we can catch http log by wireshark that show the resault,below images show ajax request to server +/getCookies what webview send

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_get_req_url_getCookies_wireShark_screen_shot.jpeg?raw=true)

checked log,we can sure webview send cookies and webview run server command 'Set-Cookie' success,and we can see the cookies value.next image show server response

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_get_res_url_getCookies_wireShark_screen_shot.jpeg?raw=true)

this is node server log

![image](https://github.com/wangjinyang/ionic-angular-cookies/blob/master/logImg/android/android_node_server_log.jpeg?raw=true)

### conclusion

both ios and android(cross-walk or not) support cookies very vell

wiresharp is a way show very step the data exchange

### remark

i have build ios and android  hybrid app work very well base on cookies authentication,ios and android webview can accept gateway and server 'Set-Cookie' command and then run it very well,
if cookie not work very well,you should check

1.server or gateway set Cross-Origin allow all and when cross origin force with cookies on headers,in my case
```
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials",true);
```
2.the cookies style,check my wireshark image set cookies key,make sure your cookie value match mine.

if question leave me issue

### if you benifit from my project,please give me a star,thank you
