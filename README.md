# ionic-angular-cookies
show how ionic1 or ionic2 support cookies ,and dispaly the log,the server is base on node Express

### story
search internet,many people include me  get answer that ionic don't support cookies authentication,we must use request header instead of cookies.

for my experience,the difficult work is that i can't catch cookie log,so i dont know is't been set in the webview,i write this article show how do i catch cookies log and the server config.iI have tested on ios and and android ,both are work very well.

at last,we set up a gateway to set cookies by Nginx,it work good too.

### environment

macOS Sierra 10.12.5

Xcode 8.3.3

node v4.4.3

ionic 2.1.18

cordova 7.0.1

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
 
 


